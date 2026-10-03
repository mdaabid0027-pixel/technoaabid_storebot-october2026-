/*CMD
  command: /setalertchannel
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: send Id
  keyboard: 
  aliases: 
  group: 
CMD*/

/*CMD
command: /setalertchannel
need_reply: true
*/

let admin = Bot.getProperty("admin");

if (user.telegramid != admin) {
  return Bot.sendMessage("Only admin can set alert channel.");
}

Bot.setProperty("alert_channel", message, "string");

Bot.sendMessage("✅ Alert channel saved successfully.");
