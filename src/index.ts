import "dotenv/config";

if (!process.env.BOT_TOKEN) {
  console.log("Unauthorized!");
  process.exit(1);
}

import "./app/bot";
