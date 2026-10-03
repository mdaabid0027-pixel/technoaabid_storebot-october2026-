/*CMD
  command: /proof
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
command: /proof
*/

let msg =
"✅ <b>PROOF SECTION</b>\n\n" +
"━━━━━━━━━━━━━━━━━━\n\n" +

"👇 <b>हिंदी (Hindi)</b> 👇\n\n" +
"यहाँ बहुत सारे पेमेंट और रिज़ल्ट के प्रूफ उपलब्ध हैं।\n" +
"नीचे दिए गए बटन पर क्लिक करके सभी प्रूफ देख सकते हैं।\n" +
"सभी प्रूफ 100% रियल हैं और समय-समय पर अपडेट होते रहते हैं।\n\n" +

"━━━━━━━━━━━━━━━━━━\n\n" +

"👇 <b>English</b> 👇\n\n" +
"Here You Can Find Many Payment & Result Proofs.\n" +
"Click the buttons below to check all proof channels.\n" +
"All Proofs Are 100% Real And Updated Regularly.\n\n" +

"━━━━━━━━━━━━━━━━━━";

Api.sendMessage({
  text: msg,
  parse_mode: "HTML",
  disable_web_page_preview: true,
  reply_markup: {
    inline_keyboard: [
      [
        { text: "📢 Main Channel", url: "https://t.me/Techno_Aabid" }
      ],
      [
        { text: "📂 All Proof Channel", url: "https://t.me/Aabid_proofs" }
      ],
      [
        { text: "🤖 Bot Deal Proof", url: "https://t.me/Auto_Aabid_Proof" }
      ]
    ]
  }
});
