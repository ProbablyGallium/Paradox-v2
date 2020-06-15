const banana = require("banana-js")
const Discord = require("discord.js")

function chunkString(str, length) {
  return str.match(new RegExp(".{1," + length + "}", "g"))
}

module.exports = {
  name: "bananafact",
  description: "Facts! About bananas!",
  execute(client, message, args) {
    message.channel.send(new Discord.RichEmbed() 
      .setColor(banana.hex())
      .setDescription(banana.fact())
      .setFooter("Facts powered by banana.js.\nhttps://www.npmjs.com/package/banana-js")
    )
  }
}