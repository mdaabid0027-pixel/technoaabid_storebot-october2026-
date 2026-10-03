/*CMD
  command: /uploadi
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
  command: /uploadi
  help: Receive uploaded keys
  need_reply: true
  folder: Stock
*/

let admin = Bot.getProperty("admin");

if (user.telegramid != admin) {
  return Api.sendMessage({ text: "⛔ Admin only." });
}

let stockKey = Bot.getProperty("upload_stock_target");

if (!stockKey) {
  return Api.sendMessage({ text: "❌ Upload target not set." });
}

if (!message) {
  return Api.sendMessage({ text: "❌ No keys received." });
}

// Load existing stock
let stock = Bot.getProperty(stockKey);
if (!Array.isArray(stock)) {
  stock = [];
}

// Parse keys (one per line)
let newKeys = message
  .split("\n")
  .map(k => k.trim())
  .filter(k => k.length > 0);

if (newKeys.length === 0) {
  return Api.sendMessage({ text: "❌ No valid keys found." });
}

// Add keys
stock = stock.concat(newKeys);

Bot.setProperty(stockKey, stock, "json");

let logChannel = Bot.getProperty("log_channel");

if(logChannel){
Api.sendMessage({
chat_id: logChannel,
parse_mode: "HTML",
text:
"📦 <b>BULK STOCK ADDED</b>\n\n" +
"👤 Admin: @" + (user.username || "NoUsername") +
"\n🆔 ID: <code>" + user.telegramid + "</code>" +
"\n📦 Stock: <code>" + stockKey + "</code>" +
"\n\n➕ Keys Added: <b>" + newKeys.length + "</b>" +
"\n📦 Total Stock: <b>" + stock.length + "</b>"
})
}

// Clear upload target
Bot.setProperty("upload_stock_target", null);

// Admin confirmation
Api.sendMessage({
  text:
    "✅ <b>Keys Uploaded Successfully</b>\n\n" +
    "➕ Added: <b>" + newKeys.length + "</b>\n" +
    "📦 Total Stock: <b>" + stock.length + "</b>",
  parse_mode: "HTML"
});
