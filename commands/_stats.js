/*CMD
  command: /stats
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
command: /stats
*/

let users = Bot.getProperty("user_list") || [];
let team = Bot.getProperty("team_list") || [];

Bot.sendMessage(
"📊 Bot Statistics\n\n" +
"👤 Total Users: " + users.length +
"\n💼 Total Resellers: " + team.length
);
