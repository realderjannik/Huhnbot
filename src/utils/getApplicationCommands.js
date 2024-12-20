module.exports = async (client, DISCORD_GUILD_ID) => {
        let applicationCommands;

        if (DISCORD_GUILD_ID) {
            const guild = await client.guilds.fetch(DISCORD_GUILD_ID);
            applicationCommands = guild.commands;
        } else {
            applicationCommands = await client.application.commands;
        }

        await applicationCommands.fetch();
        return applicationCommands;
};