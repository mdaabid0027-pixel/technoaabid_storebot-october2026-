/*CMD
  command: /removeoffer
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
  return Bot.sendMessage("⚠️ Only admin can remove offer.");
}

// Remove offer
Bot.setProperty("global_offer", "", "string");

Bot.sendMessage("✅ Offer removed successfully!");
