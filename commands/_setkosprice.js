/*CMD
  command: /setkosprice
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER
/setkosprice 8bp 1 30
/setkosprice 8bp 10 120
/setkosprice 8bp 15 180
/setkosprice 8bp 30 300

/setkosprice carrom 1 25
/setkosprice carrom 10 100
/setkosprice carrom 15 150
/setkosprice carrom 30 250

/setkosprice soccer 1 20
/setkosprice soccer 10 90
/setkosprice soccer 15 140
/setkosprice soccer 30 220
  ANSWER
  keyboard: 
  aliases: 
  group: 
CMD*/

/*CMD
command: /setkosprice
*/

let admin = Bot.getProperty("admin");

if (user.telegramid != admin) {
  return Bot.sendMessage("❌ Admin only command");
}

/*
Format:

/setkosprice game duration price

Example:

/setkosprice 8bp 1 40
*/

let args = message.split(" ");

if (args.length < 4) {
  return Bot.sendMessage(
    "Usage:\n/setkosprice game duration price\n\nExample:\n/setkosprice 8bp 1 40"
  );
}

let game = args[1].toLowerCase();
let duration = args[2];
let price = parseFloat(args[3]);

if (isNaN(price)) {
  return Bot.sendMessage("❌ Invalid price value");
}

// property key
let priceKey = "kos_" + game + "_" + duration + "_price";

// save price
Bot.setProperty(priceKey, price, "float");

Bot.sendMessage(
  "✅ Kos Engine Price Updated\n\n" +
  "🎮 Game: " + game +
  "\n⏳ Duration: " + duration + " Days" +
  "\n💰 Price: ₹" + price
);
