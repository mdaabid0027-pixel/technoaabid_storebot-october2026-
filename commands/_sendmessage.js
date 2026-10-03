/*CMD
  command: /sendmessage
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
command: /sendmessage
folder: Admin Panel
*/

let admin = Bot.getProperty("admin");

if (user.telegramid != admin) {
  Bot.sendMessage("❌ Only admin allowed.");
  return;
}

let parts = message.split(" ");

if (parts.length < 2) {
  Bot.sendMessage("⚠️ Use:\n/sendmessage USERID");
  return;
}

let target = parts[1];

// save target
User.setProperty("msg_target", target, "string");

Bot.sendMessage("✍️ Send message you want to deliver:");
Bot.runCommand("sendMsgNow");
