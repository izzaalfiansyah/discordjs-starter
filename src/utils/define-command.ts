import { Client, CommandInteraction } from "discord.js";

export const defineCommand = (commands: {
  data: any;
  execute: (interaction: CommandInteraction, client: Client<boolean>) => void;
}) => commands;
