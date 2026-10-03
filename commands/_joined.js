/*CMD
  command: /joined
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 🟢 joined
  group: 
CMD*/

let stat = Bot.getProperty(""+user.telegramid+"?Ban");

if (stat=="ban"){
  Bot.sendMessage("*You're Banned From Using The Bot ❌*");
}else{
  let channel = "@tbsgaming09";
  let id = user.telegramid
  Api.getChatMember({ 
    chat_id : channel,
    user_id : id,
    on_result :"check"
  })
}
