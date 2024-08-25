import { Interaction } from "discord.js";

export const defineEvent = <T = Interaction>(events: {
  name: string;
  once?: boolean;
  execute: (interaction: T) => void;
}) => events;
