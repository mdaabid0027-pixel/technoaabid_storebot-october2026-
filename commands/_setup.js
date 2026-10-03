/*CMD
  command: /setup
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

if (chat.chat_type !== "private")
  return Api.sendMessage({ text: "❌ This command can only be used in private chat." });

var currentAdmin = Bot.getProperty("admin_id");

if (currentAdmin) {
  return Api.sendMessage({
    text: `🚫 Admin is already set to <code>${currentAdmin}</code>.\nOnly one admin is allowed.`,
    parse_mode: "HTML"
  });
}

Bot.setProperty("admin_id", user.telegramid, "string");

Api.sendMessage({
  text: `✅ Admin setup complete.\nYour Telegram ID <code>${user.telegramid}</code> is now saved as the bot admin.`,
  parse_mode: "HTML"
});
