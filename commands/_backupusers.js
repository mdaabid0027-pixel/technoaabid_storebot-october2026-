/*CMD
  command: /backupusers
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
  command: /backupusers
  folder: Admin Panel
*/

let admin = Bot.getProperty("admin");
if (user.telegramid != admin) return;

let list = Bot.getProperty("user_list");
if (!list) list = [];

let output = "USER BACKUP\n\n";

for (var i = 0; i < list.length; i++) {

  let uid = list[i];

  let bal = Bot.getProperty(uid + "_balance");
  if (!bal) bal = 0;

  let uname = Bot.getProperty(uid + "_username");
  if (!uname) uname = "NoUsername";

  output +=
    "ID: " + uid +
    " | @" + uname +
    " | ₹" + bal + "\n";
}

// Agar empty ho
if (output === "USER BACKUP\n\n") {
  output += "No users found.";
}

Api.sendMessage({
  chat_id: admin,
  text: output
});
