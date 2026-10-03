/*CMD
  command: /disableautobackup
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
  command: /disableautobackup
  folder: Admin Panel
*/

let admin = Bot.getProperty("admin");
if (user.telegramid != admin) return;

Bot.setProperty("auto_backup", false, "boolean");

Api.sendMessage({
  text: "❌ Auto backup disabled."
});
