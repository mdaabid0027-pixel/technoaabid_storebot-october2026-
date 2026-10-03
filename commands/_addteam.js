/*CMD
  command: /addteam
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

let admin = Bot.getProperty("admin");; // 👈 apna Telegram ID daalo

if (user.telegramid != admin) {
  Bot.sendMessage("Only admin allowed.");
  return;
}

let text = message.replace("/addteam", "").trim();

if (!text) {
  Bot.sendMessage("Usage:\n/addteam USERID USERID USERID");
  return;
}

// Split by space or comma
let ids = text.split(/[\s,]+/);

let team = Bot.getProperty("team_list");
if (!team) team = [];

let added = 0;

for (let i = 0; i < ids.length; i++) {
  let uid = ids[i].trim();
  
  if (uid && !team.includes(uid)) {
    team.push(uid);
    added++;
  }
}

Bot.setProperty("team_list", team, "json");

Bot.sendMessage("✅ " + added + " users added to team.");
