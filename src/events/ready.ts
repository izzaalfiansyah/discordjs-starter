import { Client, Events, Interaction } from "discord.js";
import terminal from "../utils/terminal";
import { defineEvent } from "../utils/define-event";

export default defineEvent<Client<true>>({
  name: Events.ClientReady,
  once: true,
  execute: async (client) => {
    terminal.info(`Ready! Logged in as ${client.user.tag}`);
  },
});
