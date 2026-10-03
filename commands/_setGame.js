/*CMD
  command: /setGame
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
command: /setGame
*/

let game = params;
let uid = user.telegramid;

Bot.setProperty(uid + "_selected_game", game, "string");

let app = Bot.getProperty(uid + "_selected_app");

// Snake Engine purchase
if (app == "snake") {
  Bot.runCommand("/co");
  return;
}

// Kos Engine purchase
if (app == "kos") {
  Bot.runCommand("/kosco");
  return;
}
