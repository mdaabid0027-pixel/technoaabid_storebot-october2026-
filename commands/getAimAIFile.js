/*CMD
  command: getAimAIFile
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
command: getAimAIFile
*/

let fileId = Bot.getProperty("aimai_file_id");

if(!fileId){

  Bot.sendMessage("❌ AimAI APK is not available.");
  return;

}

Api.sendDocument({
  document: fileId,
  caption:
    "🤖 <b>AimAI</b>\n\n" +
    "📥 Download your AimAI APK.",
  parse_mode: "HTML"
});
