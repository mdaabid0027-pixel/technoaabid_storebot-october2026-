/*CMD
  command: sendMsgNow
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

/*CMD
command: sendMsgNow
need_reply: true
*/

let admin = Bot.getProperty("admin");

if (user.telegramid != admin) return;

let target = User.getProperty("msg_target");

if (!target) {
  Bot.sendMessage("❌ Target user missing.");
  return;
}

Api.sendMessage({
  chat_id: target,
  text: message
});

Bot.sendMessage("✅ Message sent successfully to:\n" + target);

// clear
User.setProperty("msg_target", null);
