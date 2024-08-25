import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { defineCommand } from "../../utils/define-command";

export default defineCommand({
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  execute: async (interaction) => {
    return interaction.reply("Ping Pong!");
  },
});
