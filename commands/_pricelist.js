/*CMD
  command: /pricelist
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
command: /pricelist
*/

let uid = user.telegramid.toString();

let args = message.split(" ");

if(args.length < 2){

  return Bot.sendMessage(
    "❌ Please select an engine.\n\n" +
    "Example:\n" +
    "/pricelist snake\n" +
    "/pricelist kos\n" +
    "/pricelist aimai\n" +
    "/pricelist shinigami"
  );

}

let engine = args[1].trim().toLowerCase();

if(
  engine != "snake" &&
  engine != "kos" &&
  engine != "aimai" &&
  engine != "shinigami"
){

  return Bot.sendMessage(
    "❌ Invalid engine.\n\n" +
    "Available:\n" +
    "🐍 snake\n" +
    "🚀 kos\n" +
    "🤖 aimai\n" +
    "⚡ shinigami"
  );

}


let teamList = Bot.getProperty("team_list") || [];

let isReseller =
  teamList.map(String).includes(uid);

let grid =
  Bot.getProperty(uid + "_grid") || {};


function price(engine, game, days){

  let resellerKey =
    engine + "_" + game + "_" + days;

  if(
    isReseller &&
    grid[resellerKey] !== undefined
  ){

    return grid[resellerKey];

  }

  return Bot.getProperty(
    engine + "_" + game + "_" + days + "_price"
  ) || "0";

}


let text = "💰 **Current Price List**\n\n";


// ==============================
// 🐍 SNAKE
// ==============================

if(engine == "snake"){

  text += "🐍 **Snake Engine**\n\n";

  text += "🎮 **8BP:**\n";
  text += "• 3 Days — ₹" + price("snake","8bp","3") + "\n";
  text += "• 10 Days — ₹" + price("snake","8bp","10") + "\n";
  text += "• 30 Days — ₹" + price("snake","8bp","30") + "\n";
  text += "• 90 Days — ₹" + price("snake","8bp","90") + "\n\n";

  text += "🎮 **Carrom:**\n";
  text += "• 3 Days — ₹" + price("snake","carrom","3") + "\n";
  text += "• 10 Days — ₹" + price("snake","carrom","10") + "\n";
  text += "• 30 Days — ₹" + price("snake","carrom","30") + "\n";
  text += "• 90 Days — ₹" + price("snake","carrom","90");

}


// ==============================
// 🚀 KOS
// ==============================

if(engine == "kos"){

  text += "🚀 **KOS Engine**\n\n";

  text += "🎮 **8BP:**\n";
  text += "• 1 Day — ₹" + price("kos","8bp","1") + "\n";
  text += "• 7 Days — ₹" + price("kos","8bp","7") + "\n";
  text += "• 15 Days — ₹" + price("kos","8bp","15") + "\n";
  text += "• 30 Days — ₹" + price("kos","8bp","30") + "\n\n";

  text += "🎮 **Carrom:**\n";
  text += "• 1 Day — ₹" + price("kos","carrom","1") + "\n";
  text += "• 7 Days — ₹" + price("kos","carrom","7") + "\n";
  text += "• 15 Days — ₹" + price("kos","carrom","15") + "\n";
  text += "• 30 Days — ₹" + price("kos","carrom","30");

}


// ==============================
// 🤖 AIMAI (8BP & Carrom)
// ==============================

if(engine == "aimai"){

  text += "🤖 **AimAI**\n\n";

  text += "🎮 **8BP:**\n";
  text += "• 1 Day — ₹" + price("aimai","8bp","1") + "\n";
  text += "• 3 Days — ₹" + price("aimai","8bp","3") + "\n";
  text += "• 7 Days — ₹" + price("aimai","8bp","7") + "\n";
  text += "• 15 Days — ₹" + price("aimai","8bp","15") + "\n";
  text += "• 30 Days — ₹" + price("aimai","8bp","30") + "\n";
  text += "• 90 Days — ₹" + price("aimai","8bp","90") + "\n\n";

  text += "🎮 **Carrom:**\n";
  text += "• 1 Day — ₹" + price("aimai","carrom","1") + "\n";
  text += "• 3 Days — ₹" + price("aimai","carrom","3") + "\n";
  text += "• 7 Days — ₹" + price("aimai","carrom","7") + "\n";
  text += "• 15 Days — ₹" + price("aimai","carrom","15") + "\n";
  text += "• 30 Days — ₹" + price("aimai","carrom","30") + "\n";
  text += "• 90 Days — ₹" + price("aimai","carrom","90");

}


// ==============================
// ⚡ SHINIGAMI
// ==============================

if(engine == "shinigami"){

  text += "⚡ **Shinigami**\n\n";

  text += "🎮 **Carrom:**\n";
  text += "• 1 Day — ₹" + price("shinigami","carrom","1") + "\n";
  text += "• 3 Days — ₹" + price("shinigami","carrom","3") + "\n";
  text += "• 7 Days — ₹" + price("shinigami","carrom","7") + "\n";
  text += "• 15 Days — ₹" + price("shinigami","carrom","15") + "\n";
  text += "• 30 Days — ₹" + price("shinigami","carrom","30") + "\n";
  text += "• 90 Days — ₹" + price("shinigami","carrom","90");

}


Api.sendMessage({
  text: text,
  parse_mode: "HTML"
});
