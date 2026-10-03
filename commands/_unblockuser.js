/*CMD
  command: /unblockuser
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
command: /unblockuser
folder: Admin Panel
*/

let admin = Bot.getProperty("admin");

if (user.telegramid != admin) {
  Bot.sendMessage("❌ Only admin can unblock users.");
  return;
}

let parts = message.split(" ");

if (parts.length < 2) {
  Bot.sendMessage("⚠️ Use:\n/unblockuser USERID");
  return;
}

let target = parts[1];

let blocked = Bot.getProperty("blocked_users") || [];

blocked = blocked.filter(id => id != target);

Bot.setProperty("blocked_users", blocked, "json");

Bot.sendMessage("✅ User unblocked successfully:\n" + target);
