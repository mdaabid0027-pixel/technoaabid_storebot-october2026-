/*CMD
  command: /userdeposit
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
command: /userdeposit
*/

let admin = Bot.getProperty("admin");

if(user.telegramid != admin){
Bot.sendMessage("❌ Admin Only");
return;
}

let args = message.split(" ");

if(args.length < 2){

Bot.sendMessage(
"Usage:\n\n/userdeposit USERID"
);

return;

}

let uid = args[1];

let total =
Bot.getProperty(
uid + "_total_deposit"
) || 0;

let balance =
Bot.getProperty(
uid + "_balance"
) || 0;

let name =
Bot.getProperty(
uid + "_name"
) || "Unknown";

let username =
Bot.getProperty(
uid + "_username"
) || "NoUsername";

Bot.sendMessage(

"👤 User Deposit Report\n\n" +

"👤 Name: " + name +

"\n📛 Username: @" + username +

"\n🆔 User ID:\n<code>" +
uid +
"</code>" +

"\n\n💳 Total Auto Deposit: ₹" +
total +

"\n💰 Current Balance: ₹" +
balance,

{
parse_mode:"HTML"
}

);
