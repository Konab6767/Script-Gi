/**
 * Genshin Impact - Centralized Offsets
 * Copy this Offsets object into your scripts or use as reference
 * Update this file when game updates, then copy to other scripts
 */

var moduleBase = Process.enumerateModules()[0].base;

var Offsets = {
    base: moduleBase,
    
    Camera: {
        getMain: 0x17d51230,
    },
    
    Transform: {
        getTransform: 0x17d61570,
        getPosition: 0x17d5b010,
        setPosition: 0x17d5b1d0,
        getGameObject: 0x17d61640,
        getForward: 0x17d5ae60,        // Transform.get_forward()
    },
    
    Avatar: {
        getAvatarPos: 0x122fb1f0,
        setAvatarPos: 0x12319910,
        getAvatarForward: 0x1230ba50,
        getAvatarEntity: 0x12319ee0,
        avatarIsHost: 0x1155d610,
    },
    
    Damage: {
        calculateDamage: 0xbe88790,
        showOneDamageText: 0xdf70500,
        showDamageText: 0xdf71020,
    },
    
    GodMode: {
        checkTargetAttackable: 0x11591c50,
        getRuntimeID: 0xacf40,
        setRuntimeID: 0xa849b00,
    },
    
    Physics: {
        getVelocity: 0x17d2cac0,
        setVelocity: 0x17dab440,
        prePhysicsUpdate: 0xa7af220,
        postPhysicsUpdate: 0xa7af7b0,
    },
    
    GameObject: {
        getName: 0x17d3fa60,
    },
    
    getAddress: function(offset) {
        return this.base.add(offset);
    },
    
    createFunction: function(offset, retType, argTypes) {
        return new NativeFunction(this.getAddress(offset), retType, argTypes);
    }
};

send("[Offsets] Module base: " + moduleBase);
send("[Offsets] Offsets object ready!");
send("===========================================");
send("USAGE: Copy the 'Offsets' object definition");
send("from this file into your script file.");
send("Update offsets HERE, then copy to scripts.");
send("===========================================");
