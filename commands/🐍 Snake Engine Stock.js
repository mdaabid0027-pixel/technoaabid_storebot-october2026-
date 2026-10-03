/*CMD
  command: 🐍 Snake Engine Stock
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
command: 🐍 Snake Engine Stock
*/

// helper function
function countStock(key) {
  let arr = Bot.getProperty(key);
  if (!arr || !Array.isArray(arr)) return 0;
  return arr.length;
}

// durations
let durations = ["3", "10", "30", "90"];

let msg = "🐍 Snake Engine Stock:\n\n";

// games
let games = ["8bp", "carrom"];

for (let g of games) {

  msg += "🎮 " + g.toUpperCase() + ":\n";

  for (let d of durations) {

    let key = "snake_" + g + "_" + d + "_stock";

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
