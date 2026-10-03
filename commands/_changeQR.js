/*CMD
  command: /changeQR
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
  command: /changeQR
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Admin Panel 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

let admin = Bot.getProperty("admin");

if (user.telegramid != admin) {
  return Api.sendMessage({
    text: "⚠️ Only admin can change the QR image.",
    parse_mode: "HTML"
  });
}

// Split command parts
let parts = message.split(" ");
if (parts.length < 2) {
  return Api.sendMessage({
    text: "❗ Format:\n<code>/changeQR IMAGE_URL</code>",
    parse_mode: "HTML"
  });
}

let imageUrl = parts[1].trim();

// Save QR image URL
Bot.setProperty("qr_image_url", imageUrl, "string");

Api.sendMessage({
  text: `✔️ <b>QR image updated successfully!</b>\n\nNew URL:\n<code>${imageUrl}</code>`,
  parse_mode: "HTML"
});


