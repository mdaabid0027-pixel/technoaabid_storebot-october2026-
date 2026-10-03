/*CMD
  command: /startt
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
command: /startt
*/

let uid = user.telegramid.toString();

// Balance & Role check
let balance = Bot.getProperty(uid + "_balance") || 0;
let teamList = Bot.getProperty("team_list") || [];
let isReseller = teamList.map(String).includes(uid);
let role = isReseller ? "Reseller" : "User";

// Clean message without welcome text
let msg = 
  "📂 **Account Info:**\n" +
  "🆔 User ID: `" + uid + "`\n" +
  "👑 Role: " + role + "\n" +
  "💰 Balance: ₹" + balance + "\n\n" +
  "👇 *Choose an option below:*";

// Menu buttons only
Api.sendMessage({
  text: msg,
  parse_mode: "HTML",
  reply_markup: {
    keyboard: [
      [{ text: "🛒 Purchase Product", style: "primary" }],
      [{ text: "💳 Check Balance", style: "danger" }, { text: "➕ Add Balance", style: "danger" }],
      [{ text: "📦 Check Stock", style: "success" }, { text: "🧾 Purchase History", style: "success" }]
    ],
    resize_keyboard: true
  }
});
