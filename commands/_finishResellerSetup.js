/*CMD
  command: /finishResellerSetup
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
command: /finishResellerSetup
*/

let reseller = User.getProperty("setup_reseller");

Bot.sendMessage(
  "✅ Reseller setup completed.\n\n" +
  "🆔 User ID: " + reseller
);

User.setProperty("setup_reseller", null);
