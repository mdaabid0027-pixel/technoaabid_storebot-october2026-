/*CMD
  command: selectDurationMenu
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
command: selectDurationMenu
*/

let engine = Bot.getProperty(user.telegramid + "_selected_app");

if(engine == "snake"){

  Api.sendMessage({
    text: "**⏳ Select Duration**",
    parse_mode: "HTML",
    reply_markup: {
      keyboard: [
        [
          { text: "3 Days", style: "primary" },
          { text: "10 Days", style: "primary" }
        ],
        [
          { text: "30 Days", style: "success" },
          { text: "90 Days", style: "success" }
        ],
        [
          { text: "⬅️ Back", style: "danger" }
        ]
      ],
      resize_keyboard: true
    }
  });

  return;

}


// ==============================
// 🚀 KOS MENU
// ==============================

if(engine == "kos"){

  Api.sendMessage({
    text: "**⏳ Select Duration**",
    parse_mode: "HTML",
    reply_markup: {
      keyboard: [
        [
          { text: "1 Day", style: "primary" },
          { text: "7 Days", style: "primary" }
        ],
        [
          { text: "15 Days", style: "success" },
          { text: "30 Days", style: "success" }
        ],
        [
          { text: "⬅️ Back", style: "danger" }
        ]
      ],
      resize_keyboard: true
    }
  });

  return;

}


// ==============================
// 🤖 AIMAI MENU
// ==============================

if(engine == "aimai"){

  Api.sendMessage({
    text: "**⏳ Select AimAI Duration**",
    parse_mode: "HTML",
    reply_markup: {
      keyboard: [
        [
          { text: "1 Day", style: "success" },
          { text: "3 Days", style: "primary" }
        ],
        [
          { text: "7 Days", style: "success" },
          { text: "15 Days", style: "primary" }
        ],
        [
          { text: "30 Days", style: "success" },
          { text: "90 Days", style: "primary" }
        ],
        [
          { text: "⬅️ Back", style: "danger" }
        ]
      ],
      resize_keyboard: true
    }
  });

  return;

}


// ==============================
// ⚡ SHINIGAMI MENU
// ==============================

if(engine == "shinigami"){

  Api.sendMessage({
    text: "**⏳ Select Shinigami Duration**",
    parse_mode: "HTML",
    reply_markup: {
      keyboard: [
        [
          { text: "1 Day", style: "success" },
          { text: "3 Days", style: "primary" }
        ],
        [
          { text: "7 Days", style: "success" },
          { text: "15 Days", style: "primary" }
        ],
        [
          { text: "30 Days", style: "success" },
          { text: "90 Days", style: "primary" }
        ],
        [
          { text: "⬅️ Back", style: "danger" }
        ]
      ],
      resize_keyboard: true
    }
  });

  return;

}


Bot.sendMessage("❌ Engine not selected properly.");
Bot.runCommand("/start");
