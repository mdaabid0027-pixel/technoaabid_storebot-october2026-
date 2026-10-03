/*CMD
  command: /setprivateLogChannel
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
command: /setprivateLogChannel
*/

// चेक करें कि कमांड भेजने वाला एडमिन है या नहीं
let admin = Bot.getProperty("admin");

if (admin && user.telegramid.toString() !== admin.toString()) {
  Bot.sendMessage("❌ You are not authorized to use this command.");
  return;
}

let channelInput = params.trim();

if (!channelInput) {
  Bot.sendMessage(
    "⚠️ **Please provide the channel username or ID!**\n\n" +
    "👉 Example: `/setprivateLogChannel @YourPrivateLogChannel`"
  );
  return;
}

// एडमिन/प्राइवेट लॉग चैनल को बोट की प्रॉपर्टी में सेव करें
Bot.setProperty("log_channel", channelInput, "string");

Bot.sendMessage(
  "✅ **Private Log Channel Set Successfully!**\n\n" +
  "📢 Channel: " + channelInput + "\n\n" +
  "अब जब भी कोई की बिकेगी (Key Sold) या स्टॉक खत्म होगा, उसका प्राइवेट नोटिफिकेशन इस चैनल पर भेजा जाएगा।"
);
