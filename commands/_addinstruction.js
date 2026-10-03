/*CMD
  command: /addinstruction
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: h
  keyboard: 
  aliases: 
  group: 
CMD*/

/*CMD
command: /addinstruction
need_reply: true
*/

let admin = Bot.getProperty("admin")

if(user.telegramid != admin){
return Bot.sendMessage("⚠️ Admin only")
}

// video check
if(!request.video){
return Bot.sendMessage("📹 Send instruction video.")
}

let videos = Bot.getProperty("instruction_videos") || []

if(videos.length >= 5){
return Bot.sendMessage("❌ Maximum 5 instruction videos allowed.")
}

// save video temporarily
User.setProperty("pending_instruction_video", request.video.file_id, "string")

Bot.sendMessage(
"✏️ Now send caption for this step.\n\nExample:\n🎥 Step 1: How to Add Funds"
)

// next message will be caption
Bot.runCommand("/saveinstructioncaption")
