import { Telegraf, Markup } from 'telegraf';
import { createClient } from '@supabase/supabase-js';

const required = ['BOT_TOKEN', 'SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) throw new Error(`Missing environment variables: ${missing.join(', ')}`);
const bot = new Telegraf(process.env.BOT_TOKEN);
const db = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const ADMIN_ID = String(process.env.ADMIN_ID || '5006281199');
const NOTIFY_ID = String(process.env.NOTIFY_ID || '8519564658');
const ENGINES = {
  snake: { name: '🐍 Snake Engine', games: ['8 Ball Pool', 'Carrom', 'Soccer'], days: [3, 10, 30, 90] },
  kos: { name: '🚀 Kos Engine', games: ['8 Ball Pool', 'Carrom'], days: [1, 7, 15, 30] },
  aimai: { name: '🎯 AimAI Engine', games: ['8 Ball Pool', 'Carrom'], days: [1, 3, 7, 15, 30, 90] },
  shinigami: { name: '👹 Shinigami', games: ['Carrom'], days: [1, 3, 7, 15, 30, 90] },
};
const HOME = Markup.keyboard([
  ['🛒 Purchase Product', '💰 Price List'],
  ['💳 Check Balance', '➕ Add Balance'],
  ['📦 Check Stock', '🧾 Purchase History'],
  ['🏆 Leaderboard', 'ℹ️ Help'],
]).resize();
const ADMIN_MENU = Markup.keyboard([
  ['➕ Add Stock', '💵 Set Price'],
  ['👥 Add Reseller', '💳 Add Balance to User'],
  ['🧾 Set QR', '📊 Stats'],
  ['🔔 Start Notifications', '📣 Broadcast'],
  ['🏠 Main Menu'],
]).resize();
const BACK = Markup.inlineKeyboard([[Markup.button.callback('⬅️ Back', 'back'), Markup.button.callback('🏠 Main Menu', 'home')]]);
const sessions = new Map(); // UI-only state; purchase/payment records themselves are persisted in Supabase.
const key = (id) => String(id);
const admin = (ctx) => key(ctx.from?.id) === ADMIN_ID;
const safe = (s) => String(s ?? '').replace(/[&<>]/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;' }[c]));
const money = (n) => `₹${Number(n || 0).toFixed(2)}`;
function engineKb(prefix) { return Markup.inlineKeyboard([
  [{ text: ENGINES.snake.name, callback_data: `${prefix}:snake` }, { text: ENGINES.kos.name, callback_data: `${prefix}:kos` }],
  [{ text: ENGINES.aimai.name, callback_data: `${prefix}:aimai` }, { text: ENGINES.shinigami.name, callback_data: `${prefix}:shinigami` }],
  [{ text: '🏠 Main Menu', callback_data: 'home' }],
]); }
async function ensureUser(ctx) {
  const id = key(ctx.from.id);
  const row = { telegram_id: id, full_name: [ctx.from.first_name, ctx.from.last_name].filter(Boolean).join(' '), username: ctx.from.username || null };
  const { data, error } = await db.from('store_users').select('*').eq('telegram_id', id).maybeSingle();
  if (error) throw error;
  if (!data) {
    const { error: ie } = await db.from('store_users').insert({ ...row, balance: 0, role: id === ADMIN_ID ? 'admin' : 'user' });
    if (ie) throw ie;
    return { ...row, balance: 0, role: id === ADMIN_ID ? 'admin' : 'user' };
  }
  await db.from('store_users').update({ full_name: row.full_name, username: row.username }).eq('telegram_id', id);
  return data;
}
async function getSetting(name) {
  const { data, error } = await db.from('store_settings').select('value').eq('key', name).maybeSingle();
  if (error) throw error;
  return data?.value ?? null;
}
async function setSetting(name, value) {
  const { error } = await db.from('store_settings').upsert({ key: name, value }, { onConflict: 'key' });
  if (error) throw error;
}
async function home(ctx) {
  const u = await ensureUser(ctx);
  await ctx.replyWithHTML(`✨ <b>TECHNO AABID STORE</b>\n👤 ${safe(u.full_name || ctx.from.first_name)}\n🆔 <code>${ctx.from.id}</code>\n💰 Balance: ${money(u.balance)}\n\nChoose an option below.`, HOME);
}
async function getProduct(engine, game, days) {
  const { data, error } = await db.from('store_products').select('*').eq('engine', engine).eq('game', game).eq('duration_days', days).eq('active', true).maybeSingle();
  if (error) throw error;
  return data;
}
async function effectivePrice(product, telegramId) {
  const { data: u, error: ue } = await db.from('store_users').select('role').eq('telegram_id', key(telegramId)).maybeSingle();
  if (ue) throw ue;
  if (u?.role === 'reseller') {
    const { data: rp, error: re } = await db.from('store_reseller_prices').select('price').eq('telegram_id', key(telegramId)).eq('product_id', product.id).maybeSingle();
    if (re) throw re;
    if (rp && Number(rp.price) > 0) return Number(rp.price);
  }
  return Number(product.price);
}
async function availableCount(productId) {
  const { count, error } = await db.from('store_stock').select('id', { count: 'exact', head: true }).eq('product_id', productId).is('sold_to', null);
  if (error) throw error;
  return count || 0;
}
async function showPrices(ctx) {
  const { data, error } = await db.from('store_products').select('engine,game,duration_days,price').eq('active', true).order('engine').order('game').order('duration_days');
  if (error) throw error;
  if (!data?.length) return ctx.reply('Price list abhi set nahi hui. Admin se contact karein.', HOME);
  const lines = data.map(p => `${ENGINES[p.engine]?.name || p.engine} | ${p.game} | ${p.duration_days} days — ${money(p.price)}`);
  await ctx.reply('💰 PRICE LIST\n\n' + lines.join('\n'), HOME);
}
async function beginBuy(ctx) {
  sessions.set(key(ctx.from.id), { flow: 'buy_engine' });
  await ctx.reply('🛒 Select engine:', Markup.keyboard([
    [ENGINES.snake.name, ENGINES.kos.name],
    [ENGINES.aimai.name, ENGINES.shinigami.name],
    ['❌ Cancel Purchase', '🏠 Main Menu'],
  ]).resize());
}
function gameKeyboard(engine) {
  const games = ENGINES[engine].games;
  const rows = [];
  for (let i=0; i<games.length; i+=2) rows.push(games.slice(i,i+2));
  rows.push(['⬅️ Back', '❌ Cancel Purchase', '🏠 Main Menu']);
  return Markup.keyboard(rows).resize();
}
function daysKeyboard(engine) {
  const days = ENGINES[engine].days.map(d => `${d} Days`);
  const rows = [];
  for (let i=0; i<days.length; i+=3) rows.push(days.slice(i,i+3));
  rows.push(['⬅️ Back', '❌ Cancel Purchase', '🏠 Main Menu']);
  return Markup.keyboard(rows).resize();
}
function resellerQuantityKeyboard(max) {
  const nums = Array.from({length: Math.min(10, max)}, (_,i)=>String(i+1));
  const rows = [];
  for (let i=0; i<nums.length; i+=5) rows.push(nums.slice(i,i+5));
  rows.push(['📦 All Stock', '❌ Cancel Purchase']);
  return Markup.inlineKeyboard(rows.map(row=>row.map(label=>Markup.button.callback(label, label==='📦 All Stock'?'qty:all':`qty:${label}`))));
}
async function askGame(ctx, prefix, engine) {
  const e = ENGINES[engine]; if (!e) return ctx.reply('Invalid engine.');
  sessions.set(key(ctx.from.id), { ...(sessions.get(key(ctx.from.id)) || {}), flow: prefix, engine });
  await ctx.reply(`${e.name}\nSelect game:`, Markup.inlineKeyboard([
    ...e.games.map((g, i) => [{ text: g, callback_data: `${prefix}game:${engine}:${i}` }]),
    [{ text: '⬅️ Back', callback_data: prefix === 'buy' ? 'buyback' : 'adminback' }, { text: '🏠 Main Menu', callback_data: 'home' }],
  ]));
}
async function askDays(ctx, prefix, engine, game) {
  const e = ENGINES[engine];
  await ctx.reply(`${game}\nSelect duration:`, Markup.inlineKeyboard([
    ...e.days.map(d => [{ text: `${d} Days`, callback_data: `${prefix}day:${engine}:${encodeURIComponent(game)}:${d}` }]),
    [{ text: '⬅️ Back', callback_data: `${prefix}backgame:${engine}` }, { text: '🏠 Main Menu', callback_data: 'home' }],
  ]));
}
async function beginTopup(ctx) {
  sessions.set(key(ctx.from.id), { flow: 'topup_amount' });
  await ctx.reply('Kitna balance add karna hai? Amount INR mein bhejein (₹1 se ₹10,000).');
}
async function notifyAdmin(text, extra = {}) {
  try { await bot.telegram.sendMessage(ADMIN_ID, text, extra); } catch (e) { console.error('Admin notification failed', e.message); }
}
bot.start(async (ctx) => {
  try {
    await home(ctx);
    const enabled = await getSetting('start_notifications');
    if (enabled !== false && key(ctx.from.id) !== NOTIFY_ID) await bot.telegram.sendMessage(NOTIFY_ID, `🔔 New start\nName: ${safe(ctx.from.first_name)}\nID: ${ctx.from.id}`).catch(() => {});
  } catch (e) { console.error(e); await ctx.reply('Temporary database error. Please try again later.'); }
});
bot.command('admin', async ctx => { if (!admin(ctx)) return ctx.reply('Admin only.'); await ctx.reply('🛠 Admin Panel', ADMIN_MENU); });
bot.command('cancel', async ctx => { sessions.delete(key(ctx.from.id)); await ctx.reply('Cancelled.', HOME); });
bot.command('setqr', async ctx => { if (!admin(ctx)) return ctx.reply('Admin only.'); sessions.set(key(ctx.from.id), { flow: 'set_qr' }); await ctx.reply('Ab payment QR image bhejo.'); });
bot.command('setprice', async ctx => { if (!admin(ctx)) return ctx.reply('Admin only.'); sessions.set(key(ctx.from.id), { flow: 'setprice_engine' }); await ctx.reply('Select engine:', engineKb('price')); });
bot.command('addstock', async ctx => { if (!admin(ctx)) return ctx.reply('Admin only.'); await ctx.reply('Select engine:', engineKb('stock')); });
bot.command('addbalance', async ctx => {
  if (!admin(ctx)) return ctx.reply('Admin only.');
  const [, uid, amountText] = ctx.message.text.trim().split(/\s+/); const amount = Number(amountText);
  if (!/^\d+$/.test(uid || '') || !Number.isFinite(amount) || amount <= 0) return ctx.reply('Use: /addbalance USER_ID AMOUNT');
  const { data: user, error } = await db.from('store_users').select('telegram_id,balance').eq('telegram_id', uid).maybeSingle();
  if (error || !user) return ctx.reply('User not found or database error. User must /start first.');
  const { error: ue } = await db.rpc('admin_credit_balance', { p_telegram_id: uid, p_amount: amount, p_reference: `admin:${ctx.from.id}:${Date.now()}` });
  if (ue) return ctx.reply(`Credit failed: ${ue.message}. Check SQL setup.`);
  await ctx.reply(`Added ${money(amount)} to ${uid}.`); await bot.telegram.sendMessage(uid, `💰 Admin credited ${money(amount)} to your balance.`).catch(() => {});
});
bot.command('addreseller', async ctx => {
  if (!admin(ctx)) return ctx.reply('Admin only.');
  const uid = ctx.message.text.trim().split(/\s+/)[1];
  if (!/^\d+$/.test(uid || '')) return ctx.reply('Use: /addreseller USER_ID');
  const { data, error } = await db.from('store_users').select('telegram_id').eq('telegram_id', uid).maybeSingle();
  if (error || !data) return ctx.reply('User not found. Ask user to /start first.');
  const { error: e } = await db.from('store_users').update({ role: 'reseller' }).eq('telegram_id', uid);
  if (e) return ctx.reply('Could not update role.');
  sessions.set(key(ctx.from.id), { flow: 'reseller_engine', target: uid }); await ctx.reply('Reseller enabled. Choose engine to set reseller prices:', engineKb('reseller'));
});
// Reply keyboard text routes
bot.hears('🏠 Main Menu', home);
bot.hears('🛒 Purchase Product', beginBuy);
bot.hears('💰 Price List', async ctx => { try { await showPrices(ctx); } catch (e) { console.error(e); await ctx.reply('Could not load price list.'); } });
bot.hears('💳 Check Balance', async ctx => { try { const u = await ensureUser(ctx); await ctx.reply(`💰 Your balance: ${money(u.balance)}`, HOME); } catch (e) { console.error(e); await ctx.reply('Could not load balance.'); } });
bot.hears('➕ Add Balance', beginTopup);
bot.hears('📦 Check Stock', async ctx => {
  try { const { data, error } = await db.from('store_stock').select('id', { count: 'exact' }).is('sold_to', null); if (error) throw error; await ctx.reply(`📦 Available keys: ${data?.length ?? 0}`, HOME); }
  catch (e) { console.error(e); await ctx.reply('Could not load stock.'); }
});
bot.hears('🧾 Purchase History', async ctx => {
  try { const { data, error } = await db.from('store_purchases').select('quantity,total_price,status,created_at,product_id').eq('telegram_id', key(ctx.from.id)).order('created_at', { ascending: false }).limit(10); if (error) throw error;
    if (!data?.length) return ctx.reply('No purchases yet.', HOME);
    await ctx.reply('🧾 Purchase History\n' + data.map((p,i) => `${i+1}. ${p.quantity} key(s) • ${money(p.total_price)} • ${p.status} • ${new Date(p.created_at).toLocaleString('en-IN')}`).join('\n'), HOME);
  } catch (e) { console.error(e); await ctx.reply('Could not load history.'); }
});
bot.hears('🏆 Leaderboard', async ctx => {
  try { const { data, error } = await db.from('store_purchases').select('telegram_id,quantity,status').eq('status','completed'); if (error) throw error;
    const totals = {}; for (const r of data || []) totals[r.telegram_id] = (totals[r.telegram_id] || 0) + Number(r.quantity || 0);
    const top = Object.entries(totals).sort((a,b)=>b[1]-a[1]).slice(0,10); if (!top.length) return ctx.reply('Leaderboard empty.', HOME);
    await ctx.reply('🏆 TOP KEY BUYERS\n' + top.map(([id,n],i)=>`${i+1}. ${id} — ${n} keys`).join('\n'), HOME);
  } catch (e) { console.error(e); await ctx.reply('Could not load leaderboard.'); }
});
bot.hears('ℹ️ Help', ctx => ctx.reply('Purchase: select engine, game, duration, quantity and confirm. Add Balance: enter amount, pay the shown QR and send payment screenshot in this chat. Admin reviews screenshots manually. Never send OTP or UPI PIN.', HOME));
bot.hears('➕ Add Stock', async ctx => { if (!admin(ctx)) return ctx.reply('Admin only.'); await ctx.reply('Select engine:', engineKb('stock')); });
bot.hears('💵 Set Price', async ctx => { if (!admin(ctx)) return ctx.reply('Admin only.'); await ctx.reply('Select engine:', engineKb('price')); });
bot.hears('👥 Add Reseller', ctx => admin(ctx) ? ctx.reply('Use /addreseller USER_ID') : ctx.reply('Admin only.'));
bot.hears('💳 Add Balance to User', ctx => admin(ctx) ? ctx.reply('Use /addbalance USER_ID AMOUNT') : ctx.reply('Admin only.'));
bot.hears('🧾 Set QR', async ctx => { if (!admin(ctx)) return ctx.reply('Admin only.'); sessions.set(key(ctx.from.id), { flow: 'set_qr' }); await ctx.reply('Send the payment QR image.'); });
bot.hears('📊 Stats', async ctx => {
  if (!admin(ctx)) return ctx.reply('Admin only.');
  try { const [{ count: users, error: ue }, { count: stock, error: se }, { count: purchases, error: pe }] = await Promise.all([
    db.from('store_users').select('*',{count:'exact',head:true}), db.from('store_stock').select('*',{count:'exact',head:true}).is('sold_to',null), db.from('store_purchases').select('*',{count:'exact',head:true})]);
    if (ue||se||pe) throw ue||se||pe; await ctx.reply(`📊 Stats\nUsers: ${users||0}\nAvailable keys: ${stock||0}\nPurchase records: ${purchases||0}`, ADMIN_MENU);
  } catch(e) { console.error(e); await ctx.reply('Stats failed.'); }
});
bot.hears('🔔 Start Notifications', async ctx => { if (!admin(ctx)) return ctx.reply('Admin only.'); const v = await getSetting('start_notifications'); await setSetting('start_notifications', v === false); await ctx.reply(`Start notifications ${v === false ? 'ON' : 'OFF'}`, ADMIN_MENU); });
bot.hears('📣 Broadcast', ctx => { if (!admin(ctx)) return ctx.reply('Admin only.'); sessions.set(key(ctx.from.id), { flow: 'broadcast' }); return ctx.reply('Send broadcast text, or /cancel.'); });
// Inline selection routes
bot.action('home', async ctx => { await ctx.answerCbQuery(); await home(ctx); });
bot.action('buyback', async ctx => { await ctx.answerCbQuery(); await beginBuy(ctx); });
bot.action('adminback', async ctx => { await ctx.answerCbQuery(); await ctx.reply('Admin panel', ADMIN_MENU); });
bot.action(/^(buy|stock|price|reseller):(snake|kos|aimai|shinigami)$/, async ctx => {
  await ctx.answerCbQuery(); const [, prefix, engine] = ctx.match;
  if (prefix !== 'buy' && !admin(ctx)) return ctx.reply('Admin only.');
  if (prefix === 'stock') sessions.set(key(ctx.from.id), { flow: 'stock_game', engine });
  if (prefix === 'price') sessions.set(key(ctx.from.id), { flow: 'price_game', engine });
  if (prefix === 'reseller') { const s=sessions.get(key(ctx.from.id))||{}; sessions.set(key(ctx.from.id), {...s,flow:'reseller_game',engine}); }
  await askGame(ctx, prefix, engine);
});
bot.action(/^(buy|stock|price|reseller)game:(snake|kos|aimai|shinigami):(\d+)$/, async ctx => {
  await ctx.answerCbQuery(); const [, prefix, engine, ix] = ctx.match; if (prefix !== 'buy' && !admin(ctx)) return ctx.reply('Admin only.');
  const game = ENGINES[engine].games[Number(ix)]; if (!game) return ctx.reply('Invalid game.');
  const flow = prefix === 'buy' ? 'buy' : prefix === 'stock' ? 'stock' : prefix === 'price' ? 'price' : 'reseller';
  sessions.set(key(ctx.from.id), { ...(sessions.get(key(ctx.from.id))||{}), flow, engine, game }); await askDays(ctx, prefix, engine, game);
});
bot.action(/^(buy|stock|price|reseller)day:(snake|kos|aimai|shinigami):([^:]+):(\d+)$/, async ctx => {
  await ctx.answerCbQuery(); const [, prefix, engine, encoded, dayText] = ctx.match; if (prefix !== 'buy' && !admin(ctx)) return ctx.reply('Admin only.');
  const game = decodeURIComponent(encoded); const days = Number(dayText); if (!ENGINES[engine].days.includes(days) || !ENGINES[engine].games.includes(game)) return ctx.reply('Invalid plan.');
  const s = sessions.get(key(ctx.from.id)) || {}; Object.assign(s,{engine,game,days});
  if (prefix === 'stock') { s.flow='stock_keys'; sessions.set(key(ctx.from.id),s); return ctx.reply(`Send keys, one per line: ${ENGINES[engine].name} / ${game} / ${days} days.`, BACK); }
  if (prefix === 'price') { s.flow='price_value'; sessions.set(key(ctx.from.id),s); return ctx.reply(`Send user price in INR for ${ENGINES[engine].name} / ${game} / ${days} days.`); }
  if (prefix === 'reseller') { s.flow='reseller_value'; sessions.set(key(ctx.from.id),s); return ctx.reply(`Send reseller price in INR for ${s.target || 'selected reseller'} / ${ENGINES[engine].name} / ${game} / ${days} days.`); }
  const product = await getProduct(engine,game,days); if (!product) return ctx.reply('This plan is not configured yet.');
  const count = await availableCount(product.id); if (!count) return ctx.reply('❌ Out of stock.', HOME);
  const unitPrice = await effectivePrice(product, ctx.from.id);
  const user = await ensureUser(ctx);
  if (user.role === 'reseller') {
    sessions.set(key(ctx.from.id), { flow:'reseller_quantity', engine, game, days, productId:product.id, price:unitPrice, available:count });
    await ctx.reply(`${ENGINES[engine].name}\n🎮 ${game}\n⏳ ${days} days\n💵 Unit price: ${money(unitPrice)}\n📦 Available stock: ${count}\n\nQuantity choose karein:`, resellerQuantityKeyboard(count));
  } else {
    sessions.set(key(ctx.from.id), { flow:'confirm_purchase', engine, game, days, productId:product.id, price:unitPrice, qty:1, total:Number(unitPrice.toFixed(2)) });
    await ctx.reply(`Confirm purchase?\n${ENGINES[engine].name}\n🎮 ${game} • ${days} days\nQuantity: 1 key\nPrice: ${money(unitPrice)}\nYour balance: ${money(user.balance)}\nBalance after purchase: ${money(Number(user.balance)-unitPrice)}`, Markup.inlineKeyboard([[Markup.button.callback('✅ Yes, Purchase','purchase_confirm'),Markup.button.callback('❌ Cancel Purchase','purchase_cancel')]]));
  }
});
bot.action(/^qty:(all|[1-9]|10)$/, async ctx => {
  await ctx.answerCbQuery();
  const uid=key(ctx.from.id), s=sessions.get(uid);
  if (!s || s.flow!=='reseller_quantity') return ctx.reply('Selection expired. Start Purchase Product again.');
  try {
    const qty = ctx.match[1]==='all' ? Number(await availableCount(s.productId)) : Number(ctx.match[1]);
    const max = Number(await availableCount(s.productId));
    if (!Number.isInteger(qty)||qty<1||qty>max) return ctx.reply(`Stock changed. Available now: ${max}. Please select again.`);
    const user=await ensureUser(ctx); const total=Number((Number(s.price)*qty).toFixed(2));
    if (Number(user.balance)<total) { sessions.delete(uid); return ctx.reply(`Insufficient balance. Total ${money(total)}, balance ${money(user.balance)}. Please Add Balance first.`,HOME); }
    sessions.set(uid,{...s,flow:'confirm_purchase',qty,total});
    return ctx.reply(`Confirm reseller purchase?\n${ENGINES[s.engine].name}\n${s.game} • ${s.days} days\nQuantity: ${qty}${ctx.match[1]==='all'?' (all available stock)':''}\nTotal: ${money(total)}\nBalance after purchase: ${money(Number(user.balance)-total)}`,Markup.inlineKeyboard([[Markup.button.callback('✅ Yes, Purchase','purchase_confirm'),Markup.button.callback('❌ Cancel Purchase','purchase_cancel')]]));
  } catch(e) { console.error(e); return ctx.reply('Could not check quantity. Try again.'); }
});

bot.action(/^(approve_topup|reject_topup):(\d+)$/, async ctx => {
  await ctx.answerCbQuery(); if (!admin(ctx)) return ctx.reply('Admin only.');
  const [, action, id] = ctx.match;
  const { data: req, error } = await db.from('store_topups').select('*').eq('id', id).maybeSingle();
  if (error || !req) return ctx.reply('Top-up request not found.');
  if (req.status !== 'pending') return ctx.reply(`Request already ${req.status}.`);
  if (action === 'approve_topup') {
    const { error: rpcError } = await db.rpc('approve_topup_once', { p_topup_id: id, p_admin_telegram_id: ADMIN_ID });
    if (rpcError) return ctx.reply(`Approval failed: ${rpcError.message}. Ensure SQL setup is applied.`);
    await ctx.editMessageCaption(`${ctx.callbackQuery.message.caption || 'Top-up'}\n\n✅ APPROVED by admin ${ADMIN_ID}`).catch(()=>{});
    await bot.telegram.sendMessage(req.telegram_id, `✅ Payment proof approved. ${money(req.amount)} added to your balance.`).catch(()=>{});
    return ctx.reply('Top-up approved and credited.');
  }
  const { error: re } = await db.from('store_topups').update({ status:'rejected', reviewed_by:ADMIN_ID, reviewed_at:new Date().toISOString() }).eq('id', id).eq('status','pending');
  if (re) return ctx.reply(`Reject failed: ${re.message}`);
  await ctx.editMessageCaption(`${ctx.callbackQuery.message.caption || 'Top-up'}\n\n❌ REJECTED by admin ${ADMIN_ID}`).catch(()=>{});
  await bot.telegram.sendMessage(req.telegram_id, `❌ Payment proof for ${money(req.amount)} was rejected. Please contact admin if you believe this is a mistake.`).catch(()=>{});
  return ctx.reply('Top-up rejected.');
});
// Photo handling: QR setup by admin; otherwise a pending top-up proof from user.
bot.on('photo', async ctx => {
  try {
    const uid = key(ctx.from.id); const s = sessions.get(uid);
    if (admin(ctx) && s?.flow === 'set_qr') { await setSetting('payment_qr_file_id', ctx.message.photo.at(-1).file_id); sessions.delete(uid); return ctx.reply('✅ QR saved. Users can now tap Add Balance.', ADMIN_MENU); }
    const pending = sessions.get(uid);
    if (pending?.flow !== 'await_topup_proof') return ctx.reply('Screenshot receive nahi hua as a pending request. Pehle Add Balance se amount choose karein.');
    const { data: row, error } = await db.from('store_topups').insert({ telegram_id: uid, amount: pending.amount, status:'pending', proof_file_id:ctx.message.photo.at(-1).file_id, user_caption:ctx.message.caption || null }).select().single();
    if (error) throw error;
    sessions.delete(uid);
    await ctx.reply(`✅ Screenshot submitted. Request #${row.id} pending admin review hai. Approval ke baad balance add hoga.`, HOME);
    await bot.telegram.sendPhoto(ADMIN_ID, ctx.message.photo.at(-1).file_id, { caption:`💳 BALANCE TOP-UP PROOF\nRequest: #${row.id}\nUser: ${uid}\nAmount: ${money(pending.amount)}\nUsername: @${ctx.from.username || 'none'}\nCaption: ${safe(ctx.message.caption || 'none')}\n\nApprove only after checking your UPI/bank statement.`, ...Markup.inlineKeyboard([[Markup.button.callback('✅ Approve & Credit', `approve_topup:${row.id}`), Markup.button.callback('❌ Reject', `reject_topup:${row.id}`)]]) });
  } catch (e) { console.error(e); await ctx.reply('Could not save screenshot. Please try again or contact admin.'); }
});
bot.on('text', async (ctx, next) => {
  const uid = key(ctx.from.id); const text = ctx.message.text.trim(); const s = sessions.get(uid);
  if (!s || text.startsWith('/')) return next();
  if (text === '❌ Cancel' || text === '❌ Cancel Purchase') { sessions.delete(uid); return ctx.reply('Purchase/operation cancelled.', HOME); }
  try {
    if (s.flow === 'buy_engine') {
      const engine = Object.keys(ENGINES).find(k => ENGINES[k].name === text);
      if (!engine) return next();
      sessions.set(uid, { flow:'buy_game', engine });
      return ctx.reply(`${ENGINES[engine].name}\n🎮 Select game:`, gameKeyboard(engine));
    }
    if (s.flow === 'buy_game') {
      if (text === '⬅️ Back') return beginBuy(ctx);
      const game = ENGINES[s.engine].games.find(g => g === text);
      if (!game) return next();
      sessions.set(uid, { flow:'buy_day', engine:s.engine, game });
      return ctx.reply(`${game}\n⏳ Select duration:`, daysKeyboard(s.engine));
    }
    if (s.flow === 'buy_day') {
      if (text === '⬅️ Back') { sessions.set(uid, {flow:'buy_game', engine:s.engine}); return ctx.reply('🎮 Select game:', gameKeyboard(s.engine)); }
      const match = text.match(/^(\d+) Days$/); if (!match) return next();
      const days = Number(match[1]);
      if (!ENGINES[s.engine].days.includes(days)) return ctx.reply('Invalid duration. Select one of the buttons.');
      const product = await getProduct(s.engine,s.game,days); if (!product) return ctx.reply('This plan is not configured yet.', HOME);
      const count = await availableCount(product.id); if (!count) return ctx.reply('❌ Out of stock.', HOME);
      const user = await ensureUser(ctx); const price = await effectivePrice(product,uid);
      if (user.role === 'reseller') {
        sessions.set(uid,{flow:'reseller_quantity',engine:s.engine,game:s.game,days,productId:product.id,price,available:count});
        return ctx.reply(`${ENGINES[s.engine].name}\n🎮 ${s.game} • ${days} days\nUnit price: ${money(price)}\nAvailable: ${count}\nChoose quantity:`,resellerQuantityKeyboard(count));
      }
      sessions.set(uid,{flow:'confirm_purchase',engine:s.engine,game:s.game,days,productId:product.id,price,qty:1,total:Number(price.toFixed(2))});
      return ctx.reply(`Confirm purchase?\n${ENGINES[s.engine].name}\n${s.game} • ${days} days\nQuantity: 1\nPrice: ${money(price)}\nBalance: ${money(user.balance)}`,Markup.inlineKeyboard([[Markup.button.callback('✅ Yes, Purchase','purchase_confirm'),Markup.button.callback('❌ Cancel Purchase','purchase_cancel')]]));
    }
    if (s.flow === 'topup_amount') {
      const amount = Number(text.replace(/[₹,\s]/g,'')); if (!Number.isFinite(amount) || amount < 1 || amount > 10000) return ctx.reply('₹1–₹10,000 ke beech valid amount bhejein.');
      const qr = await getSetting('payment_qr_file_id'); if (!qr) return ctx.reply('Admin ne abhi QR set nahi kiya hai.');
      sessions.set(uid, { flow:'await_topup_proof', amount });
      await ctx.replyWithPhoto(qr, { caption:`➕ Add Balance\nAmount: ${money(amount)}\n\nQR par payment karein. Payment ke baad isi chat mein screenshot bhejein. Admin verify karke balance credit karega. Sirf screenshot se automatic credit nahi hoga.` });
      return;
    }
    if (s.flow === 'reseller_quantity') {
      return ctx.reply('Reseller quantity ke liye neeche diye gaye inline buttons use karein.');
    }
    if (s.flow === 'stock_keys') {
      if (!admin(ctx)) return ctx.reply('Admin only.'); const codes = text.split(/\r?\n/).map(x=>x.trim()).filter(Boolean); if (!codes.length) return ctx.reply('Send at least one key.');
      let { data: p, error: pe } = await db.from('store_products').select('id').eq('engine',s.engine).eq('game',s.game).eq('duration_days',s.days).maybeSingle(); if (pe) throw pe;
      if (!p) return ctx.reply('Set the price first, then add stock.');
      const { error } = await db.from('store_stock').insert(codes.map(license_key=>({product_id:p.id,license_key}))); if (error) throw error;
      sessions.delete(uid); return ctx.reply(`✅ Saved ${codes.length} key(s).`, ADMIN_MENU);
    }
    if (s.flow === 'price_value') {
      if (!admin(ctx)) return ctx.reply('Admin only.'); const price = Number(text.replace(/[₹,\s]/g,'')); if (!Number.isFinite(price)||price<=0) return ctx.reply('Enter a valid price, e.g. 199.');
      const { error } = await db.from('store_products').upsert({engine:s.engine,game:s.game,duration_days:s.days,price,active:true},{onConflict:'engine,game,duration_days'}); if (error) throw error;
      sessions.delete(uid); return ctx.reply(`✅ Price saved: ${money(price)}`, ADMIN_MENU);
    }
    if (s.flow === 'reseller_value') {
      if (!admin(ctx)) return ctx.reply('Admin only.'); const price=Number(text.replace(/[₹,\s]/g,'')); if (!Number.isFinite(price)||price<=0) return ctx.reply('Enter a valid reseller price.');
      const { data:p,error:pe }=await db.from('store_products').select('id').eq('engine',s.engine).eq('game',s.game).eq('duration_days',s.days).maybeSingle(); if(pe) throw pe; if(!p) return ctx.reply('Set user price first.');
      const {error}=await db.from('store_reseller_prices').upsert({telegram_id:s.target,product_id:p.id,price},{onConflict:'telegram_id,product_id'}); if(error) throw error;
      sessions.delete(uid); return ctx.reply(`✅ Reseller price saved for ${s.target}: ${money(price)}`, ADMIN_MENU);
    }
    if (s.flow === 'broadcast') {
      if (!admin(ctx)) return ctx.reply('Admin only.'); const {data:users,error}=await db.from('store_users').select('telegram_id'); if(error) throw error;
      let sent=0; for(const u of users||[]) { try { await bot.telegram.sendMessage(u.telegram_id,text); sent++; } catch {} }
      sessions.delete(uid); return ctx.reply(`Broadcast done. Sent: ${sent}`,ADMIN_MENU);
    }
  } catch (e) { console.error(e); await ctx.reply(`Operation failed. ${e.message || ''}`); }
});
bot.action('purchase_cancel', async ctx => { await ctx.answerCbQuery(); sessions.delete(key(ctx.from.id)); await ctx.reply('Purchase cancelled.', HOME); });
bot.action('purchase_confirm', async ctx => {
  await ctx.answerCbQuery(); const uid=key(ctx.from.id); const s=sessions.get(uid); if(!s || s.flow!=='confirm_purchase') return ctx.reply('Purchase session expired. Start again.');
  try {
    const { data, error } = await db.rpc('purchase_and_deliver', { p_telegram_id:uid, p_product_id:s.productId, p_quantity:s.qty });
    if(error) throw error;
    const result=Array.isArray(data)?data[0]:data;
    if(!result?.ok) return ctx.reply(result?.message || 'Purchase failed. Please try again.');
    sessions.delete(uid);
    const delivered = Array.isArray(result.keys) ? result.keys : (typeof result.keys==='string' ? JSON.parse(result.keys) : []);
    await ctx.reply(`✅ PURCHASE SUCCESSFUL\nOrder: #${result.purchase_id}\n${ENGINES[s.engine].name}\n${s.game} • ${s.days} days\nQuantity: ${s.qty}\nPaid: ${money(s.total)}\n\nYour license key(s):\n${delivered.map((k,i)=>`${i+1}. ${k}`).join('\n')}\n\nPlease keep this message safe.`, HOME);
    await notifyAdmin(`🛒 Purchase completed\nUser: ${uid}\nOrder: #${result.purchase_id}\nPlan: ${s.engine} / ${s.game} / ${s.days} days\nQuantity: ${s.qty}\nTotal: ${money(s.total)}`);
  } catch(e) { console.error(e); await ctx.reply(`Purchase could not be completed: ${e.message || 'database/RPC setup required'}. Balance/stock should remain unchanged if SQL RPC is configured correctly.`); }
});
bot.catch((err)=>console.error('Telegram bot error:',err));
export default async function handler(req,res) {
  if (req.method === 'GET') return res.status(200).json({status:'Techno Aabid Store webhook ready'});
  if (req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  try { await bot.handleUpdate(req.body); return res.status(200).json({ok:true}); }
  catch(e) { console.error('Webhook error',e); return res.status(500).json({ok:false}); }
}
