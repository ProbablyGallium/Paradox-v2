/* eslint-disable no-redeclare */
/* eslint-disable no-var  */
const Discord = require("discord.js")
const dateFormat = require("dateformat")

module.exports = {
  name: "info",
  description: "Get info on a user or server.",
  execute(client, message, args) {
    if (!args[0]) {
      message.channel.send("You didn't tell me what to give you info on! Try `p.info user <Mention, User ID, or Username>` or `p.info server <Server ID>`!")
    } else if (args[0] === "user") {
      let u = message.functions.parseMember(args[1])
      let j = u.joinedAt
      let c = u.user.createdAt
      if (u.user.bot) {var bot = "🤖"} else {var bot = "🙅🏻‍♂️"}
      message.channel.send(`Information about **${u.user.tag}**:`)
      message.channel.send(new Discord.RichEmbed()
        .setColor(u.displayColor)
        .setThumbnail(u.user.avatarURL)
        .addField("User ID", u.user.id, true)
        .addField("Bot?", bot ,true)
        .addField("Roles", u.roles.map(r => r.name).join(", "))
        .addField("Account Created on", dateFormat(c, "mmmm d, yyyy 'at' h:MM:ss TT Z")
          , false)
        .addField("Joined Guild on", dateFormat(j, "mmmm d, yyyy 'at' h:MM:ss TT Z")
          , false)
      )
    }
    else if (args[0] === "guild" || args[0] === "server") {
      if (args[1]) {
        if (typeof client.guilds.get(args[1]) === "undefined") {message.channel.send("Couldn't fetch info for the server provided. This means I'm either not in the server or the server ID provided was invalid."); return}
        console.log(typeof client.guilds.get("332632603737849856"))
        let g = client.guilds.get(args[1])
        if (!g.available) {message.channel.send("This guild isn't available! It could be experiencing an outage right now, in which case, try again later."); return}
        if (g.id.includes("69")) {message.channel.send("nice")}
        message.channel.send(new Discord.RichEmbed()
          .setTitle(`Information about ${g.name}`)
          .setColor(message.member.displayColor)
          .setThumbnail(g.iconURL)
          .addField("Owner", g.owner.user.tag, false)
          .addField("Server ID", g.id, false)
          .addField("Region", g.region ,true)
          .addField("Members", g.memberCount, true)
          .addField("Roles", g.roles.map(r => r.name).join(", "))
          .addField("Guild Created on", dateFormat(g.createdAt, "mmmm d, yyyy 'at' h:MM:ss TT Z")
            , false)
        )}
      else {
        let g = message.guild
        if (!g.available) {message.channel.send("This guild isn't available! It could be experiencing an outage right now, in which case, try again later."); return}
        if (g.id.includes("69")) {message.channel.send("nice")}
        message.channel.send(new Discord.RichEmbed()
          .setTitle(`Information about ${g.name}`)
          .setColor(message.member.displayColor)
          .setThumbnail(g.iconURL)
          .addField("Owner", g.owner.user.tag, false)
          .addField("Server ID", g.id, false)
          .addField("Region", g.region ,true)
          .addField("Members", g.memberCount, true)
          .addField("Roles", g.roles.map(r => r.name).join(", "))
          .addField("Guild Created on", dateFormat(g.createdAt, "mmmm d, yyyy 'at' h:MM:ss TT Z")
            , false)
        )
      }
    }
    else {message.channel.send("I can't give you info on that! Try `p.info user <Mention, User ID, or Username>` or `p.info server <Server ID>`!")}
  }
}
