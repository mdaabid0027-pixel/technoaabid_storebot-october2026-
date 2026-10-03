/*CMD
  command: new_ticket
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
  text: "*📞 Tell Me Now What You Need Help*",
  parse_mode: "Markdown",
  disable_web_page_preview: true,
  reply_markup: {
    inline_keyboard: [
      [
        { text: "◀️ Return", callback_data: "Support" }
      ]
    ]
  },
  on_result: "/sup_us"
});
Bot.runCommand("new_ticket_gen")
return;
