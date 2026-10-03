/*CMD
  command: /pricesAimai
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
command: /pricesAimai
*/

let uid = user.telegramid.toString();

let teamList = Bot.getProperty("team_list") || [];
let isReseller = teamList.map(String).includes(uid);

let grid = Bot.getProperty(uid + "_grid") || {};

function price(days) {

  let resellerKey = "aimai_carrom_" + days;

  if(isReseller && grid[resellerKey] !== undefined){
    return grid[resellerKey];
  }

  return Bot.getProperty(
    "aimai_carrom_" + days + "_price"
  ) || "0";
}

let text = "🤖 AimAI Price List\n\n";

text += "🎮 Carrom:\n";
text += "• 1 Day: ₹" + price("1") + "\n";
text += "• 3 Days: ₹" + price("3") + "\n";
text += "• 7 Days: ₹" + price("7") + "\n";
text += "• 15 Days: ₹" + price("15") + "\n";
text += "• 30 Days: ₹" + price("30") + "\n";
text += "• 90 Days: ₹" + price("90");

Api.sendMessage({
  text: text
});
