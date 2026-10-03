/*CMD
  command: /setQty
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
  command: 1,2,3,4,5,10
*/

let qty = parseInt(message);
let uid = user.telegramid;

Bot.setProperty(uid + "_bulk_qty", qty, "integer");

// Load data
let game = Bot.getProperty(uid + "_selected_game");
let duration = Bot.getProperty(uid + "_selected_duration");

let gameKey = game.toLowerCase();
let priceKey = gameKey + "_" + duration + "day_price";

let grid = Bot.getProperty(uid + "_grid");
let customKey = gameKey + "_" + duration;

let unitPrice;

if (grid && grid[customKey]) {
  unitPrice = Number(grid[customKey]);
} else {
  unitPrice = Number(Bot.getProperty(priceKey)) || 0;
}

let total = unitPrice * qty;

let msg =
"🛒 <b>Confirm Order</b>\n\n" +
"🎮 Game: " + game + "\n" +
"⏳ Duration: " + duration + "-day\n" +
"🔢 Quantity: " + qty + "\n" +
"💵 Unit Price: ₹" + unitPrice.toFixed(2) + "\n" +
"━━━━━━━━━━━━━━━\n" +
"💰 <b>TOTAL: ₹" + total.toFixed(2) + "</b>\n\n" +
"Confirm purchase?";

Api.sendMessage({
  text: msg,
  parse_mode: "HTML",
  reply_markup: {
    keyboard: [
      [{ text: "✔ Confirm" }],
      [{ text: "❌ Cancel" }]
    ],
    resize_keyboard: true
  }
});
