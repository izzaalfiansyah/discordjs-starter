import { CommandInteraction } from "discord.js";

export const defineCommand = <T = CommandInteraction>(commands: {
  data: any;
  execute: (interaction: T) => void;
}) => commands;
