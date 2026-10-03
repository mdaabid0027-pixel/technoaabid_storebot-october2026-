/*CMD
  command: /instructions
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
command: /instructions
*/

let videos = Bot.getProperty("instruction_videos") || []
let captions = Bot.getProperty("instruction_captions") || []

if(videos.length == 0){
return Bot.sendMessage("❌ No instruction videos available.")
}

for (var i = 0; i < videos.length; i++){

Api.sendVideo({
chat_id: chat.chatid,
video: videos[i],
caption: captions[i],
parse_mode: "HTML"
})

}
