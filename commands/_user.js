/*CMD
  command: /user
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

/*CMD
  command: /userPanel
  help: "Show user panel with 4 buttons"
  need_reply: false
*/

let msg = 
`👋 Hello ${user.first_name}!
Welcome To User's Panel!

Please choose an option below:`;

Api.sendMessage({
  text: msg,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
    [{ text: "📞 Support", callback_data: "/support" }]
    ]
  }
});
