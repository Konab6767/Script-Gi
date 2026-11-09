/* Dumb Enemies reconstructed native gates, dump 7.2 / pinned PE bodies.
 * No scene walk, entity writes, retained entity pointers or JavaScript callback.
 * Compile one instance per GATE_KIND. All unknown ownership forwards unchanged.
 */
typedef unsigned int U32;
typedef unsigned long long U64;
typedef struct {
    void *base, *allocation;
    U32 allocationProtect, padding;
    U64 regionSize;
    U32 state, protect, type, padding2;
} Range;
typedef struct {
    U32 observed[4], blocked[4], forwarded[4];
    U32 unavailableOwners, nativeErrors, lastPath, lastConfig, lastEntity, suspension;
} State;
typedef struct { U64 start, end; U32 protect; } Checked;
typedef struct { U32 count, cursor; Checked ranges[8]; } Cache;

extern State state;
extern volatile U32 enabled_flag;
extern unsigned char *hotfix_ptrs[];
extern void *original_slot;
extern int atomic_increment(U32 *);
extern U64 virtual_query(void *, Range *, U64);
extern void *get_entity(U32, void *);

#if GATE_KIND < 1 || GATE_KIND > 4
#error Invalid GATE_KIND
#endif

/* Cache permissions for this invocation only. VirtualQuery is not a lifetime
 * guarantee; identity is rechecked through GetValidEntity before suppressing. */
static int readable(Cache *cache, void *pointer, U64 size) {
    U64 current = (U64)pointer, end = current + size, finish;
    U32 i, slot, protection;
    int found, steps;
    Range range;
    if (!pointer || !size || end < current) return 0;
    for (steps = 0; steps < 8 && current < end; steps++) {
        found = 0;
        for (i = 0; i < cache->count; i++) {
            if (current >= cache->ranges[i].start && current < cache->ranges[i].end) {
                finish = cache->ranges[i].end;
                protection = cache->ranges[i].protect;
                found = 1;
                break;
            }
        }
        if (!found) {
            if (virtual_query((void *)current, &range, sizeof(range)) != sizeof(range)) return 0;
            finish = (U64)range.base + range.regionSize;
            if (range.state != 0x1000 || (range.protect & 0x101) || finish <= current) return 0;
            protection = range.protect;
            slot = cache->count < 8 ? cache->count++ : cache->cursor++ % 8;
            cache->ranges[slot].start = (U64)range.base;
            cache->ranges[slot].end = finish;
            cache->ranges[slot].protect = protection;
        }
        if (!(protection & 0xee)) return 0;
        current = finish;
    }
    return current >= end;
}

static void *reference(Cache *cache, void *object, U32 offset) {
    if (!object || !readable(cache, (char *)object + offset, 8)) return 0;
    return *(void **)((char *)object + offset);
}

static int catalog(U32 id) {
    U32 low = 0, high = TARGET_COUNT, middle;
    while (low < high) {
        middle = low + (high - low) / 2;
        if (target_ids[middle] < id) low = middle + 1;
        else high = middle;
    }
    return low < TARGET_COUNT && target_ids[low] == id;
}

static int live(void) {
    U32 i;
    if (!enabled_flag) return 0;
    /* The loader validates these pinned module addresses before activation. */
    for (i = 0; i < HOTFIX_COUNT; i++) {
        if (*hotfix_ptrs[i]) {
            state.suspension = 1;
            enabled_flag = 0;
            return 0;
        }
    }
    return enabled_flag != 0;
}

static int monster(Cache *cache, void *entity, U32 expectedId) {
    U32 id, config, kind;
    if (!readable(cache, entity, 0x494)) {
        atomic_increment(&state.unavailableOwners);
        return 0;
    }
    id = *(U32 *)((char *)entity + 0x3d4);
    config = *(U32 *)((char *)entity + 0x48c);
    kind = *(U32 *)((char *)entity + 0x490);
    /* Entity kind 2 alone includes wildlife and other monster subclasses.
     * The recovered monster catalog is an additional mandatory filter. */
    if (kind != 2 || !catalog(config)) return 0;
    if (!id || (expectedId && id != expectedId) || get_entity(id, 0) != entity) {
        atomic_increment(&state.unavailableOwners);
        return 0;
    }
    if (!live()) return 0;
    state.lastConfig = config;
    state.lastEntity = id;
    state.lastPath = GATE_KIND;
    return 1;
}

static int block(void *self, void *event) {
    Cache cache;
    void *owner;
    U32 id;
    if (!live()) return 0;
    cache.count = cache.cursor = 0;
#if GATE_KIND == 1 || GATE_KIND == 3
    /* AI controller inherits the shared component owner pointer at +28. */
    owner = reference(&cache, self, 0x28);
#elif GATE_KIND == 2
    /* AI module +18 -> data +68: both links are pinned for 7.2.
     * The module constructor and NLAEIJDCIOO body confirm both links. */
    owner = reference(&cache, reference(&cache, self, 0x18), 0x68);
#else
    /* HNIHADEIPOA accepts base events, not only attack events. The pinned
     * DPCHHJAFLLD initializer sets event kind +24 to 22 and source ID +10.
     * Forward all other kinds rather than suppressing unrelated entity events. */
    if (!readable(&cache, event, 0x28)) {
        atomic_increment(&state.unavailableOwners);
        return 0;
    }
    if (*(U32 *)((char *)event + 0x24) != 22) return 0;
    id = *(U32 *)((char *)event + 0x10);
    if (!id) {
        atomic_increment(&state.unavailableOwners);
        return 0;
    }
    owner = get_entity(id, 0);
    return monster(&cache, owner, id);
#endif
    return monster(&cache, owner, 0);
}

#if GATE_KIND == 1 || GATE_KIND == 2
/* AMJINHKGDKJ / NLAEIJDCIOO: void(receiver, float, MethodInfo*).
 * Preserve the second-position float in XMM1 on Win64 when forwarding. */
void dispatch(void *self, float delta, void *method) {
    atomic_increment(&state.observed[GATE_KIND - 1]);
    if (block(self, 0)) {
        atomic_increment(&state.blocked[GATE_KIND - 1]);
        return;
    }
    atomic_increment(&state.forwarded[GATE_KIND - 1]);
    ((void (*)(void *, float, void *))original_slot)(self, delta, method);
}
#elif GATE_KIND == 3
/* IOAPBJGJBBD: entity*(receiver, int32 relation, MethodInfo*).
 * A missing target is already a supported native return path. */
void *dispatch(void *self, int relation, void *method) {
    atomic_increment(&state.observed[2]);
    if (block(self, 0)) {
        atomic_increment(&state.blocked[2]);
        return 0;
    }
    atomic_increment(&state.forwarded[2]);
    return ((void *(*)(void *, int, void *))original_slot)(self, relation, method);
}
#else
/* HNIHADEIPOA: bool(receiver, event, MethodInfo*).
 * Native true means the source event was handled; false means source/actor
 * unavailable. Consume suppressed monster events with true, preserving that
 * distinction instead of inventing a missing-source failure. */
unsigned char dispatch(void *self, void *event, void *method) {
    atomic_increment(&state.observed[3]);
    if (block(self, event)) {
        atomic_increment(&state.blocked[3]);
        return 1;
    }
    atomic_increment(&state.forwarded[3]);
    return ((unsigned char (*)(void *, void *, void *))original_slot)(self, event, method);
}
#endif

U32 state_size(void) { return sizeof(State); }
