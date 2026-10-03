/*CMD
  command: /start
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let videoLink = Bot.getProperty("tutorial_video_link");

if (videoLink) {
  Api.sendMessage({
    text: "🎥 How to use this bot:\n" + videoLink,
    disable_web_page_preview: false
  });
}

//redirect
Bot.runCommand("/starttt");
