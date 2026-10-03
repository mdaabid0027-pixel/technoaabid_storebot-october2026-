/*CMD
  command: /removebalance
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
  command: /removebalance
  folder: Admin Panel
*/

let admin = Bot.getProperty("admin");

if (user.telegramid != admin) {
  return Api.sendMessage({
    text: "⚠️ Only admin can remove balance.",
    parse_mode: "HTML"
  });
}

// Format: /removebalance USERID AMOUNT
let parts = message.trim().split(/\s+/);

if (parts.length < 3) {
  return Api.sendMessage({
    text: "❗ Correct format:\n<code>/removebalance USERID AMOUNT</code>",
    parse_mode: "HTML"
  });
}

let targetId = parts[1].trim();
let amount = parseFloat(parts[2].trim());

if (isNaN(amount) || amount <= 0) {
  return Api.sendMessage({
    text: "❌ Invalid amount. Enter positive number.",
    parse_mode: "HTML"
  });
}

// Get user details
let username = Bot.getProperty(targetId + "_username");
let name = Bot.getProperty(targetId + "_name");

if (!username || username == "undefined") username = "NoUsername";
if (!name || name == "undefined") name = "NoName";

// Balance
let key = targetId + "_balance";

let currentBalance = Bot.getProperty(key);
if (!currentBalance) currentBalance = 0;

// Prevent negative
if (currentBalance < amount) {
  return Api.sendMessage({
    text:
      `❌ Cannot remove ₹${amount}\n` +
      `User Balance: ₹${currentBalance}`,
    parse_mode: "HTML"
  });
}

let newBalance = currentBalance - amount;

Bot.setProperty(key, newBalance, "float");

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
"➖ <b>BALANCE REMOVED</b>\n\n" +
"👤 Name: " + name +
"\n🔗 Username: @" + username +
"\n🆔 ID: <code>" + targetId + "</code>" +
"\n\n💸 Removed: " + amount + " INR" +
"\n📊 New Balance: " + newBalance + " INR" +
"\n🕒 " + dateStr
})
}

// ✅ Admin message
Api.sendMessage({
  chat_id: admin,
  text:
    `⚠️ <b>Balance Removed</b>\n\n` +
    `👤 Name: ${name}\n` +
    `🔗 Username: @${username}\n` +
    `🆔 User ID: <code>${targetId}</code>\n\n` +
    `💸 Removed: ${amount} INR\n` +
    `📊 New Balance: ${newBalance} INR\n` +
    `🕒 ${dateStr}`,
  parse_mode: "HTML"
});

// ✅ User notification
Api.sendMessage({
  chat_id: targetId,
  text:
    `⚠️ <b>Balance Deducted</b>\n\n` +
    `💸 ${amount} INR has been deducted.\n` +
    `📊 Current Balance: ${newBalance} INR`,
  parse_mode: "HTML"
});
