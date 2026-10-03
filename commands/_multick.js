/*CMD
  command: /multick
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

///multick
if (!content) {
const botToken = bot.token;
var channels = Bot.getProperty("channels_list", []);
if(!Array.isArray(channels)) channels = [];

const userId = user.telegramid;
const api = "https://verify-membership-coding-with-mohits-projects.vercel.app/verify-membership";

HTTP.post({
url: api,
body: {
botToken: botToken,
chatIds: channels,
userId: userId
},
success: "/multick"
});
return;
}

const response = JSON.parse(content);
const joined = response.joinedAllChats;

if (joined !== true) {
let notJoined = response.notJoinedChats || [];
if (notJoined.length > 0) {
let msg = "🚨 You have not yet joined the following channels.:\n\n";
for (let ch of notJoined) {
msg += "👉 " + ch + "\n";
}
msg += "\n⚠️ Please join all channels, then try again.";
return Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: msg,
  show_alert: true
});
}
return Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: "‼️ Please join all required channels.",
  show_alert: true
})
}

Bot.runCommand("/check");
