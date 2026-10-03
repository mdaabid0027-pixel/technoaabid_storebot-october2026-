/*CMD
  command: /earnmoney
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
command: /earnmoney
*/

let last = User.getProperty("last_ad_time");

if(last && Date.now() - last < 10000){

Bot.sendMessage("⏳ Please wait 10 seconds before next ad.");
return;

}

Api.sendMessage({
text:
"💰 Earn Money Section\n\nWatch advertisement and earn reward.",
reply_markup:{
inline_keyboard:[
[
{ text:"▶️ Watch Ad & Earn ₹1", url:"https://gplinks.co/K1b5" }
]
]
}
});
