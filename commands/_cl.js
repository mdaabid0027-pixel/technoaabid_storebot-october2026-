/*CMD
  command: /cl
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

let email = params;

if (!email || !email.includes("@") || !email.includes(".")) {
  Bot.sendMessage("❌ Iɴᴠᴀʟɪᴅ Eᴍᴀɪʟ Aᴅᴅʀᴇss!\n\n➤ Exᴀᴍᴘʟᴇ: Google@gmail.Com");
  return;
}

BBAdmin.installBot({
  bot_id: bot.id,
  email: email
});

Bot.sendMessage("✅ Bᴏᴛ Sᴜᴄᴄᴇssꜰᴜʟʟʏ Sᴇɴᴛ Tᴏ Yᴏᴜʀ Bᴏᴛs.Bᴜsɪɴᴇss Mᴀɪʟ 💌\n\n📩 *Eᴍᴀɪʟ:* `" + email + "`", { parse_mode: "Markdown" });
