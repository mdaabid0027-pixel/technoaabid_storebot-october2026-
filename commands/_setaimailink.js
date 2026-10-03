/*CMD
  command: /setaimailink
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: send link aimai file

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/*CMD
command: /setaimailink
need_reply: true
*/

let admin = Bot.getProperty("admin");

if(user.telegramid != admin){
Bot.sendMessage("❌ Only admin can set link.");
return;
}

Bot.setProperty("aimai_download_link", message, "string");

Bot.sendMessage("✅ Aim Ai Engine download link updated.");
