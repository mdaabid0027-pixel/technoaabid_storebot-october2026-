/*CMD
  command: /dailybonusset
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: y
  group: 
CMD*/

/* Run: /dailybonusset 0.02 */
if(message && message.startsWith("/dailybonusset")){
  if(user.telegramid != Bot.getProperty("single_admin_id")){ return }

  var parts = message.split(" ");
  if(parts.length < 2){
    return Bot.sendMessage("⚙️ Usage: /dailybonusset <amount>");
  }

  var amount = parseFloat(parts[1]);
  if(isNaN(amount)){ return Bot.sendMessage("❌ Invalid amount"); }

  Bot.setProperty("daily_bonus_amount", amount, "float");
  Bot.sendMessage("✅ Daily bonus set to: " + amount);
}
