/*
** This is just an example script, you can delete everything below.
*/

import { WeaponSkillsEnum, WeaponsEnum, og } from "open-godfather"

og.events.on("init", () => {
    og.server.hour = 21
})

og.events.on("playerConnect", async (player) => {
    const SPAWNS = [
        { position: new og.Vector3(2481.1885, -1536.7186, 24.1467), rotation: 273.4944 }, // Los Santos
        { position: new og.Vector3(2087.9902, 1516.5336, 10.8203), rotation: 48.93 }, // Las Venturas
        { position: new og.Vector3(-2287.5027, 149.1875, 35.3125), rotation: 266.3989 }, // San Fiero
    ]
    
    try {
        const response = await player.dialog.show.list("Wanna spawn?", ["Los Santos", "Las Venturas", "San Fiero"], "Select", "Leave")
    
        if (!response.action) {
            // Player clicked on "Leave"
            player.kick()
            return
        }
    
        player.spawn(SPAWNS[response.item].position, SPAWNS[response.item].rotation)
    
        player.skin = 211
        player.cash = 450
    
        player.weapons.add(WeaponsEnum.Colt45, 99999)
        player.weapons.setSkill(WeaponSkillsEnum.Colt45, 1)
    
        player.sendMessage("Welcome to Open Godfather! Type /vx to spawn a vehicle.", "a069c7")
    } catch (error) {
        // Player disconnected or a new dialog popped up
    }
})

og.commands.add("/vx", [], (player, modelParam) => {
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
