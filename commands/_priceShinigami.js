/*CMD
  command: /priceShinigami
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
command: /priceShinigami
*/

User.setProperty("price_engine", "shinigami", "string");

Api.sendMessage({
  text: "Select Game:",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "🎯 Carrom",
          callback_data: "/priceGame carrom"
        }
      ]
    ]
  }
});
