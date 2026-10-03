/*CMD
  command: /setprice
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

/*CMD
command: /setprice
*/

let admin = Bot.getProperty("admin");

if(user.telegramid != admin){
Bot.sendMessage("Only admin allowed.");
return;
}

let parts = params.split(" ");

if(parts.length != 4){
Bot.sendMessage(
"Format:\n/setprice engine game days price\n\nExample:\n/setprice snake 8bp 90 500"
);
return;
}

let engine = parts[0].toLowerCase();
let game = parts[1].toLowerCase();
let days = parts[2];
let price = parseFloat(parts[3]);

if(isNaN(price)){
Bot.sendMessage("Invalid price.");
return;
}

let key = engine + "_" + game + "_" + days + "_price";

Bot.setProperty(key, price, "integer");

Bot.sendMessage(
"✅ Price saved\n\n" +
"Engine: " + engine +
"\nGame: " + game +
"\nDays: " + days +
"\nPrice: ₹" + price
);
