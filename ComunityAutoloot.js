// AutoLoot Script - by Joelyson
// Legacy V2.5 / 7.2 / dump 7.2: dicionario da cena, filas e selecoes nativas de fauna.
// NUMPAD 5 liga/desliga; NUMPAD 6 encerra. Inicia OFF; delay 150 ms.
// No menu, use World > AutoLoot. Nao requer itemAutoLoot.js junto.
(function() {
    'use strict';
    var ROOT = 'C:\\Program Files';
    var managed = true;
    var debug = false;
    var PREFIX = '[Legacy AutoLoot] ',
        stage = 'loading',
        lastDiagnostic = 0,
        diagnosticReport = null,
        lastSummary = null;
    var loadStarted = Date.now(),
        loadTimings = {
            preflightMs: null,
            compileMs: null,
            installMs: null,
            totalLoadMs: null
        };
    var jsonCreate = null,
        jsonClose = null;

    function writeJson(path, value) {
        if (!jsonCreate) {
            var kernel = Process.getModuleByName('kernel32.dll');
            jsonCreate = new NativeFunction(kernel.getExportByName('CreateFileW'), 'pointer', ['pointer', 'uint32', 'uint32', 'pointer', 'uint32', 'uint32', 'pointer']);
            jsonClose = new NativeFunction(kernel.getExportByName('CloseHandle'), 'int', ['pointer']);
        }
        var handle = jsonCreate(Memory.allocUtf16String(path), 0x40000000, 7, ptr(0), 2, 0x80, ptr(0));
        if (handle.isNull() || handle.equals(ptr(-1))) throw Error('Nao foi possivel truncar o diagnostico: ' + path);
        if (!jsonClose(handle)) throw Error('Nao foi possivel fechar o diagnostico: ' + path);
        var content = JSON.stringify(value, null, 2);
        File.writeAllText(path, content);
        if (File.readAllText(path) !== content) throw Error('Diagnostico nao conferido: ' + path);
    }

    function diagnostic(phase, detail, manual) {
        if (!manual && !debug && phase !== 'failed') return null;
        try {
            var value = state && diagnosticReport ? diagnosticReport() : {
                version: 'autoloot-legacy-v2.5-7.2',
                enabled: false
            };
            if (phase === 'running' && !value.snapshotCoherent) return null;
            value.phase = phase;
            value.detail = detail || null;
            writeJson(ROOT + '/autoloot-legacy-status.json', value);
            return value;
        } catch (e) {
            console.log(PREFIX + 'Diagnostico: ' + e);
            return null;
        }
    }
    if (debug) console.log(PREFIX + 'V2.5 / 7.2 CARREGANDO: dicionario de IDs da cena e selecoes originais de coleta.');
    diagnostic(stage);
    try {
        var game = Process.getModuleByName('GenshinImpact.exe'),
            base = game.base;
        var p = JSON.parse(File.readAllText(ROOT + '/autoloot-legacy-profile.json'));
        stage = 'preflight';
        var expected = {
            add: 0xa3ef1e0,
            inside: 0xa3f13f0,
            outside: 0xa3ef0a0,
            tick: 0xa3f1790,
            initialize: 0xa3f0bf0,
            eligible: 0xa3eed30,
            eligibleCoop: 0xa3eeec0,
            lookup: 0x131f9c40,
            current: 0x13e54720,
            host: 0x131fcc70,
            hostDependency: 0x8dc3550,
            sceneInterfaces: 0x117b9870,
            sceneLookup: 0x117c21e0
        };
        var expectedOculi = '70590004,70590021,70590041,70590063,70590074,70590086,73094157';
        if (Process.arch !== 'x64' || typeof CModule !== 'function' || p.version !== 'autoloot-legacy-v2.5-7.2' || p.moduleSize !== game.size || p.stateSize !== 128 || p.queueSize !== 128 || p.itemSize !== 24 || p.performanceSize !== 120 || p.evidenceMode !== 'dump-and-disk' ||
            p.pickupMethodSlot !== 0x59c7330 || p.countInterfaceSlot !== 0x58a4478 || p.itemInterfaceSlot !== 0x58a4470 || p.optionsSize !== 24 || p.oculiDiagnosticsSize !== 80 ||
            !Array.isArray(p.oculusIds) || p.oculusIds.join(',') !== expectedOculi ||
            !p.anchors || Object.keys(expected).some(function(n) {
                return p.anchors[n] !== expected[n];
            }) ||
            !Array.isArray(p.methods) || p.methods.length !== Object.keys(expected).length || Object.keys(expected).some(function(n) {
                return p.methods.filter(function(m) {
                    return m.rva === expected[n];
                }).length !== 1;
            }) ||
            !Array.isArray(p.hotfixFlags) || p.hotfixFlags.length > 256 || p.hotfixFlags.some(function(r) {
                return !Number.isInteger(r) || r < 1 || r >= game.size;
            }) ||
            !Array.isArray(p.targets) || !p.targets.length || p.targets.length > 8192 || p.targets.some(function(t, i) {
                return !Number.isInteger(t.id) || t.id < 1 || t.id > 0xffffffff || (t.kind !== 1 && t.kind !== 2) || (i && p.targets[i - 1].id >= t.id);
            })) throw Error('Perfil AutoLoot divergente.');

        function hex(b) {
            return Array.from(new Uint8Array(b)).map(function(v) {
                return ('0' + v.toString(16)).slice(-2);
            }).join('');
        }
        p.methods.forEach(function(m) {
            if (!Number.isInteger(m.rva) || m.rva < 1 || !Number.isInteger(m.size) || m.size < 1 || m.size > 65536 || m.rva + m.size > game.size || m.boundarySource !== 'PE-exception-directory' || typeof m.hex !== 'string' || !/^[0-9a-f]+$/.test(m.hex) || m.hex.length !== m.size * 2) throw Error('Metodo AutoLoot invalido.');
            var at = base.add(m.rva),
                r = Process.findRangeByAddress(at),
                bytes;
            if (!r || r.protection.indexOf('r') < 0 || r.protection.indexOf('x') < 0 || at.add(m.size).compare(r.base.add(r.size)) > 0 || !(bytes = at.readVolatile(m.size)) || hex(bytes) !== m.hex) throw Error('Codigo divergente em 0x' + m.rva.toString(16) + '. Nenhum hook instalado.');
        });
        p.hotfixFlags.forEach(function(r) {
            if (base.add(r).readU8()) throw Error('Hotfix ativo. Nenhum hook instalado.');
        });
        loadTimings.preflightMs = Date.now() - loadStarted;
        stage = 'preflight-ok';
        if (debug) console.log(PREFIX + 'V2.5 / 7.2 PERFIL OK: ' + p.methods.length + ' metodos; ' + p.targets.length + ' IDs.');
        var k = Process.getModuleByName('kernel32.dll'),
            u = Process.getModuleByName('user32.dll');
        var close = new NativeFunction(k.getExportByName('CloseHandle'), 'int', ['pointer']);
        var mutex = new SystemFunction(k.getExportByName('CreateMutexW'), 'pointer', ['pointer', 'int', 'pointer']);
        var key = new NativeFunction(u.getExportByName('GetAsyncKeyState'), 'int16', ['int']);
        var tick = new NativeFunction(k.getExportByName('GetTickCount64'), 'uint64', []);

        function alloc(n) {
            var v = Memory.alloc(n);
            v.writeByteArray(new Array(n).fill(0));
            return v;
        }
        var state = alloc(128),
            options = alloc(24),
            queue = alloc(128 * 24),
            active = alloc(4),
            original = alloc(8),
            cas = Memory.alloc(Process.pageSize),
            flags = alloc(Math.max(1, p.hotfixFlags.length) * 8);
        var performance = alloc(120),
            pending = alloc(128 * 24),
            selected = alloc(128 * 24),
            targetIds = alloc(p.targets.length * 4),
            targetKinds = alloc(p.targets.length * 4);
        var oculi = alloc(80),
            oculusIds = alloc(p.oculusIds.length * 4);
        oculusIds.writeByteArray(new Uint32Array(p.oculusIds).buffer);
        var ids = new Uint32Array(p.targets.length),
            kinds = new Uint32Array(p.targets.length);
        p.targets.forEach(function(t, i) {
            ids[i] = t.id;
            kinds[i] = t.kind;
        });
        targetIds.writeByteArray(ids.buffer);
        targetKinds.writeByteArray(kinds.buffer);
        if (!new NativeFunction(k.getExportByName('QueryPerformanceFrequency'), 'int', ['pointer'])(performance) || performance.readU64().toNumber() < 500) throw Error('Relogio de desempenho indisponivel.');
        // Default configuration
        var defaultConfig = {
            delayMs: 150,
            useCustomRange: true,
            range: 100,
            openChests: true,
            prioritizeOculi: false
        };
        options.writeU32(defaultConfig.delayMs);
        options.add(4).writeU32(defaultConfig.useCustomRange ? 1 : 0);
        options.add(8).writeFloat(defaultConfig.range);
        options.add(12).writeFloat(defaultConfig.range * defaultConfig.range);
        options.add(16).writeU32(defaultConfig.openChests ? 1 : 0);
        options.add(20).writeU32(defaultConfig.prioritizeOculi ? 1 : 0);
        p.hotfixFlags.forEach(function(r, i) {
            flags.add(i * 8).writePointer(base.add(r));
        });
        Memory.patchCode(cas, 48, function(at) {
            at.writeByteArray([0x44, 0x89, 0xc0, 0xf0, 0xf, 0xb1, 0x11, 0xc3,
                0x90, 0x90, 0x90, 0x90, 0x90, 0x90, 0x90, 0x90,
                0xb8, 1, 0, 0, 0, 0xf0, 0xf, 0xc1, 0x1, 0xff, 0xc0, 0xc3, 0x90, 0x90, 0x90, 0x90,
                0xb8, 0xff, 0xff, 0xff, 0xff, 0xf0, 0xf, 0xc1, 0x1, 0xff, 0xc8, 0xc3, 0x90, 0x90, 0x90, 0x90
            ]);
        });
        if (!Memory.protect(cas, Process.pageSize, 'r-x')) throw Error('Trava nativa indisponivel.');
        var hooks = [],
            module = null,
            timer = null,
            lease = null,
            replaced = false,
            stopping = false,
            disposed = false,
            cleanupPending = false,
            leaseConflict = false,
            cleanupReason = null,
            errors = [];
        var retained = [state, options, queue, active, original, cas, flags, performance, pending, selected, targetIds, targetKinds, oculi, oculusIds];
        var reasons = ['applied-or-idle', 'hotfix-active', 'pickup-callback-unavailable', 'scene-list-unavailable', 'player-unavailable', 'waiting-for-game-update', 'no-pickups-in-range', 'delay'];

        function report() {
            var before = state.add(4).readU32(),
                v = new DataView(state.readByteArray(128)),
                s = {};
            ['lock', 'sequence', 'enabled', 'inFlight', 'queued', 'requests', 'immediate', 'dropped', 'stale', 'rangeChecks', 'chestScans', 'chestQueued', 'reason', 'lastId', 'lastRequest', 'hasRequest', 'avatarId'].forEach(function(n, i) {
                s[n] = v.getUint32(i * 4, true);
            });
            ['sceneCalls', 'addCalls', 'selectorTicks', 'scanned', 'matched', 'localRejected'].forEach(function(n, i) {
                s[n] = v.getUint32(104 + i * 4, true);
            });
            s.reasonMeaning = reasons[s.reason] || 'unknown';
            s.customRangeActive = !!options.add(4).readU32();
            s.effectiveRange = s.customRangeActive ? options.add(8).readFloat() : 3.5;
            var perf = new DataView(performance.readByteArray(120));
            ['memoryQueries', 'scanPasses', 'lastPassUs', 'maxPassUs', 'budgetStops', 'uiOptionsSkipped', 'retriesSuppressed'].forEach(function(n, i) {
                s[n] = perf.getUint32(8 + i * 4, true);
            });
            ['memoryCacheHits', 'lastScanCandidates', 'chestsOutsideRange', 'chestsUnavailable', 'lastDiscoveryUs', 'maxDiscoveryUs', 'lastRequestUs', 'maxRequestUs'].forEach(function(n, i) {
                s[n] = perf.getUint32(40 + i * 4, true);
            });
            ['sceneEntitySlots', 'scanCycles', 'selectedPickupCallbacks', 'selectedPickupRequests', 'unknownFaunaSelections', 'expiredSelections', 'lastDispatchUs', 'maxDispatchUs', 'dispatchBudgetStops', 'lastPreludeUs', 'maxPreludeUs', 'selectionCursor'].forEach(function(n, i) {
                s[n] = perf.getUint32(72 + i * 4, true);
            });
            s.scanCursor = v.getUint32(76, true);
            s.scanCadenceMs = 16;
            s.scanCandidateLimit = 128;
            s.scanBudgetUs = 2000;
            var ov = new DataView(oculi.readByteArray(80));
            ['oculiScanCursor', 'oculiLastScanTick', 'oculiScanReady', 'oculiScanned', 'oculiMatched', 'oculiQueued', 'oculiRequests', 'oculiScanCycles', 'oculiBudgetStops', 'oculiLastScanUs', 'oculiMaxScanUs', 'oculiLastQueueMs', 'oculiMaxQueueMs', 'oculiUnavailable', 'oculiOutsideRange', 'oculiCycleBegan'].forEach(function(n, i) {
                s[n] = ov.getUint32(i * 4, true);
            });
            s.oculiLastCycleMs = ov.getUint32(72, true);
            s.oculiMaxCycleMs = ov.getUint32(76, true);
            s.oculiPriorityActive = !!options.add(20).readU32();
            s.oculiCandidateLimit = 512;
            s.oculiScanBudgetUs = 500;
            s.oculiScanCadenceMs = 16;
            return {
                version: 'autoloot-legacy-v2.5-7.2',
                mode: 'scene-dictionary-and-original-selected-pickups',
                enabled: !!s.enabled && !!active.readU32(),
                active: !!active.readU32(),
                disposed: disposed,
                stopping: stopping,
                cleanupPending: cleanupPending,
                cleanupReason: cleanupReason,
                leaseOwned: !!lease,
                leaseConflict: leaseConflict,
                hooksInstalled: hooks.length,
                replacementInstalled: replaced,
                stats: s,
                settings: {
                    delayMs: options.readU32(),
                    useCustomRange: !!options.add(4).readU32(),
                    range: options.add(8).readFloat(),
                    openChests: !!options.add(16).readU32(),
                    prioritizeOculi: !!options.add(20).readU32()
                },
                lastError: s.reason === 1 ? 'Hotfix ativo; AutoLoot suspenso.' : null,
                errors: errors.slice(),
                loadTimings: Object.assign({}, loadTimings),
                snapshotCoherent: !s.lock && !s.inFlight && !state.readU32() && !state.add(12).readU32() && before === s.sequence && before === state.add(4).readU32() && !(before & 1),
                source: 'old-scripts-unity/AutoLoot.cpp',
                resourcesRetained: retained.length + (module ? 1 : 0),
                inventoryReceiptConfirmed: false,
                evidenceMode: p.evidenceMode,
                faunaDiscovery: 'original-selector-observed-identity-only',
                fishingMinigameSupported: false,
                interpretation: 'Original ItemModule-equivalent requests. Optional oculi priority uses a separate 512-slot/16ms discovery pass with a 0.5ms budget checked every eight slots. Known eligible oculi precede chests/items and bypass the ordinary pickup delay; range, live identity and native availability are still required. Other discovery keeps its 128-slot/2ms budget. Queue latency starts when discovered, not when spawned. Oculi scan-cycle time measures discovery coverage; requests and disappearance do not confirm inventory receipts or a server deadline.'
            };
        }
        diagnosticReport = report;

        function save() {
            var r = report();
            writeJson(ROOT + '/autoloot-legacy-report.json', r);
            console.log(PREFIX + 'RESULT ' + JSON.stringify(r.stats));
            return r;
        }

        function busy() {
            var e = Error('AutoLoot ocupado. Tente novamente apos a chamada atual.');
            e.controlBusy = true;
            e.retainModule = true;
            return e;
        }

        function setEnabled(value) {
            if (typeof value !== 'boolean') throw Error('enabled deve ser boolean.');
            if (stopping || disposed) {
                if (!value) return report();
                throw Error('Instancia encerrada.');
            }
            if (!new NativeFunction(module.set_enabled, 'uint32', ['uint32'])(value ? 1 : 0)) throw busy();
            console.log(PREFIX + 'V2.5 / 7.2 ' + (value ? 'ON' : 'OFF'));
            diagnostic(value ? 'enabled' : 'disabled');
            if (debug) lastDiagnostic = tick().toNumber() >>> 0;
            return report();
        }

        function configure(value) {
            if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('Configuracao invalida.');
            var s = report().settings;
            Object.keys(value).forEach(function(n) {
                if (!(n in s)) throw Error('Opcao AutoLoot desconhecida.');
                s[n] = value[n];
            });
            if (!Number.isInteger(s.delayMs) || s.delayMs < 0 || s.delayMs > 5000 || typeof s.useCustomRange !== 'boolean' || typeof s.openChests !== 'boolean' || typeof s.prioritizeOculi !== 'boolean' || !Number.isFinite(s.range) || s.range < 0.5 || s.range > 60 || stopping || disposed) throw Error('Use delayMs 0..5000, range 0.5..60 e opcoes boolean.');
            var raw = new DataView(new ArrayBuffer(8));
            raw.setFloat32(0, s.range, true);
            raw.setFloat32(4, s.range * s.range, true);
            if (!new NativeFunction(module.configure, 'uint32', ['uint32', 'uint32', 'uint32', 'uint32', 'uint32', 'uint32'])(s.delayMs, s.useCustomRange ? 1 : 0, raw.getUint32(0, true), raw.getUint32(4, true), s.openChests ? 1 : 0, s.prioritizeOculi ? 1 : 0)) throw busy();
            if (debug) console.log(PREFIX + 'CONFIG delay=' + s.delayMs + 'ms alcance=' + (s.useCustomRange ? s.range : 3.5) + 'm personalizado=' + (s.useCustomRange ? 'ON' : 'OFF') + ' baus=' + (s.openChests ? 'ON' : 'OFF') + ' prioridadeOculi=' + (s.prioritizeOculi ? 'ON' : 'OFF'));
            return report();
        }

        function rememberError(e) {
            if (errors.length < 32) errors.push(String(e));
        }

        function retryStop() {
            if (timer === null) timer = setInterval(function() {
                try {
                    stop();
                } catch (e) {
                    rememberError(e);
                }
            }, 100);
        }

        function stop() {
            if (disposed) return report();
            active.writeU32(0);
            state.add(8).writeU32(0);
            stopping = true;
            cleanupPending = true;
            cleanupReason = 'native-calls-in-flight';
            if (state.add(12).readU32()) {
                // A failed final attach may occur before the ordinary timer exists. Keep
                // this closure and native allocations alive until earlier calls return.
                retryStop();
                return report();
            }
            var pending = [],
                flushed = false;
            hooks.forEach(function(h) {
                try {
                    h.detach();
                } catch (e) {
                    pending.push(h);
                    rememberError(e);
                }
            });
            hooks = pending;
            if (replaced) {
                try {
                    Interceptor.revert(base.add(expected.add));
                    replaced = false;
                } catch (e) {
                    rememberError(e);
                }
            }
            try {
                Interceptor.flush();
                flushed = true;
            } catch (e) {
                rememberError(e);
            }
            // A callback may have entered after the first zero check, before the hooks
            // were removed. Its CModule/trampoline and lease stay alive through return.
            if (flushed && state.add(12).readU32()) {
                cleanupReason = 'native-calls-in-flight';
                retryStop();
                diagnostic('stopping');
                return report();
            }
            cleanupReason = hooks.length ? 'hook-detach-pending' : replaced ? 'replacement-revert-pending' : !flushed ? 'interceptor-flush-pending' : 'lease-close-pending';
            if (!hooks.length && !replaced && flushed) {
                if (lease) {
                    try {
                        if (!close(lease.value)) throw Error('Falha ao fechar a trava AutoLoot.');
                        lease = null;
                    } catch (e) {
                        rememberError(e);
                    }
                }
                if (!lease) {
                    cleanupPending = false;
                    cleanupReason = null;
                    disposed = true;
                    if (timer !== null) {
                        clearInterval(timer);
                        timer = null;
                    }
                }
            }
            if (cleanupPending) retryStop();
            diagnostic(cleanupPending ? 'stopping' : 'stopped');
            return managed || cleanupPending ? report() : save();
        }
        // Publish lifecycle APIs before the first replacement/attachment. The menu
        // retains partial module exports when loading throws, including native code.
        send(PREFIX + 'Exportando RPC...');
        rpc.exports = {
            getreport: report,
            setenabled: setEnabled,
            configure: configure,
            save: save,
            diagnostic: function() {
                return diagnostic('manual', null, true);
            },
            stop: stop,
            dispose: stop
        };
        send(PREFIX + 'RPC exportado com sucesso!');
        lease = mutex(ptr(0), 0, Memory.allocUtf16String('Local\\AutoLootLegacy-' + Process.id));
        if (lease.value.isNull()) {
            lease = null;
            throw Error('Trava AutoLoot indisponivel.');
        }
        if (lease.lastError === 183) {
            close(lease.value);
            lease = null;
            leaseConflict = true;
            throw Error('AutoLoot Legacy ja carregado. Trava pertence a outra instancia ou a uma retirada anterior ainda pendente.');
        }
        // Script unload removes Gum hooks, but does not close Win32 handles for us.
        Script.bindWeak(lease, function() {
            if (lease) {
                close(lease.value);
                lease = null;
            }
        });
        try {
            // Keep the catalog in retained buffers: no thousands of C initializer tokens
            // to parse during the menu's first synchronous module load.
            var source = '#define TARGET_COUNT ' + p.targets.length + '\n#define OCULUS_COUNT ' + p.oculusIds.length + '\n#define HOTFIX_COUNT ' + p.hotfixFlags.length + '\n#define QUEUE_SIZE 128\n' + File.readAllText(ROOT + '/autoloot-legacy.c');
            var compileStarted = Date.now();
            module = new CModule(source, {
                loot_state: state,
                options: options,
                queue: queue,
                performance: performance,
                oculi_diagnostics: oculi,
                oculus_ids: oculusIds,
                pending: pending,
                selected: selected,
                target_ids: targetIds,
                target_kinds: targetKinds,
                active_flag: active,
                original_add: original,
                root_slot: base.add(0x586b480),
                pickup_method_slot: base.add(p.pickupMethodSlot),
                count_interface_slot: base.add(p.countInterfaceSlot),
                item_interface_slot: base.add(p.itemInterfaceSlot),
                hotfix_ptrs: flags,
                compare_exchange: cas,
                virtual_query: k.getExportByName('VirtualQuery'),
                tick_ms: k.getExportByName('GetTickCount64'),
                performance_counter: k.getExportByName('QueryPerformanceCounter'),
                increment: cas.add(16),
                decrement: cas.add(32),
                get_entity: base.add(expected.lookup),
                scene_lookup: base.add(expected.sceneLookup),
                get_current: base.add(expected.current),
                is_host: base.add(expected.host),
                eligible: base.add(expected.eligible),
                eligible_coop: base.add(expected.eligibleCoop)
            });
            loadTimings.compileMs = Date.now() - compileStarted;
            var installStarted = Date.now();
            if (new NativeFunction(module.state_size, 'uint32', [])() !== 128 || new NativeFunction(module.item_size, 'uint32', [])() !== 24 ||
                new NativeFunction(module.performance_size, 'uint32', [])() !== 120 || new NativeFunction(module.pending_size, 'uint32', [])() !== 24 ||
                new NativeFunction(module.options_size, 'uint32', [])() !== 24 || new NativeFunction(module.oculi_size, 'uint32', [])() !== 80) throw Error('ABI AutoLoot divergente.');
            original.writePointer(Interceptor.replaceFast(base.add(expected.add), module.add_replace));
            replaced = true;
            [expected.inside, expected.outside].forEach(function(r) {
                hooks.push(Interceptor.attach(base.add(r), {
                    onEnter: module.range_enter,
                    onLeave: module.range_leave
                }));
            });
            hooks.push(Interceptor.attach(base.add(expected.tick), {
                onEnter: module.tick_enter,
                onLeave: module.tick_leave
            }));
            Interceptor.flush();
            active.writeU32(1);
            hooks.push(Interceptor.attach(base.add(expected.sceneInterfaces), {
                onEnter: module.scene_enter,
                onLeave: module.scene_leave
            }));
            Interceptor.flush();
            loadTimings.installMs = Date.now() - installStarted;
            loadTimings.totalLoadMs = Date.now() - loadStarted;
            stage = 'ready';
            diagnostic(stage);
            // Auto-enable by default
            setEnabled(true);
            var ready = false,
                prevToggle = true,
                prevStop = true,
                lastTimerError = null;
            timer = setInterval(function() {
                try {
                    if (stopping) {
                        stop();
                        return;
                    }
                    if (debug && state.add(8).readU32()) {
                        var current = tick().toNumber() >>> 0;
                        if (((current - lastDiagnostic) >>> 0) >= 10000) {
                            var sample = diagnostic('running');
                            if (sample) {
                                lastDiagnostic = current;
                                var s = sample.stats,
                                    signature = [s.requests, s.queued, s.reasonMeaning, s.effectiveRange].join('|');
                                if (signature !== lastSummary) {
                                    lastSummary = signature;
                                    console.log(PREFIX + 'V2.5 / 7.2 pedidos=' + s.requests + ' fila=' + s.queued + ' oculi=' + s.oculiRequests + ' fauna=' + s.selectedPickupRequests + ' baus=' + s.chestQueued + ' alcance=' + s.effectiveRange + 'm ' + s.reasonMeaning + ' busca=' + s.lastDiscoveryUs + 'us/' + s.lastScanCandidates + ' objetos cicloOculi=' + s.oculiLastCycleMs + 'ms preambulo=' + s.lastPreludeUs + 'us coleta=' + s.lastRequestUs + 'us');
                                }
                            }
                        }
                    }
                    if (managed) return;
                    var down = (key(0x65) & 0x8000) !== 0,
                        end = (key(0x66) & 0x8000) !== 0;
                    if (!ready) {
                        if (!down && !end) ready = true;
                    } else {
                        if (end && !prevStop) {
                            stop();
                            return;
                        }
                        if (down && !prevToggle) setEnabled(!report().enabled);
                    }
                    prevToggle = down;
                    prevStop = end;
                } catch (e) {
                    if (errors.length < 32) errors.push(String(e));
                    if (lastTimerError !== String(e)) {
                        lastTimerError = String(e);
                        console.log(PREFIX + lastTimerError);
                    }
                }
            }, 100);
            console.log(PREFIX + 'V2.5 / 7.2 ' + (managed ? 'PRONTO, OFF. Controle pelo menu.' : 'PRONTO, OFF. NUMPAD 5 liga/desliga; NUMPAD 6 encerra/salva. Delay 150 ms; alcance original; baus OFF.') + ' Carga=' + loadTimings.totalLoadMs + 'ms.');
        } catch (e) {
            errors.push(String(e));
            stop();
            throw e;
        }
    } catch (e) {
        console.log(PREFIX + 'V2.5 / 7.2 FALHA em ' + stage + ': ' + e);
        diagnostic('failed', stage + ': ' + e);
        throw e;
    }
}());
