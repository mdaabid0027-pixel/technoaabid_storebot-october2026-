/*CMD
  command: sendPhoto
  help: 
  need_reply: true
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
command: sendPhoto
need_reply: true
*/

let admin = Bot.getProperty("admin");
let alertChannel = Bot.getProperty("alert_channel");

if (!request.photo) {
  Bot.sendMessage("📸 Please send payment screenshot.");
  return;
}

let file_id = request.photo[request.photo.length - 1].file_id;

// full name
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
    "📢 <b>New Payment Request</b>\n\n" +
    "👤 Name: " + name +
    "\n📛 Username: @" + (user.username || "NoUsername") +
    "\n🆔 User ID: <code>" + user.telegramid + "</code>" +
    "\n\n⚡ Shortcut:\n" +
    "<code>/addbalance " + user.telegramid + " 0</code>",
  reply_markup: { inline_keyboard: buttons }
});


// ✅ ALERT CHANNEL MESSAGE
if (alertChannel) {
  Api.sendMessage({
    chat_id: alertChannel,
    text:
      "🚨 New Request\n" +
      "@" + (user.username || "NoUsername") +
      " | ID: " + user.telegramid
  });
}


// user confirmation message
Bot.sendMessage(
  "✅ Thank you!\n\nYour payment screenshot has been sent to admin.\nBalance will be added after verification."
);

// redirect
Bot.runCommand("/start");
