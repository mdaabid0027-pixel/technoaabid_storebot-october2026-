/*CMD
  command: /expireQR
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

let msg_id =
Bot.getProperty("qr_msg_" + user.telegramid)

if(msg_id){

Api.deleteMessage({
  chat_id: user.telegramid,
  message_id: msg_id
})

}

// stop auto payment checking

Bot.setProperty(
  "order_" + user.telegramid,
  null,
  "string"
)

Bot.sendMessage("⛔ QR expired. Please generate a new QR.")
