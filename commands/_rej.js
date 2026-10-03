/*CMD
  command: /rej
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
command: /rej
*/

let admin = Bot.getProperty("admin");

if (user.telegramid != admin) {
  return;
}

let userid = params;

// fetch stored user details
let name = Bot.getProperty(userid + "_name") || "Unknown";
let username = Bot.getProperty(userid + "_username") || "NoUsername";

// current date-time
let now = new Date();
let dateStr = now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

// clickable user profile link
let userLink = '<a href="tg://user?id=' + userid + '">Open Profile</a>';


// ✅ ADMIN MESSAGE (Detailed English)
Api.editMessageCaption({
  chat_id: chat.chatid,
  message_id: request.message.message_id,
  parse_mode: "HTML",
  caption:
    "❌ <b>Payment Rejected</b>\n\n" +
    "👤 Name: " + name +
    "\n📛 Username: @" + username +
    "\n🆔 User ID: <code>" + userid + "</code>" +
    "\n🔗 Profile: " + userLink +
    "\n📅 Date: " + dateStr
});


// ✅ USER MESSAGE (English)
Api.sendMessage({
  chat_id: userid,
  parse_mode: "HTML",
  text:
    "❌ <b>Payment Rejected</b>\n\n" +
    "Your payment screenshot was not accepted.\n" +
    "Please upload a clear screenshot showing:\n\n" +
    "• UTR / Transaction ID\n" +
    "• Amount Paid\n" +
    "• Date & Time\n" +
    "• Payment Status (Successful)"
});
