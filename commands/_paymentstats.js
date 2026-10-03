/*CMD
  command: /paymentstats
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: this is counting From 25 June 2026

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/*CMD
command: /paymentstats
*/

let admin = Bot.getProperty("admin");

if(user.telegramid != admin){
Bot.sendMessage("❌ Admin Only");
return;
}

let now = new Date();

let year = now.getFullYear();

let month =
("0" + (now.getMonth() + 1)).slice(-2);

let day =
("0" + now.getDate()).slice(-2);

let week =
Math.ceil(now.getDate() / 7);

let monthNames = [
"January",
"February",
"March",
"April",
"May",
"June",
"July",
"August",
"September",
"October",
"November",
"December"
];

let monthName =
monthNames[now.getMonth()];

// Previous Month
let prevDate =
new Date(year, now.getMonth() - 1, 1);

let prevYear =
prevDate.getFullYear();

let prevMonth =
("0" + (prevDate.getMonth() + 1)).slice(-2);

let prevMonthName =
monthNames[prevDate.getMonth()];

// Stats
let total =
Bot.getProperty("total_deposit") || 0;

let yearly =
Bot.getProperty(
"deposit_year_" + year
) || 0;

let monthly =
Bot.getProperty(
"deposit_month_" +
year + "_" + month
) || 0;

let previousMonth =
Bot.getProperty(
"deposit_month_" +
prevYear + "_" +
prevMonth
) || 0;

let weekly =
Bot.getProperty(
"deposit_week_" +
year + "_" +
month +
"_W" + week
) || 0;

let today =
Bot.getProperty(
"deposit_today_" +
year + "_" +
month + "_" +
day
) || 0;

Bot.sendMessage(

"📊 Auto Payment Statistics\n\n" +

"💰 Lifetime Deposit: ₹" +
total +

"\n📅 This Year (" +
year +
"): ₹" +
yearly +

"\n🗓 This Month (" +
monthName +
" " +
year +
"): ₹" +
monthly +

"\n📅 Previous Month (" +
prevMonthName +
" " +
prevYear +
"): ₹" +
previousMonth +

"\n📆 This Week (Week " +
week +
"): ₹" +
weekly +

"\n📍 Today (" +
day +
" " +
monthName +
"): ₹" +
today

);
