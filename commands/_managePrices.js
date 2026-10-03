/*CMD
  command: /managePrices
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
command: /managePrices
*/

Api.sendMessage({
  text: "Select Engine:",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "🐍 Snake Engine",
          callback_data: "/priceSnakeEngine"
        }
      ],
      [
        {
          text: "🚀 Kos Engine",
          callback_data: "/priceKosEngine"
        }
      ],
      [
        {
          text: "🤖 AimAI",
          callback_data: "/priceAimAI"
        }
      ],
      [
        {
          text: "⚡ Shinigami",
          callback_data: "/priceShinigami"
        }
      ]
    ]
  }
});
