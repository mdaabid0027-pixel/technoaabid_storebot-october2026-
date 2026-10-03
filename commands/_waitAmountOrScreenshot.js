/*CMD
  command: /waitAmountOrScreenshot
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

/*CMD
command: sendPhoto
need_reply: true
*/

let admin = Bot.getProperty("admin");
let amount = User.getProperty("add_amount");

if (!request.photo) {
  Bot.sendMessage("📸 कृपया payment screenshot भेजें");
  Bot.runCommand("sendPhoto");
  return;
}

let file_id = request.photo[request.photo.length - 1].file_id;

// user name
let name = user.first_name + (user.last_name ? " " + user.last_name : "");

// buttons
let buttons = [
  [
    { text: "✅ Approve", callback_data: "/approve " + user.telegramid },
    { text: "❌ Reject", callback_data: "/rej " + user.telegramid }
  ]
];

// send to admin
Api.sendPhoto({
  chat_id: admin,
  photo: file_id,
  parse_mode: "HTML",
  caption:
    "📢 <b>New payment request</b>\n\n" +
    "👤 Name: " + name +
    "\n📛 Username: @" + (user.username || "NoUsername") +
    "\n🆔 ID: <code>" + user.telegramid + "</code>" +
    "\n💰 Amount: ₹" + amount +
    "\n\nShortcut:\n" +
    "<code>/addbalance " + user.telegramid + " " + amount + "</code>",
  reply_markup: { inline_keyboard: buttons }
});

// user message
Bot.sendMessage(
  "✅ धन्यवाद!\n\nScreenshot admin को भेज दिया गया है.\nVerification के बाद balance add होगा."
);

// redirect start
Bot.runCommand("/st");
