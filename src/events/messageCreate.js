const { ChannelType} = require('discord.js');
const client = require('../../index.js');
const prefix = client.prefix;
client.on('messageCreate', async (message) => {
    if(message.author.bot) return;
    if(message.channel.type != ChannelType.GuildText) return;
    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ + /g); //slice the prefix of the message content, and trim the first space, split the message content by space and form array
    const cmd = args.shift().toLowerCase(); // command name to lower case 

    if(cmd.length == 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));


    if(command) {
        try {
            command.run(client, message, args);
        } catch (error) {
            console.log(error);
        }
    }
});