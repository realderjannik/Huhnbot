require("dotenv").config();
const config = ("./config.json");
const fs = require('fs');
const welcome = require('./src/events/welcome.js')
const leave = require('./src/events/leave.js')
const eventHandler = require('./src/handlers/eventHandler');
const mongoose = require('mongoose');
const { ActivityType, Client, Collection, GatewayIntentBits } = require('discord.js');
const { play, stop, queue, success, repeat, error } = require('./src/utils/config.js');
const client = new Client({ 
	intents: 
	[GatewayIntentBits.Guilds,
   GatewayIntentBits.GuildMembers,
	 GatewayIntentBits.GuildMessages,
	 GatewayIntentBits.MessageContent,
   GatewayIntentBits.GuildMessageTyping,
   GatewayIntentBits.GuildMessageReactions,
	 GatewayIntentBits.GuildModeration,
   GatewayIntentBits.GuildPresences,
   GatewayIntentBits.GuildVoiceStates,
	], 
});


client.commands = new Collection();
client.aliases = new Collection();
client.prefix = process.env.PREFIX;
const EMOJI = process.env.EMOJI;
const prefix = process.env.PREFIX;

let activity = [
    {
      name: 'den Hühnern',
      type: ActivityType.Listening,
      url: 'https://open.spotify.com/track/1EAWieOwtlylamwdAvZ4Ef?si=69119df13dbb410f',
    },
    {
      name: "KFC",
      type: ActivityType.Competing,
    },
    {
      name: 'mit node.js',
      type: ActivityType.Playing,
    },
  ];
  


  client.on('ready', (c) => {

    fs.readdirSync('./src/commands').filter(file => file.endsWith('.js')).forEach(file => {
      const command = require(`./src/commands/${file}`);
      client.commands.set(command.name, command);
  });

    console.log(`✅ - Online! Logged in as ${c.user.tag} I'm currently on ${client.guilds.cache.size} guild(s)`);
    
    (async () => {
      try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGODB_URI, {keepAlive: true});
        console.log('Connected to DB.')

        eventHandler(client)
      } catch (error) {
        console.log(`Error when connecting to DB: ${error}`);
      }
      
    })();

    welcome(client)
    leave(client)

    setInterval(() => {
      let random = Math.floor(Math.random() * activity.length);
      client.user.setActivity(activity[random]);
    }, 10000);
  });

client.login(process.env.DISCODRD_BOT_TOKEN);

