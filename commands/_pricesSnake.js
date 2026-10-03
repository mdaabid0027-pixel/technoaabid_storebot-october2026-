/*CMD
  command: /pricesSnake
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
command: /pricesSnake
*/

let uid = user.telegramid.toString();

let teamList = Bot.getProperty("team_list") || [];
let isReseller = teamList.map(String).includes(uid);

let grid = Bot.getProperty(uid + "_grid") || {};

function price(game, days) {

  let resellerKey = "snake_" + game + "_" + days;

  if(isReseller && grid[resellerKey] !== undefined){
    return grid[resellerKey];
  }

  return Bot.getProperty(
    "snake_" + game + "_" + days + "_price"
  ) || "0";
}

let text = "🐍 Snake Engine Price List\n\n";

text += "🎮 8BP:\n";
text += "• 3 Days: ₹" + price("8bp","3") + "\n";
text += "• 10 Days: ₹" + price("8bp","10") + "\n";
text += "• 30 Days: ₹" + price("8bp","30") + "\n";
text += "• 90 Days: ₹" + price("8bp","90") + "\n\n";

text += "🎮 Carrom:\n";
text += "• 3 Days: ₹" + price("carrom","3") + "\n";
text += "• 10 Days: ₹" + price("carrom","10") + "\n";
text += "• 30 Days: ₹" + price("carrom","30") + "\n";
text += "• 90 Days: ₹" + price("carrom","90") + "\n\n";

text += "🎮 Soccer:\n";
text += "• 3 Days: ₹" + price("soccer","3") + "\n";
text += "• 10 Days: ₹" + price("soccer","10") + "\n";
text += "• 30 Days: ₹" + price("soccer","30") + "\n";
text += "• 90 Days: ₹" + price("soccer","90");

Api.sendMessage({
  text: text
});
