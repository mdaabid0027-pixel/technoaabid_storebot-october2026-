/*CMD
  command: 8
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
  command: 8
*/

let qty = parseInt(message);
let uid = user.telegramid;

Bot.setProperty(uid + "_bulk_qty", qty, "integer");

Bot.runCommand("/bulkConfirm");
