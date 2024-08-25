import { Client, CommandInteraction, Interaction } from "discord.js";

export const defineCommand = (commands: {
  data: any;
  execute: (
    interaction: CommandInteraction & Interaction,
    client: Client<true>
  ) => void;
}) => commands;
