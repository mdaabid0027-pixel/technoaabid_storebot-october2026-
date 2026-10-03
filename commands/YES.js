/*CMD
  command: YES
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
command: YES
*/

let app = Bot.getProperty(user.telegramid + "_selected_app");

if(app == "snake"){
Bot.runCommand("/co");
Bot.runCommand("/start");
return;
}

if(app == "kos"){
Bot.runCommand("/kosco");
Bot.runCommand("/start");
return;
}

// fallback safety
Bot.runCommand("/start");
