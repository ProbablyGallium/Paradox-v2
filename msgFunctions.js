const { User, GuildMember } = require("discord.js")
module.exports = (message) => {
  message.functions = {
    /**
     * Parses a role from a given role name or role snowflake
     * @param {String} data
     * @return {Role}
     */
    parseRole: data => {
      if (message.channel.type !== "text") throw new Error("I can't find a role if I'm not in a guild!")
      if (!data) throw new Error("You didn't give me anything to find a role from!")
      if (message.mentions.roles.size === 0) {
        let role = message.guild.roles.get(data)
        if (role === undefined) {
          role = message.guild.roles.find(r => r.name.toLowerCase().includes(data.toLowerCase()))
          if (!role) throw new Error("I couldn't find that role! ")
          else return role
        } else return role
      } else {
        const role = message.mentions.roles.first()
        return role
      }
    },
    /**
     * Parses a user from a given user name or user snowflake
     * @param {String} data
     * @return {User}
     */
    parseUser: data => {
      if (!data) throw new Error("You didn't give me anything to find a user from!")
      if (data instanceof User) return data
      if (message.mentions.users.size === 0) {
        let user = message.client.users.get(data)
        if (user === undefined) {
          user = message.client.users.find(r => (r.username.toLowerCase().includes(data.toLowerCase()) || r.tag.toLowerCase() === data.toLowerCase()))
          if (!user) throw new Error("I couldn't find that user!")
          else return user
        } else return user
      } else {
        const user = message.mentions.users.first()
        return user
      }
    },
    /**
     * Parses a member from a given member username or member snowflake
     * @param {String} data
     * @return {GuildMember}
     */
    parseMember: data => {
      if (message.channel.type !== "text") throw new Error("I can't find a member if I'm not in a guild!")
      if (!data) throw new Error("You didn't give me anything to find a member from!")
      if (data instanceof GuildMember) return data
      if (message.mentions.members.size === 0) {
        let member = message.guild.members.get(data)
        if (member === undefined) {
          member = message.guild.members.find(r => (r.user.username.toLowerCase().includes(data.toLowerCase()) || r.user.tag.toLowerCase() === data.toLowerCase()))
          if (!member) throw new Error("I couldn't find that member!")
          else return member
        } else return member
      } else {
        const member = message.mentions.members.first()
        return member
      }
    },
    /**
     * Parses a channel from a given channel name or channel snowflake
     * CANNOT PARSE DMS
     * @param {String} data
     * @return {GuildChannel}
     */
    parseChannel: data => {
      if (!message.guild) throw new Error("I can't find a channel if I'm not in a guild!")
      if (!data) return undefined
      if (data.startsWith("<#") && data.endsWith(">")) { // data === <#ID>
        const channel = message.guild.channels.get(data.substring(2, data.length - 1))
        if (!channel) throw new Error("Channel does not exist")
        return channel
      }
      else if (data.startsWith("#")) { // data === #channel
        data = data.substring(1)
        const channel = message.guild.channels.find(g => g.name.includes(data))
        if (!channel) throw new Error("Channel does not exist")
        return channel
      }
      else { // data === ID
        const channel = message.guild.channels.get(data)
        if (!channel) throw new Error("Channel does not exist")
        return channel
      }
    }
  }
}
