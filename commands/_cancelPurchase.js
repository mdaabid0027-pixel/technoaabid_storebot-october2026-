/*CMD
  command: /cancelPurchase
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
command: /cancelPurchase
*/

Bot.setProperty(user.telegramid + "_bulk_qty", null, "integer");
Bot.sendMessage("❌ Purchase cancelled.");
Bot.runCommand("/start");
