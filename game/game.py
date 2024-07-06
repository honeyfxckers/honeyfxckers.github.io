import nest_asyncio
import asyncio
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import Application, CommandHandler

# Примените nest_asyncio
nest_asyncio.apply()

# Функция для команды /start
async def start(update: Update, context):
    keyboard = [
        [InlineKeyboardButton("Играть", web_app=WebAppInfo(url="https://honeyfxckers.github.io/"))],
        [InlineKeyboardButton("Логировать IP", url=f"http://yourserver.com/log_ip?user_id={update.message.from_user.id}")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text('Добро пожаловать! Нажмите "Играть", чтобы начать.', reply_markup=reply_markup)

# Основная функция для запуска бота
async def main():
    application = Application.builder().token("7152451716:AAFqnu3z5z51ecu07F-YSLjTcd1B_mLJYgs").build()

    # Команда /start
    application.add_handler(CommandHandler("start", start))

    # Запуск бота
    await application.run_polling()

if __name__ == '__main__':
    asyncio.run(main())
