/*CMD
  command: /add_ba
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: enter user id
  keyboard: 
  aliases: 
  group: 
CMD*/

//User.setProperty('addbuser', message)
var admin = Bot.getProperty("5006281199")
if (user.telegramid == 5006281199) {
  let msg = message
  User.setProperty("editid", msg, "integer")
  let tgid = User.getProperty("editid")
  // telegramid - it is telegram id for another user
  let bal = Libs.ResourcesLib.anotherUserRes("balance", tgid)
  Bot.sendMessage(
    "*🆔 User Id :-* " + tgid + " \n\n💰 Balance   :- " + bal.value()
  )
  Bot.sendMessage("🥰 *Send me Amount to add to User's Balance *")

  Bot.runCommand("/add_bal2")
} else {
  Bot.sendMessage(" ")
}
