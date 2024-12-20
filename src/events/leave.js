module.exports = client => {

    client.on("guildMemberRemove", member => {
        

        const leaveChannelID = '1094605572470476801';
        const leaveChannel = member.guild.channels.cache.get(leaveChannelID);
        const message = `**${member}** just left!\n**Total Members left:** **[**${member.guild.memberCount}**]**`;

        leaveChannel.send(message);

        })
    }
