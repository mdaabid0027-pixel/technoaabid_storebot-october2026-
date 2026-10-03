/*CMD
  command: check
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

if(request.data){
Api.deleteMessage({
message_id : request.message.message_id
})
}

var user = options.result.status
if ((user == "member") | (user == "administrator") | (user == "creator")) {
  User.setProperty("userStatus", user, "string")
  Bot.runCommand("/startt")
}

if (user == "left") {
  Bot.sendMessage("*⚠️ You Must Join Ou Channels.Try again /start*")
}
