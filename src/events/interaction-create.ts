import { Client, Interaction } from "discord.js";
import terminal from "../utils/terminal";

export const onInteractionCreate = async (
  interaction: Interaction,
  client: Client<true>
) => {
  if (!interaction.isChatInputCommand()) return;

  terminal.info(`Make a /${interaction.commandName} command`);

  const command = (interaction.client as any).commands.get(
    interaction.commandName
  );

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
};
