import { Client } from "discord.js";
import fs from "fs";
import path from "path";
import terminal from "./terminal";

const eventPath = path.join(__dirname, "../events");
const eventFiles = fs
  .readdirSync(eventPath)
  .filter((file) => file.endsWith(".ts"));

export const handleEvents = (client: Client<boolean>) => {
  for (const file of eventFiles) {
    const filePath = path.join(eventPath, file);
    const event = require(filePath).default;

    try {
      if (event.once) {
        client.once(event.name, (...arg) => event.execute(...arg));
      } else {
        client.on(event.name, (...arg) => event.execute(...arg));
      }
    } catch (e: any) {
      terminal.error(e);
    }
  }
};
