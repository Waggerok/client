const tg = window.Telegram.WebApp;
const currentTelegramUser = tg.initDataUnsafe?.user?.username;

module.exports ={
    tg,
    currentTelegramUser
}