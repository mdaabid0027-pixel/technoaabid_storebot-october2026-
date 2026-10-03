/*CMD
  command: /editinstruction
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
command: /editinstruction
need_reply: true
*/

let admin = Bot.getProperty("admin")

if(user.telegramid != admin){
return Bot.sendMessage("⚠️ Admin only")
}

let step = parseInt(params)

if(!step){
return Bot.sendMessage("❌ Use:\n/editinstruction STEP_NUMBER")
}

let videos = Bot.getProperty("instruction_videos") || []

if(step > videos.length){
return Bot.sendMessage("❌ Step not found.")
}

if(!request.video){
return Bot.sendMessage("📹 Send new video.")
}

videos[step-1] = request.video.file_id

Bot.setProperty("instruction_videos", videos, "json")

Bot.sendMessage("✅ Step updated successfully.")
