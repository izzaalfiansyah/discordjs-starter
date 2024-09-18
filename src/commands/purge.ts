import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { defineCommand } from "../utils/define-command";

export default defineCommand({
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Delete messages in bulk")
    .addIntegerOption((opt) =>
      opt.setName("count").setDescription("Count of messages want to deleted")
    ),
  execute: async (interaction) => {
    await interaction.deferReply({ ephemeral: true });

    const { options, channel } = interaction;

    // const sub = (options as any).getSubCommand();
    const count = (options as any).getInteger("count");

    // if (sub == "any") {
    const messages = await (channel as any).bulkDelete(count);
    const text = messages.size > 1 ? "messages" : "message";

    const embed = new EmbedBuilder();

    if (messages.size > 0) {
      embed
        .setColor("Green")
        .setDescription(`found and purged ${messages.size} ${text}`);
    } else {
      embed.setColor("Red").setDescription("unable to find any messages.");
    }

    return await interaction.editReply({ embeds: [embed] });
    // }
  },
});
