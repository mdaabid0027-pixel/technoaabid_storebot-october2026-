/*CMD
  command: /runbackup
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
  command: /runbackup
*/

let admin = Bot.getProperty("admin");
if (user.telegramid != admin) return;

// ===== USER DATA =====
let users = Bot.getProperty("user_list") || [];
let text = "===== USER DATA =====\n\n";

for (let i = 0; i < users.length; i++) {

  let uid = users[i];
  let username = Bot.getProperty(uid + "_username") || "NoUsername";
  let balance = Bot.getProperty(uid + "_balance") || 0;

  text += "ID: " + uid + " | @" + username + " | ₹" + balance + "\n";
}

// ===== STOCK DATA =====
text += "\n===== STOCK DATA =====\n\n";

let stockKeys = [
  "carom_3day_stock",
  "carom_10day_stock",
  "carom_30day_stock",
  "carom_90day_stock",
  "soccer_3day_stock",
  "soccer_10day_stock",
  "soccer_30day_stock",
  "soccer_90day_stock",
  "8bp_3day_stock",
  "8bp_10day_stock",
  "8bp_30day_stock",
  "8bp_90day_stock"
];

for (let i = 0; i < stockKeys.length; i++) {

  let stock = Bot.getProperty(stockKeys[i]) || [];

  text += "=== " + stockKeys[i] + " ===\n";

  if (stock.length == 0) {
    text += "No Keys\n\n";
  } else {
    for (let j = 0; j < stock.length; j++) {
      text += (j + 1) + ". " + stock[j] + "\n";
    }
    text += "\n";
  }
}

// ===== SAFE SPLIT (NO 4096 ERROR) =====
let chunkSize = 3900;

for (let i = 0; i < text.length; i += chunkSize) {
  Api.sendMessage({
    chat_id: admin,
    text: text.substring(i, i + chunkSize)
  });
}
