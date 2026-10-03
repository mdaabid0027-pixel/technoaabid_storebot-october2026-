/*CMD
  command: price7
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
command: price7
*/

User.setProperty("price_duration", "7", "string");

Bot.sendMessage("Enter price:");

Bot.runCommand("savePriceValue");
