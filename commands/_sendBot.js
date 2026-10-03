/*CMD
  command: /sendBot
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
  command: /sendBot
*/

let OWNER_ID = 5006281199; // 🔥 Apna Telegram ID

// ❌ Agar tum nahi ho → kuch bhi reply nahi karega
if (user.telegramid != OWNER_ID) {
  return;
}

let email = params ? params.trim() : "";

if (!email || !email.includes("@") || !email.includes(".")) {
  Bot.sendMessage(
    "❌ Invalid Email Address!\n\n➤ Example: example@gmail.com"
  );
  return;
}

BBAdmin.installBot({
  bot_id: bot.id,
  email: email
});

Bot.sendMessage(
  "✅ Bot Successfully Sent To Your Bots.Business Mail 💌\n\n📩 Email: " + email
);
