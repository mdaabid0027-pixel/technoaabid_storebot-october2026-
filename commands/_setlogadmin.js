/*CMD
  command: /setlogadmin
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

if (user.telegramid != Bot.getProperty("admin")) return;

Bot.setProperty("log_admin", userid, "integer");
Bot.sendMessage("✅ Log admin set successfully");
