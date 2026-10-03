/*CMD
  command: /testlog
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
  command: /testlog
*/

let admin = Bot.getProperty("admin");
if (user.telegramid != admin) return;

let logAdmin = Bot.getProperty("log_admin");

if (!logAdmin) {
  Bot.sendMessage("❌ Log admin not set.");
  return;
}

Api.sendMessage({
  chat_id: logAdmin,
  text: "✅ Test message received on second account."
});

Bot.sendMessage("Test message sent to log admin.");
