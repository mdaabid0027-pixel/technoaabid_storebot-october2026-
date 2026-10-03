/*CMD
  command: 💳 Check Balance
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/*CMD
command: Check Balance
*/

let bal = Bot.getProperty(user.telegramid + "_balance") || 0;

Bot.sendMessage("Your Balance: ₹" + bal);
