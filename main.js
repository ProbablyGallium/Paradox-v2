require('dotenv').config()
const fs = require("fs")
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const prefix = process.env.prefix
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (!message.content.startsWith(prefix) || message.author.bot) return;
  if (!client.commands.has(command)) return;

  try {
	client.commands.get(command).execute(client, message, args);
  } catch (error) {
	console.error(error);
	message.channel.send('ya shit dun work');
}

});

client.login(process.env.token);