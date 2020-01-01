module.exports = {
	name: 'ping',
	description: 'Get this, it pings...*and* pongs!',
	execute(client, message, args) {
		message.channel.send(`Ponged with ${Math.round(client.ping)}ms of latency.`);
	},
};