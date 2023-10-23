require('dotenv').config();
const { Client, Partials, Collection, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.DirectMessages,
    ],
    partials: [
      Partials.Channel,
      Partials.Message,
      Partials.User,
      Partials.GuildMember,
      Partials.Reaction
    ],
    presence: {
      activities: [{
        name: ".help",
        type: 0
      }],
      status: 'dnd'
    }
});

const { loadEvents } = require("./Handlers/eventHandler")

client.events = new Collection();
client.commands = new Collection();
client.subCommands = new Collection();

const DBTOKEN = process.env.DatabaseURL;

const { connect } = require("mongoose");
connect(DBTOKEN, {}).then(()=>console.log("The Client is now connected to the database"));

loadEvents(client);

const TOKEN = process.env.DISCORD_TOKEN;

client
    .login(TOKEN)
    .then(()=> {
        console.log(`Logged in as ${client.user.tag}!`)
    })
    .catch((err)=> console.log(err));


/**
 * TODO:
 * Add check each mornining
 * Add manual entry                 - Done
 * Track total nuts for each user   - Done
 * Register                         - Done
 * Leaderboard                      - Done
 */

