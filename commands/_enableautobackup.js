/*CMD
  command: /enableautobackup
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
  command: /enableautobackup
  folder: Admin Panel
*/

let admin = Bot.getProperty("admin");
if (user.telegramid != admin) return;

Bot.setProperty("auto_backup", true, "boolean");

Api.sendMessage({
  text: "✅ Auto backup enabled.\n⏰ Backup will run every 1 hour."
});

// Start first backup loop
Bot.runCommand("/runbackup");
