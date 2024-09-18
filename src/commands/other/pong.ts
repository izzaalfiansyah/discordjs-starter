import { Colors, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { defineCommand } from "../../utils/define-command";

export default defineCommand({
  data: new SlashCommandBuilder()
    .setName("pong")
    .setDescription("🏓 Send a pong request"),
  execute: async (interaction) => {
    const startTimestamp = Date.now();
    const client = interaction.client;
    const ws = client.ws.ping;

    const msgEdit = Date.now() - startTimestamp;

    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;

    const embed = new EmbedBuilder()
      .setColor(Colors.Default)
      .setTitle("🏓 PONG / LATENCY 🏓")
      .setThumbnail(client.user.displayAvatarURL())
      .addFields(
        { name: "Websocket", value: `\`${ws}ms\``, inline: true },
        { name: "API Latency", value: `\`${msgEdit}ms\``, inline: true },
        {
          name: `${client.user.username} Uptime`,
          value: `\`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds.\``,
        }
      )
      .setFooter({
        text: "Issues on discords side could create weird or high latency.",
      });

    await interaction.reply({ embeds: [embed] });
  },
});
