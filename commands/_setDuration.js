/*CMD
  command: /setDuration
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
command: /setDuration
*/

let duration = params;

Bot.setProperty(user.telegramid + "_selected_duration", duration, "string");

Api.sendMessage({
  text: "Select Game:",
  reply_markup: {
    inline_keyboard: [
      [{ text: "🎱 8 Ball Pool", callback_data: "/setGame 8bp" }],
      [{ text: "🎯 Carrom", callback_data: "/setGame carrom" }],
      [{ text: "⚽ Soccer", callback_data: "/setGame soccer" }]
    ]
  }
});
