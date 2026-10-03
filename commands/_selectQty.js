/*CMD
  command: /selectQty
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
  command: /selectQty
*/

let uid = user.telegramid.toString();

let game = Bot.getProperty(uid + "_selected_game");
let duration = Bot.getProperty(uid + "_selected_duration");

if (!game || !duration) {
  return Bot.runCommand("/startt");
}

let gameKey = game.toLowerCase().trim();
let durationStr = duration.toString().trim();

// 📦 Get stock
let stockKey = gameKey + "_" + durationStr + "day_stock";
let stock = Bot.getProperty(stockKey);

let stockCount = Array.isArray(stock) ? stock.length : 0;

// 👑 Max limit 20
let maxAllowed = Math.min(stockCount, 20);

// 🔥 If stock 0 → show only 1
if (stockCount <= 0) {
  maxAllowed = 1;
}

// 🔢 Generate buttons
let buttons = [];
let row = [];

for (let i = 1; i <= maxAllowed; i++) {
  row.push({ text: String(i) });

  if (row.length === 5) {
    buttons.push(row);
    row = [];
  }
}

if (row.length > 0) {
  buttons.push(row);
}

buttons.push([{ text: "❌ Cancel" }]);

Api.sendMessage({
  text: "🛒 Select Quantity:",
  reply_markup: {
    keyboard: buttons,
    resize_keyboard: true
  }
});
