/*CMD
  command: ⚡ Shinigami Stock
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
command: ⚡ Shinigami Stock
*/

// ===== STOCK COUNT =====

function countStock(key) {
  let arr = Bot.getProperty(key);

  if (!arr || !Array.isArray(arr)) {
    return 0;
  }

  return arr.length;
}


// ===== DURATIONS =====

let durations = [
  "1",
  "3",
  "7",
  "15",
  "30",
  "90"
];


// ===== GAME =====

let game = "carrom";


// ===== MESSAGE =====

let msg = "⚡ Shinigami Stock:\n\n";

msg += "🎮 Carrom:\n";

for (let d of durations) {
  let key =
    "shinigami_" +
    game +
    "_" +
    d +
    "_stock";

  msg +=
    "• " +
    d +
    " Days ➜ " +
    countStock(key) +
    " keys\n";
}


// ===== SEND =====

Api.sendMessage({
  text: msg
});
