/*CMD
  command: ✅ Order Confirm Karein
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
  command: ✅ Order Confirm Karein
*/

let uid = user.telegramid;

let qty = Bot.getProperty(uid + "_bulk_qty") || 1;
qty = parseInt(qty);
if (isNaN(qty) || qty <= 0) qty = 1;

Bot.runCommand("/Conf " + qty);
