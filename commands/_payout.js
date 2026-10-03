/*CMD
  command: /payout
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

function canRun(){
  var last_run_at = User.getProperty("last_run_at");
  if(!last_run_at){ return true }

  var seconds_to_wait = Bot.getProperty("bonus_claim_time", 300); // default 300s (5 minutes)

  var seconds_passed = (Date.now() - last_run_at) / 1000;
  var next = seconds_to_wait - seconds_passed;

  if (seconds_passed < seconds_to_wait) {
    Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: "⏳ Wait " + Math.ceil(next) + " seconds before next farm",
      show_alert: true
    })
    return false;
  }
  return true;
}

if(!canRun()){ return }

User.setProperty("last_run_at", Date.now(), "integer");

let balance = Libs.ResourcesLib.userRes("balance");
let bonus = Bot.getProperty("daily_bonus_amount", 1);   // default 1 ⭐

balance.add(bonus);

Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: "🎉 You received " + bonus + " ⭐",
  show_alert: true
})
