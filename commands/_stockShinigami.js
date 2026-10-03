/*CMD
  command: /stockShinigami
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
command: /stockShinigami
*/

User.setProperty("stock_engine", "shinigami", "string");

Api.sendMessage({
  text: "Select Game:",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "🎯 Carrom",
          callback_data: "/stockGame carrom"
        }
      ]
    ]
  }
});
