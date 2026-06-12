import "../models/index.js";
import { connectDatabase } from "./config.js";
import { userSeeder } from "../seed/seed.js";

try {
    await connectDatabase();

    await userSeeder();
    console.log("Seed executed successfully");
    process.exit(0);
} catch (error) {
    console.error(error);
    process.exit(1);
}