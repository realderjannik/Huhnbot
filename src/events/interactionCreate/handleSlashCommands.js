const getLocalCommands = require("../../utils/getLocalCommands");
const { DEVS, DISCORD_GUILD_ID } = require("dotenv").config();

module.exports = async (client, interaction) =>  {
    if(!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands();

    try {
        const commandObject = localCommands.find(
            (cmd) => cmd.name === interaction.commandName
            );

            if (!commandObject) return;

            if (commandObject.devOnly) {
                if (!DEVS.includes(interaction.member.id)) {
                    interaction.reply({
                        content: '⛔ - Only Developers are allowed to run this command.',
                        ephemeral: true
                    });
                    return;
                }
            }
            
            if (commandObject.testOnly) {
                if (!DEVS.includes(interaction.guild.id === DISCORD_GUILD_ID)) {
                    interaction.reply({
                        content: '⛔ - This command is for test purposes only. \n Please contact my Developers if you believe this is an error.',
                        ephemeral: true
                    });
                    return;
                }
            }

            if (commandObject.permissionsRequired?.length) {
                for (const permission of commandObject.permissionsRequired) {
                    if (!interaction.member.permissions.has(permission)) {
                        interaction.reply({
                            content: `⛔ - You don't have enough permissions. \n Please contact the Server Owner if you believe this is an error.`,
                            ephemeral: true,
                        });
                        return;
                    }
                }
            }

            if (commandObject.botPermissions?.length) {
                for (const permission of commandObject.botPermissions) {
                    const bot = interaction.guild.members.me;
                    if (!bot.permissions.has(permission)) {
                        interaction.reply({
                            content: `⛔ - I don't have enough permissions. \n Please contact my Developers if you believe this is an error.`,
                            emphemeral: true,
                        });
                        return;
                    }
                }
            }

            await commandObject.callback(client, interaction);
    } catch (error) {
        console.log(`⛔ - There was an error running this command: ${error}`)
    }
};