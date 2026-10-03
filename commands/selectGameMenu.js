/*CMD
  command: selectGameMenu
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
command: selectGameMenu
*/

let app = Bot.getProperty(user.telegramid + "_selected_app");


// ==============================
// 🐍 SNAKE
// ==============================

if(app == "snake"){

  Api.sendMessage({
    text:
      "**🙏 Thanks for Choosing Snake Engine!**\n\n" +
      "🎮 **Select your game below.**\n\n" +
      "💰 Want to check Snake Engine prices?\n" +
      "👇 *Tap the button below to view the current price list.* 👇",
    parse_mode: "HTML",
    reply_markup: {
      keyboard: [
        [{ text: "8BP", style: "primary" }],
        [{ text: "Carrom", style: "success" }],
        [{ text: "🔙 Back", style: "danger" }]
      ],
      resize_keyboard: true
    }
  });

  Api.sendMessage({
    text: "🐍 **Snake Engine Price List**\n\n👇 Check your prices below 👇",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🐍 💰 Check Snake Price",
            callback_data: "/pricelist snake",
            style: "primary"
          }
        ]
      ]
    }
  });

  return;
}


// ==============================
// 🚀 KOS
// ==============================

if(app == "kos"){

  Api.sendMessage({
    text:
      "**🙏 Thanks for Choosing KOS Engine!**\n\n" +
      "🎮 **Select your game below.**\n\n" +
      "💰 Want to check KOS Engine prices?\n" +
      "👇 *Tap the button below to view the current price list.* 👇",
    parse_mode: "HTML",
    reply_markup: {
      keyboard: [
        [{ text: "8BP", style: "success" }],
        [{ text: "Carrom", style: "primary" }],
        [{ text: "🔙 Back", style: "danger" }]
      ],
      resize_keyboard: true
    }
  });

  Api.sendMessage({
    text: "🚀 **KOS Engine Price List**\n\n👇 Check your prices below 👇",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🚀 💰 Check KOS Price",
            callback_data: "/pricelist kos",
            style: "success"
          }
        ]
      ]
    }
  });

  return;
}


// ==============================
// 🤖 AIMAI (8BP & Carrom Added)
// ==============================

if(app == "aimai"){

  Api.sendMessage({
    text:
      "**🙏 Thanks for Choosing AimAI Engine!**\n\n" +
      "🎮 **Select your game below.**\n\n" +
      "💰 Want to check AimAI prices?\n" +
      "👇 *Tap the button below to view the current price list.* 👇",
    parse_mode: "HTML",
    reply_markup: {
      keyboard: [
        [{ text: "8BP", style: "primary" }],
        [{ text: "Carrom", style: "success" }],
        [{ text: "🔙 Back", style: "danger" }]
      ],
      resize_keyboard: true
    }
  });

  Api.sendMessage({
    text: "🤖 **AimAI Engine Price List**\n\n👇 Check your prices below 👇",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🤖 💰 Check AimAI Price",
            callback_data: "/pricelist aimai",
            style: "danger"
          }
        ]
      ]
    }
  });

  return;
}


// ==============================
// ⚡ SHINIGAMI
// ==============================

if(app == "shinigami"){

  Api.sendMessage({
    text:
      "**🙏 Thanks for Choosing Shinigami!**\n\n" +
      "🎮 **Select your game below.**\n\n" +
      "💰 Want to check Shinigami prices?\n" +
      "👇 *Tap the button below to view the current price list.* 👇",
    parse_mode: "HTML",
    reply_markup: {
      keyboard: [
        [{ text: "Carrom", style: "primary" }],
        [{ text: "🔙 Back", style: "danger" }]
      ],
      resize_keyboard: true
    }
  });

  Api.sendMessage({
    text: "⚡ **Shinigami Price List**\n\n👇 Check your prices below 👇",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "⚡ 💰 Check Shinigami Price",
            callback_data: "/pricelist shinigami",
            style: "primary"
          }
        ]
      ]
    }
  });

  return;
}


Bot.sendMessage("❌ App not selected.");
Bot.runCommand("/start");
