/*CMD
  command: Cancel❌
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
command: Cancel❌
*/

User.setProperty("add_amount", null);

Bot.sendMessage("❌ Payment process cancelled.");

Bot.runCommand("/startt");
