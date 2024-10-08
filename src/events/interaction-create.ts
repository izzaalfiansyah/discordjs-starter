import { Client, EmbedBuilder, Events, Interaction } from "discord.js";
import terminal from "../utils/terminal";
import { defineEvent } from "../utils/define-event";

export default defineEvent({
  name: Events.InteractionCreate,
  execute: async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    terminal.info(`Make a /${interaction.commandName} command`);

    const command = (interaction.client as any).commands.get(
      interaction.commandName
    );

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    if (command.developer) {
      const userId = interaction.user.id;
      const isDeveloper = userId == process.env.developerID;

      if (!isDeveloper) {
        const embed = new EmbedBuilder()
          .setColor("Red")
          .setDescription("Perintah ini hanya dapat digunakan oleh developer");

        return interaction.reply({ embeds: [embed], ephemeral: true });
      }
    }

    try {
      await command.execute(interaction);
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
  },
});
