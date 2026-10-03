/*CMD
  command: /priceGame
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
command: /priceGame
*/

let game = params.toLowerCase().replace(" ", "");

User.setProperty("price_game", game, "string");

let engine = User.getProperty("price_engine");

if(engine == "snake"){

  Api.sendMessage({
    text: "Select Duration:",
    reply_markup:{
      inline_keyboard:[
        [{ text:"3 Days", callback_data:"/priceDuration 3" }],
        [{ text:"10 Days", callback_data:"/priceDuration 10" }],
        [{ text:"30 Days", callback_data:"/priceDuration 30" }],
        [{ text:"90 Days", callback_data:"/priceDuration 90" }]
      ]
    }
  });

  return;
}


if(engine == "kos"){

  Api.sendMessage({
    text: "Select Duration:",
    reply_markup:{
      inline_keyboard:[
        [{ text:"1 Day", callback_data:"/priceDuration 1" }],
        [{ text:"7 Days", callback_data:"/priceDuration 7" }],
        [{ text:"15 Days", callback_data:"/priceDuration 15" }],
        [{ text:"30 Days", callback_data:"/priceDuration 30" }]
      ]
    }
  });

  return;
}


// ================= AIMAI =================

if(engine == "aimai"){

  Api.sendMessage({
    text: "Select Duration:",
    reply_markup:{
      inline_keyboard:[
        [{ text:"1 Day", callback_data:"/priceDuration 1" }],
        [{ text:"3 Days", callback_data:"/priceDuration 3" }],
        [{ text:"7 Days", callback_data:"/priceDuration 7" }],
        [{ text:"15 Days", callback_data:"/priceDuration 15" }],
        [{ text:"30 Days", callback_data:"/priceDuration 30" }],
        [{ text:"90 Days", callback_data:"/priceDuration 90" }]
      ]
    }
  });

  return;
}


// ================= SHINIGAMI =================

if(engine == "shinigami"){

  Api.sendMessage({
    text: "Select Duration:",
    reply_markup:{
      inline_keyboard:[
        [{ text:"1 Day", callback_data:"/priceDuration 1" }],
        [{ text:"3 Days", callback_data:"/priceDuration 3" }],
        [{ text:"7 Days", callback_data:"/priceDuration 7" }],
        [{ text:"15 Days", callback_data:"/priceDuration 15" }],
        [{ text:"30 Days", callback_data:"/priceDuration 30" }],
        [{ text:"90 Days", callback_data:"/priceDuration 90" }]
      ]
    }
  });

  return;
}
