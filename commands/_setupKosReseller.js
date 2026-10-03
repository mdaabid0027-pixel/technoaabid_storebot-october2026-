/*CMD
  command: /setupKosReseller
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
command: /setResellerKos
*/

User.setProperty("reseller_engine", "kos", "string");

User.setProperty("grid_type","kos","string");

Api.sendMessage({
parse_mode: "HTML",
text:
"Send Kos reseller price grid below.\n\n" +

"Copy this template and replace XX with price:\n\n" +

"<u><code>" +

"kos_8bp_1=XX\n" +
"kos_8bp_7=XX\n" +
"kos_8bp_15=XX\n" +
"kos_8bp_30=XX\n\n" +

"kos_carrom_1=XX\n" +
"kos_carrom_7=XX\n" +
"kos_carrom_15=XX\n" +
"kos_carrom_30=XX\n\n" +

"kos_freefire_1=XX\n" +
"kos_freefire_7=XX\n" +
"kos_freefire_15=XX\n" +
"kos_freefire_30=XX" +

"</code></u>\n\n" +

"⚠️ Soccer removed from Kos Engine"
});

// WAIT FOR REPLY
Bot.run({
command: "saveGlobalResellerGrid"
});
