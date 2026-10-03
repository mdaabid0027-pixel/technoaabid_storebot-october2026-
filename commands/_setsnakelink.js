/*CMD
  command: /setsnakelink
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: Snake Engine link
  keyboard: 
  aliases: 
  group: 
CMD*/

/*CMD
command: /setsnakelink
need_reply: true
*/

let admin = Bot.getProperty("admin");

if(user.telegramid != admin){
Bot.sendMessage("❌ Only admin can set link.");
return;
}

Bot.setProperty("snake_download_link", message, "string");

Bot.sendMessage("✅ Snake Engine download link updated.");
