/*CMD
  command: /setvideolink
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
command: /setvideolink
folder: Admin Panel
*/

let admin = Bot.getProperty("admin");

if(user.telegramid != admin){

Bot.sendMessage("❌ Only admin allowed.");
return;

}

let args = message.split(" ");

if(args.length < 2){

Bot.sendMessage(
"Usage:\n\n/setvideolink LINK"
);

return;

}

let link = args.slice(1).join(" ");

// save single video link
Bot.setProperty(
"tutorial_video_link",
link,
"string"
);

Bot.sendMessage(
"✅ Tutorial video link saved."
);
