/*CMD
  command: /viewPrices
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
command: /viewPrices
*/

let engines = ["snake", "kos"];
let games = ["8bp", "carrom", "soccer"];
let snakeDurations = ["3", "10", "30"];
let kosDurations = ["1", "7", "15", "30"];

let msg = "📊 PRICE LIST\n\n";

// Snake Prices
msg += "🐍 Snake Engine:\n";

for (let g of games) {

  for (let d of snakeDurations) {

    let key = "snake_" + g + "_" + d + "_price";
    let price = Bot.getProperty(key) || 0;

    msg += g.toUpperCase() + " | " + d + " Days = ₹" + price + "\n";

  }

  msg += "\n";
}

// Kos Prices
msg += "\n🚀 Kos Engine:\n";

for (let g of games) {

  for (let d of kosDurations) {

    let key = "kos_" + g + "_" + d + "_price";
    let price = Bot.getProperty(key) || 0;

    msg += g.toUpperCase() + " | " + d + " Days = ₹" + price + "\n";

  }

  msg += "\n";
}

Api.sendMessage({
  text: msg
});
