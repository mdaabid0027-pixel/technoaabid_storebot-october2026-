/*CMD
  command: /usercount
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
  command: /usercount
  folder: Admin Panel
*/

let admin = Bot.getProperty("admin");
if (user.telegramid != admin) return;

let users = Bot.getProperty("user_list") || [];

Api.sendMessage({
  chat_id: admin,
  text: "👥 Total Users: " + users.length
});
