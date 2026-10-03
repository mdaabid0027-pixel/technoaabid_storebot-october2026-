/*CMD
  command: Add Fund
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: If you want to add a different amount then write the amount below, minimum you can add ₹21.
  keyboard: 
  aliases: 
  group: 
CMD*/

/*CMD
command: Add Fund
*/

Bot.sendKeyboard(
"50, 100\n200, 300\n400, 500\n1000, Cancel❌",
"How much balance do you want to add?\n\nSelect amount from buttons OR type custom amount."
);

Bot.runCommand("getAmount");
