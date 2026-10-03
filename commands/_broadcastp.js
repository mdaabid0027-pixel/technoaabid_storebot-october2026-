/*CMD
  command: /broadcastp
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: send
  keyboard: 
  aliases: 
  group: 
CMD*/

/*CMD
command: /broadcast
need_reply: true
*/

let OWNER_ID = Bot.getProperty("admin");;

if (user.telegramid != OWNER_ID){
  return Bot.sendMessage("Only admin allowed.");
}

let users = Bot.getProperty("user_list") || [];

if (users.length == 0){
  return Bot.sendMessage("No users found.");
}

let sent = 0;


// PHOTO BROADCAST
if(request.photo){

let file_id = request.photo[request.photo.length - 1].file_id
let caption = request.caption || ""

for (var i = 0; i < users.length; i++){

  Api.sendPhoto({
    chat_id: users[i],
    photo: file_id,
    caption: caption,
    parse_mode: "HTML",
    on_error: "/broadcastError"
  });

  sent++;
}

Bot.sendMessage("✅ Broadcast Sent To " + sent + " Users.");
return
}


// TEXT BROADCAST (OLD SYSTEM)
let text = message;

for (var i = 0; i < users.length; i++){

  Api.sendMessage({
    chat_id: users[i],
    text: text,
    parse_mode: "HTML",
    on_error: "/broadcastError"
  });

  sent++;
}

Bot.sendMessage("✅ Broadcast Sent To " + sent + " Users.");
