module.exports = client => {

    client.on("guildMemberAdd", member => {
        

        const welcomeChannelID = '883698009089646606';
        const welcomeChannel = member.guild.channels.cache.get(welcomeChannelID);
        const message = `**${member}** just joined!\n**Total Members:** **[**${member.guild.memberCount}**]**`;

        welcomeChannel.send(message);

        })
    }
