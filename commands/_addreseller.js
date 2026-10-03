/*CMD
  command: /addreseller
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
command: /addreseller
folder: Admin Panel
*/

let admin = Bot.getProperty("admin");

if(user.telegramid != admin){
  Bot.sendMessage("❌ Only admin allowed.");
  return;
}

// usage check
let args = message.split(" ");

if(args.length < 2){
  Bot.sendMessage(
    "Usage:\n\n/addreseller USERID USERID"
  );
  return;
}

// all reseller ids
let ids = args.slice(1).map(String);

// save temp ids
Bot.setProperty(
  "reseller_add_targets",
  ids,
  "json"
);

// auto add into team list
let team = Bot.getProperty("team_list") || [];
team = team.map(String);

for(let id of ids){
  if(!team.includes(id)){
    team.push(id);
  }
}

Bot.setProperty(
  "team_list",
  team,
  "json"
);

// send full grid
Api.sendMessage({
  parse_mode:"HTML",
  text:

"📄 **Send Full Reseller Price Grid**\n\n" +
"Replace XX with prices.\n\n" +
"`" +

// SNAKE

"snake_8bp_3=XX\n" +
"snake_8bp_10=XX\n" +
"snake_8bp_30=XX\n" +
"snake_8bp_90=XX\n\n" +

"snake_carrom_3=XX\n" +
"snake_carrom_10=XX\n" +
"snake_carrom_30=XX\n" +
"snake_carrom_90=XX\n\n" +

// KOS

"kos_8bp_1=XX\n" +
"kos_8bp_7=XX\n" +
"kos_8bp_15=XX\n" +
"kos_8bp_30=XX\n\n" +

"kos_carrom_1=XX\n" +
"kos_carrom_7=XX\n" +
"kos_carrom_15=XX\n" +
"kos_carrom_30=XX\n\n" +

// AIMAI

"aimai_8bp_1=XX\n" +
"aimai_8bp_3=XX\n" +
"aimai_8bp_7=XX\n" +
"aimai_8bp_15=XX\n" +
"aimai_8bp_30=XX\n" +
"aimai_8bp_90=XX\n\n" +

"aimai_carrom_1=XX\n" +
"aimai_carrom_3=XX\n" +
"aimai_carrom_7=XX\n" +
"aimai_carrom_15=XX\n" +
"aimai_carrom_30=XX\n" +
"aimai_carrom_90=XX\n\n" +

// SHINIGAMI

"shinigami_carrom_1=XX\n" +
"shinigami_carrom_3=XX\n" +
"shinigami_carrom_7=XX\n" +
"shinigami_carrom_15=XX\n" +
"shinigami_carrom_30=XX\n" +
"shinigami_carrom_90=XX" +

"`"
});

// wait for reply
Bot.runCommand("resellerGridInput");
