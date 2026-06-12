import bcrypt from "bcrypt";
import { User } from "../models/index.js";

export async function userSeeder() {

    const passwordHash = await bcrypt.hash("test123", 10);

    const usuarios = [
        {
            userName: "JuanCruz",
            email: "juan@test.com",
            name: "Juan Cruz",
            lastName: "Rodriguez",

        },
        {
            userName: "Agus",
            email: "agus@test.com",
            name: "Agustin",
            lastName: "Mazza",

        },
        {
            userName: "Jeremias",
            email: "jeremias@test.com",
            name: "Jeremias",
            lastName: "Hoyo",
        },
        {
            userName: "Test",
            email: "test@test.com",
            name: "testName",
            lastName: "testLastName",
        },
    ];

    for (const usuario of usuarios) {

        const [user, created] = await User.findOrCreate({
            where: {
                email: usuario.email,
            },
            defaults: {
                ...usuario,
                passwordHash
            },
        });

        if (created) {
            console.log(`Usuario ${user.userName} creado`);
        } else {
            console.log(`Usuario ${user.userName} ya existía`);
        }
    }
}