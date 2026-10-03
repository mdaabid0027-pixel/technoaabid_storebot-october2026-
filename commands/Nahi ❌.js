/*CMD
  command: Nahi ❌
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
command: Nahi ❌
*/

User.setProperty("add_amount", null);

Bot.sendMessage(
"❌ भुगतान प्रक्रिया रद्द कर दी गई है।\n\n" +
"आप फिर से बैलेंस जोड़ने के लिए 'Add Fund' चुन सकते हैं।"
);

// वापस start menu पर भेजें
Bot.runCommand("/stt");
