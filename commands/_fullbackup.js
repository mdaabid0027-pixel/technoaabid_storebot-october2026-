/*CMD
  command: /fullbackup
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
  command: /fullbackup
  folder: Admin Panel
*/

let admin = Bot.getProperty("admin");
if (user.telegramid != admin) return;

Bot.setProperty("backup_index", 0, "integer");
Bot.runCommand("/backup_chunk");
