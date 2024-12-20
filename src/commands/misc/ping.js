module.exports = {
	name: 'play',
	description: "Pong! Shows the Client WS Ping",
	// devOnly: Boolean,
	// testOnly: Boolean,
	// options: Object[],
	 deleted: false,
	
	callback: (client, interaction) => {
		interaction.reply(`🏓Pong! I'm on **${client.ws.ping} ms latency!**`) 
	}
	
};