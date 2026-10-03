/*CMD
  command: AddBalanceh
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
  command: AddBalanceh
*/

let qr = Bot.getProperty("qr_image_url") || "https://ibb.co/wGQr0"

Api.sendPhoto({
  photo: qr,
  caption: 
  "📲 कृपया नीचे दिए गए QR को स्कैन करके भुगतान करें।"
});

Bot.sendMessage(
  "💳 भुगतान करने के बाद उसका स्क्रीनशॉट यहाँ भेजें।\n\n" +
  "✅ आपका बैलेंस जांच के बाद जोड़ दिया जाएगा।\n\n" +
  "📌 ध्यान दें:\n" +
  "UTR (Transaction ID) और राशि स्क्रीनशॉट में साफ दिखाई देनी चाहिए।"
);

Bot.runCommand("sendPhotohindi");
