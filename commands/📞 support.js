/*CMD
  command: 📞 support
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: ❓ help, 📞 support, /support
  group: 
CMD*/

if (request.message_id) {
  Api.deleteMessage({ chat_id: chat.chatid, message_id: request.message_id });

  Api.sendMessage({
    text: "*📞 Choose an Option from the Buttons Below.*\n\n_➡️ Our admins will reply to you when they come online. Please wait..._",
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "🎫 Create New Ticket", callback_data: "new_ticket" }
        ],
        [
          { text: "📓 My Ticket History", callback_data: "my_ticket" }
        ],
        [
          { text: "🔍 Check Ticket ID", callback_data: "check_ticket" }
        ]
      ]
    }
  });
  
  return;
}

Api.editMessageText({
  message_id: request.message.message_id,
  text: "<b>📞 Choose an Option from the Buttons Below.</b>\n\n<i>➡️ Our admins will reply to you when they come online. Please wait...</i>",
  parse_mode: "html",
  disable_web_page_preview: true,
  reply_markup: {
    inline_keyboard: [
      [
        { text: "🎫 Create New Ticket", callback_data: "new_ticket" }
      ],
      [
        { text: "📓 My Ticket History", callback_data: "my_ticket" }
      ],
      [
        { text: "🔍 Check Ticket ID", callback_data: "check_ticket" }
      ]
    ]
  }
});

return;
