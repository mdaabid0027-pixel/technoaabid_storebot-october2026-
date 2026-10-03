/*CMD
  command: /setbroadcast
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: Send Massege Image, Video ,apk and text Massge if you want ..

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/*CMD
command: /setbroadcast
need_reply: true
*/

let admin = Bot.getProperty("admin");
if (user.telegramid != admin){
  return Bot.sendMessage("Only admin allowed.");
}

let msg_id = request.message_id;
let type = "unknown";

if (request.text) type = "📝 Text";
else if (request.photo) type = "🖼 Photo";
else if (request.video) type = "🎥 Video";
else if (request.document) type = "📁 Document/APK";
else if (request.audio) type = "🎵 Audio";
else if (request.voice) type = "🎤 Voice";
else if (request.sticker) type = "😊 Sticker";
else if (request.animation) type = "🎭 GIF";
else if (request.video_note) type = "📹 Video Note";

Bot.setProperty("broadcast_msg_id", msg_id, "integer");
Bot.setProperty("broadcast_chat_id", user.telegramid, "integer");

Bot.sendMessage("✅ Message Saved!\n📌 Type: " + type + "\n\nAb /startbroadcast likho.");
