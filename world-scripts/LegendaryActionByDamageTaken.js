import Token5e from "../dependencies/dnd5e/module/canvas/token.mjs";

Hooks.on("midi-qol.damageApplied", async (x) => {
    x = new Token5e(x);
    
    console.log("Hola Angeles!!");
    console.log()
    if (x.data.name !== "SemiEntidad (Baram)") return;
    
    x.actor.update({'data.resources.legact.value': x.actor.data.data.resources.legact.value + 1})
    console.log(x.data.actorData.data.resources.legact);
    console.log();
})
