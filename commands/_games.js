/*CMD
  command: /games
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

/*CMD
  command: /games
  need_reply: true
*/

let uid = user.telegramid.toString();
let game = message.trim();
let gameLower = game.toLowerCase();

// ✅ Allowed games
let allowedGames = ["8bp", "carom", "soccer"];

if (!allowedGames.includes(gameLower)) {
  return Api.sendMessage({
    text: "❌ Invalid game selected.\n\nAllowed Games:\n• 8BP\n• Carom\n• Soccer",
    parse_mode: "HTML"
  });
}

// Save game
Bot.setProperty(uid + "_selected_game", game, "string");

// Get duration
let duration = Bot.getProperty(uid + "_selected_duration");

if (!duration) {
  return Api.sendMessage({
    text: "⚠️ Duration not selected. Please start again.",
    parse_mode: "HTML"
  });
}

duration = duration.toString().trim();

// 💰 Price calculate
let grid = Bot.getProperty(uid + "_grid");
let priceKey = gameLower + "_" + duration;
let normalPriceKey = gameLower + "_" + duration + "day_price";

let finalPrice;

if (grid && grid[priceKey]) {
  finalPrice = parseFloat(grid[priceKey]);
} else {
  finalPrice = parseFloat(Bot.getProperty(normalPriceKey)) || 0;
}

// 👑 SAFE TEAM CHECK (TYPE FIXED)
let teamList = Bot.getProperty("team_list") || [];
let isReseller = teamList.map(String).includes(uid);

// ============================
// 👑 RESELLER → BULK
// ============================
if (isReseller) {
  return Bot.runCommand("/selectQty");
}

// ============================
// 👤 NORMAL USER → SINGLE
// ============================

let msg =
"🛒 <b>Confirm Order</b>\n\n" +
"🎮 Game: " + game + "\n" +
"⏳ Duration: " + duration + "-day\n" +
"🔢 Quantity: 1\n" +
"💵 Price: ₹" + finalPrice.toFixed(2) + "\n\n" +
"Confirm purchase?";

Api.sendMessage({
  text: msg,
  parse_mode: "HTML",
  reply_markup: {
    keyboard: [
      [{ text: "✔ Confirm" }, { text: "❌ Cancel" }]
    ],
    resize_keyboard: true
  }
});
