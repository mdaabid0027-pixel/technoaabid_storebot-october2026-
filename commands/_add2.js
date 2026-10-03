/*CMD
  command: /add2
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

var admin = Bot.getProperty("5006281199")
if (user.telegramid == 5006281199) {
  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
  }
  var value = message
  if (!isNumeric(value)) {
    Bot.sendMessage("*📛 Invaild value. Enter only numeric value. Try again*")
    Bot.runCommand("/add2")
    return
  }
  let amount = parseFloat(message)
  let tgid = User.getProperty("editid")
  let cur = Bot.getProperty("cur")
  let bal = Libs.ResourcesLib.anotherUserRes("balance", tgid)
  bal.add(amount)
  Bot.sendMessage("💰Amount Added Successfully.\n\nDetails Below")
  Api.sendMessage({
    chat_id: tgid,
    text: "*➕ Balance Added :* " + value + " " + cur + "",
    parse_mode: "Markdown"
  })
  Bot.sendMessage(
    "*🆔 User Id :-* " +
      tgid +
      "\n\n*💰Amount Added:- *" +
      amount +
      "\n\n💰 Balance   :- " +
      bal.value()
  )
} else {
  Bot.sendMessage(" ")
}
