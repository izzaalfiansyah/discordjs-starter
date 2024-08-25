import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import { onReady } from "../events/ready";
import { handleCommands } from "../utils/handle-command";
import { onInteractionCreate } from "../events/interaction-create";
import "../utils/register-command";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
  ],
});

(client as any).commands = new Collection();

client.once(Events.ClientReady, onReady);

client.on(Events.InteractionCreate, (interaction) =>
  onInteractionCreate(interaction, client as Client<true>)
);

handleCommands(client);

client.login(process.env.BOT_TOKEN);
