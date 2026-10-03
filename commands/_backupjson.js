/*CMD
  command: /backupjson
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
  command: /backupjson
  folder: Admin Panel
*/

let admin = Bot.getProperty("admin");
if (user.telegramid != admin) return;

let list = Bot.getProperty("user_list") || [];
let backup = {};

for (var i = 0; i < list.length; i++) {

  let uid = list[i];

  backup[uid] = {
    balance: Bot.getProperty(uid + "_balance") || 0,
    username: Bot.getProperty(uid + "_username") || "NoUsername",
    name: Bot.getProperty(uid + "_name") || "NoName"
  };
}

Api.sendDocument({
  chat_id: admin,
  document: {
    file_name: "User_Backup.json",
    mime_type: "application/json",
    content: JSON.stringify(backup, null, 2)
  }
});
