import { Client } from "discord.js";
import fs from "fs";
import path from "path";
import terminal from "./terminal";

const eventPath = path.join(__dirname, "../events");
const eventFolders = fs
  .readdirSync(eventPath)
  .filter((file) => !file.endsWith(".ts"));
const eventFiles = fs
  .readdirSync(eventPath)
  .filter((file) => file.endsWith(".ts"));

export const handleEvents = (client: Client<boolean>) => {
  const pushEvent = (props: { files: string[]; path: string }) => {
    for (const file of props.files) {
      const filePath = path.join(props.path, file);
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

  pushEvent({
    files: eventFiles,
    path: eventPath,
  });

  for (const folder of eventFolders) {
    const folderPath = path.join(eventPath, folder);
    const eventFiles = fs
      .readdirSync(folderPath)
      .filter((file) => file.endsWith(".ts"));

    pushEvent({
      path: folderPath,
      files: eventFiles,
    });
  }
};
