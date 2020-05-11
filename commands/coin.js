module.exports = {
  name: "coin",
  description: "Flip a coin.",
  execute(client, message, args) {
    let res = ""
    switch (Math.floor(Math.random() * 2)) {
    case 0:
      res = "heads"
      break
    case 1:
      res = "tails"
      break
    }
    message.channel.send(`The coin landed on **${res}**.`)
  }}