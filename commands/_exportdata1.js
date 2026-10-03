/*CMD
  command: /exportdata1
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
command: /exportdata1
*/

let users = Bot.getProperty("user_list");

if (!users) {
  return Bot.sendMessage("No users found");
}

let text = "USER DATA BACKUP\n\n";

for (let i in users) {

let uid = users[i];

let balance = Bot.getProperty(uid + "_balance") || 0;

text += uid + " | ₹" + balance + "\n";

}

Bot.sendMessage(text);
