/*CMD
  command: /approve
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
command: /approve
*/

let admin = Bot.getProperty("admin");

if (user.telegramid != admin) {
  return;
}

// get user id
let userid = params;

// user details
let name = Bot.getProperty(userid + "_name") || "Unknown";
let username = Bot.getProperty(userid + "_username") || "NoUsername";

// date & time
let now = new Date();
let dateStr = now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

// edit admin message only
Api.editMessageCaption({
  chat_id: chat.chatid,
  message_id: request.message.message_id,
  parse_mode: "HTML",
  caption:
    "✅ <b>Payment Approved</b>\n\n" +
    "👤 Name: " + name + "\n" +
    "📛 Username: @" + username + "\n" +
    "🆔 User ID: <code>" + userid + "</code>\n" +
    "🕒 Time: " + dateStr + "\n\n" +
    "⚡ Shortcut:\n" +
    "<code>/addbalance " + userid + " 0</code>"
});
