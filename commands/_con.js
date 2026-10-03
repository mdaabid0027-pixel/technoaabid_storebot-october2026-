/*CMD
  command: /con
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

let admin = Bot.getProperty("admin");
let logAdmin = Bot.getProperty("log_admin");

// 1. Load user selections
let game = Bot.getProperty(user.telegramid + "_selected_game");
let duration = Bot.getProperty(user.telegramid + "_selected_duration");

if (!game || !duration) {
  Api.sendMessage({
    text: "⚠️ <b>Purchase error:</b> Game or duration not selected. Please start over.",
    parse_mode: "HTML"
  });
  return Bot.runCommand("/startt");
}

let gameKey = game.toLowerCase().trim(); 
let durationStr = duration.toString().trim();

// 🔥 PRICE
let grid = Bot.getProperty(user.telegramid + "_grid");
let priceKey = gameKey + "_" + durationStr;
let finalPrice;

if (grid && grid[priceKey]) {
  finalPrice = parseFloat(grid[priceKey]);
} else {
  finalPrice = parseFloat(Bot.getProperty(gameKey + "_" + durationStr + "day_price")) || 0;
}

// 💰 BALANCE CHECK
let balKey = user.telegramid + "_balance";
let balance = Bot.getProperty(balKey) || 0;

if (balance < finalPrice) {

  Api.sendMessage({
    text:
      "❌ Aapke balance me paise kam hain.\n\n" +
      "💰 <b>Zarurat:</b> ₹" + finalPrice + "\n" +
      "💰 <b>Aapka Balance:</b> ₹" + balance,
    parse_mode: "HTML"
  });

  return Bot.runCommand("/st");
}

// 📦 STOCK CHECK
let stockKey = gameKey + "_" + durationStr + "day_stock";
let stock = Bot.getProperty(stockKey);

if (!stock || stock.length === 0) {

  Api.sendMessage({
    text:
      "❌ <b>Out of Stock!</b>\n\n" +
      "🎮 <b>Game:</b> " + game + "\n" +
      "⏳ <b>Duration:</b> " + durationStr + " Days",
    parse_mode: "HTML"
  });

  return Bot.runCommand("/st");
}

// 💸 DEDUCT BALANCE
let newBalance = balance - finalPrice;
Bot.setProperty(balKey, newBalance, "float");

// 🔑 DELIVER KEY
let deliveredKey = stock.shift();
Bot.setProperty(stockKey, stock, "json");

// 📡 LOG TO CHANNEL
let logChannel = Bot.getProperty("log_channel")

if (logChannel) {

let fullName = user.first_name + (user.last_name ? " " + user.last_name : "")

Api.sendMessage({
  chat_id: logChannel,
  parse_mode: "HTML",
  text:
  "🔑 <b>KEY SOLD</b>\n\n" +
  "👤 Name: " + fullName +
  "\n📛 Username: @" + (user.username || "NoUsername") +
  "\n🆔 ID: <code>" + user.telegramid + "</code>" +
  "\n🎮 Game: " + game +
  "\n⏳ Duration: " + durationStr + " Days" +
  "\n💰 Price: ₹" + finalPrice.toFixed(2) +
  "\n💳 Remaining Balance: ₹" + newBalance.toFixed(2) +
  "\n\n🔑 Key:\n<code>" + deliveredKey + "</code>"
});
}

// 🧾 USER INVOICE
let invoice = "<b>-: ✅ " + game + " " + durationStr + " Day Key :-</b>\n\n" +
              "👤 @" + (user.username || "User") + 
              " (<code>" + user.telegramid + "</code>)\n" +
              "🔑 <b>Key:</b> <code>" + deliveredKey + "</code>\n" +
              "💰 <b>Naya Balance:</b> ₹" + newBalance.toFixed(2);

Api.sendMessage({
  text: invoice,
  parse_mode: "HTML"
});

// ================= ADMIN SYSTEM =================

// 🔔 MAIN ADMIN (NO PRICE BUT SHOW KEY)
if (admin) {
  Api.sendMessage({
    chat_id: admin,
    text:
      "🔔 <b>| KEY SOLD |</b>\n\n" +
      "👤 <b>User:</b> @" + (user.username || "N/A") +
      " (<code>" + user.telegramid + "</code>)\n" +
      "🎮 <b>Game:</b> " + game +
      "\n⏳ <b>Duration:</b> " + durationStr + " Days\n\n" +
      "🔑 <b>Key:</b>\n<code>" + deliveredKey + "</code>\n\n" +
      "💳 <b>Remaining Balance:</b> ₹" + newBalance.toFixed(2),
    parse_mode: "HTML"
  });
}

// 🚀 FINAL REDIRECT
Bot.runCommand("/st");
