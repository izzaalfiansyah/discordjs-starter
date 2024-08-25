import { Client } from "discord.js";
import terminal from "../utils/terminal";

export const onReady = (client: Client<true>) => {
  terminal.info(`Ready! Logged in as ${client.user.tag}`);
};
