/*CMD
  command: saveGlobalResellerGrid
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
command: saveGlobalResellerGrid
need_reply: true
*/

let admin = Bot.getProperty("admin");

if(user.telegramid != admin){
  Bot.sendMessage("❌ Only admin allowed.");
  return;
}

// =============================
// PARSE GRID INPUT
// =============================

let lines = message.split("\n");

let parsedGrid = {};

for(let line of lines){

  if(!line.includes("=")) continue;

  let parts = line.split("=");

  let key = parts[0].trim().toLowerCase();

  let valueRaw = parts[1].trim();

  if(valueRaw.toUpperCase() == "XX"){
    continue;
  }

  let value = Number(valueRaw);

  if(isNaN(value)){
    continue;
  }

  parsedGrid[key] = value;

}

// =============================
// CHECK MODE
// =============================

let singleSetup =
User.getProperty("single_reseller_setup");

// =============================
// SINGLE RESELLER UPDATE
// =============================

if(singleSetup){

  let reseller =
  User.getProperty("setup_reseller");

  let grid =
  Bot.getProperty(reseller + "_grid") || {};

  for(let key in parsedGrid){
    grid[key] = parsedGrid[key];
  }

  Bot.setProperty(
    reseller + "_grid",
    grid,
    "json"
  );

  Bot.sendMessage(
    "✅ Reseller price updated.\n\n" +
    "🆔 User: " + reseller
  );

  // reset mode
  User.setProperty(
    "single_reseller_setup",
    false,
    "boolean"
  );

  return;

}

// =============================
// GLOBAL UPDATE MODE
// =============================

// save global template
Bot.setProperty(
  "global_reseller_grid",
  parsedGrid,
  "json"
);

// apply to all resellers
let teamList =
Bot.getProperty("team_list") || [];

for(let uid of teamList){

  let grid =
  Bot.getProperty(uid + "_grid") || {};

  for(let key in parsedGrid){
    grid[key] = parsedGrid[key];
  }

  Bot.setProperty(uid + "_grid", grid, "json");

}

Bot.sendMessage(
  "✅ Global reseller grid updated.\n\n" +
  "✔ All reseller prices changed"
);
