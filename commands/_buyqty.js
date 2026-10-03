/*CMD
  command: /buyqty
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
command: /buyqty
*/

let uid = user.telegramid.toString();

let parts = params.split(" ");

let qty = parseInt(parts[0]) || 1;
let sid = parts[1] || "";

// session verify
let currentSid =
Bot.getProperty(uid + "_purchase_sid") || "";

if (sid != currentSid) {

  Bot.sendMessage(
    "⚠️ Session expired.\nPlease restart the bot."
  );

  Bot.runCommand("/start");

  return;
}

let teamList =
Bot.getProperty("team_list") || [];

let isReseller =
teamList.map(String).includes(uid);

// session
let app =
Bot.getProperty(uid + "_selected_app");

let game =
Bot.getProperty(uid + "_selected_game");

let duration =
Bot.getProperty(uid + "_selected_duration");

if (!app || !game || !duration) {

  Bot.sendMessage(
    "⚠️ Session expired. Please start again."
  );

  Bot.runCommand("/start");

  return;
}

game = game.toLowerCase().trim();

duration =
duration.toString().trim();

let baseKey =
app + "_" + game + "_" + duration;

let grid =
Bot.getProperty(uid + "_grid") || {};

let price = 0;

if (
  isReseller &&
  grid[baseKey] !== undefined
) {

  price = Number(grid[baseKey]);

} else {

  price = Number(
    Bot.getProperty(baseKey + "_price")
  ) || 0;

}

if (price <= 0) {

  Bot.sendMessage(
    "❌ Price not configured."
  );

  return;
}

// normal user = only 1 key

if (!isReseller) {

  qty = 1;

  Bot.setProperty(
    uid + "_bulk_qty",
    1,
    "integer"
  );

  Bot.runCommand("confirmPurchase");

  return;
}

// reseller flow

Bot.setProperty(
  uid + "_bulk_qty",
  qty,
  "integer"
);

let totalPrice =
price * qty;

let appName =
(app == "snake")
? "Snake Engine"
: "Kos Engine";

Api.sendMessage({
  parse_mode: "HTML",
  text:
    "🧾 <b>Invoice</b>\n\n" +

    "📦 Product: " +
    appName +

    "\n🎮 Game: " +
    game.toUpperCase() +

    "\n⏳ Duration: " +
    duration + " Days" +

    "\n🔢 Quantity: " +
    qty +

    "\n💰 Price per key: ₹" +
    price +

    "\n🧮 Total Price: ₹" +
    totalPrice +

    "\n\nConfirm this order?",

  reply_markup: {
    inline_keyboard: [

      [
        {
          text: "✅ Confirm Order",
          callback_data:
          "/purchaseNow " + sid
        }
      ],

      [
        {
          text: "❌ Cancel",
          callback_data:
          "/cancelPurchase"
        }
      ]

    ]
  }
});

// bottom keyboard

Bot.sendKeyboard(
  "🔙 Back",
  "Choose action"
);
