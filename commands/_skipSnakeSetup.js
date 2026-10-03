/*CMD
  command: /skipSnakeSetup
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
command: /skipSnakeSetup
*/

Api.sendMessage({
  text:"Now select Kos pricing setup:",
  reply_markup:{
    inline_keyboard:[
      [
        {
          text:"🚀 Set Kos Price",
          callback_data:"/setupKosReseller"
        }
      ],
      [
        {
          text:"⏭ Skip (Empty)",
          callback_data:"/finishResellerSetup"
        }
      ]
    ]
  }
});
