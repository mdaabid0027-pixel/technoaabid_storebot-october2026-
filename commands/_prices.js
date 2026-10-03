/*CMD
  command: /prices
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
  command: /prices
*/

let uid = user.telegramid.toString();

let teamList = Bot.getProperty("team_list") || [];

let isReseller =
  teamList.map(String).includes(uid);

let grid =
  Bot.getProperty(uid + "_grid") || {};

function price(engine, game, days) {

  let resellerKey =
    engine + "_" + game + "_" + days;

  if (isReseller && grid[resellerKey] !== undefined) {
    return grid[resellerKey];
  }

  return Bot.getProperty(
    engine + "_" + game + "_" + days + "_price"
  ) || "0";
}

let text = "💰 Current Price List:\n\n";


// ==============================
// 🐍 SNAKE ENGINE
// ==============================

text += "🐍 Snake Engine:\n\n";

text += "🎮 8BP:\n";
text += "  • 3-day: ₹" + price("snake", "8bp", "3") + "\n";
text += "  • 10-day: ₹" + price("snake", "8bp", "10") + "\n";
text += "  • 30-day: ₹" + price("snake", "8bp", "30") + "\n";
text += "  • 90-day: ₹" + price("snake", "8bp", "90") + "\n\n";

text += "🎮 Carrom:\n";
text += "  • 3-day: ₹" + price("snake", "carrom", "3") + "\n";
text += "  • 10-day: ₹" + price("snake", "carrom", "10") + "\n";
text += "  • 30-day: ₹" + price("snake", "carrom", "30") + "\n";
text += "  • 90-day: ₹" + price("snake", "carrom", "90") + "\n\n";


// ==============================
// 🚀 KOS ENGINE
// ==============================

text += "🚀 Kos Engine:\n\n";

text += "🎮 8BP:\n";
text += "  • 1-day: ₹" + price("kos", "8bp", "1") + "\n";
text += "  • 7-day: ₹" + price("kos", "8bp", "7") + "\n";
text += "  • 15-day: ₹" + price("kos", "8bp", "15") + "\n";
text += "  • 30-day: ₹" + price("kos", "8bp", "30") + "\n\n";

text += "🎮 Carrom:\n";
text += "  • 1-day: ₹" + price("kos", "carrom", "1") + "\n";
text += "  • 7-day: ₹" + price("kos", "carrom", "7") + "\n";
text += "  • 15-day: ₹" + price("kos", "carrom", "15") + "\n";
text += "  • 30-day: ₹" + price("kos", "carrom", "30") + "\n\n";


// ==============================
// 🤖 AIMAI
// ==============================

text += "🤖 AimAI:\n\n";

text += "🎮 8BP:\n";
text += "  • 1-day: ₹" + price("aimai", "8bp", "1") + "\n";
text += "  • 3-day: ₹" + price("aimai", "8bp", "3") + "\n";
text += "  • 7-day: ₹" + price("aimai", "8bp", "7") + "\n";
text += "  • 15-day: ₹" + price("aimai", "8bp", "15") + "\n";
text += "  • 30-day: ₹" + price("aimai", "8bp", "30") + "\n";
text += "  • 90-day: ₹" + price("aimai", "8bp", "90") + "\n\n";

text += "🎮 Carrom:\n";
text += "  • 1-day: ₹" + price("aimai", "carrom", "1") + "\n";
text += "  • 3-day: ₹" + price("aimai", "carrom", "3") + "\n";
text += "  • 7-day: ₹" + price("aimai", "carrom", "7") + "\n";
text += "  • 15-day: ₹" + price("aimai", "carrom", "15") + "\n";
text += "  • 30-day: ₹" + price("aimai", "carrom", "30") + "\n";
text += "  • 90-day: ₹" + price("aimai", "carrom", "90") + "\n\n";


// ==============================
// 🥷 SHINIGAMI ENGINE
// ==============================

text += "🥷 Shinigami Engine:\n\n";

text += "🎮 Carrom:\n";
text += "  • 1-day: ₹" + price("shinigami", "carrom", "1") + "\n";
text += "  • 7-day: ₹" + price("shinigami", "carrom", "7") + "\n";
text += "  • 15-day: ₹" + price("shinigami", "carrom", "15") + "\n";
text += "  • 30-day: ₹" + price("shinigami", "carrom", "30");


Api.sendMessage({
  text: text
});
