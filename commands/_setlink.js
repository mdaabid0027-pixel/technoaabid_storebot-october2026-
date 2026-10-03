/*CMD
  command: /setlink
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

if (user.telegramid != 5006281199) {
  Bot.sendMessage("Access denied");
  return;
}

// message contains full text; remove the command part
var link = message.replace("/setlink", "").trim();

if (!link) {
  Bot.sendMessage("Usage:\n/setlink <download_link>");
  return;
}

// save link globally
Bot.setProperty("download_link", link, "string");

Bot.sendMessage("Download link updated successfully.");
