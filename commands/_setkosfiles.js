/*CMD
  command: /setkosfiles
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 

  <<ANSWER
Send Kos Engine APK file to set
/getfiles
  ANSWER
  keyboard: 
  aliases: 
  group: 
CMD*/

/*CMD
command: /setkosfiles
need_reply: true
folder: Admin Panel
*/

let admin = Bot.getProperty("admin");

if(user.telegramid != admin){
Bot.sendMessage("❌ Only admin allowed.");
return;
}

if(!request.document){

Bot.sendMessage("📂 Please send Kos APK file.");
return;

}

Bot.setProperty("kos_file_id", request.document.file_id, "string");

Bot.sendMessage("✅ Kos APK file saved successfully.");
