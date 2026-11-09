/* Port of old KillAura.cpp OnSyncTask / Instant Death mode.
 * On every eligible ORIGINAL conversion: task.position.x = 1000000;
 * then let the original converter run. No task restoration or trial cap.
 * Current entity validation and optional read-only diagnostics surround it. */
#include <gum/guminterceptor.h>
typedef unsigned int U32;
typedef unsigned long long U64;
typedef struct {float x,y,z;} Vec3;
typedef struct {void *base,*allocation;U32 ap,pad;U64 size;U32 state,protect,type,pad2;} Range;
typedef struct {
 U32 lock,sequence,enabled,writes,started,firstWriteAt,inFlight,reason;
 U32 target,config,avatar,thread,calls,rejected,converted,hpChanges;
 U32 hpValid,zero,missing,hpCallbacks;
 float hpBefore,hpLast,maxHp,originalX,originalY,originalZ,distanceSquared;
 U32 firstZeroAt,identityLost,lastObserved;U64 entityToken;
} State;
typedef struct {void *plugin,*entity;U32 id,config,entered;} Frame;
typedef struct {float radius;U32 onlyTargeted,radiusSquaredBits,delayMs;} Options;
typedef struct {U32 id,config,lastWrite,lastUsed;U64 token;U32 written,pad;} Cooldown;
extern State legacy_state;
extern Options options;
extern Cooldown cooldowns[];
extern U32 volatile active_flag;
extern U64 module_size;
extern char module_base,root_slot;
extern unsigned char *hotfix_ptrs[];
extern U64 virtual_query(void*,Range*,U64);
extern U32 compare_exchange(U32*,U32,U32);
extern U64 tick_ms(void);
extern U32 thread_id(void);
extern void *get_entity(U32,void*);
extern void *get_current(void*);
extern unsigned char is_host(void*,void*);
/* SHARED_HELPERS */
static void flight(int change){U32 n;do{n=legacy_state.inFlight;}while(compare_exchange(&legacy_state.inFlight,n+change,n)!=n);}
static int writable(void*p,U64 n){Range r;return readable(p,n) && virtual_query(p,&r,sizeof(r))==sizeof(r) &&
 (r.protect&0xcc) && (U64)p+n<=(U64)r.base+r.size;}
static int entity_ok(void*p){U32 id;return readable(p,0x4d0) && (id=word(p,0x3d4)) && get_entity(id,0)==p;}
static int healthy(void){U32 i;if(!active_flag)return 0;
 for(i=0;i<HOTFIX_COUNT;i++)if(*hotfix_ptrs[i]){legacy_state.reason=2;legacy_state.enabled=0;active_flag=0;return 0;}return 1;}
static int position(void*e,Vec3*out){Range r;void*fn=ref(ref(e,0),0x388);
 if(!relative(fn)||virtual_query(fn,&r,sizeof(r))!=sizeof(r)||!(r.protect&0xf0)||(r.protect&0x101))return 0;
 ((void*(*)(Vec3*,void*,void*))fn)(out,e,0);
 return out->x>-2000000 && out->x<2000000 && out->y>-2000000 && out->y<2000000 && out->z>-2000000 && out->z<2000000;
}
static int hp(void*e,float*h,float*m){U32 reason=0,rows,columns;void*p=ref(component(e),0x178);
 const unsigned char*t=table(&reason,&rows,&columns);
 return p && decode((char*)p+0x2c8,t,h,&reason) && decode((char*)p+0x4a8,t,m,&reason);
}
/* HP is diagnostics only. A missing decoder/property never gates the port. */
static void observe(void){void*e;float h,m;U32 stamp=(U32)tick_ms()-legacy_state.started+1,bits,previous;
 if(!legacy_state.target || (legacy_state.lastObserved && stamp-legacy_state.lastObserved<250))return;
 legacy_state.lastObserved=stamp;e=get_entity(legacy_state.target,0);
 if(!e){legacy_state.missing=1;return;}
 if((U64)e!=legacy_state.entityToken || !entity_ok(e)||word(e,0x48c)!=legacy_state.config){legacy_state.identityLost=1;return;}
 if(hp(e,&h,&m)){
  bits=*(U32*)&h;previous=*(U32*)&legacy_state.hpLast;
  if(!legacy_state.hpValid)legacy_state.maxHp=m;
  else if(bits!=previous)legacy_state.hpChanges++;
  legacy_state.hpLast=h;legacy_state.hpValid=1;
  if(h==0 && !legacy_state.zero){legacy_state.zero=1;legacy_state.firstZeroAt=(U32)tick_ms()-legacy_state.started;}
 }
}
static U32 bits(float value){union {float f;U32 u;} n;n.f=value;return n.u;}
static Cooldown *cooldown(void*e,U32 now){U32 i,age,bestAge=0,id=word(e,0x3d4),config=word(e,0x48c);Cooldown*c,*free=0;
 for(i=0;i<128;i++){
  c=&cooldowns[i];
  if(c->written && c->id==id && c->config==config && c->token==(U64)e){
   c->lastUsed=now;if(now-c->lastWrite<options.delayMs){legacy_state.reason=11;return 0;}return c;
  }
  if(!c->written){free=c;bestAge=0xffffffffu;}
  else if(bestAge!=0xffffffffu && (age=now-c->lastWrite)>=options.delayMs && age>=bestAge){free=c;bestAge=age;}
 }
 if(!free)legacy_state.reason=12;
 return free;
}
static int sync_task(Frame*f,void*plugin){void*e,*avatar,*combat;Vec3 a,p;float dx,dy,dz,distance,h,m;U32 distanceBits,now;Cooldown*wait=0;
 if(!readable(plugin,0x254)){legacy_state.reason=4;return 0;}
 e=ref(ref(plugin,0x28),0x28);avatar=get_current(0);
 if(!entity_ok(avatar)||word(avatar,0x490)!=1||!is_host(avatar,0)||!entity_ok(e)||e==avatar||
    word(e,0x490)!=2||!catalog(word(e,0x48c))){legacy_state.reason=4;return 0;}
 combat=component(e);if(!combat){legacy_state.reason=4;return 0;}
 if(options.onlyTargeted && word(combat,0x198)!=word(avatar,0x3d4)){legacy_state.reason=5;return 0;}
 if(!position(avatar,&a)||!position(e,&p)){legacy_state.reason=7;return 0;}
 dx=p.x-a.x;dy=p.y-a.y;dz=p.z-a.z;distance=dx*dx+dy*dy+dz*dz;
 /* Squared range is precomputed by JS: TinyCC miscompiles multiplication of
  * this external float field by itself. Nonnegative IEEE ordering is exact. */
 distanceBits=bits(distance);
 if(distanceBits>options.radiusSquaredBits){legacy_state.reason=8;return 0;}
 if(!writable((char*)plugin+0x248,4)){legacy_state.reason=10;return 0;}
 now=(U32)tick_ms();if(options.delayMs && !(wait=cooldown(e,now)))return 0;
 if(!active_flag||!legacy_state.enabled)return 0;
 f->plugin=plugin;f->entity=e;f->id=word(e,0x3d4);f->config=word(e,0x48c);f->entered=1;flight(1);
 /* First affected target's HP remains separate from all-target write totals. */
 if(!legacy_state.target){
  legacy_state.target=f->id;legacy_state.config=f->config;legacy_state.entityToken=(U64)e;
  legacy_state.avatar=word(avatar,0x3d4);legacy_state.thread=thread_id();
  legacy_state.firstWriteAt=(U32)tick_ms()-legacy_state.started;
  legacy_state.hpBefore=-1.0f; /* Later readable HP is not a pre-write sample. */
  legacy_state.originalX=*(float*)((char*)plugin+0x248);legacy_state.originalY=*(float*)((char*)plugin+0x24c);
  legacy_state.originalZ=*(float*)((char*)plugin+0x250);legacy_state.distanceSquared=distance;
  if(hp(e,&h,&m)){legacy_state.hpBefore=legacy_state.hpLast=h;legacy_state.maxHp=m;legacy_state.hpValid=1;}
 }
 /* The operative line from the original. No cooldown, no HP gate, no restore. */
 *(float*)((char*)plugin+0x248)=1000000.0f;
 if(wait){wait->id=f->id;wait->config=f->config;wait->token=(U64)e;wait->lastWrite=wait->lastUsed=now;wait->written=1;}
 legacy_state.writes++;legacy_state.reason=0;return 1;
}
void onEnter(GumInvocationContext*ic){Frame*f=GUM_IC_GET_INVOCATION_DATA(ic,Frame);f->entered=0;
 if(!legacy_state.enabled||!healthy()||compare_exchange(&legacy_state.lock,1,0))return;
 if(!active_flag||!legacy_state.enabled){legacy_state.lock=0;return;}
 legacy_state.sequence++;legacy_state.calls++;observe();
 if(!sync_task(f,gum_invocation_context_get_nth_argument(ic,0)))legacy_state.rejected++;
 legacy_state.sequence++;legacy_state.lock=0;
}
void onLeave(GumInvocationContext*ic){Frame*f=GUM_IC_GET_INVOCATION_DATA(ic,Frame);void*infos,*info,*v;U32 index;
 if(!f->entered)return;f->entered=0;
 if(compare_exchange(&legacy_state.lock,1,0)==0){
  legacy_state.sequence++;
  if(ref(ref(f->plugin,0x28),0x28)==f->entity && word(f->entity,0x3d4)==f->id && word(f->entity,0x48c)==f->config){
   index=word(f->plugin,0x28c);infos=ref(f->plugin,0x50);
   if(index<32 && index<word(infos,0x18)){info=ref(infos,0x20+index*8);v=ref(info,0x30);
    if(readable(v,0x24)&&*(float*)((char*)v+0x20)==1000000.0f)legacy_state.converted++;
   }
  }
  legacy_state.sequence++;legacy_state.lock=0;
 }
 flight(-1);
}
void hpEnter(GumInvocationContext*ic){U32*enter=GUM_IC_GET_INVOCATION_DATA(ic,U32);void*e;*enter=0;
 if(!active_flag||!legacy_state.target||(U32)(U64)gum_invocation_context_get_nth_argument(ic,1)!=1010)return;
 e=ref(gum_invocation_context_get_nth_argument(ic,0),0x28);
 if((U64)e==legacy_state.entityToken&&word(e,0x3d4)==legacy_state.target&&word(e,0x48c)==legacy_state.config){*enter=1;flight(1);}
}
void hpLeave(GumInvocationContext*ic){U32*enter=GUM_IC_GET_INVOCATION_DATA(ic,U32);if(!*enter)return;*enter=0;
 if(compare_exchange(&legacy_state.lock,1,0)==0){legacy_state.sequence++;legacy_state.hpCallbacks++;
  if(healthy())observe();legacy_state.sequence++;legacy_state.lock=0;}
 flight(-1);
}
U32 set_enabled(U32 value){U32 ok=0;if(value>1||compare_exchange(&legacy_state.lock,1,0))return 0;
 legacy_state.sequence++;if(!value||healthy()){legacy_state.enabled=value;ok=1;}
 legacy_state.sequence++;legacy_state.lock=0;return ok;
}
U32 configure(U32 radiusBits,U32 squaredBits,U32 only,U32 delay){U32 ok=0;
 if(radiusBits<0x40a00000u||radiusBits>0x42c80000u||squaredBits<0x41c80000u||squaredBits>0x461c4000u||only>1||delay>5000||compare_exchange(&legacy_state.lock,1,0))return 0;
 legacy_state.sequence++;*(U32*)&options.radius=radiusBits;options.radiusSquaredBits=squaredBits;options.onlyTargeted=only;
 options.delayMs=delay;
 legacy_state.sequence++;legacy_state.lock=0;ok=1;return ok;
}
U32 state_size(void){return sizeof(State);}
U32 cooldown_size(void){return sizeof(Cooldown);}
/* Read-only bridge for the optional damage modes. Original Instant Death
 * keeps its existing gates and ABI. Crash requires HP; normal input may use an
 * otherwise valid target with unavailable HP, but excludes known dead targets. */
typedef struct {void *entity,*avatar;U32 id,config;float hp,maxHp;Vec3 position;U32 pad;} Target;
U32 inspect_entity(void*e,Target*out,U32 requireHp){void*avatar,*combat;Vec3 a,p;float dx,dy,dz,h=-1,m=-1;U32 reason=0;
 if(!healthy())return 2;
 if(compare_exchange(&legacy_state.lock,1,0))return 12;
 avatar=get_current(0);
 if(!entity_ok(avatar)||word(avatar,0x490)!=1||!is_host(avatar,0)||!entity_ok(e)||e==avatar||word(e,0x490)!=2||!catalog(word(e,0x48c))){reason=4;goto done;}
 combat=component(e);if(!combat){reason=4;goto done;}
 if(options.onlyTargeted&&word(combat,0x198)!=word(avatar,0x3d4)){reason=5;goto done;}
 if(!position(avatar,&a)||!position(e,&p)){reason=7;goto done;}
 dx=p.x-a.x;dy=p.y-a.y;dz=p.z-a.z;
 if(bits(dx*dx+dy*dy+dz*dz)>options.radiusSquaredBits){reason=8;goto done;}
 if(hp(e,&h,&m)){if(h<2.0f||m<10.0f){reason=13;goto done;}}
 else{h=m=-1;if(requireHp){reason=13;goto done;}}
 out->entity=e;out->avatar=avatar;out->id=word(e,0x3d4);out->config=word(e,0x48c);out->hp=h;out->maxHp=m;out->position=p;out->pad=h>=0?1:0;
done:legacy_state.lock=0;return reason;
}
U32 inspect_target(void*plugin,Target*out){if(!readable(plugin,0x254))return 4;return inspect_entity(ref(ref(plugin,0x28),0x28),out,1);}
U32 target_size(void){return sizeof(Target);}
