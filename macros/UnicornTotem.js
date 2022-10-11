console.log(args)
if (args[0]["itemData"]["type"] === "spell" && args[0]["itemData"]["data"]["actionType"] === "heal") {
    let totemToken = game.actors.getName("Unicorn Totem Actor").getActiveTokens()[0];
    let tokensAroundTotem = MidiQOL.findNearby(null, totemToken, 30, null)

    let checkboxes = "";

    for (const token of tokensAroundTotem) {
        let name = game.actors.get(token.data.actorId).name
        checkboxes += `<label></label><input checked class="x" type="checkbox" value="${token.data.actorId}">${name}</label>`
    }

    let dialog = new Promise((resolve, reject) => {
        new Dialog({
            title: 'Free healing: ',
            content: `
                <form class="flexcol">
                    <div class="form-group">
                    ${checkboxes}
                    </div>
                </form>
                `,
            buttons: {
                yes: {
                    icon: '<i class="fas fa-bolt"></i>',
                    label: 'Select',
                    callback: async (html) => {
                        let elements = html.find('.x');
                        for (const checbox of elements) {
                            if (checbox.checked) {
                                let actor = game.actors.get(checbox.value)
                                let newHp = actor.data.data.attributes.hp.value + args[0].rollData.classes.druid.levels
                                let maxHp = actor.data.data.attributes.hp.max
                                if (newHp >= maxHp) {
                                    await actor.update({ "data.attributes.hp.value": maxhHp })
                                } else {
                                    await actor.update({ "data.attributes.hp.value": newHp })
                                }

                            }
                        }
                    }
                },
            },
        }
        ).render(true);
    })
    await dialog;
}