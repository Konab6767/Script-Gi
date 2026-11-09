/* AutoLoot.cpp port: original pickup callback, ID queue, delay and range hooks.
 * All calls into the game happen inside original game-thread callbacks. */
#include <gum/guminterceptor.h>
typedef unsigned int U32;
typedef unsigned long long U64;
typedef struct {float x,y,z;} Vec3;
typedef struct {void *base,*allocation;U32 allocationProtect,padding;U64 regionSize;U32 state,protect,type,pad;} Range;
typedef struct {U32 lock,sequence,enabled,inFlight,queued,requests,immediate,dropped,stale,rangeChecks,chestScans,chestQueued,reason,lastId,lastRequest,hasRequest,avatarId,head,count,cursor,lastScan,scanReady;U64 avatarToken,listToken;U32 sceneCalls,addCalls,selectorTicks,scanned,matched,localRejected;} State;
typedef struct {U32 delay,custom,radiusBits,radiusSquaredBits,chests,oculi;} Options;
/* flags bit0 retains original-Add provenance for this queued identity. It
 * outlives the 10s discovery/range memo, but every dispatch rechecks the live
 * scene pointer, ID, config, distance and original eligibility. */
typedef struct {U32 id,config;U64 token;U32 flags,pad;} Item;
typedef struct {void *selector,*entity;} Frame;
typedef struct {void *function,*metadata;} Invoke;
typedef struct {U64 frequency;U32 queries,passes,lastUs,maxUs,budgetStops,uiSkipped,retrySuppressed,memoCursor;
 U32 cacheHits,passScanned,chestOutside,chestUnavailable,discoveryUs,maxDiscoveryUs,requestUs,maxRequestUs;
 U32 sceneCount,scanCycles,selectedObserved,selectedRequests,unknownSelected,selectionExpired,dispatchUs,maxDispatchUs,dispatchStops,preludeUs,maxPreludeUs,selectionCursor;} Performance;
/* Region permissions are cached only on the stack of one callback. Never keep
 * heap mappings across frames, share a cache with a nested hook or cache IDs. */
typedef struct {U64 start,end;U32 protect;} CheckedRange;
typedef struct {U32 count,cursor;CheckedRange ranges[32];} Cache;
typedef struct {U32 id,config;U64 token;U32 tick,used;} Pending;
typedef struct {U32 cursor,lastScan,scanReady,scanned,matched,queued,requests,cycles,budgetStops,lastUs,maxUs,lastLatencyMs,maxLatencyMs,unavailable,rangeRejected,cycleBegan;U64 listToken;U32 lastCycleMs,maxCycleMs;} Oculi;
extern Performance performance;
extern Oculi oculi_diagnostics;
extern Pending pending[];
extern Pending selected[];
extern const U32 target_ids[],target_kinds[];
extern const U32 oculus_ids[];
extern int performance_counter(U64 *);
extern State loot_state;
extern Options options;
extern Item queue[];
extern U32 volatile active_flag;
extern char root_slot,pickup_method_slot,count_interface_slot,item_interface_slot;
extern void *original_add;
extern void *hotfix_ptrs[];
extern U64 tick_ms(void);
extern U64 virtual_query(void *,Range *,U64);
extern int compare_exchange(int *,int,int);
extern int increment(int *);
extern int decrement(int *);
extern void *get_entity(U32,void *);
extern void *scene_lookup(void *,U32,unsigned char,void *);
extern void *get_current(void *);
extern unsigned char is_host(void *,void *);
extern unsigned char eligible(void *,void *,void *);
extern unsigned char eligible_coop(void *,void *,void *);
typedef void (*Add)(void *,void *,void *);
typedef void (*Pick)(void *,U32,void *);
typedef void *(*Position)(Vec3 *,void *,void *);
static int valid(Cache *c,void *p,U64 size,int exec){Range r;U64 a=(U64)p,end=a+size,finish;U32 i,at,protect;int n,found;
 if(!p||!size||end<a)return 0;
 for(n=0;n<8&&a<end;n++){
  found=0;for(i=0;i<c->count;i++)if(a>=c->ranges[i].start&&a<c->ranges[i].end){
   finish=c->ranges[i].end;protect=c->ranges[i].protect;found=1;performance.cacheHits++;break;}
  if(!found){performance.queries++;if(!virtual_query((void*)a,&r,sizeof(r)))return 0;
   finish=(U64)r.base+r.regionSize;if(r.state!=0x1000||(r.protect&0x101)||finish<=a)return 0;
   protect=r.protect;at=c->count<32?c->count++:c->cursor++%32;
   c->ranges[at].start=(U64)r.base;c->ranges[at].end=finish;c->ranges[at].protect=protect;}
  if(!(exec?(protect&0xf0):(protect&0xee)))return 0;a=finish;
 }return a>=end;}
static void *ref(Cache *c,void *p,U32 at){return p&&valid(c,(char*)p+at,8,0)?*(void**)((char*)p+at):0;}
static U32 word(Cache *c,void *p,U32 at){return p&&valid(c,(char*)p+at,4,0)?*(U32*)((char*)p+at):0;}
static U32 half(Cache *c,void *p,U32 at){return p&&valid(c,(char*)p+at,2,0)?*(unsigned short*)((char*)p+at):0;}
static int byte(Cache *c,void *p,U32 at){return p&&valid(c,(char*)p+at,1,0)?*((unsigned char*)p+at):0;}
static int scene_ready(Cache*c,void*manager){void*dict,*entries;U32 count;if(!valid(c,manager,0x40,0))return 0;
 dict=ref(c,manager,0x110);if(!valid(c,dict,0x40,0))return 0;entries=ref(c,dict,0x30);count=word(c,entries,0x18);
 return count<=16384&&valid(c,entries,0x20,0)&&word(c,entries,0x18)>=count;}
/* These addresses belong to the pinned module and were validated by JS before
 * activation. Re-querying their memory regions for every candidate is wasteful. */
static int live(void){U32 n;if(!active_flag||!loot_state.enabled)return 0;for(n=0;n<HOTFIX_COUNT;n++)if(*(unsigned char*)hotfix_ptrs[n]){loot_state.reason=1;return 0;}return 1;}
static U32 kind(U32 id){int a=0,b=TARGET_COUNT,m;while(a<b){m=(a+b)/2;if(target_ids[m]<id)a=m+1;else b=m;}return a<TARGET_COUNT&&target_ids[a]==id?target_kinds[a]:0;}
static int oculus(U32 config){U32 i;for(i=0;i<OCULUS_COUNT;i++)if(oculus_ids[i]==config)return 1;return 0;}
static int urgent(Item*q){return options.oculi&&(q->flags&4)&&oculus(q->config);}
/* Current pickup enumeration checks +372, not the avatar's +42c flag. */
static int entity_base(Cache *c,void *e){return valid(c,e,0x500,0)&&*((unsigned char*)e+0x3ef)&&*(U32*)((char*)e+0x490)!=1&&*(U32*)((char*)e+0x3d4)&&*(U32*)((char*)e+0x48c);}
/* Only an original pickup-selector Add callback can admit an unknown fauna
 * ID. Range callbacks and a name/ID guess alone never grant that admission. */
static int selected_before(Cache*c,void*e,U32 now){U32 n,id=word(c,e,0x3d4),config=word(c,e,0x48c);
 for(n=0;n<128;n++)if(selected[n].used&&selected[n].id==id&&selected[n].config==config&&selected[n].token==(U64)e){
  if(now-selected[n].tick<10000)return 1;selected[n].used=0;performance.selectionExpired++;}return 0;}
static void remember_selected(Cache*c,void*e,U32 now){U32 n,slot=performance.selectionCursor++%128,id=word(c,e,0x3d4),config=word(c,e,0x48c);
 for(n=0;n<128;n++)if(selected[n].used&&selected[n].id==id&&selected[n].config==config&&selected[n].token==(U64)e){slot=n;break;}
 selected[slot].id=id;selected[slot].config=config;selected[slot].token=(U64)e;selected[slot].tick=now;selected[slot].used=1;}
static int entity_ok(Cache*c,void*e,U32 flags,U32 now){U32 type,k;if(!entity_base(c,e))return 0;type=word(c,e,0x490);k=kind(word(c,e,0x48c));
 if(k&&type!=2)return 1;return (type==2||type==0x22)&&((flags&1)||selected_before(c,e,now));}
/* JIGIEPKOBGH itself prefers the manager's player over selector+28.
 * A selector owner need not be the currently controlled avatar. */
static int local(Cache *c,void *s,void **avatar){void *a=get_current(0);if((s&&!valid(c,s,0x1a8,0))||!valid(c,a,0x500,0)||word(c,a,0x490)!=1||!byte(c,a,0x380)||!is_host(a,0)){loot_state.reason=4;loot_state.localRejected++;return 0;}*avatar=a;return 1;}
static int position(Cache *c,void *e,Vec3 *v){void *fn=ref(c,ref(c,e,0),0x388);if(!valid(c,fn,1,1))return 0;v->x=v->y=v->z=0;((Position)fn)(v,e,0);return v->x>-1000000&&v->x<1000000&&v->y>-1000000&&v->y<1000000&&v->z>-1000000&&v->z<1000000;}
static int near_position(Cache *c,Vec3 *x,void *e,U32 radiusBits){Vec3 y;union {float f;U32 u;} d;float dx,dy,dz;
 if(!position(c,e,&y))return 0;dx=x->x-y.x;dy=x->y-y.y;dz=x->z-y.z;d.f=dx*dx+dy*dy+dz*dz;
 /* Both values are finite nonnegative IEEE floats; avoid TinyCC float ABI helpers. */
 return d.u<radiusBits;}
static int in_range(Cache *c,void *a,void *e,U32 radiusBits){Vec3 x;return position(c,a,&x)&&near_position(c,&x,e,radiusBits);}
static U64 precise(void){U64 v=0;performance_counter(&v);return v;}
static int spent(U64 start){return precise()-start>=performance.frequency/500;}
static int recently_requested(Cache *c,void *e,U32 now){U32 n,id=word(c,e,0x3d4),config=word(c,e,0x48c);for(n=0;n<128;n++)if(pending[n].used&&pending[n].id==id&&pending[n].config==config&&pending[n].token==(U64)e&&now-pending[n].tick<500)return 1;return 0;}
static void remember_request(Cache *c,void *e,U32 now){U32 n,id=word(c,e,0x3d4),config=word(c,e,0x48c),slot=performance.memoCursor++%128;
 for(n=0;n<128;n++)if(pending[n].used&&pending[n].id==id&&pending[n].token==(U64)e){slot=n;break;}
 pending[slot].id=id;pending[slot].config=config;pending[slot].token=(U64)e;pending[slot].tick=now;pending[slot].used=1;}
/* Init's pinned instructions prove the original module + MethodInfo binding.
 * Resolve it directly, just like GET_SINGLETON(ItemModule)/PickItem in C++.
 * No selector/delegate needs to have been observed or retained. */
static int callback(Cache *c,Invoke *call,void **target){void *meta=ref(c,&pickup_method_slot,0),*fn=ref(c,meta,0),*module=ref(c,ref(c,&root_slot,0),0xb5a0);
 if(!meta||!valid(c,module,0x10,0)||!valid(c,fn,1,1))return 0;
 call->function=fn;call->metadata=meta;*target=module;return 1;}
static void clear_queue(void){U32 n;loot_state.head=loot_state.count=loot_state.queued=0;loot_state.cursor=0;loot_state.listToken=0;loot_state.avatarToken=0;loot_state.scanReady=0;
 oculi_diagnostics.cursor=oculi_diagnostics.scanReady=0;oculi_diagnostics.listToken=0;
 for(n=0;n<128;n++){pending[n].used=0;selected[n].used=0;}}
static void owner(Cache *c,void *a){U32 id=word(c,a,0x3d4);if(loot_state.avatarToken!=(U64)a||loot_state.avatarId!=id){clear_queue();loot_state.avatarToken=(U64)a;loot_state.avatarId=id;}}
static U32 priority(U32 config,U32 flags){return options.oculi&&(flags&4)&&oculus(config)?0:kind(config)==2?1:(flags&2)?2:3;}
static int enqueue(Cache *c,void *e,U32 flags){U32 n,at,id=word(c,e,0x3d4),config=word(c,e,0x48c),rank;flags|=word(c,e,0x490)==0x22?2:0;
 if(options.oculi&&oculus(config)&&word(c,e,0x490)==0x16)flags|=4;
 if(recently_requested(c,e,(U32)tick_ms())){performance.retrySuppressed++;return -2;}for(n=0;n<loot_state.count;n++){Item *q=&queue[(loot_state.head+n)%QUEUE_SIZE];if(q->id==id&&q->config==config&&q->token==(U64)e){q->flags|=flags;return 0;}}
 /* Prioritized oculi precede chests, fauna and loose items; FIFO per group.
  * A full queue surrenders its last lower-priority entry to an urgent item. */
 at=loot_state.count;rank=priority(config,flags);
 if(rank<3){for(at=0;at<loot_state.count;at++){Item*q=&queue[(loot_state.head+at)%QUEUE_SIZE];if(priority(q->config,q->flags)>rank)break;}
  if(loot_state.count==QUEUE_SIZE&&at<loot_state.count){loot_state.count--;loot_state.dropped++;}}
 if(loot_state.count==QUEUE_SIZE){loot_state.dropped++;return -1;}
 for(n=loot_state.count;n>at;n--)queue[(loot_state.head+n)%QUEUE_SIZE]=queue[(loot_state.head+n-1)%QUEUE_SIZE];
 at=(loot_state.head+at)%QUEUE_SIZE;queue[at].id=id;queue[at].config=config;queue[at].token=(U64)e;queue[at].flags=flags;queue[at].pad=(U32)tick_ms();
 if(flags&4)oculi_diagnostics.queued++;loot_state.count++;loot_state.queued=loot_state.count;return 1;}
static void request(Cache *c,Invoke *call,void *target,void *e,U32 immediate,U32 flags,U32 observed){U32 id=word(c,e,0x3d4),latency,now=(U32)tick_ms(),priorityOculus=options.oculi&&(flags&4)&&oculus(word(c,e,0x48c));U64 began,elapsed;
 /* Oculi bypass the ordinary interval without resetting it: a pending oculus
  * cannot keep postponing unrelated pickups after each suppressed retry. */
 loot_state.lastId=id;if(!priorityOculus){loot_state.lastRequest=now;loot_state.hasRequest=1;}
 remember_request(c,e,now);loot_state.requests++;loot_state.immediate+=immediate;loot_state.reason=0;
 if(priorityOculus){oculi_diagnostics.requests++;latency=now-observed;
  oculi_diagnostics.lastLatencyMs=latency;if(latency>oculi_diagnostics.maxLatencyMs)oculi_diagnostics.maxLatencyMs=latency;}
 if(flags&1)performance.selectedRequests++;began=precise();((Pick)call->function)(target,id,call->metadata);elapsed=precise()-began;
 performance.requestUs=(U32)(elapsed*1000000/performance.frequency);if(performance.requestUs>performance.maxRequestUs)performance.maxRequestUs=performance.requestUs;}
/* replaceFast preserves original AddButton when disabled/queued/unavailable. */
void add_replace(void *s,void *e,void *meta){void *a,*target,*manager;Invoke call;int canceled=0,queued;U32 type,now,flags;Cache memory,*c=&memory;c->count=c->cursor=0;
 increment((int*)&loot_state.inFlight);
 increment((int*)&loot_state.addCalls);
 if(live()&&local(c,s,&a)&&entity_base(c,e)&&compare_exchange((int*)&loot_state.lock,1,0)==0){loot_state.sequence++;
 if(live()){owner(c,a);now=(U32)tick_ms();type=word(c,e,0x490);flags=type==2||type==0x22?3:1;manager=ref(c,ref(c,&root_slot,0),0xa2e0);
 if(options.oculi&&type==0x16&&oculus(word(c,e,0x48c)))flags|=4;
 if(entity_ok(c,e,1,now)&&scene_ready(c,manager)&&scene_lookup(manager,word(c,e,0x3d4),0,0)==e&&in_range(c,a,e,options.custom?options.radiusSquaredBits:0x41440000)&&
   (eligible(0,e,0)||eligible_coop(0,e,0))&&(kind(word(c,e,0x48c))!=2||options.chests)&&(type!=0x1a||(kind(word(c,e,0x48c))==2&&options.chests))){
 performance.selectedObserved++;if(!kind(word(c,e,0x48c))){performance.unknownSelected++;remember_selected(c,e,now);}
 if(callback(c,&call,&target)){
 if(!options.delay||(flags&4)){if(!recently_requested(c,e,now))request(c,&call,target,e,1,flags,now);else performance.retrySuppressed++;canceled=1;}
 else{queued=enqueue(c,e,flags);if(queued!=-1&&options.custom&&!in_range(c,a,e,0x41440000)){canceled=1;performance.uiSkipped++;}}
 }else loot_state.reason=2;}}
 loot_state.sequence++;loot_state.lock=0;}
 if(!canceled)((Add)original_add)(s,e,meta);decrement((int*)&loot_state.inFlight);}
static int resolve(Cache *c,void *object,void *iface,Invoke *out){void *k=ref(c,object,0),*offsets=ref(c,k,0x28);U32 n,count=half(c,k,0xbe),slots=half(c,k,0xc2),slot;
 if(!iface||!count||count>256||!slots||slots>4096||!valid(c,offsets,count*16,0))return 0;
 for(n=0;n<count;n++){if(ref(c,offsets,n*16)!=iface)continue;slot=word(c,offsets,n*16+8);if(slot>=slots)return 0;
 out->function=ref(c,k,0xd0+slot*8);out->metadata=ref(c,k,0xd0+(slots+slot)*8);return valid(c,out->function,1,1)&&valid(c,out->metadata,8,0);}return 0;}
/* Dedicated cheap ID pass, before the ordinary item queue. No names, game
 * calls or position queries for non-oculi. Its independent 0.5ms budget and
 * 512-slot limit prevent a crowded item queue from hiding a loaded oculus. */
static void scan_oculi(Cache*c,void*manager,Vec3*playerPos,U32 now){Oculi*o=&oculi_diagnostics;void*dict,*entries,*e;U32 count,n,index,key;U64 began,us;
 if(!options.oculi||(o->scanReady&&now-o->lastScan<16))return;
 began=precise();dict=ref(c,manager,0x110);entries=ref(c,dict,0x30);count=word(c,entries,0x18);
 if(!valid(c,dict,0x40,0)||count>16384||word(c,entries,0x18)<count||!valid(c,entries,0x20+(U64)count*24,0))return;
 if(!o->scanReady||o->listToken!=(U64)entries){o->cursor=0;o->cycleBegan=now;o->listToken=(U64)entries;}
 o->scanReady=1;o->lastScan=now;if(!count){o->cursor=0;return;}
 for(n=0;n<512&&n<count;n++){
  if(n&&!(n&7)&&precise()-began>=performance.frequency/2000){o->budgetStops++;break;}
  if(!live())break;if(o->cursor>=count)o->cursor=0;index=o->cursor++;o->scanned++;
  if(!(word(c,entries,0x20+index*24)&0x80000000u)){
   e=ref(c,entries,0x30+index*24);
   if(oculus(word(c,e,0x48c))&&word(c,e,0x490)==0x16){key=word(c,entries,0x28+index*24);
    if(key&&word(c,e,0x3d4)==key&&entity_ok(c,e,0,now)&&ref(c,e,0x1c8)){o->matched++;
     if(!near_position(c,playerPos,e,options.custom?options.radiusSquaredBits:0x41440000))o->rangeRejected++;
     else if(eligible(0,e,0)||eligible_coop(0,e,0))enqueue(c,e,4);else o->unavailable++;
    }
   }
  }
  if(o->cursor>=count){o->cursor=0;o->cycles++;o->lastCycleMs=now-o->cycleBegan;
   if(o->lastCycleMs>o->maxCycleMs)o->maxCycleMs=o->lastCycleMs;o->cycleBegan=now;break;}
 }
 us=(precise()-began)*1000000/performance.frequency;o->lastUs=(U32)us;if(o->lastUs>o->maxUs)o->maxUs=o->lastUs;
}
static void scan_scene(Cache *c,void *manager,Vec3 *playerPos,U32 now,U64 began){void *dict,*entries,*e;U32 n,index,key,k,count,flags;
 if(loot_state.scanReady&&now-loot_state.lastScan<16)return;
 loot_state.scanReady=1;loot_state.lastScan=now;
 /* e953420 proves manager+110's live-ID dictionary: hash,next,key,value,
  * 24-byte entries. No managed Count/Item interface call per candidate. */
 dict=ref(c,manager,0x110);entries=ref(c,dict,0x30);count=word(c,entries,0x18);performance.sceneCount=count;
 if(!valid(c,dict,0x40,0)||count>16384||word(c,entries,0x18)<count||!valid(c,entries,0x20+(U64)count*24,0)){loot_state.reason=3;return;}
 if(loot_state.listToken!=(U64)entries){loot_state.cursor=0;loot_state.listToken=(U64)entries;}
 if(!count){loot_state.cursor=0;return;}performance.passes++;
 for(n=0;n<128&&n<count;n++){
 if(n&&spent(began)){performance.budgetStops++;break;}if(loot_state.cursor>=count)loot_state.cursor=0;index=loot_state.cursor++;loot_state.scanned++;
 if(!live())return;if(word(c,entries,0x20+index*24)&0x80000000u)goto next;
 key=word(c,entries,0x28+index*24);e=ref(c,entries,0x30+index*24);
 if(!key||word(c,e,0x3d4)!=key||!entity_ok(c,e,0,now)||!ref(c,e,0x1c8))goto next;
 k=kind(word(c,e,0x48c));flags=k?0:3;
 if(k==2){loot_state.chestScans++;if(!options.chests)goto next;}
 if(!near_position(c,playerPos,e,options.custom?options.radiusSquaredBits:0x41440000)){if(k==2)performance.chestOutside++;goto next;}
 if(eligible(0,e,0)||eligible_coop(0,e,0)){loot_state.matched++;if(enqueue(c,e,flags)==1&&k==2)loot_state.chestQueued++;}
 else if(k==2)performance.chestUnavailable++;
 next:if(loot_state.cursor>=count){loot_state.cursor=0;performance.scanCycles++;break;}
 }}
/* Both verified game-thread updates can drive the same queue. Some live builds
 * call selector Tick continuously without entering the captured LateTick body.
 * Share the lock/clock so enabling both listeners never doubles the dispatch. */
static void service(void *manager){void *a,*e,*target,*currentManager;Invoke call;Item q;Vec3 playerPos;U32 now,n,due,waiting,before,requestsBefore;U64 began,elapsed,scanBegan,dispatchBegan;Cache memory,*c=&memory;c->count=c->cursor=0;
 if(!active_flag||!loot_state.enabled)return;now=(U32)tick_ms();
 due=!loot_state.scanReady||now-loot_state.lastScan>=16;
 waiting=loot_state.hasRequest&&now-loot_state.lastRequest<options.delay;
 if(!due&&(!loot_state.count||(waiting&&!urgent(&queue[loot_state.head]))))return;
 if(compare_exchange((int*)&loot_state.lock,1,0)==0){loot_state.sequence++;began=precise();requestsBefore=loot_state.requests;
 if(!live()||!local(c,0,&a))goto done;
 owner(c,a);now=(U32)tick_ms();if(!position(c,a,&playerPos))goto done;
 currentManager=ref(c,ref(c,&root_slot,0),0xa2e0);if(!scene_ready(c,currentManager)||(manager&&manager!=currentManager)){loot_state.reason=3;goto done;}manager=currentManager;
 loot_state.reason=0;
 /* Discovery runs on its own cadence, even while a delay or a nonempty item
  * queue prevents dispatch. Slow pickup callbacks are timed separately. */
 elapsed=precise()-began;performance.preludeUs=(U32)(elapsed*1000000/performance.frequency);if(performance.preludeUs>performance.maxPreludeUs)performance.maxPreludeUs=performance.preludeUs;
 scan_oculi(c,manager,&playerPos,now);
 if((!loot_state.count||!urgent(&queue[loot_state.head]))&&(!loot_state.scanReady||now-loot_state.lastScan>=16)){before=loot_state.scanned;scanBegan=precise();
  scan_scene(c,manager,&playerPos,now,scanBegan);elapsed=precise()-scanBegan;
  performance.passScanned=loot_state.scanned-before;performance.discoveryUs=(U32)(elapsed*1000000/performance.frequency);
  if(performance.discoveryUs>performance.maxDiscoveryUs)performance.maxDiscoveryUs=performance.discoveryUs;}
 if(loot_state.hasRequest&&now-loot_state.lastRequest<options.delay&&(!loot_state.count||!urgent(&queue[loot_state.head]))){if(!loot_state.reason)loot_state.reason=7;goto done;}
 if(!loot_state.count)goto idle;
 if(!callback(c,&call,&target)){loot_state.reason=2;goto done;}dispatchBegan=precise();
 for(n=0;n<8&&loot_state.count;n++){
 if(n&&spent(dispatchBegan)){performance.dispatchStops++;break;}
 if(loot_state.hasRequest&&now-loot_state.lastRequest<options.delay&&!urgent(&queue[loot_state.head]))break;
 q=queue[loot_state.head];loot_state.head=(loot_state.head+1)%QUEUE_SIZE;loot_state.count--;loot_state.queued=loot_state.count;
 e=scene_lookup(manager,q.id,0,0);
 if(!entity_ok(c,e,q.flags,now)||(U64)e!=q.token||word(c,e,0x48c)!=q.config||word(c,e,0x3d4)!=q.id||(kind(q.config)==2&&!options.chests)||((q.flags&4)&&word(c,e,0x490)!=0x16)){loot_state.stale++;continue;}
 if(!near_position(c,&playerPos,e,options.custom?options.radiusSquaredBits:0x41440000)){loot_state.stale++;continue;}
 if(recently_requested(c,e,now)){performance.retrySuppressed++;continue;}
 if(!(eligible(0,e,0)||eligible_coop(0,e,0))){loot_state.stale++;continue;}
 if(live())request(c,&call,target,e,0,q.flags,q.pad);if(options.delay&&!urgent(&q))break;now=(U32)tick_ms();
 }
 elapsed=precise()-dispatchBegan;performance.dispatchUs=(U32)(elapsed*1000000/performance.frequency);if(performance.dispatchUs>performance.maxDispatchUs)performance.maxDispatchUs=performance.dispatchUs;
 idle:if(!loot_state.count&&loot_state.reason==0&&loot_state.requests==requestsBefore)loot_state.reason=6;
 done:elapsed=precise()-began;performance.lastUs=(U32)(elapsed*1000000/performance.frequency);if(performance.lastUs>performance.maxUs)performance.maxUs=performance.lastUs;loot_state.sequence++;loot_state.lock=0;}}
void tick_enter(GumInvocationContext *ctx){increment((int*)&loot_state.inFlight);}
void tick_leave(GumInvocationContext *ctx){increment((int*)&loot_state.selectorTicks);service(0);decrement((int*)&loot_state.inFlight);}
void scene_enter(GumInvocationContext *ctx){Frame *f=gum_invocation_context_get_listener_invocation_data(ctx,sizeof(Frame));increment((int*)&loot_state.inFlight);increment((int*)&loot_state.sceneCalls);f->selector=gum_invocation_context_get_nth_argument(ctx,0);}
void scene_leave(GumInvocationContext *ctx){Frame *f=gum_invocation_context_get_listener_invocation_data(ctx,sizeof(Frame));service(f->selector);decrement((int*)&loot_state.inFlight);}
void range_enter(GumInvocationContext *ctx){Frame *f=gum_invocation_context_get_listener_invocation_data(ctx,sizeof(Frame));increment((int*)&loot_state.inFlight);f->selector=gum_invocation_context_get_nth_argument(ctx,0);f->entity=gum_invocation_context_get_nth_argument(ctx,1);}
void range_leave(GumInvocationContext *ctx){Frame *f=gum_invocation_context_get_listener_invocation_data(ctx,sizeof(Frame));void *a;Cache memory,*c=&memory;c->count=c->cursor=0;
 if(live()&&options.custom&&local(c,f->selector,&a)&&entity_ok(c,f->entity,0,(U32)tick_ms())){
 increment((int*)&loot_state.rangeChecks);gum_invocation_context_replace_return_value(ctx,(void*)(U64)in_range(c,a,f->entity,options.radiusSquaredBits));}
 decrement((int*)&loot_state.inFlight);}
U32 set_enabled(U32 value){if(compare_exchange((int*)&loot_state.lock,1,0)!=0)return 0;loot_state.sequence++;loot_state.enabled=value?1:0;clear_queue();loot_state.reason=value?5:0;loot_state.sequence++;loot_state.lock=0;return 1;}
U32 configure(U32 delay,U32 custom,U32 radius,U32 squared,U32 chests,U32 oculi){if(delay>5000||custom>1||chests>1||oculi>1||compare_exchange((int*)&loot_state.lock,1,0)!=0)return 0;
 loot_state.sequence++;options.delay=delay;options.custom=custom;options.radiusBits=radius;options.radiusSquaredBits=squared;options.chests=chests;options.oculi=oculi;clear_queue();loot_state.sequence++;loot_state.lock=0;return 1;}
U32 state_size(void){return sizeof(State);}U32 item_size(void){return sizeof(Item);}U32 performance_size(void){return sizeof(Performance);}U32 pending_size(void){return sizeof(Pending);}
U32 options_size(void){return sizeof(Options);}U32 oculi_size(void){return sizeof(Oculi);}
