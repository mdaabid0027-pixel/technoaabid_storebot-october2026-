/*CMD
  command: sendScreenshotToAdmin
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
command: sendScreenshotToAdmin
need_reply: true
*/

let admin = Bot.getProperty("admin");

// Only process photo
if (!request.photo) {
  return;
}

let file_id = request.photo[request.photo.length - 1].file_id;

// get saved amount
let amount = User.getProperty("add_amount") || 0;

// full name
let name = user.first_name + (user.last_name ? " " + user.last_name : "");

// buttons
let buttons = [
  [
    { text: "✅ Approve", callback_data: "/approve " + user.telegramid + " " + amount },
    { text: "❌ Reject", callback_data: "/rej " + user.telegramid }
  ]
];

// send to admin
Api.sendPhoto({
  chat_id: admin,
  photo: file_id,
  parse_mode: "HTML",
  caption:
    "📢 <b>New Payment Request</b>\n\n" +
    "👤 Name: " + name +
    "\n📛 Username: @" + (user.username || "NoUsername") +
    "\n🆔 User ID: <code>" + user.telegramid + "</code>" +
    "\n💰 Requested Amount: ₹" + amount +

    "\n\n⚡ <b>Manual Shortcut:</b>\n" +
    "<code>/addbalance " + user.telegramid + " AMOUNT</code>\n" +
    "Use this if user paid a different amount.",
    
  reply_markup: { inline_keyboard: buttons }
});

// user confirmation message
Bot.sendMessage(
  "✅ Thank you!\n\n" +
  "Your payment screenshot has been sent to the administrator.\n" +
  "Your balance will be updated after verification."
);

// redirect
Bot.runCommand("/startt");
