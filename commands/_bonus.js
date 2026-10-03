/*CMD
  command: /bonus
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
  command: collect_bonus
  group: 
*/

let admin = Bot.getProperty("admin");
let uid = user.telegramid;

// Bonus settings
let BONUS_AMOUNT = 1; // ₹1
let COOLDOWN = 24 * 60 * 60 * 1000; // 24 hours in ms

let lastClaim = User.getProperty("last_bonus_time");
let now = new Date().getTime();

// ❌ Already claimed within 24 hours
if (lastClaim && (now - lastClaim) < COOLDOWN) {

  let remainingMs = COOLDOWN - (now - lastClaim);
  let hours = Math.ceil(remainingMs / (60 * 60 * 1000));

  return Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "⏳ Already claimed!\nCome back after " + hours + " hour(s).",
    show_alert: true
  });
}

// ✅ Can claim bonus
// Add balance
let balKey = uid + "_balance";
let balance = Number(Bot.getProperty(balKey)) || 0;
let newBalance = balance + BONUS_AMOUNT;

Bot.setProperty(balKey, newBalance, "float");
User.setProperty("last_bonus_time", now, "integer");

// ✅ User success message
Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: "🎉 Bonus Claimed!\n₹1 added to your wallet.",
  show_alert: true
});

// 📢 Notify ADMIN
Api.sendMessage({
  chat_id: admin,
  text:
    "🎁 <b>DAILY BONUS CLAIMED</b>\n\n" +
    "👤 <b>User:</b> @" + (user.username || "NoUsername") + "\n" +
    "🆔 <b>ID:</b> <code>" + uid + "</code>\n" +
    "💰 <b>Bonus:</b> ₹" + BONUS_AMOUNT + "\n" +
    "💼 <b>New Balance:</b> ₹" + newBalance.toFixed(2),
  parse_mode: "HTML"
});
