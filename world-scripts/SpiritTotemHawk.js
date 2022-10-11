/* 
Hawk Spirit

The hawk spirit is a consummate hunter, aiding you and your allies with its keen sight.

When a creature makes an attack roll against a target in the spirit's aura, 
you can use your reaction to grant advantage to that attack roll. In addition, 
you and your allies have advantage on Wisdom (Perception) checks while in the aura.
*/

Hooks.on("midi-qol.preAttackRoll", async (workflow) => {
    console.log("workflow")
    console.log(workflow)

    let totemActor = game.actors.getName("Hawk Totem Actor");

    let totemActiveTokens = totemActor.getActiveTokens();
    let userOfTotem = totemActor.data.flags.warpgate.control.user;

    console.log("totemActiveTokens")
    console.log(totemActiveTokens)

    console.log('game.actors.getName("Hawk Totem Actor")')
    console.log(game.actors.getName("Hawk Totem Actor").data.flags.warpgate.control.user)

    if (totemActiveTokens.length > 0 && game.userId === userOfTotem) {
        let totemActiveToken = totemActiveTokens[0]

        let tokensAroundTotem = MidiQOL.findNearby(null, totemActiveToken, 30, null)

        let tokenIdsAroundTotem = tokensAroundTotem.map(token => token.data._id)
        let tokenIdsTargeted = Array.from(workflow.targets).map(token => token.data._id)

        let filtered = tokenIdsAroundTotem.filter(value => tokenIdsTargeted.includes(value));

        if(filtered.length > 0) {
            await displayReaction(workflow)
        }
    }
});

async function displayReaction(workflow) {
    let dialog = new Promise((resolve, reject) => {
        new Dialog({
            title: "Hawk Totem Passive",
            content: `Do you want to grant attack roll advantage to ${workflow.actor.name}? (Cost: 1 Reaction)`,
            buttons: {
                yes: {
                    icon: '<i class="fas fa-bolt"></i>',
                    label: 'Select',
                    callback: async () => {
                        workflow.advantage = true;
                        resolve(this);
                    }
                },
            },
        }
        ).render(true);
    })
    await dialog;
}


// Los hooks de MIDI corren en cada cliente por lo que hay que mostrar el dialogo si el game.userId es el mismo del tío que invoco el totem 
// https://discord.com/channels/170995199584108546/1010273821401555087/1024804126686720003

// data.flags.warpgate.control.user