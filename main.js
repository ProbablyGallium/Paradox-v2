require("dotenv").config()
const fs = require("fs")
const Discord = require("discord.js")
const client = new Discord.Client()
const msgFunctions = require("./msgFunctions.js")
const dateFormat = require("dateformat")


const prefix = process.env.PREFIX
client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync("./commands/")
for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", message => {
  const args = message.content.slice(prefix.length).split(/ +/)
  msgFunctions(message)
  const command = args.shift().toLowerCase()

  if (!message.content.startsWith(prefix) || message.author.bot) return
  if (!client.commands.has(command)) return

  try {
    client.commands.get(command).execute(client, message, args)
  } catch (error) {
    message.channel.send(`**Something went wrong.**\n\`\`\`js\n${error}\`\`\``)
  }

})

client.login(process.env.TOKEN)
