import { REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";
import terminal from "./terminal";

const commands: any[] = [];

const commandPath = path.join(__dirname, "../commands");
const commandFiles = fs
  .readdirSync(commandPath)
  .filter((file) => file.endsWith(".ts"));

for (const file of commandFiles) {
  const filePath = path.join(commandPath, file);
  const command = require(filePath).default;

  try {
    commands.push(command.data.toJSON());
  } catch (e: any) {
    terminal.error(e);
  }
}

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
