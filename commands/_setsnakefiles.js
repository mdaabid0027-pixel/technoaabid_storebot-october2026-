/*CMD
  command: /setsnakefiles
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: Snake Engine APK Send For set
  keyboard: 
  aliases: 
  group: 
CMD*/

/*CMD
command: /setsnakefiles
need_reply: true
folder: Admin Panel
*/

let admin = Bot.getProperty("admin");

if(user.telegramid != admin){
Bot.sendMessage("❌ Only admin allowed.");
return;
}

if(!request.document){

Bot.sendMessage("📂 Please send Snake APK file.");
return;

}

Bot.setProperty("snake_file_id", request.document.file_id, "string");

Bot.sendMessage("✅ Snake APK file saved successfully.");
