import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import { handleCommands } from "../utils/handle-command";
import "../utils/register-command";
import { handleEvents } from "../utils/handle-event";

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
  ],
});

(client as any).commands = new Collection();

handleCommands(client);
handleEvents(client);

client.login(process.env.BOT_TOKEN);
