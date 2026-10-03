/*CMD
  command: /teambroadcast
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

let text = message.replace("/teambroadcast", "").trim();

if (!text) {
  Bot.sendMessage("Usage:\n/teambroadcast Your message here");
  return;
}

let team = Bot.getProperty("team_list");

if (!team || team.length === 0) {
  Bot.sendMessage("No team members found.");
  return;
}

let count = 0;

for (let i = 0; i < team.length; i++) {
  Api.sendMessage({
    chat_id: team[i],
    text: text
  });
  count++;
}

Bot.sendMessage("Team broadcast sent to " + count + " members.");
