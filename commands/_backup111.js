/*CMD
  command: /backup111
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
  command: /backupall
  folder: Admin Panel
*/

let admin = Bot.getProperty("admin");
if (user.telegramid != admin) return;

let users = Bot.getProperty("user_list") || [];
let start = Bot.getProperty("backup_index") || 0;

let text = "===== USER BACKUP =====\n\n";
let limit = 50;
let end = start + limit;

for (let i = start; i < end && i < users.length; i++) {

  let uid = users[i];

  let username = Bot.getProperty(uid + "_username") || "NoUsername";
  let balance = Bot.getProperty(uid + "_balance") || 0;

  text += "ID: " + uid + " | @" + username + " | ₹" + balance + "\n";
}

Api.sendMessage({
  chat_id: admin,
  text: text
});

// save next position
Bot.setProperty("backup_index", end, "integer");

if (end < users.length) {

  // continue backup
  Bot.run({
    command: "/backupall",
    run_after: 1
  });

} else {

  // reset index
  Bot.setProperty("backup_index", 0, "integer");

  Api.sendMessage({
    chat_id: admin,
    text: "✅ User backup finished."
  });

  // run stock backup
  Bot.runCommand("/backupstockes");

}
