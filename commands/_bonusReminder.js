/*CMD
  command: /bonusReminder
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// 🔒 Ban check function
function isBanned(uid){
  var status = Bot.getProperty(uid);
  if(status == "Ban"){
    return true;
  }
  return false;
}

if(isBanned(user.telegramid)){
  Bot.sendMessage("🚫 You are banned from using this bot.");
  return;
}

Api.sendMessage({
  text: "✨ Your daily reward is waiting for you! ⏰\n\nDon’t miss out — claim your **bonus gift** now and keep your streak alive! 🎁🔥",
  parse_mode: "Markdown",
  reply_markup: {
    inline_keyboard: [
      [
        { text: "🎁 Claim Bonus", callback_data: "/bonus" }
      ]
    ]
  }
});
