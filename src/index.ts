/*
** This is just an example script, you can delete everything below.
*/

import { WeaponsEnum, og } from "open-godfather"

og.events.on("playerConnect", async (player) => {
    const response = await player.dialog.show.list("Wanna spawn?", ["Los Santos", "Las Venturas", "San Fiero"], "Select", "Leave")

    if (!response) {
        // Player disconnected or a new dialog popped up
        return
    }

    if (!response.action) {
        // Player clicked on "Leave"
        player.kick()
        return
    }

    const SPAWNS = [
        new og.Vector3(2481.1885, -1536.7186, 24.1467), // Los Santos
        new og.Vector3(2087.9902, 1516.5336, 10.8203), // Las Venturas
        new og.Vector3(-2417.6458, 970.1491, 45.2969), // San Fiero
    ]

    player.spawn(SPAWNS[response.item])

    player.cash = 450
    player.weapons.add(WeaponsEnum.Colt45, 9999)

    player.sendMessage("Welcome to Open Godfather! Type /vx to spawn a vehicle.")
})

og.commands.add("/vx", ["/v", "/veh", "/vehicle"], (player, modelParam) => {
    if (!modelParam) {
        player.sendMessage("Usage: /vx [model ID]")
        return
    }

    const modelId = parseInt(modelParam)

    if (isNaN(modelId)) {
        player.sendMessage("Invalid vehicle model ID.")
        return
    }

    const vehicle = og.vehicles.new(modelId, player.position, player.rotation)

    if (!vehicle) {
        // It probably reached the SA-MP vehicle limit
        player.sendMessage("Something went wrong.")
        return
    }

    player.putIntoVehicle(vehicle)

    vehicle.params.engine = "on"
    vehicle.params.lights = "on"
})