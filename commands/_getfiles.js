/*CMD
  command: /getfiles
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

/*CMD
command: /getfiles
*/

let snakeFile = Bot.getProperty("snake_file_id");
let kosFile = Bot.getProperty("kos_file_id");
let aimaiFile = Bot.getProperty("aimai_file_id");

if(!snakeFile && !kosFile && !aimaiFile){

  Bot.sendMessage("❌ Files not available right now.");
  return;

}

Api.sendMessage({
  text:
    "📥 <b>Download Section</b>\n\n" +
    "Select file below:",
  parse_mode:"HTML",
  reply_markup:{
    inline_keyboard:[
      [
        {
          text:"🐍 Snake Engine APK",
          callback_data:"getSnakeFile"
        }
      ],
      [
        {
          text:"🚀 Kos Engine APK",
          callback_data:"getKosFile"
        }
      ],
      [
        {
          text:"🤖 AimAI APK",
          callback_data:"getAimAIFile"
        }
      ]
    ]
  }
});
