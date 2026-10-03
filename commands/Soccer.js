/*CMD
  command: Soccer
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
command: Soccer
*/

Bot.setProperty(user.telegramid + "_selected_game", "soccer", "string");
Bot.runCommand("selectDurationMenu");
