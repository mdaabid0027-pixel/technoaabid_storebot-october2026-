const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN || '7956903949:AAF8aaevYHXxAvId6tuJfiZ2oGYGM1ggTiY');

bot.start((ctx) => ctx.reply('Hello! Bot is working live on.'));
bot.help((ctx) => ctx.reply('Send /start to test.'));

// Vercel Serverless Webhook Handler
module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      await bot.handleUpdate(req.body);
      res.status(200).send('OK');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error handling update');
    }
  } else {
    res.status(200).send('Telegram Bot is running on Vercel Webhook!');
  }
};
