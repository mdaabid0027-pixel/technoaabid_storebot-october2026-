/*CMD
  command: /setupi
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: Send Your Upi Id
  keyboard: 
  aliases: 
  group: 
CMD*/

/*CMD
command: /setupi
need_reply: true
*/

let admin = Bot.getProperty("admin");

if (user.telegramid != admin) {
  return Bot.sendMessage("❌ Only admin can set UPI ID.");
}

// save UPI
Bot.setProperty("upi_id", message, "string");

Bot.sendMessage(
"✅ UPI ID saved successfully!\n\n" +
"Current UPI ID:\n" +
message
);
