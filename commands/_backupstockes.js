/*CMD
  command: /backupstockes
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
  command: /backupstockes
  folder: Admin Panel
*/

let admin = Bot.getProperty("admin");
if (user.telegramid != admin) return;

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

  if (stock.length == 0) {
    Api.sendMessage({
      chat_id: admin,
      text: "===== " + stockKeys[i] + " =====\nNo Keys Available"
    });
  } else {

    let msg = "===== " + stockKeys[i] + " =====\n\n";

    for (let j = 0; j < stock.length; j++) {
      msg += (j + 1) + ". " + stock[j] + "\n";
    }

    Api.sendMessage({
      chat_id: admin,
      text: msg
    });
  }
}
