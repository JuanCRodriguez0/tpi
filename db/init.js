import "../models/index.js";
import { connectDatabase } from "./config.js";

try {
    await connectDatabase();
    process.exit(0);
} catch (error) {
    console.error(error);
    process.exit(1);
}