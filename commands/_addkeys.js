/*CMD
  command: /addkeys
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
  command: /addkeys
  help: Add keys (duration game)
  need_reply: true
  folder: Stock
*/

let admin = Bot.getProperty("admin");

if (user.telegramid != admin) {
  return Api.sendMessage({ text: "⛔ Admin only command." });
}

/*
Example:
/addkeys 3 carom
*/

let parts = message.trim().split(/\s+/);

if (parts.length < 2) {
  return Api.sendMessage({
    text:
      "❌ <b>Wrong format</b>\n\n" +
      "Use:\n<code>/addkeys &lt;days&gt; &lt;game&gt;</code>\n\n" +
      "Example:\n<code>/addkeys 3 carom</code>",
    parse_mode: "HTML"
  });
}

let duration = parts[0];
let game = parts[1].toLowerCase();

// stock key example → carom_3day_stock
let stockKey = game + "_" + duration + "day_stock";

// save upload target
Bot.setProperty("upload_stock_target", stockKey, "string");

// save info for log
Bot.setProperty("upload_game", game, "string");
Bot.setProperty("upload_duration", duration, "string");

Api.sendMessage({
  text:
    "📝 <b>Upload Keys</b>\n\n" +
    "🎮 <b>Game:</b> " + game +
    "\n⏳ <b>Duration:</b> " + duration + " Days\n\n" +
    "Send keys <b>one per line</b>\n\n" +
    "<code>CODE123\nCODE456\nCODE789</code>",
  parse_mode: "HTML"
});

// go to uploader
Bot.runCommand("/uploadi");
