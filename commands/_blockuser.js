/*CMD
  command: /blockuser
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
command: /blockuser
folder: Admin Panel
*/

let admin = Bot.getProperty("admin");

if (user.telegramid != admin) {
  Bot.sendMessage("❌ Only admin can block users.");
  return;
}

let parts = message.split(" ");

if (parts.length < 2) {
  Bot.sendMessage("⚠️ Use:\n/blockuser USERID");
  return;
}

let target = parts[1];

let blocked = Bot.getProperty("blocked_users") || [];

if (!blocked.includes(target)) {
  blocked.push(target);
}

Bot.setProperty("blocked_users", blocked, "json");

Bot.sendMessage("🚫 User blocked successfully:\n" + target);
