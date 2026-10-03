/*CMD
  command: /autoCheckPayment
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

let order_id =
Bot.getProperty("order_" + user.telegramid);

if(!order_id){
return;
}

HTTP.get({
  url:
  "https://fampay.anujbots.xyz/verify.php?order_id=" +
  order_id +
  "&api_key=FAM_44a1094e0368452f70b1a84a333e83af5bab691333bb32d7",

  success: "/autoCheckResult"
});
