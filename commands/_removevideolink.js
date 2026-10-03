/*CMD
  command: /removevideolink
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
command: /removevideolink
folder: Admin Panel
*/

let admin = Bot.getProperty("admin");

if(user.telegramid != admin){

Bot.sendMessage("❌ Only admin allowed.");
return;

}

// remove video link
Bot.setProperty(
"tutorial_video_link",
null,
"string"
);

Bot.sendMessage(
"✅ Tutorial video link removed."
);
