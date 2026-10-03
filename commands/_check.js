/*CMD
  command: /check
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

let order_id = params

if (!order_id) {
  Bot.sendMessage("🚫 Invalid Order ID")
  return
}

HTTP.get({
  url: "https://fampay.anujbots.xyz/verify.php?order_id=" + order_id + "&api_key=FAM_7a61be247351f8624b49360d49c5e3ba7fd34a94a67fb019", //get api key from @FamPayApiKeyBot
  success: "/oncheck"
})
