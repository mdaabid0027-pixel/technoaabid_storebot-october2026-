/*CMD
  command: Paise Jodein
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
command: Paise Jodein
*/

Bot.sendKeyboard(
"50, 100\n200, 300\n400, 500\n1000, Nahi ❌",
"💰 आप कितना बैलेंस जोड़ना चाहते हैं?\n\nनीचे दिए गए बटन चुनें या अपनी राशि लिखें।"
);

Bot.runCommand("getAmountHindi");
