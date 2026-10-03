/*CMD
  command: /stockKosEngine
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
command: /stockKosEngine
*/

User.setProperty("stock_engine", "kos", "string");

Api.sendMessage({
  text: "Select Game:",
  reply_markup: {
    inline_keyboard: [
      [
        { text: "🎱 8BP", callback_data: "/stockGame 8bp" },
        { text: "🎯 Carrom", callback_data: "/stockGame carrom" }
      ],
      [
        { text: "🔥 Free Fire", callback_data: "/stockGame freefire" }
      ]
    ]
  }
});
