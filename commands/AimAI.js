/*CMD
  command: AimAI
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
command: AimAI
*/

Bot.setProperty(
  user.telegramid + "_selected_app",
  "aimai",
  "string"
);

User.setProperty(
  "purchase_step",
  "game",
  "string"
);

Bot.runCommand("selectGameMenu");
