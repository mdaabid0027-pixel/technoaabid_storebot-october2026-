/*CMD
  command: /setkoslink
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: Kos Engine Download link send
  keyboard: 
  aliases: 
  group: 
CMD*/

/*CMD
command: /setkoslink
need_reply: true
*/

let admin = Bot.getProperty("admin");

if(user.telegramid != admin){
Bot.sendMessage("❌ Only admin can set link.");
return;
}

Bot.setProperty("kos_download_link", message, "string");

Bot.sendMessage("✅ Kos Engine download link updated.");
