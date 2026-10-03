/*CMD
  command: /setoffer
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
  return Bot.sendMessage("⚠️ Only admin can set offer.");
}

// If offer written in same line
if (params) {
  Bot.setProperty("global_offer", params, "string");
  return Bot.sendMessage("✅ Offer Updated Successfully!");
}

// If reply mode
Bot.setProperty("global_offer", message, "string");
Bot.sendMessage("✅ Offer Updated Successfully!");
