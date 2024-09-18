import { Client } from "discord.js";
import fs from "fs";
import path from "path";
import terminal from "../utils/terminal";

const commandPath = path.join(__dirname, "../commands");
const commandFolders = fs
  .readdirSync(commandPath)
  .filter((file) => !file.endsWith(".ts"));
const commandFiles = fs
  .readdirSync(commandPath)
  .filter((file) => file.endsWith(".ts"));

export const handleCommands = (client: Client<boolean>) => {
  const pushCommand = (props: { files: string[]; path: string }) => {
    for (const file of props.files) {
      const filePath = path.join(props.path, file);
      const command = require(filePath).default;

      try {
        (client as any).commands.set(command.data.name, command);
      } catch (e: any) {
        terminal.error(e);
      }
    }
  };

  pushCommand({
    path: commandPath,
    files: commandFiles,
  });

  for (const folder of commandFolders) {
    const folderPath = path.join(commandPath, folder);
    const commandFiles = fs
      .readdirSync(folderPath)
      .filter((file) => file.endsWith(".ts"));

    pushCommand({
      path: folderPath,
      files: commandFiles,
    });
  }
};
