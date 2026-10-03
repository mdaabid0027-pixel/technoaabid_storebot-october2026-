/*CMD
  command: /removeinstruction
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

/*CMD
command: /removeinstruction
*/

let admin = Bot.getProperty("admin")

if(user.telegramid != admin){
return Bot.sendMessage("⚠️ Admin only")
}

let step = parseInt(params)

if(!step){
return Bot.sendMessage("❌ Use:\n/removeinstruction STEP_NUMBER")
}

let videos = Bot.getProperty("instruction_videos") || []
let captions = Bot.getProperty("instruction_captions") || []

if(step > videos.length){
return Bot.sendMessage("❌ Step not found.")
}

videos.splice(step-1,1)
captions.splice(step-1,1)

Bot.setProperty("instruction_videos", videos, "json")
Bot.setProperty("instruction_captions", captions, "json")

Bot.sendMessage("🗑 Step removed successfully.")
