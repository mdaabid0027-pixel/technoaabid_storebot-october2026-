/*CMD
  command: /addbalance
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
  command: /addbalance
  folder: Admin Panel
*/

let admin = Bot.getProperty("admin");

if (user.telegramid != admin) {
  return Api.sendMessage({
    text: "⚠️ Only admin can add balance.",
    parse_mode: "HTML"
  });
}

let parts = message.trim().split(/\s+/);

if (parts.length < 3) {
  return Api.sendMessage({
    text: "❗ Format:\n<code>/addbalance USERID AMOUNT [TXNID]</code>",
    parse_mode: "HTML"
  });
}

let targetId = parts[1].trim();
let amount = parseFloat(parts[2].trim());
let txnId = parts[3] ? parts[3] : "Manual";

if (isNaN(amount) || amount <= 0) {
  return Api.sendMessage({
    text: "❌ Invalid amount.",
    parse_mode: "HTML"
  });
}

// Get username & name
let username = Bot.getProperty(targetId + "_username");
let name = Bot.getProperty(targetId + "_name");

if (!username || username == "undefined") username = "NoUsername";
if (!name || name == "undefined") name = "NoName";

// Balance
let key = targetId + "_balance";
let currentBalance = Bot.getProperty(key);
if (!currentBalance) currentBalance = 0;

let newBalance = currentBalance + amount;

Bot.setProperty(key, newBalance, "float");

// Save transaction
let history = Bot.getProperty(targetId + "_transactions");
if (!history) history = [];

history.push({
  type: "ADD",
  amount: amount,
  txn: txnId,
  date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
});

Bot.setProperty(targetId + "_transactions", history, "json");

// Date
let now = new Date();
let dateStr = now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

// 📡 CHANNEL LOG
let logChannel = Bot.getProperty("log_channel")

if(logChannel){
Api.sendMessage({
chat_id: logChannel,
parse_mode: "HTML",
text:
"💰 <b>BALANCE ADDED</b>\n\n" +
"👤 Name: " + name +
"\n🔗 Username: @" + username +
"\n🆔 ID: <code>" + targetId + "</code>" +
"\n\n💰 Amount: " + amount + " INR" +
"\n📊 New Balance: " + newBalance + " INR" +
"\n🧾 Txn: " + txnId +
"\n🕒 " + dateStr
})
}

// ✅ ADMIN MESSAGE
Api.sendMessage({
  chat_id: admin,
  text:
    `✅ <b>Balance Added</b>\n\n` +
    `👤 Name: ${name}\n` +
    `🔗 Username: @${username}\n` +
    `🆔 User ID: <code>${targetId}</code>\n\n` +
    `💰 Added: ${amount} INR\n` +
    `📊 New Balance: ${newBalance} INR\n` +
    `🧾 Txn ID: ${txnId}\n` +
    `🕒 ${dateStr}`,
  parse_mode: "HTML"
});

// ✅ USER MESSAGE
Api.sendMessage({
  chat_id: targetId,
  text:
    `✅ <b>Payment Approved</b>\n\n` +
    `💰 ${amount} INR added.\n` +
    `📊 Current Balance: ${newBalance} INR\n` +
    `🧾 Txn: ${txnId}`,
  parse_mode: "HTML"
});
