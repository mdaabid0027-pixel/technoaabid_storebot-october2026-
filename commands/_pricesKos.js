/*CMD
  command: /pricesKos
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
command: /pricesKos
*/

let uid = user.telegramid.toString();

let teamList = Bot.getProperty("team_list") || [];
let isReseller = teamList.map(String).includes(uid);

let grid = Bot.getProperty(uid + "_grid") || {};

function price(game, days) {

  let resellerKey = "kos_" + game + "_" + days;

  if(isReseller && grid[resellerKey] !== undefined){
    return grid[resellerKey];
  }

  return Bot.getProperty(
    "kos_" + game + "_" + days + "_price"
  ) || "0";
}

let text = "🚀 Kos Engine Price List\n\n";

text += "🎮 8BP:\n";
text += "• 1 Day: ₹" + price("8bp","1") + "\n";
text += "• 7 Days: ₹" + price("8bp","7") + "\n";
text += "• 15 Days: ₹" + price("8bp","15") + "\n";
text += "• 30 Days: ₹" + price("8bp","30") + "\n\n";

text += "🎮 Carrom:\n";
text += "• 1 Day: ₹" + price("carrom","1") + "\n";
text += "• 7 Days: ₹" + price("carrom","7") + "\n";
text += "• 15 Days: ₹" + price("carrom","15") + "\n";
text += "• 30 Days: ₹" + price("carrom","30");

Api.sendMessage({
  text: text
});
