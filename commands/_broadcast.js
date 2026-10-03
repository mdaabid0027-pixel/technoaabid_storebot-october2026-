/*CMD
  command: /broadcast
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/*CMD
command: /broadcast
need_reply: false
*/

let admin =
Bot.getProperty("admin");

if(user.telegramid != admin){

return Bot.sendMessage(
"Only admin allowed."
);

}

let text =
message.replace("/broadcast","").trim();

if(!text){

return Bot.sendMessage(
"Usage:\n/broadcast hello"
);

}

let total =
Bot.getProperty("next_botid");

Bot.setProperty(
"broadcast_text",
text,
"string"
);

Bot.setProperty(
"broadcast_botid",
1,
"integer"
);

Bot.sendMessage(
"📤 Broadcast Started\n\n" +
"👥 Total Users: " + total
);

Bot.run({
command:
"/broadcastWorker",

run_after: 1
});
