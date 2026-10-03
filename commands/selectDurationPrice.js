/*CMD
  command: selectDurationPrice
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
command: selectDurationPrice
*/

let engine = User.getProperty("price_engine");

if(engine == "snake"){

Bot.sendKeyboard(
"price3\nprice10\nprice30\nprice90",
"Select Duration:"
);

return;
}

if(engine == "kos"){

Bot.sendKeyboard(
"price1\nprice7\nprice15\nprice30",
"Select Duration:"
);

}
