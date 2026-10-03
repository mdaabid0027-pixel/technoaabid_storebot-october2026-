/*CMD
  command: /stockAimAI
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/*CMD
command: /stockAimAI
*/

User.setProperty("stock_engine", "aimai", "string");

Api.sendMessage({
  text: "Select Game:",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "🎱 8 Ball Pool",
          callback_data: "/stockGame 8bp"
        }
      ],
      [
        {
          text: "🎯 Carrom",
          callback_data: "/stockGame carrom"
        }
      ]
    ]
  }
});
