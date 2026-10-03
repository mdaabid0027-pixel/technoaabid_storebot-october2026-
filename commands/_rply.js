/*CMD
  command: /rply
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 🧡_ Enter Message For User _
  keyboard: 
  aliases: 
  group: 
CMD*/

var rp = Bot.getProperty("ryplyid")
var lap = Bot.getProperty(rp)
var user = lap.user
var date = lap.date
var userid = lap.userid
var admreply = message
var supportmessage = lap.supportmessage

var jjson = {
  user: user,
  date: date,
  userid: userid,
  admreply: admreply,
  supportmessage: supportmessage
}

Bot.setProperty(rp, jjson)
Bot.sendMessage("❤️ _Successfully Replyed To User: " + user + "_")

Api.sendMessage({
  chat_id: userid,
  text:
    "*📬 Administrator Replyed On Your Message*\n\n*🎫 Ticket ID:* `" +
    rp +
    "`\n\n*📨 Ticket Message:* " +
    supportmessage +
    "\n\n*👨‍💻 Admin Reply:* `" +
    message +
    "`\n\n*🌹 Ticket Date:* `" +
    date +
    "`",
  parse_mode: "Markdown",

  reply_markup: {
    inline_keyboard: [[{ text: "↩️ Reply To Admin", callback_data: "Support" }]]
  }
})
