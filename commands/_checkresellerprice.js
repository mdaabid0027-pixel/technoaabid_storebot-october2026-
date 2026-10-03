/*CMD
  command: /checkresellerprice
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
command: /checkresellerprice
folder: Admin Panel
*/

let admin = Bot.getProperty("admin");

if(user.telegramid != admin){

Bot.sendMessage("❌ Only admin allowed.");
return;

}

let teamList = Bot.getProperty("team_list") || [];

if(teamList.length == 0){

Bot.sendMessage("⚠️ No resellers found.");
return;

}

let sampleId = teamList[0];

let grid = Bot.getProperty(sampleId + "_grid") || {};

function price(key){

return grid[key] !== undefined ? grid[key] : "XX";

}

let msg =
"💰 Current Reseller Price Grid\n\n" +

"🐍 Snake Engine\n\n" +

"🎮 8BP:\n" +
" 3-day: ₹" + price("snake_8bp_3") + "\n" +
" 10-day: ₹" + price("snake_8bp_10") + "\n" +
" 30-day: ₹" + price("snake_8bp_30") + "\n" +
" 90-day: ₹" + price("snake_8bp_90") + "\n\n" +

"🎮 Carrom:\n" +
" 3-day: ₹" + price("snake_carrom_3") + "\n" +
" 10-day: ₹" + price("snake_carrom_10") + "\n" +
" 30-day: ₹" + price("snake_carrom_30") + "\n" +
" 90-day: ₹" + price("snake_carrom_90") + "\n\n" +

"🎮 Soccer:\n" +
" 3-day: ₹" + price("snake_soccer_3") + "\n" +
" 10-day: ₹" + price("snake_soccer_10") + "\n" +
" 30-day: ₹" + price("snake_soccer_30") + "\n" +
" 90-day: ₹" + price("snake_soccer_90") + "\n\n" +

"🚀 Kos Engine\n\n" +

"🎮 8BP:\n" +
" 1-day: ₹" + price("kos_8bp_1") + "\n" +
" 7-day: ₹" + price("kos_8bp_7") + "\n" +
" 15-day: ₹" + price("kos_8bp_15") + "\n" +
" 30-day: ₹" + price("kos_8bp_30") + "\n\n" +

"🎮 Carrom:\n" +
" 1-day: ₹" + price("kos_carrom_1") + "\n" +
" 7-day: ₹" + price("kos_carrom_7") + "\n" +
" 15-day: ₹" + price("kos_carrom_15") + "\n" +
" 30-day: ₹" + price("kos_carrom_30") + "\n\n" +

"🎮 Soccer:\n" +
" 1-day: ₹" + price("kos_soccer_1") + "\n" +
" 7-day: ₹" + price("kos_soccer_7") + "\n" +
" 15-day: ₹" + price("kos_soccer_15") + "\n" +
" 30-day: ₹" + price("kos_soccer_30");

Bot.sendMessage(msg);
