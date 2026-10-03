/*CMD
  command: /setupSnakeReseller
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
command: /setResellerSnake
*/

User.setProperty("reseller_engine","snake","string");

User.setProperty("grid_type","snake","string");

Api.sendMessage({
parse_mode: "HTML",
text:
"Send Snake reseller price grid below.\n\n" +

"Copy this template and replace XX with price:\n\n" +

"<u><code>" +

"snake_8bp_3=XX\n" +
"snake_8bp_10=XX\n" +
"snake_8bp_30=XX\n" +
"snake_8bp_90=XX\n\n" +

"snake_carrom_3=XX\n" +
"snake_carrom_10=XX\n" +
"snake_carrom_30=XX\n" +
"snake_carrom_90=XX\n\n" +

"snake_soccer_3=XX\n" +
"snake_soccer_10=XX\n" +
"snake_soccer_30=XX\n" +
"snake_soccer_90=XX" +

"</code></u>"
});

// WAIT FOR REPLY
Bot.run({
command: "saveGlobalResellerGrid"
});
