/*CMD
  command: 🤖 AimAI Stock
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
command: 🤖 AimAI Stock
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


// ===== MESSAGE =====

let msg = "🤖 AimAI Stock:\n\n";

// --- 8 Ball Pool ---
let game8bp = "8bp";
msg += "🎮 8 Ball Pool:\n";

for (let d of durations) {
  let key =
    "aimai_" +
    game8bp +
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

msg += "\n";

// --- Carrom ---
let gameCarrom = "carrom";
msg += "🎮 Carrom:\n";

for (let d of durations) {
  let key =
    "aimai_" +
    gameCarrom +
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
