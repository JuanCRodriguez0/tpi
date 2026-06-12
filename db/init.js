import "../models/index.js";
import { connectDatabase } from "./config.js";
import { userSeeder } from "./seed.js";

try {
    await connectDatabase();
    await userSeeder();
    process.exit(0);
} catch (error) {
    console.error(error);
    process.exit(1);
}