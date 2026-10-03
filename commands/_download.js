/*CMD
  command: /download
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
command: /download
*/

let snakeLink = Bot.getProperty("snake_download_link");
let kosLink = Bot.getProperty("kos_download_link");

if(!snakeLink) snakeLink = "Not set";
if(!kosLink) kosLink = "Not set";

Api.sendMessage({
  text:
  "📥 <b>Download Section</b>\n\n" +
  "Click below buttons to download engines:",
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        { text: "🐍 Snake Engine Download", url: snakeLink }
      ],
      [
        { text: "🚀 Kos Engine Download", url: kosLink }
      ]
    ]
  }
});
