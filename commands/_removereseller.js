/*CMD
  command: /removereseller
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
command: /removereseller
folder: Admin Panel
*/

let admin = Bot.getProperty("admin");

if (user.telegramid != admin) {
  Bot.sendMessage("❌ Only admin can remove reseller.");
  return;
}

let args = message.trim().split(/\s+/);

if (args.length < 2) {
  Bot.sendMessage("❗ Format:\n/removereseller USERID USERID USERID");
  return;
}

let team = Bot.getProperty("team_list") || [];
team = team.map(String);

let removeIds = args.slice(1).map(String);
let removed = [];

for (let id of removeIds) {

  if (team.includes(id)) {

    // remove from reseller list
    team = team.filter(x => x != id);

    // clear reseller custom price grid
    Bot.setProperty(id + "_grid", {}, "json");

    // notify removed user
    Api.sendMessage({
      chat_id: id,
      text:
        "⚠️ Reseller Access Removed\n\n" +
        "You are now a normal user.\n" +
        "Normal pricing will apply automatically."
    });

    removed.push(id);
  }
}

Bot.setProperty("team_list", team, "json");

if (removed.length > 0) {
  Bot.sendMessage(
    "✅ Reseller removed successfully.\n\n" +
    removed.join("\n") +
    "\n\nNormal pricing restored."
  );
} else {
  Bot.sendMessage("⚠️ No matching reseller found.");
}
