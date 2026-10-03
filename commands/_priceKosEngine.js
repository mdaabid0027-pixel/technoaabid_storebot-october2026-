/*CMD
  command: /priceKosEngine
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
command: /priceKosEngine
*/

User.setProperty("price_engine", "kos", "string");

Api.sendMessage({
  text: "Select Game:",
  reply_markup: {
    inline_keyboard: [
      [{ text: "🎱 8BP", callback_data: "/priceGame 8bp" }],
      [{ text: "🎯 Carrom", callback_data: "/priceGame carrom" }],
      [{ text: "🔥 Free Fire", callback_data: "/priceGame freefire" }]
    ]
  }
});
