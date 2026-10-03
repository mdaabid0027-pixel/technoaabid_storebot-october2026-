/*CMD
  command: confirmPurchase
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
command: confirmPurchase
*/

let uid = user.telegramid.toString();

let app = Bot.getProperty(uid + "_selected_app");
let game = Bot.getProperty(uid + "_selected_game");
let duration = Bot.getProperty(uid + "_selected_duration");

// session check
if (!app || !game || !duration) {
  Bot.sendMessage("⚠️ Session expired. Please start again.");
  Bot.runCommand("/start");
  return;
}

game = game.toLowerCase().trim();
duration = duration.toString().trim();

let baseKey = app + "_" + game + "_" + duration;

// new session id every time confirmPurchase opens
let sid = Date.now().toString();
Bot.setProperty(uid + "_purchase_sid", sid, "string");

// reseller check
let teamList = Bot.getProperty("team_list") || [];
let isReseller = teamList.map(String).includes(uid);

// pricing
let grid = Bot.getProperty(uid + "_grid") || {};
let price = 0;

if (isReseller && grid[baseKey] !== undefined) {
  price = Number(grid[baseKey]);
} else {
  price = Number(Bot.getProperty(baseKey + "_price")) || 0;
}

// price missing
if (price <= 0) {
  Bot.sendMessage(
    "❌ Price not configured.\n\n" +
    "Product: " + app +
    "\nGame: " + game.toUpperCase() +
    "\nDuration: " + duration + " Days"
  );
  return;
}

// stock
let stock = Bot.getProperty(baseKey + "_stock") || [];
let stockCount = Array.isArray(stock) ? stock.length : 0;

// app name
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

// reseller flow
if (isReseller) {

  let displayStock = stockCount;

  if (displayStock <= 0) {
    displayStock = 1;
  }

  let keyboard = [];

  for (let i = 1; i <= Math.min(displayStock, 10); i += 2) {

    let row = [
      {
        text: i + " Key" + (i > 1 ? "s" : ""),
        callback_data: "/buyqty " + i + " " + sid
      }
    ];

    if (i + 1 <= Math.min(displayStock, 10)) {
      row.push({
        text: (i + 1) + " Keys",
        callback_data: "/buyqty " + (i + 1) + " " + sid
      });
    }

    keyboard.push(row);
  }

  if (displayStock >= 20) {
    keyboard.push([
      {
        text: "20 Keys",
        callback_data: "/buyqty 20 " + sid
      }
    ]);
  }

  // 👉 Reseller के लिए "All Stock" बटन जोड़ा गया है (यदि स्टॉक उपलब्ध है)
  if (stockCount > 0) {
    keyboard.push([
      {
        text: "📦 All Stock (" + stockCount + " Keys)",
        callback_data: "/buyqty " + stockCount + " " + sid
      }
    ]);
  }

  keyboard.push([
    {
      text: "❌ Cancel",
      callback_data: "/cancelPurchase " + sid
    }
  ]);

  Api.sendMessage({
    parse_mode: "HTML",
    text:
      "🛒 **Confirm Purchase**\n\n" +
      "📦 Product: " + appName +
      "\n🎮 Game: " + game.toUpperCase() +
      "\n⏳ Duration: " + duration + " Days" +
      "\n💰 Price per key: ₹" + price +
      "\n📊 Stock Available: " + stockCount +
      "\n👤 Role: Reseller" +
      "\n\nSelect quantity:",
    reply_markup: {
      inline_keyboard: keyboard
    }
  });

} else {
  Api.sendMessage({
    parse_mode: "HTML",
    text:
      "🛒 **Confirm Purchase**\n\n" +
      "📦 Product: " + appName +
      "\n🎮 Game: " + game.toUpperCase() +
      "\n⏳ Duration: " + duration + " Days" +
      "\n💰 Price: ₹" + price +
      "\n📊 Stock Available: " + stockCount +
      "\n👤 Role: User" +
      "\n\nDo you want to continue?",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "✅ Yes", style: "primary", callback_data: "/purchaseNow " + sid },
          { text: "❌ No", style: "danger", callback_data: "/cancelPurchase " + sid }
        ]
      ]
    }
  });
}
