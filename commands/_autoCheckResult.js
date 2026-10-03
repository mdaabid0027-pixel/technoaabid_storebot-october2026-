/*CMD
  command: /autoCheckResult
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

let res = JSON.parse(content);

let order_id =
Bot.getProperty("order_" + user.telegramid);

if(!order_id){
return;
}

if(res.status == "success"){

let txn =
res.data.transaction_id
? res.data.transaction_id
: "unknown_txn";

// prevent double add

let paid =
Bot.getProperty("paid_" + txn);

if(paid){
return;
}

Bot.setProperty(
"paid_" + txn,
true,
"boolean"
);


// add balance

let amount =
parseFloat(res.data.amount || 0);

let key =
user.telegramid + "_balance";

let bal =
Bot.getProperty(key) || 0;

bal += amount;

Bot.setProperty(key, bal, "float");


Bot.sendMessage(
"✅ Payment Received Successfully\n\n" +
"💰 Amount: ₹" + amount +
"\n📊 New Balance: ₹" + bal
);


// stop auto loop

Bot.setProperty(
"order_" + user.telegramid,
null,
"string"
);

}else{

// continue auto checking

Bot.run({
command: "/autoCheckPayment",
run_after: 5
});

}
