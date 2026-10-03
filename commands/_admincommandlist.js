/*CMD
  command: /admincommandlist
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
  command: /admincommandlist
  folder: Admin Panel
*/

let admin = Bot.getProperty("admin");

if (user.telegramid != admin) return;

let msg =
"👑 <b>ADMIN COMMAND LIST</b>\n\n" +

"👥 <b>User & Team Management</b>\n" +
"/userlist - View all users\n" +
"/addreseller USERID USERID... - Add reseller(s)\n" +
"/removereseller USERID - Remove reseller\n" +
"/addteam USERID - Add team member\n" +
"/removeteam USERID - Remove team member\n" +
"/teamlist - View team members\n" +
"/teambroadcast MESSAGE - Message to team only\n\n" +

"💰 <b>Balance System</b>\n" +
"/addbalance USERID AMOUNT - Add balance\n" +
"/removebalance USERID AMOUNT - Remove balance\n\n" +

"📢 <b>Broadcast System</b>\n" +
"/broadcast MESSAGE - Broadcast to all users\n\n" +

"📦 <b>Backup System</b>\n" +
"/backupall - Full backup\n" +
"/backupusers - Users backup\n" +
"/backupstockes - Stock backup\n\n" +

"━━━━━━━━━━━━━━\n" +
"🔐 Admin ID: <code>" + admin + "</code>";

Api.sendMessage({
  text: msg,
  parse_mode: "HTML"
});
