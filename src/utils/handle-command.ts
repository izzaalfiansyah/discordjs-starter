import { Client } from "discord.js";
import fs from "fs";
import path from "path";
import terminal from "../utils/terminal";

const commandPath = path.join(__dirname, "../commands");
const commandFiles = fs
  .readdirSync(commandPath)
  .filter((file) => file.endsWith(".ts"));

export const handleCommands = (client: Client<boolean>) => {
  for (const file of commandFiles) {
    const filePath = path.join(commandPath, file);
    const command = require(filePath).default;

    try {
      (client as any).commands.set(command.data.name, command);
    } catch (e: any) {
      terminal.error(e);
    }
  }
};
