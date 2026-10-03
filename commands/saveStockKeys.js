/*CMD
  command: saveStockKeys
  help: 
  need_reply: true
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
command: saveStockKeys
need_reply: true
*/

let engine = User.getProperty("stock_engine");
let game = User.getProperty("stock_game");
let duration = User.getProperty("stock_duration");
let botUsername = bot.name;

if(!engine || !game || !duration){
  Bot.sendMessage("❌ Stock setup failed. Try again.");
  return;
}

let stockKey =
  engine + "_" +
  game + "_" +
  duration + "_stock";

let existing = Bot.getProperty(stockKey);

if(!Array.isArray(existing)){
  existing = [];
}

let newKeys =
  message.split("\n")
  .map(x => x.trim())
  .filter(x => x.length > 0);

if(newKeys.length == 0){
  Bot.sendMessage("❌ No keys received.");
  return;
}

let updated = existing.concat(newKeys);

Bot.setProperty(
  stockKey,
  updated,
  "json"
);


// ENGINE NAME

let engineName;

if(engine == "snake"){
  engineName = "Snake Engine";
}
else if(engine == "kos"){
  engineName = "Kos Engine";
}
else if(engine == "aimai"){
  engineName = "AimAI";
}
else if(engine == "shinigami"){
  engineName = "Shinigami";
}
else{
  engineName = engine;
}


// SUCCESS MESSAGE

Bot.sendMessage(
  "✅ Stock Added Successfully\n\n" +
  "Engine: "  + engineName +
  "\nGame: "   + game.toUpperCase() +
  "\nDuration: " + duration + " Days" +
  "\nAdded: "    + newKeys.length +
  "\nTotal Stock: " + updated.length
);


// LOG CHANNEL (Admin / Private Log)

let logChannel = Bot.getProperty("log_channel");

if(logChannel){
  Api.sendMessage({
    chat_id: logChannel,
    parse_mode: "HTML",
    text:
      "📦 **STOCK ADDED**\n\n" +
      "📦 **Engine:** " + engineName +
      "\n🎮 **Game:** " + game.toUpperCase() +
      "\n⏳ **Duration:** " + duration + " Days" +
      "\n\n➕ **Added Keys:** " + newKeys.length +
      "\n📦 **Total Stock:** " + updated.length +
      "\n\n🔑 **Keys Added:**\n\n" +
      "`" + newKeys.join("\n") + "`"
  });
}


// USER PUBLIC LOG CHANNEL (With Buy Now Inline Button)

let userLogChannel = Bot.getProperty("user_log_channel");

if(userLogChannel){

  // ⚠️ Yahan apne bot ka username daalein (Bina @ ke, jaise: SnakeStoreBot)

  Api.sendMessage({
    chat_id: userLogChannel,
    parse_mode: "HTML",
    text:
      "🎉 **NEW STOCK AVAILABLE!** 🎉\n\n" +
      "📦 **Engine:** " + engineName + "\n" +
      "🎮 **Game:** " + game.toUpperCase() + "\n" +
      "⏳ **Duration:** " + duration + " Days\n" +
      "➕ **New Keys Added:** " + newKeys.length + "\n\n" +
      "👇 *Click the button below to buy now!*",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🛒 Buy Now",
            url: "https://t.me/" + botUsername + "?start=start"
          }
        ]
      ]
    }
  });
}
