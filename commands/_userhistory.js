/*CMD
  command: /userhistory
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: /userhistory userid
  keyboard: 
  aliases: 
  group: 
CMD*/

/*CMD
command: /userhistory
*/

let admin = Bot.getProperty("admin");

if(user.telegramid != admin){
Bot.sendMessage("⚠️ Only admin can use this command.");
return;
}

let parts = message.split(" ");

if(parts.length < 2){

Bot.sendMessage(
"Usage:\n/userhistory USERID"
);

return;
}

let target = parts[1];

let history = Bot.getProperty(target + "_purchase_history");

if(!history || history.length == 0){

Bot.sendMessage(
"📭 No purchase history found for this user."
);

return;
}

Bot.sendMessage(
"🧾 Purchase History of User:\n\n" +
history.join("\n\n")
);
