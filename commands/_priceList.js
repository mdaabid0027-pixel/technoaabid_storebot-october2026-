/*CMD
  command: /priceList
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
command: /priceList
*/

Api.sendMessage({
  text: "💰 *Price List*\n\nKaunsa price list check karna hai?",
  parse_mode: "Markdown",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "🐍 Snake Engine",
          callback_data: "/pricesSnake"
        }
      ],
      [
        {
          text: "🚀 Kos Engine",
          callback_data: "/pricesKos"
        }
      ],
      [
        {
          text: "🤖 AimAI",
          callback_data: "/pricesAimai"
        }
      ]
    ]
  }
});
