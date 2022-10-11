if (args[0].tag === "OnUse") {
    const casterToken = await fromUuid(args[0].tokenUuid);
    const caster = casterToken.actor;
    console.log("casterToken")
    console.log(casterToken)

    let dialog = new Promise((resolve, reject) => {
        new Dialog({
            title: 'Choose a totem: ',
            content: `
                    <form class="flexcol">
                        <div class="form-group">
                        <select id="element">
                            <option value="bear">Bear Totem</option>
                            <option value="hawk">Hawk Totem</option>
                            <option value="unicorn">Unicorn Totem</option>
                        </select>
                        </div>
                    </form>
                    `,
            //select element type
            buttons: {
                yes: {
                    icon: '<i class="fas fa-bolt"></i>',
                    label: 'Select',
                    callback: async (html) => {
                        let element = html.find('#element').val();
                        let totemActor;

                        if (element === "bear") {
                            totemActor = game.actors.getName("Bear Totem Actor");

                            const summoned = await warpgate.spawn(totemActor.name, {}, {}, {});
                            if (summoned.length !== 1) return;

                            let allies = MidiQOL.findNearby(1, canvas.tokens.get(summoned[0]), 10, null)

                            for (const ally of allies) {
                                await ally.actor.update({ "data.attributes.hp.temp": 5 + args[0].rollData.classes.druid.levels })
                            }

                            const summonedUuid = `Scene.${canvas.scene.id}.Token.${summoned[0]}`;
                            await caster.createEmbeddedDocuments("ActiveEffect", [{
                                "changes": [{ "key": "flags.dae.deleteUuid", "mode": 5, "value": summonedUuid, "priority": "30" }],
                                "label": "Totem Summon",
                                "duration": { seconds: 60, rounds: 10 },
                                "origin": args[0].itemUuid,
                                "icon": "icons/magic/fire/orb-vortex.webp",
                            }]);

                            resolve();
                        } else if (element === "hawk") {
                            totemActor = game.actors.getName("Hawk Totem Actor");

                            const summoned = await warpgate.spawn(totemActor.name, {}, {}, {});
                            if (summoned.length !== 1) return;

                            console.log("totemActor")
                            console.log(totemActor)
                            console.log("game.userId")
                            console.log(game.userId)

                        } else if (element === "unicorn") {
                            totemActor = game.actors.getName("Unicorn Totem Actor");
                            await caster.createEmbeddedDocuments("ActiveEffect", [{
                                "changes": [
                                    {
                                        "key": "flags.midi-qol.onUseMacroName",
                                        "mode": 0,
                                        "value": "BuffedHealingTotem,all",
                                        "priority": "30"
                                    }],
                                "label": "Unicorn Totem Healing Buff",
                                "duration": { seconds: 60, rounds: 10 },
                                "origin": "no source",
                                "icon": "icons/magic/fire/orb-vortex.webp",
                            }]);

                            const summoned = await warpgate.spawn(totemActor.name, {}, {}, {});
                            if (summoned.length !== 1) return;

                            const summonedUuid = `Scene.${canvas.scene.id}.Token.${summoned[0]}`;
                            await caster.createEmbeddedDocuments("ActiveEffect", [{
                                "changes": [{ "key": "flags.dae.deleteUuid", "mode": 5, "value": summonedUuid, "priority": "30" }],
                                "label": "Totem Summon",
                                "duration": { seconds: 60, rounds: 10 },
                                "origin": args[0].itemUuid,
                                "icon": "icons/magic/fire/orb-vortex.webp",
                            }]);

                            resolve();
                        }
                    },
                },
            }
        }).render(true);
    })
    await dialog;

}

function x() {
    if(true) {
        let a = "a"
        if(true){

        }
    }
    console.log(a);
}