/*CMD
  command: /rrply
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

Api.editMessageText({
    message_id: request.message.message_id,
  text: "🧡_Enter Message_",
  parse_mode: "Markdown",
  disable_web_page_preview: true,
  reply_markup: {
    inline_keyboard: [
      [
        { text: "🧡 Reply To " + user + "", callback_data: "/rply" }
      ]
    ]
  }
});
