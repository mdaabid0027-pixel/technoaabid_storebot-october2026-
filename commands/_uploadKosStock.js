/*CMD
  command: /uploadKosStock
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
command: /uploadKosStock
*/

User.setProperty("stock_engine", "kos", "string");

Api.sendMessage({
text: "Select Game:",
reply_markup: {
inline_keyboard: [
[{ text: "🎱 8BP", callback_data: "/stockGame 8bp" }],
[{ text: "🎯 Carrom", callback_data: "/stockGame carrom" }],
[{ text: "⚽ Soccer", callback_data: "/stockGame soccer" }]
]
}
});
