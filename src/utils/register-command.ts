import { REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";
import terminal from "./terminal";

const pushCommand = (props: { files: string[]; path: string }) => {
  for (const file of props.files) {
    const filePath = path.join(props.path, file);
    const command = require(filePath).default;

    try {
      commands.push(command.data.toJSON());
    } catch (e: any) {
      terminal.error(e);
    }
  }
};

const commands: any[] = [];

const commandPath = path.join(__dirname, "../commands");
const commandFolders = fs
  .readdirSync(commandPath)
  .filter((file) => !file.endsWith(".ts"));

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

const commandFiles = fs
  .readdirSync(commandPath)
  .filter((file) => file.endsWith(".ts"));

pushCommand({
  files: commandFiles,
  path: commandPath,
});

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.BOT_TOKEN as string);

// and deploy your commands!
(async () => {
  try {
    terminal.success(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data: any = await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID as string,
        process.env.GUILD_ID as string
      ),
      { body: commands }
    );

    terminal.success(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
