/*CMD
  command: /reply2
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

var admin = Bot.getProperty("6404295823")
if(user.telegramid == 6404295823){
var id = User.getProperty("reply?id")
Bot.sendInlineKeyboardToChatWithId(id,[{title:"↩️ Reply to Administrator", command:"/support"}],"*🔍 Message From Administrator:*\n\n"+message+"")
Bot.sendMessage("*♨️ Message Sent To User!*")

}else{

return
}
