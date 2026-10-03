/*CMD
  command: /stockGame
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
command: /stockGame
*/

User.setProperty("stock_game", params, "string");

let engine = User.getProperty("stock_engine");

if(engine == "snake"){

  Api.sendMessage({
    text: "Select Duration:",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "3 Days", callback_data: "/stockDuration 3" },
          { text: "10 Days", callback_data: "/stockDuration 10" }
        ],
        [
          { text: "30 Days", callback_data: "/stockDuration 30" },
          { text: "90 Days", callback_data: "/stockDuration 90" }
        ]
      ]
    }
  });

  return;
}

if(engine == "kos"){

  Api.sendMessage({
    text: "Select Duration:",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "1 Day", callback_data: "/stockDuration 1" },
          { text: "7 Days", callback_data: "/stockDuration 7" }
        ],
        [
          { text: "15 Days", callback_data: "/stockDuration 15" },
          { text: "30 Days", callback_data: "/stockDuration 30" }
        ]
      ]
    }
  });

  return;
}

// AIMAI → CARROM+8bp ONLY

if(engine == "aimai"){

  Api.sendMessage({
    text: "Select Duration:",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "1 Day", callback_data: "/stockDuration 1" },
          { text: "3 Days", callback_data: "/stockDuration 3" }
        ],
        [
          { text: "7 Days", callback_data: "/stockDuration 7" },
          { text: "15 Days", callback_data: "/stockDuration 15" }
        ],
        [
          { text: "30 Days", callback_data: "/stockDuration 30" },
          { text: "90 Days", callback_data: "/stockDuration 90" }
        ]
      ]
    }
  });

  return;
}

// SHINIGAMI → CARROM ONLY (1/3/7/15/30/90 Days)

if(engine == "shinigami"){

  Api.sendMessage({
    text: "Select Duration:",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "1 Day", callback_data: "/stockDuration 1" },
          { text: "3 Days", callback_data: "/stockDuration 3" }
        ],
        [
          { text: "7 Days", callback_data: "/stockDuration 7" },
          { text: "15 Days", callback_data: "/stockDuration 15" }
        ],
        [
          { text: "30 Days", callback_data: "/stockDuration 30" },
          { text: "90 Days", callback_data: "/stockDuration 90" }
        ]
      ]
    }
  });

  return;
}
