/*CMD
  command: /setintrovideo
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
  command: /setintrovideo
  need_reply: true
*/

let admin = Bot.getProperty("admin");

if (user.telegramid != admin) {
  Bot.sendMessage("Only admin can set introduction video.");
  return;
}

if (!request.video) {
  Bot.sendMessage("Please send the video file.");
  return;
}

let fileId = request.video.file_id;

Bot.setProperty("intro_video", fileId, "string");

Bot.sendMessage("✅ Introduction video updated successfully.");
