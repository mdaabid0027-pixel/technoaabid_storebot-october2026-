/*CMD
  command: savePriceValue
  help: 
  need_reply: true
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
command: savePriceValue
need_reply: true
*/

let engine = User.getProperty("price_engine");
let game = User.getProperty("price_game");
let duration = User.getProperty("price_duration");

let price = parseFloat(message);

if(isNaN(price) || price < 0){

  Bot.sendMessage("❌ Invalid price");
  return;

}


// PRICE KEY

let priceKey =
  engine + "_" +
  game + "_" +
  duration +
  "_price";


// SAVE PRICE

Bot.setProperty(
  priceKey,
  price,
  "integer"
);


// ENGINE NAME

let engineName;

if(engine == "snake"){
  engineName = "Snake Engine";
}
else if(engine == "kos"){
  engineName = "Kos Engine";
}
else if(engine == "aimai"){
  engineName = "AimAI";
}
else if(engine == "shinigami"){
  engineName = "Shinigami";
}
else{
  engineName = engine;
}


// SUCCESS

Bot.sendMessage(
  "✅ Price Updated Successfully\n\n" +
  "📦 Engine: " + engineName +
  "\n🎮 Game: " + game.toUpperCase() +
  "\n⏳ Duration: " + duration + " Days" +
  "\n💰 Price: ₹" + price
);
