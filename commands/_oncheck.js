/*CMD
  command: /oncheck
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

let res = JSON.parse(content);

if (res.status == "success") {

  let amount = parseFloat(res.data.amount);
  let txn = res.data.transaction_id;
  let utr = res.data.utr;
  let senderName = res.data.sender_name;
  let time = res.data.payment_time_ist;

  let paid = Bot.getProperty("paid_" + txn);

  if (!paid) {

    Bot.setProperty("paid_" + txn, true, "boolean");


    // ===== USER INFO =====

    let username = user.username ? "@" + user.username : "NoUsername";

    let fullname =
      user.first_name +
      (user.last_name ? " " + user.last_name : "");

    let profileLink =
      "<a href='tg://user?id=" +
      user.telegramid +
      "'>Open Profile</a>";


    // ===== ADD BALANCE =====

    let key = user.telegramid + "_balance";

    let currentBalance = Bot.getProperty(key);
    if (!currentBalance) currentBalance = 0;

    let newBalance = currentBalance + amount;

    Bot.setProperty(key, newBalance, "float");
    // ===== PAYMENT STATS =====

    // User Lifetime Deposit
    let userTotal =
    Bot.getProperty(user.telegramid + "_total_deposit") || 0;

    userTotal += amount;

    Bot.setProperty(
        user.telegramid + "_total_deposit",
        userTotal,
        "float"
    );

    // Global Lifetime Deposit
    let total =
    Bot.getProperty("total_deposit") || 0;

    total += amount;

    Bot.setProperty(
        "total_deposit",
        total,
        "float"
    );

    // Yearly Deposit
    let year =
    new Date().getFullYear();

    let yearly =
    Bot.getProperty("deposit_year_" + year) || 0;

    yearly += amount;

    Bot.setProperty(
        "deposit_year_" + year,
        yearly,
        "float"
    );

    // Monthly Deposit
    let month =
    ("0" + (new Date().getMonth() + 1)).slice(-2);

    let monthKey =
    year + "_" + month;

    let monthly =
    Bot.getProperty("deposit_month_" + monthKey) || 0;

    monthly += amount;

    Bot.setProperty(
        "deposit_month_" + monthKey,
        monthly,
        "float"
    );

    // Weekly Deposit
    let week =
    Math.ceil(new Date().getDate() / 7);

    let weekKey =
    year + "_" + month + "_W" + week;

    let weekly =
    Bot.getProperty("deposit_week_" + weekKey) || 0;

    weekly += amount;

    Bot.setProperty(
        "deposit_week_" + weekKey,
        weekly,
        "float"
    );


    // ===== USER SUCCESS MESSAGE =====

    Bot.sendMessage(
      "✅ *Payment Successful*\n\n" +
      "💰 Amount: ₹" + amount +
      "\n👤 Sender Name: " + senderName +
      "\n🔢 UTR: " + utr +
      "\n🧾 Txn ID: " + txn +
      "\n🕒 Time: " + time +
      "\n\n📊 New Balance: ₹" + newBalance,
      { parse_mode: "Markdown" }
    );


    // ===== ADMIN NOTIFY =====

    let admin = Bot.getProperty("admin");

    if (admin) {

      Api.sendMessage({
        chat_id: admin,
        text:
          "💳 <b>NEW PAYMENT RECEIVED</b>\n\n" +
          "👤 Name: " + fullname +
          "\n🔗 Username: " + username +
          "\n🆔 User ID: <code>" + user.telegramid + "</code>" +
          "\n📲 " + profileLink +
          "\n\n👤 Sender Name: " + senderName +
          "\n💰 Amount: ₹" + amount +
          "\n📊 Balance: ₹" + newBalance +
          "\n🔢 UTR: " + utr +
          "\n🧾 Txn: " + txn +
          "\n🕒 " + time,
        parse_mode: "HTML"
      });

    }


    // ===== CHANNEL LOG NOTIFY =====

    let logChannel = Bot.getProperty("log_channel");

    if (logChannel) {

      Api.sendMessage({
        chat_id: logChannel,
        parse_mode: "HTML",
        text:
          "💰 <b>AUTO PAYMENT RECEIVED</b>\n\n" +
          "👤 Name: " + fullname +
          "\n🔗 Username: " + username +
          "\n🆔 ID: <code>" + user.telegramid + "</code>" +
          "\n📲 " + profileLink +
          "\n\n👤 Sender Name: " + senderName +
          "\n💰 Amount: ₹" + amount +
          "\n📊 Balance: ₹" + newBalance +
          "\n🔢 UTR: " + utr +
          "\n🧾 Txn: " + txn +
          "\n🕒 " + time
      });

    }


  } else {

    Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: "⚠️ Payment already added",
      show_alert: true
    });

  }

} else {

  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "Payment Not Received ❌",
    show_alert: true
  });

}
