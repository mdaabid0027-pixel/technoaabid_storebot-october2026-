/*CMD
  command: /setaimaifiles
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: Send Apk AimAi

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/*CMD
command: /setaimaifile
need_reply: true
folder: Admin Panel
*/

let admin = Bot.getProperty("admin");

if(user.telegramid != admin){

  Bot.sendMessage("❌ Only admin allowed.");
  return;

}

if(!request.document){

  Bot.sendMessage("📂 Please send AimAI APK file.");
  return;

}

Bot.setProperty(
  "aimai_file_id",
  request.document.file_id,
  "string"
);

Bot.sendMessage(
  "✅ AimAI APK file saved successfully."
);
