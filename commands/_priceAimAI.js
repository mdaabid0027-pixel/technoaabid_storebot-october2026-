/*CMD
  command: /priceAimAI
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
command: /priceAimAI
*/

User.setProperty("price_engine", "aimai", "string");

Api.sendMessage({
  text: "Select Game:",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "🎱 8 Ball Pool",
          callback_data: "/priceGame 8bp"
        }
      ],
      [
        {
          text: "🎯 Carrom",
          callback_data: "/priceGame carrom"
        }
      ]
    ]
  }
});
