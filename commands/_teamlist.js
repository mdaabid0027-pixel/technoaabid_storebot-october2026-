/*CMD
  command: /teamlist
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let admin = Bot.getProperty("admin");

if (user.telegramid != admin) {
  Bot.sendMessage("Only admin allowed.");
  return;
}

let team = Bot.getProperty("team_list");

if (!team || team.length === 0) {
  Bot.sendMessage("No team members found.");
  return;
}

let listText = "📋 TEAM LIST\n\n";

let shortcut = "/addreseller ";

for (let i = 0; i < team.length; i++) {
  let memberId = team[i];
  listText += (i + 1) + ". " + memberId + "\n";
  shortcut += memberId + " ";
}

listText += "\nTotal Members: " + team.length;

Bot.sendMessage(listText);

// 🔥 Send shortcut in separate message (fully copyable)
Bot.sendMessage(shortcut.trim());
