/*CMD
  command: /removeteam
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

let admin = Bot.getProperty("admin");

if (user.telegramid != admin) {
  Bot.sendMessage("Only admin allowed.");
  return;
}

let parts = message.split(" ");

if (parts.length < 2) {
  Bot.sendMessage("Usage:\n/removeteam USERID");
  return;
}

let uid = parts[1];

let team = Bot.getProperty("team_list");
if (!team) team = [];

team = team.filter(id => id != uid);

Bot.setProperty("team_list", team, "json");

Bot.sendMessage("User removed from team.");
