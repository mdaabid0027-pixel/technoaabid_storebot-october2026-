/*CMD
  command: /saveuser
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

let list = Bot.getProperty("user_list");
if (!list) list = [];

if (!list.includes(user.telegramid)) {
  list.push(user.telegramid);
  Bot.setProperty("user_list", list, "json");
}
