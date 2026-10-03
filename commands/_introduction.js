/*CMD
  command: /introduction
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
  command: /introduction
*/

let video = Bot.getProperty("intro_video");

if (!video) {
  Bot.sendMessage("⚠️ Introduction video not set yet.");
  return;
}

Api.sendVideo({
  chat_id: user.telegramid,
  video: video,
  caption:
    "🎬 <b>How To Use This Bot</b>\n\n" +
    "👇 हिंदी (Hindi) 👇\n" +
    "इस वीडियो में आपको बताया गया है कि इस बॉट को कैसे इस्तेमाल करें,\n" +
    "कैसे की खरीदें और बैलेंस जोड़ें।\n\n" +
    "👇 English 👇\n" +
    "In this video, you will learn how to use this bot,\n" +
    "how to buy keys and add balance.\n\n" +
    "⚡ Please watch carefully before using the bot.",
  parse_mode: "HTML"
});
