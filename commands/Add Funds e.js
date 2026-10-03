/*CMD
  command: Add Funds e
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
command: Add Funds h
need_reply: false
*/

Bot.sendMessage(
"💰 How much balance do you want to add?\n\nEnter amount (example: 100)"
);

Bot.runCommand("getAmount");
