/*CMD
  command: /setUserLogChannel
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
command: /setUserLogChannel
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
    "👉 Example: `/setUserLogChannel @YourChannelUsername`"
  );
  return;
}

// चैनल को प्रॉपर्टी में सेव करें
Bot.setProperty("user_log_channel", channelInput, "string");

Bot.sendMessage(
  "✅ **User Log Channel Set Successfully!**\n\n" +
  "📢 Channel: " + channelInput + "\n\n" +
  "अब जब भी कोई नया स्टॉक ऐड होगा, उसका नोटिफिकेशन इस चैनल पर 'Buy Now' बटन के साथ चला जाएगा।"
);
