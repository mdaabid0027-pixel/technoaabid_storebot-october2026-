/*CMD
  command: 1 Day
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
command: 1 Day
*/

Bot.setProperty(user.telegramid + "_selected_duration", "1", "string");

User.setProperty("purchase_step", "duration", "string");

Bot.runCommand("confirmPurchase");
