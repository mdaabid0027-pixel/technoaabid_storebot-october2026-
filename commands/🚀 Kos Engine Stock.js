/*CMD
  command: 🚀 Kos Engine Stock
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
command: 🚀 Kos Engine Stock
*/

// helper function
function countStock(key) {
  let arr = Bot.getProperty(key);
  if (!arr || !Array.isArray(arr)) return 0;
  return arr.length;
}

// durations
let durations = ["1", "7", "15", "30"];

let msg = "🚀 Kos Engine Stock:\n\n";

// games (Soccer removed, Free Fire added)
let games = ["8bp", "carrom"];

for (let g of games) {

  msg += "🎮 " + g.toUpperCase() + ":\n";

  for (let d of durations) {

    let key = "kos_" + g + "_" + d + "_stock";

    msg +=
      " " + d +
      " day ➜ " +
      countStock(key) +
      " keys\n";
  }

  msg += "\n";
}

Api.sendMessage({
  text: msg
});
