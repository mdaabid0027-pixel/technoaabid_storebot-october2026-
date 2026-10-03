/*CMD
  command: /history
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
command: /history
*/

let history = User.getProperty("purchase_history");

if (!history || history.length === 0) {
  Bot.sendMessage(
    "📭 No purchase history found.\n\nYou haven't purchased any keys yet."
  );
  return;
}

let msg = "📜 Your Purchase History:\n\n";

for (let i = 0; i < history.length; i++) {
  msg += "🔹 " + history[i] + "\n\n";
}

Bot.sendMessage(msg);
