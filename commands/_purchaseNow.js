/*CMD
  command: /purchaseNow
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
command: /purchaseNow
*/

let uid = user.telegramid.toString();

// session verify
let sid = params.trim();

let currentSid = Bot.getProperty(uid + "_purchase_sid") || "";

if (sid != currentSid) {
  Bot.sendMessage("⚠️️ Session expired.\nPlease restart the bot.");
  Bot.runCommand("/start");
  return;
}

let app = Bot.getProperty(uid + "_selected_app");
let game = Bot.getProperty(uid + "_selected_game");
let duration = Bot.getProperty(uid + "_selected_duration");

if (!app || !game || !duration) {
  Bot.sendMessage("⚠️ Session expired. Please start again.");
  Bot.runCommand("/start");
  return;
}

game = game.toLowerCase().trim();
duration = duration.toString().trim();

let teamList = Bot.getProperty("team_list") || [];
let isReseller = teamList.map(String).includes(uid);

let qty = parseInt(Bot.getProperty(uid + "_bulk_qty")) || 1;

if (!isReseller) qty = 1;

let baseKey = app + "_" + game + "_" + duration;

let grid = Bot.getProperty(uid + "_grid") || {};

let price = 0;

if (isReseller && grid[baseKey] !== undefined) {
  price = Number(grid[baseKey]);
} else {
  price = Number(Bot.getProperty(baseKey + "_price")) || 0;
}

if (price <= 0) {
  Bot.sendMessage("❌ Price not configured.");
  return;
}

let totalPrice = price * qty;

// balance check first
let balKey = uid + "_balance";
let balance = Bot.getProperty(balKey) || 0;

if (balance < totalPrice) {
  Bot.sendMessage(
    "❌ Insufficient Balance\n\n" +
    "Required: ₹" + totalPrice +
    "\nYour balance: ₹" + balance +
    "\n\nPlease add balance first."
  );
  return;
}

// stock check after balance
let stockKey = baseKey + "_stock";
let stock = Bot.getProperty(stockKey) || [];
let stockCount = Array.isArray(stock) ? stock.length : 0;

if (stockCount < qty) {
  Bot.sendMessage(
    "❌ Out of Stock\n\n" +
    "Requested: " + qty +
    "\nAvailable: " + stockCount
  );

  let admin = Bot.getProperty("admin");

  if (admin) {
    let alertAppName;

    if (app == "snake") {
      alertAppName = "Snake Engine";
    } else if (app == "kos") {
      alertAppName = "Kos Engine";
    } else if (app == "aimai") {
      alertAppName = "AimAI";
    } else if (app == "shinigami") {
      alertAppName = "Shinigami";
    } else {
      alertAppName = app;
    }

    Api.sendMessage({
      chat_id: admin,
      parse_mode: "HTML",
      text:
        "🚨 **STOCK ALERT**\n\n" +
        "📦 **Engine:** " + alertAppName +
        "\n🎮 **Game:** " + game.toUpperCase() +
        "\n⏳ **Duration:** " + duration + " Days" +
        "\n👤 **User:** @" + (user.username || "NoUsername") +
        "\n🆔 **ID:** `" + uid + "`" +
        "\n🔢 **Requested:** " + qty +
        "\n📊 **Available:** " + stockCount
    });
  }

  Bot.runCommand("/start");
  return;
}

// deduct balance
let newBalance = balance - totalPrice;
Bot.setProperty(balKey, newBalance, "float");

// deliver keys
let delivered = [];

for (let i = 0; i < qty; i++) {
  delivered.push(stock.shift());
}

Bot.setProperty(stockKey, stock, "json");

// App Name helper
let appName;
if (app == "snake") {
  appName = "Snake Engine";
} else if (app == "kos") {
  appName = "Kos Engine";
} else if (app == "aimai") {
  appName = "AimAI";
} else if (app == "shinigami") {
  appName = "Shinigami";
} else {
  appName = app;
}

// user success message
Api.sendMessage({
  parse_mode: "HTML",
  text:
    "╔════════════════════╗\n" +
    "🎉 **PURCHASE SUCCESSFUL**\n" +
    "╚════════════════════╝\n\n" +
    "📦 **Product:** " + appName +
    "\n🎮 **Game:** " + game.toUpperCase() +
    "\n⏳ **Duration:** " + duration + " Days" +
    "\n🛒 **Quantity:** " + qty +
    "\n━━━━━━━━━━━━━━━━━━━━\n" +
    "🔑 **Your License Key(s)**\n" +
    "`" + delivered.join("\n") + "`" +
    "\n━━━━━━━━━━━━━━━━━━━━\n" +
    "💰 **Remaining Balance:** ₹" + newBalance.toFixed(2) +
    "\n\n⚠️ *Please save your key(s). Lost keys cannot be recovered.*\n\n" +
    "🙏 **Thank you for choosing Techno Aabid Store!**"
});

// admin notify
let admin = Bot.getProperty("admin");

if (admin) {
  Api.sendMessage({
    chat_id: admin,
    parse_mode: "HTML",
    text:
      "🔔 **KEY SOLD**\n\n" +
      "👤 Name: " + (user.first_name || "NoName") +
      "\n📛 Username: @" + (user.username || "NoUsername") +
      "\n🆔 ID: `" + uid + "`" +
      "\n📦 **Engine:** " + appName +
      "\n🎮 **Game:** " + game.toUpperCase() +
      "\n⏳ **Duration:** " + duration + " Days" +
      "\n🔢 Qty: " + qty +
      "\n💰 Total: ₹" + totalPrice +
      "\n\n🔑 Keys:\n`" + delivered.join("\n") + "`"
  });
}

// private log channel (With Keys)
let logChannel = Bot.getProperty("log_channel");

if (logChannel) {
  Api.sendMessage({
    chat_id: logChannel,
    parse_mode: "HTML",
    text:
      "📡 **KEY SOLD (Private Log)**\n\n" +
      "👤 **User:** @" + (user.username || "NoUsername") +
      "\n🆔 `" + uid + "`" +
      "\n\n📦 **Engine:** " + appName +
      "\n🎮 **Game:** " + game.toUpperCase() +
      "\n⏳ **Duration:** " + duration + " Days" +
      "\n🔢 **Quantity:** " + qty +
      "\n💰 **Total Paid:** ₹" + totalPrice +
      "\n💳 **Balance Left:** ₹" + newBalance.toFixed(2) +
      "\n📦 **Remaining Stock:** " + stock.length +
      "\n👑 **Role:** " + (isReseller ? "Reseller" : "User") +
      "\n\n🔑 **Keys:**\n`" + delivered.join("\n") + "`"
  });
}


// ==========================================
// USER PUBLIC LOG CHANNEL (Without Keys + Inline Bot Link)
// ==========================================
let userLogChannel = Bot.getProperty("user_log_channel");

if (userLogChannel) {
  // ⚠️ Yahan apne bot ka username daalein (Bina @ ke, jaise: TechnoAabidStoreBot)
  let botUsername = bot.name; 

  Api.sendMessage({
    chat_id: userLogChannel,
    parse_mode: "HTML",
    text:
      "🔔 **KEY SOLD!**\n\n" +
      "📦 **Engine:** " + appName + "\n" +
      "🎮 **Game:** " + game.toUpperCase() + "\n" +
      "⏳ **Duration:** " + duration + " Days\n\n" +
      "👇 *If you want to buy this bot, click the button below!*",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🤖 Open Bot & Buy",
            url: "https://t.me/" + botUsername + "?start=start"
          }
        ]
      ]
    }
  });
}


// history
let history = Bot.getProperty(uid + "_purchase_history") || [];

let historyEmoji;
if (app == "snake") {
  historyEmoji = "🐍";
} else if (app == "kos") {
  historyEmoji = "🚀";
} else if (app == "aimai") {
  historyEmoji = "🤖";
} else if (app == "shinigami") {
  historyEmoji = "⚡";
} else {
  historyEmoji = "📦";
}

let entry =
  historyEmoji + " " + appName +
  "\n🎮 Game: " + game.toUpperCase() +
  "\n⏳ Duration: " + duration + " Days" +
  "\n🔢 Qty: " + qty +
  "\n💰 Paid: ₹" + totalPrice +
  "\n🔑 Keys:\n" + delivered.join(", ") +
  "\n📅 Date: " + new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

history.unshift(entry);
history = history.slice(0, 20);

Bot.setProperty(uid + "_purchase_history", history, "json");

// reset qty
Bot.setProperty(uid + "_bulk_qty", null, "integer");

// back to clean menu
Bot.runCommand("starttt");
