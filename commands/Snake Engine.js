/*CMD
  command: Snake Engine
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
command: Snake Engine
*/

Bot.setProperty(user.telegramid + "_selected_app", "snake", "string");
User.setProperty("purchase_step", "game", "string");

Bot.runCommand("selectGameMenu");
