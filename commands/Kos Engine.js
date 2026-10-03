/*CMD
  command: Kos Engine
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
command: Kos Engine
*/

Bot.setProperty(user.telegramid + "_selected_app", "kos", "string");
User.setProperty("purchase_step", "game", "string");

Bot.runCommand("selectGameMenu");
