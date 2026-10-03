/*CMD
  command: 🛒 Purchase Product
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
command: Purchase Product
*/

User.setProperty("purchase_step", "product", "string");

Api.sendMessage({
  text: "**🛒 Select a Product**\n\n*Please choose one of the options below.*",
  parse_mode: "HTML",
  reply_markup: {
    keyboard: [
      [{ text: "Snake Engine", style: "success" }],
      [{ text: "Kos Engine", style: "success" }],
      [{ text: "AimAI", style: "primary" }],
      [{ text: "Shinigami", style: "primary" }],
      [{ text: "⬅️ Back", style: "danger" }]
    ],
    resize_keyboard: true
  }
});
