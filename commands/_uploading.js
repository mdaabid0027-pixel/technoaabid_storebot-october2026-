/*CMD
  command: /uploading
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

/*CMD
  command: /uploading
  need_reply: true
  folder: Stock
*/

let admin = Bot.getProperty("admin");

if (user.telegramid != admin) {
  return Api.sendMessage({ text: "⛔ Admin only." });
}

let target = Bot.getProperty("upload_stock_target");

if (target && message) {

  let input = message;

  let newCodes = input
    .split("\n")
    .map(c => c.trim())
    .filter(c => c !== "");

  let existing = Bot.getProperty(target);
  if (!Array.isArray(existing)) {
    existing = [];
  }

  let updated = existing.concat(newCodes);

  Bot.setProperty(target, updated, "json");

  // extract game & duration
  let parts = target.split("_");
  let game = parts[0];
  let duration = parts[1].replace("day","");

  let fullName = user.first_name + (user.last_name ? " " + user.last_name : "");

  // 📡 CHANNEL LOG
  let logChannel = Bot.getProperty("log_channel")

  if(logChannel){
  Api.sendMessage({
  chat_id: logChannel,
  parse_mode: "HTML",
  text:
  "📦 <b>BULK STOCK ADDED</b>\n\n" +
  "👤 Name: " + fullName +
  "\n📛 Username: @" + (user.username || "NoUsername") +
  "\n🆔 ID: <code>" + user.telegramid + "</code>" +

  "\n\n🎮 Game: <b>" + game + "</b>" +
  "\n⏳ Duration: <b>" + duration + " Days</b>" +

  "\n\n➕ Keys Added: <b>" + newCodes.length + "</b>" +
  "\n📦 Total Stock: <b>" + updated.length + "</b>" +

  "\n\n🔑 Added Keys:\n<code>" + newCodes.join("\n") + "</code>"
  })
  }

  Bot.setProperty("upload_stock_target", "", "string");

  Api.sendMessage({
    text: `✅ *${newCodes.length} codes added* to ${target}.`,
    parse_mode: "Markdown"
  });

}
