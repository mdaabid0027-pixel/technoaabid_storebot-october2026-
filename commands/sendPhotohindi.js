/*CMD
  command: sendPhotohindi
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

let admin = Bot.getProperty("admin");
let alertChannel = Bot.getProperty("alert_channel");

// Only process photo
if (!request.photo) {
  return;
}

let file_id = request.photo[request.photo.length - 1].file_id;

// user name
let name = user.first_name + (user.last_name ? " " + user.last_name : "");

// Buttons
let buttons = [
  [
    { text: "✅ Approve", callback_data: "/approve " + user.telegramid },
    { text: "❌ Reject", callback_data: "/rej " + user.telegramid }
  ]
];

// Send to admin
Api.sendPhoto({
  chat_id: admin,
  photo: file_id,
  parse_mode: "HTML",
  caption:
    "📢 <b>नया पेमेंट रिक्वेस्ट</b>\n\n" +
    "👤 <b>Name:</b> " + name + "\n" +
    "📛 <b>Username:</b> @" + (user.username || "NoUsername") + "\n" +
    "🆔 <b>User ID:</b> <code>" + user.telegramid + "</code>\n\n" +
    "⚡ <b>Shortcut:</b>\n" +
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


// User message
Bot.sendMessage(
  "✅ धन्यवाद!\n\n" +
  "आपका भुगतान स्क्रीनशॉट एडमिन को भेज दिया गया है।\n" +
  "🔍 सत्यापन के बाद आपका बैलेंस अपडेट कर दिया जाएगा।"
);

// redirect safely
Bot.runCommand("/st");
