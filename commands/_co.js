/*CMD
  command: /co
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
command: /co
*/

let admin = Bot.getProperty("admin");
let logChannel = Bot.getProperty("log_channel");

let uid = user.telegramid;

// quantity
let qty = Bot.getProperty(uid + "_bulk_qty") || 1;

// selection
let app = Bot.getProperty(uid + "_selected_app");
let game = Bot.getProperty(uid + "_selected_game");
let duration = Bot.getProperty(uid + "_selected_duration");

if(!app || !game || !duration){

Bot.sendMessage("⚠️ Please start purchase again.");
Bot.runCommand("/start");
return;

}

game = game.toLowerCase();

// reseller detection
let teamList = Bot.getProperty("team_list") || [];
let isReseller = teamList.map(String).includes(String(uid));

let grid = Bot.getProperty(uid + "_grid") || {};

let resellerKey = "snake_" + game + "_" + duration;

let price;

// reseller price first
if(isReseller && grid[resellerKey] !== undefined){

price = Number(grid[resellerKey]);

}else{

price = Number(
Bot.getProperty("snake_" + game + "_" + duration + "_price")
) || 0;

}

// ❌ PRICE NOT CONFIGURED ALERT (ADMIN NOTIFY ADDED)
if(price <= 0){

Bot.sendMessage(
"❌ Price not configured.\n\nProduct: Snake Engine" +
"\nGame: " + game.toUpperCase() +
"\nDuration: " + duration + " Days"
);

if(admin){

Api.sendMessage({
chat_id: admin,
text:
"🚨 PRICE NOT CONFIGURED ALERT\n\n" +
"👤 User: @" + (user.username || "NoUsername") +
"\n🆔 ID: " + uid +
"\n🎮 Game: " + game.toUpperCase() +
"\n⏳ Duration: " + duration +
"\n📦 Engine: Snake Engine"
});

}

return;

}

// balance check
let balKey = uid + "_balance";
let balance = Bot.getProperty(balKey) || 0;

let totalPrice = price * qty;

if(balance < totalPrice){

Bot.sendMessage(
"❌ Insufficient Balance\n\nRequired: ₹" +
totalPrice +
"\nYour Balance: ₹" +
balance
);

return;

}

// stock check
let stockKey = "snake_" + game + "_" + duration + "_stock";
let stock = Bot.getProperty(stockKey);

if(!Array.isArray(stock) || stock.length < qty){

Bot.sendMessage(
"❌ Not enough stock available.\n\nRequested: " +
qty +
"\nAvailable: " +
(stock ? stock.length : 0)
);

if(admin){

Api.sendMessage({
chat_id: admin,
text:
"🚨 STOCK ALERT\n\nUser: @" +
(user.username || "NoUsername") +
"\nGame: " + game +
"\nDuration: " + duration +
"\nRequested: " + qty
});

}

return;

}

// deliver keys
let delivered = [];

for(let i=0;i<qty;i++){
delivered.push(stock.shift());
}

Bot.setProperty(stockKey, stock, "json");

// deduct balance
let newBalance = balance - totalPrice;
Bot.setProperty(balKey, newBalance, "float");

// success message
Api.sendMessage({
parse_mode:"HTML",
text:
"✅ Snake Engine Keys Delivered\n\n" +
"Game: " + game.toUpperCase() +
"\nDuration: " + duration +
" Days\nQuantity: " + qty +
"\n\nKeys:\n<code>" +
delivered.join("\n") +
"</code>\n\nRemaining Balance: ₹" +
newBalance
});

// admin log
if(admin){

Api.sendMessage({
chat_id: admin,
parse_mode:"HTML",
text:
"🔔 <b>Snake Engine Sold</b>\n\n" +
"👤 Name: " + user.first_name +
"\n📛 Username: @" +
(user.username || "NoUsername") +
"\n🆔 ID: <code>" + uid + "</code>" +
"\n🎮 Game: " + game.toUpperCase() +
"\n⏳ Duration: " + duration +
" Days\n🔢 Qty: " + qty +
"\n💰 Price: ₹" + totalPrice +
"\n\n🔑 Keys:\n<code>" +
delivered.join("\n") +
"</code>"
});

}

// channel log
if(logChannel){

Api.sendMessage({
chat_id: logChannel,
parse_mode:"HTML",
text:
"📡 <b>SNAKE ENGINE SOLD</b>\n\n" +

"👤 <b>User:</b> @" + (user.username || "NoUsername") +
"\n🆔 <code>" + uid + "</code>" +

"\n\n🎮 <b>Game:</b> " + game.toUpperCase() +
"\n⏳ <b>Duration:</b> " + duration + " Days" +

"\n🔢 <b>Quantity:</b> " + qty +

"\n💰 <b>Total Paid:</b> ₹" + totalPrice +

"\n💳 <b>Balance Left:</b> ₹" + newBalance +

"\n📦 <b>Remaining Stock:</b> " + stock.length +

"\n👑 <b>Role:</b> " + (isReseller ? "Reseller" : "User") +

"\n\n🔑 <b>Keys:</b>\n<code>" +
delivered.join("\n") +
"</code>",

reply_markup:{
inline_keyboard:[

[
{
text:"🤖 Open Bot",
url:"https://t.me/TechnoAabid_storebot"
}
]

]
}

});

}

// history save
let history = Bot.getProperty(uid + "_purchase_history") || [];

let entry =
"🐍 Snake Engine\n" +
"🎮 Game: " + game.toUpperCase() +
"\n⏳ Duration: " + duration +
" Days\n🔢 Qty: " + qty +
"\n💰 Paid: ₹" + totalPrice +
"\n🔑 Keys:\n" + delivered.join(", ") +
"\n📅 Date: " +
new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"});

history.unshift(entry);
history = history.slice(0,20);

Bot.setProperty(uid+"_purchase_history",history,"json");

// reset qty
Bot.setProperty(uid+"_bulk_qty",null,"integer");

Bot.runCommand("/start");
