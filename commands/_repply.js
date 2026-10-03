/*CMD
  command: /repply
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

var lap = Bot.getProperty(params);
Api.deleteMessage({ message_id: request.message_id });

var mm = User.getProperty("mm");

if (!lap) {
  Api.editMessageText({
    message_id: mm,
    text: "_⛔ Invalid Support Id._",
    parse_mode: "Markdown",
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: [
        [
          { text: "◀️ Return", callback_data: "Support" }
        ]
      ]
    }
  });
  return;
}

var user = lap.user;
var date = lap.date;
var userid = lap.userid;
var admreply = lap.admreply;
var supportmessage = lap.supportmessage;
Bot.setProperty("ryplyid", params)

Api.editMessageText({
    message_id: request.message.message_id,
  text: "*📬 Your Message ID Details Found.*\n\n*🕵‍♂ User:* [" + user + "](tg://user?id=" + userid + ")\n\n*🆔 User ID:* `" + userid + "`\n\n*🎫 Ticket ID:* `" + params + "`\n\n*📨 Ticket Message:* `" + supportmessage + "`\n\n*👨‍💻 Admin Reply:* _" + admreply + "_\n\n*🌹 Ticket Date:* `" + date + "`",
  parse_mode: "Markdown",
  disable_web_page_preview: true,
  reply_markup: {
    inline_keyboard: [
      [
        { text: "🧡 Reply To " + user + "", callback_data: "/rply" }
      ]
    ]
  }
});

return;
