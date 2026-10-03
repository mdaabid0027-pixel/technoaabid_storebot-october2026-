/*CMD
  command: /bcSend
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
command: /bcSend
*/

let users = Bot.getProperty("bc_users") || [];
let text = Bot.getProperty("bc_text");
let index = Bot.getProperty("bc_index") || 0;

if (index >= users.length){

  Bot.sendMessage("✅ Broadcast Completed.\nTotal Users: " + users.length);

  Bot.setProperty("bc_text", null);
  Bot.setProperty("bc_users", null);
  Bot.setProperty("bc_index", null);

  return;
}

Api.sendMessage({
  chat_id: users[index],
  text: text
});

Bot.setProperty("bc_index", index + 1, "integer");

Bot.runCommand("/bcSend");
