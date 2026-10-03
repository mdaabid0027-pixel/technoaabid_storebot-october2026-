/*CMD
  command: /backup_chunk
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
  command: /backup_chunk
*/

let admin = Bot.getProperty("admin");
if (user.telegramid != admin) return;

let userList = Bot.getProperty("user_list") || [];
let index = Bot.getProperty("backup_index") || 0;

let chunkSize = 10; // 10 users per batch

// 🔚 If all users printed → print stock
if (index >= userList.length) {

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

  let stockMsg = "===== STOCK COUNT =====\n\n";

  for (let i = 0; i < stockKeys.length; i++) {
    let stock = Bot.getProperty(stockKeys[i]) || [];
    stockMsg += stockKeys[i] + " : " + stock.length + " keys\n";
  }

  Api.sendMessage({
    chat_id: admin,
    text: stockMsg
  });

  return;
}

// 📦 Print 10 users
let message = "";

for (let i = index; i < index + chunkSize && i < userList.length; i++) {

  let uid = userList[i];
  let balance = Bot.getProperty(uid + "_balance") || 0;
  let username = Bot.getProperty(uid + "_username") || "NoUsername";

  message += "ID: " + uid + " | @" + username + " | ₹" + balance + "\n";
}

Api.sendMessage({
  chat_id: admin,
  text: message
});

// ⏭ Move index forward
Bot.setProperty("backup_index", index + chunkSize, "integer");

// 🔁 Run next batch
Bot.runCommand("/backup_chunk");
