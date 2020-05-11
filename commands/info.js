/* var serverCreated = new Date(message.guild.createdTimestamp);
  message.channel.send(new Discord.RichEmbed()
      .setDescription(`Created by ${message.guild.owner.user.tag} on ${serverCreated.toLocaleDateString()}`)
      .setColor(message.member.displayColor)
      .setThumbnail(message.guild.iconURL)
      .setAuthor(`Information on ${message.guild.name}:`)
      .addField("Guild ID:", message.guild.id)
      .addField("Members:", message.guild.memberCount)
      .addField("Region:", message.guild.region) */
      module.exports = {
        name: 'info',
        description: 'Get info on a user or server.',
        execute(client, message, args) {
            if (args[0] = 'user') {
              if (!isNaN(+args[1])) {
            message.channel.send(`This is ${message.guild.members.get(args[1]).displayName}.`)
                }
              // else message.channel.send(`This is user ${message.mentions.users.first.id}.`) TODO: Make this work.
              }
            }
          }
      