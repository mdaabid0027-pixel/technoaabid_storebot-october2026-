/*CMD
  command: /userlist
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
  command: /userlist
  folder: Admin Panel
*/

let admin = Bot.getProperty("admin");
if (user.telegramid != admin) return;

let users = Bot.getProperty("user_list") || [];

let msg = "👥 USER LIST\n\n";
msg += "Total Users: " + users.length + "\n\n";

for (let i = 0; i < users.length; i++) {

  let uid = users[i];

  let username = Bot.getProperty(uid + "_username") || "NoUsername";
  let name = Bot.getProperty(uid + "_name") || "NoName";

  msg += (i + 1) + ". @" + username + " | " + name + " | " + uid + "\n";

  // telegram safe limit
  if (msg.length > 3500) {
    Api.sendMessage({
      chat_id: admin,
      text: msg
    });
    msg = "";
  }
}

if (msg != "") {
  Api.sendMessage({
    chat_id: admin,
    text: msg
  });
}
