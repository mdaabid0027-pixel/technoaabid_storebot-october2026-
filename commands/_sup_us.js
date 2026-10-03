/*CMD
  command: /sup_us
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

let msg_id = options.result.message_id
User.setProperty("mm", msg_id, "integer")
