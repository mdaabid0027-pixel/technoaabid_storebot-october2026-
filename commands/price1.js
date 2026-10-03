/*CMD
  command: price1
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
command: price1
*/

User.setProperty("price_duration", "1", "string");

Bot.sendMessage("Enter price:");

Bot.runCommand("savePriceValue");
