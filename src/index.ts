import { og } from "open-godfather"

og.events.on("playerConnect", (player) => {
    player.spawn(new og.Vector3(0, 0, 3))
    player.sendMessage("Hello from Open Godfather!")
})