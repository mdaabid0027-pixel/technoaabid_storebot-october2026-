/*CMD
  command: /saveinstructioncaption
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

/*CMD
command: /saveinstructioncaption
need_reply: true
*/

let video = User.getProperty("pending_instruction_video")

if(!video){
return
}

let videos = Bot.getProperty("instruction_videos") || []
let captions = Bot.getProperty("instruction_captions") || []

videos.push(video)
captions.push(message)

Bot.setProperty("instruction_videos", videos, "json")
Bot.setProperty("instruction_captions", captions, "json")

User.setProperty("pending_instruction_video", null)

Bot.sendMessage("✅ Instruction step added successfully.")
