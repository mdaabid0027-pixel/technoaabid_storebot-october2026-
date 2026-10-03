/*CMD
  command: resellerGridInput
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
command: resellerGridInput
need_reply: true
*/

let admin = Bot.getProperty("admin");

if(user.telegramid != admin){

  Bot.sendMessage("❌ Only admin allowed.");
  return;

}

// reseller ids
let ids =
  Bot.getProperty("reseller_add_targets") || [];

if(ids.length == 0){

  Bot.sendMessage("❌ No reseller targets found.");
  return;

}

// parse grid
let lines = message.split("\n");

let parsedGrid = {};

for(let line of lines){

  if(!line.includes("=")) continue;

  let parts = line.split("=");

  let key =
    parts[0].trim().toLowerCase();

  let valueRaw =
    parts.slice(1).join("=").trim();

  // XX = old price unchanged
  if(valueRaw.toUpperCase() == "XX"){
    continue;
  }

  let value = Number(valueRaw);

  if(isNaN(value)){
    continue;
  }

  parsedGrid[key] = value;
}

// load reseller list
let team =
  Bot.getProperty("team_list") || [];

team = team.map(String);

// update all selected resellers
for(let uid of ids){

  uid = uid.toString();

  // add reseller if missing
  if(!team.includes(uid)){
    team.push(uid);
  }

  // IMPORTANT:
  // Load OLD pricing first
  let oldGrid =
    Bot.getProperty(uid + "_grid") || {};

  // update ONLY prices sent in this message
  for(let key in parsedGrid){

    oldGrid[key] = parsedGrid[key];

  }

  // save merged grid
  Bot.setProperty(
    uid + "_grid",
    oldGrid,
    "json"
  );

}

// save reseller list
Bot.setProperty(
  "team_list",
  team,
  "json"
);

// clear temp
Bot.setProperty(
  "reseller_add_targets",
  [],
  "json"
);

// success
Bot.sendMessage(
  "✅ Reseller pricing applied successfully.\n\n" +
  "👥 Total Updated: " + ids.length + "\n" +
  "💰 Prices Changed: " + Object.keys(parsedGrid).length
);
