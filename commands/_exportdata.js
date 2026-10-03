/*CMD
  command: /exportdata
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
  command: /exportdata
  folder: Admin Panel
*/

let admin = Bot.getProperty("admin");

if (user.telegramid != admin) {
  return Bot.sendMessage("❌ Only admin can use this command.");
}

let users = Bot.getProperty("user_list");
if (!users) { users = []; }

let text = "📦 BOT DATA BACKUP\n\n";

text += "👥 Total Users: " + users.length + "\n\n";

let totalBalance = 0;

text += "👤 USER BALANCES\n\n";

for (let i = 0; i < users.length; i++) {

let uid = users[i];
let bal = Bot.getProperty(uid + "_balance") || 0;

totalBalance += bal;

text += uid + " | ₹" + bal + "\n";

}

text += "\n💰 TOTAL BOT BALANCE: ₹" + totalBalance + "\n\n";

text += "📦 STOCK SUMMARY\n\n";

let stocks = Bot.getProperties();

for (let key in stocks) {

if (key.includes("stock") && Array.isArray(stocks[key])) {

text += key + " : " + stocks[key].length + " keys\n";

}

}

Bot.sendMessage(text);
