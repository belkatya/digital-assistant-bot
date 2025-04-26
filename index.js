require('dotenv').config();
const {Bot, GrammyError, HttpError, InlineKeyboard, InputFile, Context} = require('grammy');

const bot = new Bot(process.env.BOT_API_KEY);

let previousMessage = null;

bot.api.setMyCommands([
    {
        command: 'ege', 
        description: 'Все про ЕГЭ',
    },
    {
        command: 'oge', 
        description: 'Все про ОГЭ',
    },
    {
        command: 'faq', 
        description: 'Часто задаваемые вопросы',
    },
    {
        command: 'help', 
        description: 'Контакты и помощь',
    }
]);

async function sendImage(ctx, filePath, captions) {
    try {
      console.log("Отправка изображения:", filePath);
      const image = new InputFile(filePath);
      await ctx.replyWithPhoto(image, { caption: captions });
      console.log("Изображение успешно отправлено:", filePath);
    } catch (error) {
      console.error("Ошибка при отправке изображения:", error);
      ctx.reply("Не удалось отправить изображение. Проверьте логи.");
    }
  };

bot.command('start', async (ctx) => {
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE');
    await ctx.reply('Здравствуйте\\! 👋 \nЯ — ваш *цифровой помощник* по подготовке к ЕГЭ и ОГЭ\\.\n\n' +
        'Здесь вы найдёте актуальную информацию об экзаменах, полезные материалы, советы по подготовке и ответы на часто задаваемые вопросы\\.\n\n' +
        '*Как пользоваться ботом:*\n\n' +
        '1\\.  Выберите интересующий вас экзамен: **ЕГЭ** или **ОГЭ**\\.\n' +
        '2\\.  Используйте команды для быстрого доступа к информации:\n' +
        '   🔹  `/ege`  —\\>  Всё о ЕГЭ\n' +
        '   🔹  `/oge`  —\\>  Всё о ОГЭ\n' +
        '   🔹  `/faq`  —\\>  Ответы на часто задаваемые вопросы\n' +
        '   🔹  `/help`  —\\>  Контакты для связи и помощь\n\n' +
        'Выберите ЕГЭ или ОГЭ, чтобы начать ✅', {
        reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2'
    });

});

bot.command('ege', async (ctx) => {
        const EGEKeyboard = new InlineKeyboard().text('1', '1').text('2', '2').text('3', '3').text('4', '4').text('5', '5').row().text('6', '6').text('7', '7').text('8', '8').text('9', '9').text('10', '10');
    await ctx.reply('Вы выбрали ЕГЭ🔥 \n\nЧто вас интересует? \n\n1️⃣ Допуск к ЕГЭ и регистрация на экзамен \n2️⃣ Расписание ЕГЭ 2025\n3️⃣ Подготовка к ЕГЭ \n4️⃣ Правила и требования на экзамене \n5️⃣ Результаты ЕГЭ \n6️⃣ Апелляция и пересдача  \n7️⃣ Профориентация и поступление в вуз по результатам ЕГЭ \n8️⃣ Кто может не сдавать ЕГЭ \n9⃣ ЕГЭ для обучающихся с ограниченными возможностями здоровья, детей–инвалидов и инвалидов \n🔟 Правила заполнения бланков ЕГЭ', {
        reply_markup: EGEKeyboard
    });
});

bot.command('oge', async (ctx) => {
    const OGEKeyboard = new InlineKeyboard().text('1', '01').text('2', '02').text('3', '03').text('4', '04').text('5', '05').row().text('6', '06').text('7', '07').text('8', '08').text('9', '09').text('10', '010');
    await ctx.reply('Вы выбрали ОГЭ🔥 \n\nЧто вас интересует? \n\n1️⃣ Допуск к ОГЭ и регистрация на экзамен\n2️⃣ Расписание ОГЭ 2025\n3️⃣ Подготовка к ОГЭ\n4️⃣ Правила и требования на экзамене \n5️⃣ Результаты ОГЭ  \n6️⃣ Апелляция и пересдача ОГЭ \n7️⃣ Поступление в 10 класс/колледж \n8️⃣ Советы для родителей и выпускников\n9⃣ ОГЭ для обучающихся с ограниченными возможностями здоровья, детей–инвалидов и инвалидов \n🔟 Правила заполнения бланков ОГЭ', {
        reply_markup: OGEKeyboard
    });
});

bot.command('faq', async (ctx) => {
    await ctx.reply('📍 Часто задаваемые вопросы \n\n📌 Скоро в данном разделе будут представлены часто задаваемые вопросы и ответы на них.', {
    });
});

bot.command('help', async (ctx) => {
    const HelpKeyboard = new InlineKeyboard().text('Горячие линии ЕГЭ/ОГЭ', 'contacts').row().text('Телефоны доверия и другие контакты', 'other').row().text('Психологическая поддержка', 'psychological');
    await ctx.reply('📍 Контакты и помощь \n\n📌 Горячая линия — это помощь Рособрнадзора по всем вопросам, касающимся экзаменов. \n\n📌 Телефон доверия предоставляется Рособрнадзором или другими образовательными организациями и служит для поддержки и консультирования выпускников, их родителей или участников ЕГЭ и ОГЭ в случае возникновения проблем, стресса или эмоционального дискомфорта перед экзаменом.', {
        reply_markup: HelpKeyboard
    });
});

// КОНТАКТЫ И ПОМОЩЬ (НАЗАД)
bot.callbackQuery('back_help2', async (ctx) => {
    await ctx.answerCallbackQuery();
    if (previousMessage) {
        // Удаляем клавиатуру из предыдущего сообщения
        await bot.api.editMessageReplyMarkup(
            previousMessage.chat_id,
            previousMessage.message_id,
            undefined
        );
    } else {
        console.log("Нет предыдущего сообщения для удаления клавиатуры.");
    }
    const HelpKeyboard = new InlineKeyboard().text('Горячие линии ЕГЭ/ОГЭ', 'contacts').row().text('Телефоны доверия и другие контакты', 'other').row().text('Психологическая поддержка', 'psychological');
    await ctx.reply('📍 Контакты и помощь \n\n📌 Горячая линия — это помощь Рособрнадзора по всем вопросам, касающимся экзаменов. \n\n📌 Телефон доверия предоставляется Рособрнадзором или другими образовательными организациями и служит для поддержки и консультирования выпускников, их родителей или участников ЕГЭ и ОГЭ в случае возникновения проблем, стресса или эмоционального дискомфорта перед экзаменом.', {
        reply_markup: HelpKeyboard
    });
});

// ГОРЯЧИЕ ЛИНИИ ЕГЭ/ОГЭ
bot.callbackQuery('contacts', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('Назад', 'back_help2');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 Контакты и помощь \n\n➡️ _Горячие линии ЕГЭ/ОГЭ_ \n\n✅ *Телефоны «горячих линий» в Тамбове:* \n\n🔸 по вопросам проведения ЕГЭ, ОГЭ и итогового сочинения: \n\n📞 _*\\+7 \\(4752\\) 72\\-77\\-85*_ \n📞 _*\\+7 \\(4752\\) 79\\-23\\-82*_ \n\n🔸 по организационным вопросам: \n\n📞 _*\\+7 \\(4752\\) 47\\-02\\-46*_ \n📞 _*\\+7 \\(4752\\) 72\\-60\\-46*_ \n\n🔸 по техническим вопросам: \n\n📞 _*\\+7 \\(4752\\) 71\\-27\\-99*_', {
           reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2'
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 Контакты и помощь \n\n➡️ _Горячие линии ЕГЭ/ОГЭ_ \n\n✅ *Телефоны «горячих линий» в Тамбове:* \n\n🔸 по вопросам проведения ЕГЭ, ОГЭ и итогового сочинения: \n\n📞 _*\\+7 \\(4752\\) 72\\-77\\-85*_ \n📞 _*\\+7 \\(4752\\) 79\\-23\\-82*_ \n\n🔸 по организационным вопросам: \n\n📞 _*\\+7 \\(4752\\) 47\\-02\\-46*_ \n📞 _*\\+7 \\(4752\\) 72\\-60\\-46*_ \n\n🔸 по техническим вопросам: \n\n📞 _*\\+7 \\(4752\\) 71\\-27\\-99*_', {
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2'
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
       
});

// ТЕЛЕФОНЫ ДОВЕРИЯ И ДРУГИЕ КОНТАКТЫ
bot.callbackQuery('other', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('Назад', 'back_help2');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 Контакты и помощь \n\n➡️ _Телефоны доверия и другие контакты_ \n\n✅ Телефон доверия ЕГЭ: \n\n📞 _*\\+7 \\(4951\\) 98\\-93\\-38*_ \n\n✅ Телефон доверия ОГЭ: \n\n📞 _*\\+7 \\(4951\\) 04\\-68\\-38*_ \n\n🔹 Управление образования и науки Тамбовской области: \n\n📞_*\\+7 \\(4752\\) 79\\-23\\-24*_ \n\n🔹 Комитет образования администрации города Тамбова: \n\n📞 _*\\+7 \\(4752\\) 53\\-65\\-36*_ \n\n🔹 ТОГКУ «Центр экспертизы образовательной деятельности»: \n\n📧 rcoi68@yandex\\.ru \n\n🔹 Рособрнадзор, адрес доверия: \n\n📧 ege@obrnadzor\\.gov\\.ru \n📞 _*\\+7 \\(4959\\) 84\\-89\\-19 \\(доб\\. 5\\)*_', {
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2'
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 Контакты и помощь \n\n➡️ _Телефоны доверия и другие контакты_ \n\n✅ Телефон доверия ЕГЭ: \n\n📞 _*\\+7 \\(4951\\) 98\\-93\\-38*_ \n\n✅ Телефон доверия ОГЭ: \n\n📞 _*\\+7 \\(4951\\) 04\\-68\\-38*_ \n\n🔹 Управление образования и науки Тамбовской области: \n\n📞 _*\\+7 \\(4752\\) 79\\-23\\-24*_ \n\n🔹 Комитет образования администрации города Тамбова: \n\n📞 _*\\+7 \\(4752\\) 53\\-65\\-36*_ \n\n🔹 ТОГКУ «Центр экспертизы образовательной деятельности»: \n\n📧 rcoi68@yandex\\.ru \n\n🔹 Рособрнадзор, адрес доверия: \n\n📧 ege@obrnadzor\\.gov\\.ru \n 📞_*\\+7 \\(4959\\) 84\\-89\\-19 \\(доб\\. 5\\)*_', {
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2'
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
       
});

// ПСИХОЛОГИЧЕСКАЯ ПОДДЕРЖКА
bot.callbackQuery('psychological', async (ctx) => {
    await ctx.answerCallbackQuery();
    const HelpthreeKeyboard = new InlineKeyboard().text('Памятка для родителей', 'ps1').row().text('Памятка для учеников', 'ps2').row().text('Контакты', 'ps3').row().text('Назад', 'back_help');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        await ctx.editMessageText('📍 Контакты и помощь \n\n➡️ _Психологическая поддержка_ \n', {
            reply_markup: HelpthreeKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        await ctx.reply('📍 Контакты и помощь \n\n➡️ _Психологическая поддержка_ \n', {
            reply_markup: HelpthreeKeyboard
        });
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
       
});

// ПСИХОЛОГИЧЕСКАЯ ПОДДЕРЖКА (НАЗАД)
bot.callbackQuery('back_psychological', async (ctx) => {
    await ctx.answerCallbackQuery();
    if (previousMessage) {
        // Удаляем клавиатуру из предыдущего сообщения
        await bot.api.editMessageReplyMarkup(
            previousMessage.chat_id,
            previousMessage.message_id,
            undefined
        );
    } else {
        console.log("Нет предыдущего сообщения для удаления клавиатуры.");
    }
    const HelpthreeKeyboard = new InlineKeyboard().text('Памятка для родителей', 'ps1').row().text('Памятка для учеников', 'ps2').row().text('Контакты', 'ps3').row().text('Назад', 'back_help');
    await ctx.reply('📍 Контакты и помощь \n\n➡️ _Психологическая поддержка_ \n', {
        reply_markup: HelpthreeKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
    }); 
});

// ПАМЯТКА ДЛЯ РОДИТЕЛЕЙ
bot.callbackQuery('ps1', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('Назад', 'back_psychological');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 Контакты и помощь \n\n➡️ _Психологическая поддержка_ \n➡️ _Памятка для родителей_', {
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2'
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 Контакты и помощь \n\n➡️ _Психологическая поддержка_ \n➡️ _Памятка для родителей_', {
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2'
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
    await sendImage(ctx, "img/Plakat-dlya-roditelei.jpg", 'Памятка для родителей');
       
});

// ПАМЯТКА ДЛЯ УЧЕНИКОВ
bot.callbackQuery('ps2', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('Назад', 'back_psychological');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 Контакты и помощь \n\n➡️ _Психологическая поддержка_ \n➡️ _Памятка для учеников_', {
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2'
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 Контакты и помощь \n\n➡️ _Психологическая поддержка_ \n➡️ _Памятка для учеников_', {
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2'
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
    await sendImage(ctx, "img/Plakat-dlya-shkolnikov.jpg", 'Памятка для учеников');
       
});

// КОНТАКТЫ
bot.callbackQuery('ps3', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('Назад', 'back_psychological');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 Контакты и помощь \n\n➡️ _Психологическая поддержка_\n➡️ _Контакты_ \n\nМуниципальное бюджетное учреждение «Центр психолого\\-педагогической, медицинской и социальной помощи» \n\nТелефон: _*\\+7\\(4752\\) 53\\-73\\-38*_ \n\nАдрес: _*392008, г\\. Тамбов, ул\\. Рабочая, д\\. 4а*_ \n\nE\\-mail: _*psi@city\\.tambov\\.gov\\.ru*_ \n\nРежим работы: \n_*понедельник – пятница*_\n_*с 8:30 до 17:30*_', {
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2'
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 Контакты и помощь \n\n➡️ _Психологическая поддержка_\n➡️ _Контакты_ \n\nМуниципальное бюджетное учреждение «Центр психолого\\-педагогической, медицинской и социальной помощи» \n\nТелефон: _*\\+7\\(4752\\) 53\\-73\\-38*_ \n\nАдрес: _*392008, г\\. Тамбов, ул\\. Рабочая, д\\. 4а*_ \n\nE\\-mail: _*psi@city\\.tambov\\.gov\\.ru*_ \n\nРежим работы: \n_*понедельник – пятница*_\n_*с 8:30 до 17:30*_', {
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2'
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
       
});

// НАЗАД (КОНТАКТЫ И ПОМОЩЬ)
bot.callbackQuery('back_help', async (ctx) => {
    await ctx.answerCallbackQuery();
    const HelpKeyboard = new InlineKeyboard().text('Горячие линии ЕГЭ/ОГЭ', 'contacts').row().text('Телефоны доверия и другие контакты', 'other').row().text('Психологическая поддержка', 'psychological');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        await ctx.editMessageText('📍 Контакты и помощь \n\n📌 Горячая линия — это помощь Рособрнадзора по всем вопросам, касающимся экзаменов\\. \n\n📌 Телефон доверия предоставляется Рособрнадзором или другими образовательными организациями и служит для поддержки и консультирования выпускников, их родителей или участников ЕГЭ и ОГЭ в случае возникновения проблем, стресса или эмоционального дискомфорта перед экзаменом\\.', {
            reply_markup: HelpKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        await ctx.reply('📍 Контакты и помощь \n\n📌 Горячая линия — это помощь Рособрнадзора по всем вопросам, касающимся экзаменов\\. \n\n📌 Телефон доверия предоставляется Рособрнадзором или другими образовательными организациями и служит для поддержки и консультирования выпускников, их родителей или участников ЕГЭ и ОГЭ в случае возникновения проблем, стресса или эмоционального дискомфорта перед экзаменом\\.', {
            reply_markup: HelpKeyboard
        });
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
       
});

bot.callbackQuery('EGE', async (ctx) => {
    await ctx.answerCallbackQuery();
    //const EGEKeyboard = new Keyboard().text('ОГЭ').row().text('ЕГЭ').row().resized()  - меню в клавиатуре
    /* - меню списком в клавиатуре
    const EGELabels = [
        'Регистрация на экзамен', 
        'Расписание и даты', 
        'Место проведения', 
        'Подготовка к экзаменам',
        'Что брать с собой',
        'Правила поведения на экзамене',
        'Апелляции и пересдачи',
        'Особые условия',
        'Результаты'];
    const rows = EGELabels.map((label) => {
        return [
            Keyboard.text(label)
        ]
    });
    const EGEKeyboard = Keyboard.from(rows).resized();
    await ctx.reply('Вы выбрали ЕГЭ🔥 \n\nЧто вас интересует?', {
        reply_markup: EGEKeyboard
    });
    */
    if (previousMessage) {
        // Удаляем клавиатуру из предыдущего сообщения
        await bot.api.editMessageReplyMarkup(
            previousMessage.chat_id,
            previousMessage.message_id,
            undefined
        );
    } else {
        console.log("Нет предыдущего сообщения для удаления клавиатуры.");
    }
    const EGEKeyboard = new InlineKeyboard().text('1', '1').text('2', '2').text('3', '3').text('4', '4').text('5', '5').row().text('6', '6').text('7', '7').text('8', '8').text('9', '9').text('10', '10');
    await ctx.reply('Вы выбрали ЕГЭ🔥 \n\nЧто вас интересует? \n\n1️⃣ Допуск к ЕГЭ и регистрация на экзамен \n2️⃣ Расписание ЕГЭ 2025\n3️⃣ Подготовка к ЕГЭ \n4️⃣ Правила и требования на экзамене \n5️⃣ Результаты ЕГЭ \n6️⃣ Апелляция и пересдача  \n7️⃣ Профориентация и поступление в вуз по результатам ЕГЭ \n8️⃣ Кто может не сдавать ЕГЭ \n9⃣ ЕГЭ для обучающихся с ограниченными возможностями здоровья, детей–инвалидов и инвалидов \n🔟 Правила заполнения бланков ЕГЭ', {
        reply_markup: EGEKeyboard
    });
});

//1 ДОПУСК К ЕГЭ И РЕГИСТРАЦИЯ НА ЭКЗАМЕН
bot.callbackQuery('1', async (ctx) => {
    await ctx.answerCallbackQuery();
    const EGEoneKeyboard = new InlineKeyboard().text('Итоговое сочинение', '11').row().text('Как записаться на сдачу ЕГЭ', '12').row().text('❗ Сроки подачи заявлений', '13').row().text('Предметы по выбору и математика профиль', '14').row().text('Назад', 'back');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Допуск к ЕГЭ и регистрация на экзамен_ \n\n✅ Чтобы успешно подготовиться к ЕГЭ в 2025 году, важно помнить несколько правил: \n\n1\\. Нужно получить *"зачёт"* за итоговое сочинение \\(изложение\\)\\. Без него не допустят к экзаменам\\. \n\n2\\. Не должно быть *долгов* по предметам и годовых оценок ниже *"3"* за 10 и 11 класс\\.', {
            reply_markup: EGEoneKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        await ctx.reply('📍 ЕГЭ \n\n➡️ _Допуск к ЕГЭ и регистрация на экзамен_ \n\n✅ Чтобы успешно подготовиться к ЕГЭ в 2025 году, важно помнить несколько правил: \n\n1\\. Нужно получить *"зачёт"* за итоговое сочинение \\(изложение\\)\\. Без него не допустят к экзаменам\\. \n\n2\\. Не должно быть *долгов* по предметам и годовых оценок ниже *"3"* за 10 и 11 класс\\.', {
            reply_markup: EGEoneKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
       
});

//1 ДОПУСК К ЕГЭ И РЕГИСТРАЦИЯ НА ЭКЗАМЕН БЕЗ исчезания
bot.callbackQuery('back1', async (ctx) => {
    await ctx.answerCallbackQuery();
    // Удаляем клавиатуру из предыдущего сообщения
    if (previousMessage) {
        // Удаляем клавиатуру из предыдущего сообщения
        await bot.api.editMessageReplyMarkup(
            previousMessage.chat_id,
            previousMessage.message_id,
            undefined
        );
    } else {
        console.log("Нет предыдущего сообщения для удаления клавиатуры.");
    }
    const EGEoneKeyboard = new InlineKeyboard().text('Итоговое сочинение', '11').row().text('Как записаться на сдачу ЕГЭ', '12').row().text('❗ Сроки подачи заявлений', '13').row().text('Предметы по выбору и математика профиль', '14').row().text('Назад', 'back');
    await ctx.reply('📍 ЕГЭ \n\n➡️ _Допуск к ЕГЭ и регистрация на экзамен_ \n\n✅ Чтобы успешно подготовиться к ЕГЭ в 2025 году, важно помнить несколько правил: \n\n1\\. Нужно получить *"зачёт"* за итоговое сочинение \\(изложение\\)\\. Без него не допустят к экзаменам\\. \n\n2\\. Не должно быть *долгов* по предметам и годовых оценок ниже *"3"* за 10 и 11 класс\\.', {
        reply_markup: EGEoneKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
    });       
});

//1.1 ИТОГОВОЕ СОЧИНЕНИЕ
bot.callbackQuery('11', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back1');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Допуск к ЕГЭ и регистрация на экзамен_ \n➡️ _Итоговое сочинение_ \n\n📌 *Итоговое сочинение – это допуск к ЕГЭ\\!* \n\n🗓 Проходит в *первую среду декабря* в 11 классе\\. \n\n📝 Заявление об участии в итоговом сочинении \\(изложении\\) подается не позднее, чем за две недели до начала его проведения\\. \n\nЗаявление подаётся в школе *лично учеником* или его *родителями/законными представителями*\\. \n\n✍ *Требования к сочинению:* \n🔸 Объем *от 350 слов* \\(рекомендуется\\)\\. \n🔸 Если *меньше 250 слов*, ставят «незачет», и сочинение даже не проверяют\\. \n🔸 Верхнего лимита по количеству слов нет\\. \n\n✅ *Оценка:* «зачет» или «незачет»\\.\n\n📖 Со всеми требованиями, закрытым банком тем и критериями оценивания можно ознакомиться [здесь](https://fipi.ru/itogovoe-sochinenie)\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });

        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }

    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _Допуск к ЕГЭ и регистрация на экзамен_ \n➡️ _Итоговое сочинение_ \n\n📌 *Итоговое сочинение – это допуск к ЕГЭ\\!* \n\n🗓 Проходит в *первую среду декабря* в 11 классе\\. \n\n📝 Заявление об участии в итоговом сочинении \\(изложении\\) подается не позднее, чем за две недели до начала его проведения\\. \n\nЗаявление подаётся в школе *лично учеником* или его *родителями/законными представителями*\\. \n\n✍ *Требования к сочинению:* \n🔸 Объем *от 350 слов* \\(рекомендуется\\)\\. \n🔸 Если *меньше 250 слов*, ставят «незачет», и сочинение даже не проверяют\\. \n🔸 Верхнего лимита по количеству слов нет\\. \n\n✅ *Оценка:* «зачет» или «незачет»\\.\n\n📖 Со всеми требованиями, закрытым банком тем и критериями оценивания можно ознакомиться [здесь](https://fipi.ru/itogovoe-sochinenie)\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//1.2 КАК ЗАПИСАТЬСЯ НА СДАЧУ ЕГЭ
bot.callbackQuery('12', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back1');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Допуск к ЕГЭ и регистрация на экзамен_ \n➡️ _Как записаться на сдачу ЕГЭ_ \n\n📌 *Заявление на участие в ЕГЭ нужно подать до 1 февраля 2026 года включительно\\!* \n\n📝 Подать заявление можно в своей школе *лично* или через *родителей/законных представителей*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _Допуск к ЕГЭ и регистрация на экзамен_ \n➡️ _Как записаться на сдачу ЕГЭ_ \n\n📌 *Заявление на участие в ЕГЭ нужно подать до 1 февраля 2026 года включительно\\!* \n\n📝 Подать заявление можно в своей школе *лично* или через *родителей/законных представителей*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//1.3 СРОКИ ПОДАЧИ ЗАЯВЛЕНИЙ
bot.callbackQuery('13', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back1');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Допуск к ЕГЭ и регистрация на экзамен_ \n➡️ _Сроки подачи заявлений_ \n\n📌 *Заявление на ЕГЭ необходимо подать до 1 февраля 2026 года включительно\\.* \n\n📌 *Что можно изменить после 1 февраля?* \n\nПосле 1 февраля изменить или добавить предметы ЕГЭ можно *только в особых случаях* \\(например, болезнь\\) и *только с подтверждающими документами* \\(справки и др\\.\\)\\. \n\n📝 В таком случае заявление и документы нужно подать в *ГЭК \\(государственную экзаменационную комиссию\\)* не позднее, чем *за 2 недели до начала экзамена*\\. \n\n➕ Также после 1 февраля можно изменить *уровень математики* \\(базовый или профильный\\)\\. Для этого тоже нужно подать заявление в *ГЭК* не позднее, чем *за 2 недели до начала экзамена*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _Допуск к ЕГЭ и регистрация на экзамен_ \n➡️ _Сроки подачи заявлений_ \n\n📌 *Заявление на ЕГЭ необходимо подать до 1 февраля 2026 года включительно\\.* \n\n📌 *Что можно изменить после 1 февраля?* \n\nПосле 1 февраля изменить или добавить предметы ЕГЭ можно *только в особых случаях* \\(например, болезнь\\) и *только с подтверждающими документами* \\(справки и др\\.\\)\\. \n\n📝 В таком случае заявление и документы нужно подать в *ГЭК \\(государственную экзаменационную комиссию\\)* не позднее, чем *за 2 недели до начала экзамена*\\. \n\n➕ Также после 1 февраля можно изменить *уровень математики* \\(базовый или профильный\\)\\. Для этого тоже нужно подать заявление в *ГЭК* не позднее, чем *за 2 недели до начала экзамена*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//1.4 РЕГИСТРАЦИЯ НА ПРЕДМЕТУ ПО ВЫБОРУ И МАТЕМАТИКУ ПРОФИЛЬНОГО УРОВНЯ
bot.callbackQuery('14', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back1');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Допуск к ЕГЭ и регистрация на экзамен_ \n➡️ _Предметы по выбору и математика профиль_ \n\n📌 *Как выбрать предметы для ЕГЭ?* \n\nПри подаче заявления нужно сразу указать, какие предметы по выбору вы будете сдавать добровольно\\. \n\n*Что обязательно:* \n\n✅ Русский язык\n✅ Математика \\(базовый уровень\\) \n\n*Что можно выбрать дополнительно:* \n\n🔹 Предметы, которые нужны для поступления в вуз \\(например, физика, химия, биология и т\\. д\\.\\)\\.\n\n⚠️ Важно\\!\nЕсли в вузе среди вступительных экзаменов есть математика, это всегда *профильный* уровень\\. Поэтому, если вам нужна математика для поступления, обязательно выбирайте *профильную* до *1 февраля 2026 года включительно*\\. \n\n➕ Также можно изменить *уровень ЕГЭ по математике*, если не сдадите экзамен \\(наберете ниже минимального балла\\) для повторной сдачи экзамена в резервные сроки, подав заявление в ГЭК в течение 2 рабочих дней, следующих за официальным днем опубликования результатов ЕГЭ по математике\\.\n\n💡 *Совет:* \nПроверяйте требования вузов после *20 января*, чтобы не ошибиться с выбором и количеством предметов ЕГЭ необходимых для поступления\\!', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _Допуск к ЕГЭ и регистрация на экзамен_ \n➡️ _Предметы по выбору и математика профиль_ \n\n📌 *Как выбрать предметы для ЕГЭ?* \n\nПри подаче заявления нужно сразу указать, какие предметы по выбору вы будете сдавать добровольно\\. \n\n*Что обязательно:* \n\n✅ Русский язык\n✅ Математика \\(базовый уровень\\) \n\n*Что можно выбрать дополнительно:* \n\n🔹 Предметы, которые нужны для поступления в вуз \\(например, физика, химия, биология и т\\. д\\.\\)\\.\n\n⚠️ Важно\\!\nЕсли в вузе среди вступительных экзаменов есть математика, это всегда *профильный* уровень\\. Поэтому, если вам нужна математика для поступления, обязательно выбирайте *профильную* до *1 февраля 2026 года включительно*\\. \n\n➕ Также можно изменить *уровень ЕГЭ по математике*, если не сдадите экзамен \\(наберете ниже минимального балла\\) для повторной сдачи экзамена в резервные сроки, подав заявление в ГЭК в течение 2 рабочих дней, следующих за официальным днем опубликования результатов ЕГЭ по математике\\.\n\n💡 *Совет:* \nПроверяйте требования вузов после *20 января*, чтобы не ошибиться с выбором и количеством предметов ЕГЭ необходимых для поступления\\!', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//2 РАСПИСАНИЕ ЕГЭ 2025
bot.callbackQuery('2', async (ctx) => {
    await ctx.answerCallbackQuery();
    const EGEtwoKeyboard = new InlineKeyboard().text('ЕГЭ в основной период', '21').row().text('ЕГЭ в досрочный период', '22').row().text('ЕГЭ в резервный период', '23').row().text('ЕГЭ в дополнительный период', '24').row().text('Назад', 'back');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Расписание ЕГЭ 2025_ \n\nЭкзамены проводятся в основной, досрочный и дополнительный периоды\\. У каждого периода есть резервные сроки\\. \n\nНачало экзамена – 10:00 по местному времени\\.', {
            reply_markup: EGEtwoKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        await ctx.reply('📍 ЕГЭ \n\n➡️ _Расписание ЕГЭ 2025_ \n\nЭкзамены проводятся в основной, досрочный и дополнительный периоды\\. У каждого периода есть резервные сроки\\. \n\nНачало экзамена – 10:00 по местному времени\\.', {
            reply_markup: EGEtwoKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
       
});

//2 РАСПИСАНИЕ ЕГЭ 2025 БЕЗ исчезания
bot.callbackQuery('back2', async (ctx) => {
    await ctx.answerCallbackQuery();
    if (previousMessage) {
        // Удаляем клавиатуру из предыдущего сообщения
        await bot.api.editMessageReplyMarkup(
            previousMessage.chat_id,
            previousMessage.message_id,
            undefined
        );
    } else {
        console.log("Нет предыдущего сообщения для удаления клавиатуры.");
    }
    const EGEtwoKeyboard = new InlineKeyboard().text('ЕГЭ в основной период', '21').row().text('ЕГЭ в досрочный период', '22').row().text('ЕГЭ в резервный период', '23').row().text('ЕГЭ в дополнительный период', '24').row().text('Назад', 'back');
    await ctx.reply('📍 ЕГЭ \n\n➡️ _Расписание ЕГЭ 2025_ \n\nЭкзамены проводятся в основной, досрочный и дополнительный периоды\\. У каждого периода есть резервные сроки\\. \n\nНачало экзамена – 10:00 по местному времени\\.', {
        reply_markup: EGEtwoKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
    });
       
});

//2.3 ЕГЭ В РЕЗЕРВНЫЙ ПЕРИОД
bot.callbackQuery('23', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back2');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Расписание ЕГЭ 2025_ \n➡️ _ЕГЭ в резервный период_ \n\nДля кого: \n\n🔹 Если *совпали даты* экзаменов по разным предметам\\. \n\n🔹 Если *не сдали* один из обязательных предметов, русский язык или математику\\. \n\n🔹 Если *не пришли на экзамен* по уважительной причине \\(нужно *подтверждение документами*\\)\\. \n\n🔹 Если *не смогли закончить экзамен* по уважительной причине, *подтвержденной документально*\\. \n\n🔹 Если ваша *апелляция о нарушении на экзамене* была удовлетворена\\. \n\n🔹 Если ваши *результаты аннулированы* из\\-за проблем с видеонаблюдением \\(не по вашей вине\\)\\. \n\n🔹 Если ваши *результаты аннулированы из\\-за чужих нарушений*, а не ваших\\. \n\n*Резервные дни в основной период:* \n\n🔸 16 июня \\(понедельник\\) — география, литература, обществознание, физика; \n🔸 17 июня \\(вторник\\) — русский язык; \n🔸 18 июня \\(среда\\) — иностранные языки \\(английский, испанский, китайский, немецкий, французский\\) \\(устная часть\\), история, химия; \n🔸 19 июня \\(четверг\\) — биология, иностранные языки \\(английский, испанский, китайский, немецкий, французский\\) \\(письменная часть\\), информатика; \n🔸 20 июня \\(пятница\\) — базовая и профильная математика; \n🔸 23 июня \\(понедельник\\) — по всем учебным предметам\\. \n\n*Резервные дни в досрочный период:* \n\n🔹 14 апреля \\(понедельник\\) — русский язык; \n🔹 17 апреля \\(четверг\\) — базовая и профильная математика; \n🔹 18 апреля \\(пятница\\) — биология, иностранные языки \\(английский, испанский, китайский, немецкий, французский\\) \\(письменная часть\\), литература, обществознание, физика; \n🔹 21 апреля \\(понедельник\\) — география, иностранные языки \\(английский, испанский, китайский, немецкий, французский\\) \\(устная часть\\), информатика, история, химия\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
            
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _Расписание ЕГЭ 2025_ \n➡️ _ЕГЭ в резервный период_ \n\nДля кого: \n\n🔹 Если *совпали даты* экзаменов по разным предметам\\. \n\n🔹 Если *не сдали* один из обязательных предметов, русский язык или математику\\. \n\n🔹 Если *не пришли на экзамен* по уважительной причине \\(нужно *подтверждение документами*\\)\\. \n\n🔹 Если *не смогли закончить экзамен* по уважительной причине, *подтвержденной документально*\\. \n\n🔹 Если ваша *апелляция о нарушении на экзамене* была удовлетворена\\. \n\n🔹 Если ваши *результаты аннулированы* из\\-за проблем с видеонаблюдением \\(не по вашей вине\\)\\. \n\n🔹 Если ваши *результаты аннулированы из\\-за чужих нарушений*, а не ваших\\. \n\n*Резервные дни в основной период:* \n\n🔸 16 июня \\(понедельник\\) — география, литература, обществознание, физика; \n🔸 17 июня \\(вторник\\) — русский язык; \n🔸 18 июня \\(среда\\) — иностранные языки \\(английский, испанский, китайский, немецкий, французский\\) \\(устная часть\\), история, химия; \n🔸 19 июня \\(четверг\\) — биология, иностранные языки \\(английский, испанский, китайский, немецкий, французский\\) \\(письменная часть\\), информатика; \n🔸 20 июня \\(пятница\\) — базовая и профильная математика; \n🔸 23 июня \\(понедельник\\) — по всем учебным предметам\\. \n\n*Резервные дни в досрочный период:* \n\n🔹 14 апреля \\(понедельник\\) — русский язык; \n🔹 17 апреля \\(четверг\\) — базовая и профильная математика; \n🔹 18 апреля \\(пятница\\) — биология, иностранные языки \\(английский, испанский, китайский, немецкий, французский\\) \\(письменная часть\\), литература, обществознание, физика; \n🔹 21 апреля \\(понедельник\\) — география, иностранные языки \\(английский, испанский, китайский, немецкий, французский\\) \\(устная часть\\), информатика, история, химия\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    //скрытие кнопок после клика
    // await bot.edit_message_reply_markup(message.chat.id, message_id=message.message_id, reply_markup='');
});

//2.1 ЕГЭ В ОСНОВНОЙ ПЕРИОД
bot.callbackQuery('21', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back2');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Расписание ЕГЭ 2025_ \n➡️ _ЕГЭ в основной период_ \n\nВ основной период ЕГЭ сдают выпускники текущего года\\. \n\n🔸 23 мая – история, литература и химия; \n🔸 27 мая – базовая и профильная математика; \n🔸 30 мая – русский язык; \n🔸 2 июня – обществознание, физика; \n🔸 5 июня – биология, география и иностранные языки \\(письменно\\); \n🔸 10 и 11 июня – иностранные языки \\(устно\\), информатика\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _Расписание ЕГЭ 2025_ \n➡️ _ЕГЭ в основной период_ \n\nВ основной период ЕГЭ сдают выпускники текущего года\\. \n\n🔸 23 мая – история, литература и химия; \n🔸 27 мая – базовая и профильная математика; \n🔸 30 мая – русский язык; \n🔸 2 июня – обществознание, физика; \n🔸 5 июня – биология, география и иностранные языки \\(письменно\\); \n🔸 10 и 11 июня – иностранные языки \\(устно\\), информатика\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//2.2 ЕГЭ В ДОСРОЧНЫЙ ПЕРИОД
bot.callbackQuery('22', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back2');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Расписание ЕГЭ 2025_ \n➡️ _ЕГЭ в досрочный период_ \n\nВ досрочный период ЕГЭ сдают выпускники текущего года, которые по уважительным причинам, подтвержденным *документально*, не могут принять участие в экзаменах в основные сроки\\.\n\n🔸 21 марта — география и литература; \n🔸 25 марта — русский язык; \n🔸 28 марта — базовая и профильная математика; \n🔸 1 апреля — биология, иностранные языки \\(письменно\\), физика; \n🔸 4 апреля — иностранные языки \\(устно\\); \n🔸 8 апреля — информатика и обществознание; \n🔸 11 апреля — история и химия\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _Расписание ЕГЭ 2025_ \n➡️ _ЕГЭ в досрочный период_ \n\nВ досрочный период ЕГЭ сдают выпускники текущего года, которые по уважительным причинам, подтвержденным *документально*, не могут принять участие в экзаменах в основные сроки\\.\n\n🔸 21 марта — география и литература; \n🔸 25 марта — русский язык; \n🔸 28 марта — базовая и профильная математика; \n🔸 1 апреля — биология, иностранные языки \\(письменно\\), физика; \n🔸 4 апреля — иностранные языки \\(устно\\); \n🔸 8 апреля — информатика и обществознание; \n🔸 11 апреля — история и химия\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//2.4 ЕГЭ В ДОПОЛНИТЕЛЬНЫЙ ПЕРИОД
bot.callbackQuery('24', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back2');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Расписание ЕГЭ 2025_ \n➡️ _ЕГЭ в дополнительный период \\(только русский язык и математика базового уровня\\)_\n\n📌 *Дополнительный период ЕГЭ – для кого он?* \n\n🔹 Если *не сдали русский язык или математику* в основной период\\. \n🔹 Если ваши *результаты аннулировали* за нарушение вами правил проведения экзамена\\. \n🔹 Если вы *не сдали оба обязательных предмета* \\(русский язык и математику\\) или *повторно не сдали один из них* в резервные дни\\. \n\n📝 *Как подать заявление?* \n\nЗаявление нужно подать *не позднее чем за 2 недели до начала экзамена*\\. Это можно сделать *лично* \\(с паспортом\\) или через *родителей/законных представителей*\\. \n\n*Сентябрь 2025* \n\n🔸4 сентября \\(четверг\\) — русский язык; \n🔸 8 сентября \\(понедельник\\) — ЕГЭ по математике базового уровня; \n🔸 23 сентября \\(вторник\\) – ЕГЭ по математике базового уровня, русский язык\\. \n\nС официальным документом можно ознакомиться [здесь](https://doc.fipi.ru/ege/normativno-pravovye-dokumenty/Prikaz_787_2089_11.11.2024.pdf)\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _Расписание ЕГЭ 2025_ \n➡️ _ЕГЭ в дополнительный период \\(только русский язык и математика базового уровня\\)_\n\n📌 *Дополнительный период ЕГЭ – для кого он?* \n\n🔹 Если *не сдали русский язык или математику* в основной период\\. \n🔹 Если ваши *результаты аннулировали* за нарушение вами правил проведения экзамена\\. \n🔹 Если вы *не сдали оба обязательных предмета* \\(русский язык и математику\\) или *повторно не сдали один из них* в резервные дни\\. \n\n📝 *Как подать заявление?* \n\nЗаявление нужно подать *не позднее чем за 2 недели до начала экзамена*\\. Это можно сделать *лично* \\(с паспортом\\) или через *родителей/законных представителей*\\. \n\n*Сентябрь 2025* \n\n🔸4 сентября \\(четверг\\) — русский язык; \n🔸 8 сентября \\(понедельник\\) — ЕГЭ по математике базового уровня; \n🔸 23 сентября \\(вторник\\) – ЕГЭ по математике базового уровня, русский язык\\. \n\nС официальным документом можно ознакомиться [здесь](https://doc.fipi.ru/ege/normativno-pravovye-dokumenty/Prikaz_787_2089_11.11.2024.pdf)\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//3 ПОДГОТОВКА К ЕГЭ
bot.callbackQuery('3', async (ctx) => {
    await ctx.answerCallbackQuery();
    const EGEthreeKeyboard = new InlineKeyboard().text('Список проверяемых тем и умений', '31').row().text('Формат заданий', '32').row().text('Материалы для подготовки', '33').row().text('📌 Как использовать Навигатор самоподготовки?', '34').row().text('Критерии оценивания', '35').row().text('Рекомендации по подготовке к ЕГЭ', '36').row().text('Назад', 'back');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Подготовка к ЕГЭ_ \n', {
            reply_markup: EGEthreeKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        await ctx.reply('📍 ЕГЭ \n\n➡️ _Подготовка к ЕГЭ_ \n', {
            reply_markup: EGEthreeKeyboard
        });
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
       
});

//3 ПОДГОТОВКА К ЕГЭ (БЕЗ ИСЧЕЗАНИЯ)
bot.callbackQuery('back3', async (ctx) => {
    await ctx.answerCallbackQuery();
    if (previousMessage) {
        // Удаляем клавиатуру из предыдущего сообщения
        await bot.api.editMessageReplyMarkup(
            previousMessage.chat_id,
            previousMessage.message_id,
            undefined
        );
    } else {
        console.log("Нет предыдущего сообщения для удаления клавиатуры.");
    }
    const EGEthreeKeyboard = new InlineKeyboard().text('Список проверяемых тем и умений', '31').row().text('Формат заданий', '32').row().text('Материалы для подготовки', '33').row().text('📌 Как использовать Навигатор самоподготовки?', '34').row().text('Критерии оценивания', '35').row().text('Рекомендации по подготовке к ЕГЭ', '36').row().text('Назад', 'back');
    await ctx.reply('📍 ЕГЭ \n\n➡️ _Подготовка к ЕГЭ_ \n', {
        reply_markup: EGEthreeKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
    });
       
});

//3.1 СПИСОК ПРОВЕРЯЕМЫХ ТЕМ И УМЕНИЙ
bot.callbackQuery('31', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back3');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Подготовка к ЕГЭ_ \n➡️ _Список проверяемых тем и умений_ \n\n✅ Все темы и умения, которые могут попасться Вам на ЕГЭ, указаны в *кодификаторе*\\. \n\n⚠️ Важно: на ЕГЭ могут быть любые темы из кодификатора, даже, если Вы не проходили это в школе по каким\\-либо причинам, поэтому обязательно ознакомьтесь с кодификатором\\! \n\n🔗 Кодификатор можно скачать с [сайта ФИПИ](https://fipi.ru/ege/demoversii-specifikacii-kodifikatory), выбрав интересующий Вас предмет\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _Подготовка к ЕГЭ_ \n➡️ _Список проверяемых тем и умений_ \n\n✅ Все темы и умения, которые могут попасться Вам на ЕГЭ, указаны в *кодификаторе*\\. \n\n⚠️ Важно: на ЕГЭ могут быть любые темы из кодификатора, даже, если Вы не проходили это в школе по каким\\-либо причинам, поэтому обязательно ознакомьтесь с кодификатором\\! \n\n🔗 Кодификатор можно скачать с [сайта ФИПИ](https://fipi.ru/ege/demoversii-specifikacii-kodifikatory), выбрав интересующий Вас предмет\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//3.2 ФОРМАТ ЗАДАНИЙ
bot.callbackQuery('32', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back3');;
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Подготовка к ЕГЭ_ \n➡️ _Формат заданий_ \n\n📌 *Где можно узнать формат заданий ЕГЭ?* \n\nФормат заданий на этот год можно найти в *демоверсии* — это образец экзамена \\(с ответами\\)\\. \n\n📝 В демоверсии можно увидеть примерные задания, их формат и общую структуру экзамена и проверить себя\\. Это поможет понять, какие задания будут на настоящем экзамене и как к ним подготовиться\\. \n\n📅 Демоверсия обновляется каждый год и размещается *примерно в августе* на [официальном сайте ФИПИ](https://fipi.ru/ege/demoversii-specifikacii-kodifikatory)\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _Подготовка к ЕГЭ_ \n➡️ _Формат заданий_ \n\n📌 *Где можно узнать формат заданий ЕГЭ?* \n\nФормат заданий на этот год можно найти в *демоверсии* — это образец экзамена \\(с ответами\\)\\. \n\n📝 В демоверсии можно увидеть примерные задания, их формат и общую структуру экзамена и проверить себя\\. Это поможет понять, какие задания будут на настоящем экзамене и как к ним подготовиться\\. \n\n📅 Демоверсия обновляется каждый год и размещается *примерно в августе* на [официальном сайте ФИПИ](https://fipi.ru/ege/demoversii-specifikacii-kodifikatory)\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//3.3 МАТЕРИАЛЫ ДЛЯ ПОДГОТОВКИ
bot.callbackQuery('33', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back3');;
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Подготовка к ЕГЭ_ \n➡️ _Материалы для подготовки_ \n\n🔗 Для подготовки можно использовать *открытый банк заданий* по каждому предмету на [сайте ФИПИ](https://ege.fipi.ru/bank/)\\. \n\n📝 В банке заданий можно отсортировать задания по типам с помощью встроенного фильтра\\. Эти задания – *тренировочные*, они не встретятся на настоящем экзамене, но помогут лучше подготовиться\\. \n\n⚠️ Будьте осторожны с материалами с других сайтов, они могут быть *устаревшими* или содержать ошибки\\. Лучше используйте *официальный банк заданий*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _Подготовка к ЕГЭ_ \n➡️ _Материалы для подготовки_ \n\n🔗 Для подготовки можно использовать *открытый банк заданий* по каждому предмету на [сайте ФИПИ](https://ege.fipi.ru/bank/)\\. \n\n📝 В банке заданий можно отсортировать задания по типам с помощью встроенного фильтра\\. Эти задания – *тренировочные*, они не встретятся на настоящем экзамене, но помогут лучше подготовиться\\. \n\n⚠️ Будьте осторожны с материалами с других сайтов, они могут быть *устаревшими* или содержать ошибки\\. Лучше используйте *официальный банк заданий*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//3.4 КАК ИСПОЛЬЗОВАТЬ НАВИГАТОР САМОПОДГОТОВКИ?
bot.callbackQuery('34', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back3');;
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Подготовка к ЕГЭ_ \n➡️ _Как использовать Навигатор самоподготовки?_ \n\n✅ *Навигатор самоподготовки* включает анализ типичных ошибок, советы, рекомендации, а также темы, на которые стоит обратить особое внимание, и разбор ответов с высокими и низкими баллами\\. \n\n📝 Ознакомьтесь с этим документом, чтобы избежать ошибок и лучше понять, как правильно выполнять задания\\. \n\n🔗 [Здесь](https://fipi.ru/navigator-podgotovki/navigator-ege) можно скачать документ по каждому предмету на сайте ФИПИ\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _Подготовка к ЕГЭ_ \n➡️ _Как использовать Навигатор самоподготовки?_ \n\n✅ *Навигатор самоподготовки* включает анализ типичных ошибок, советы, рекомендации, а также темы, на которые стоит обратить особое внимание, и разбор ответов с высокими и низкими баллами\\. \n\n📝 Ознакомьтесь с этим документом, чтобы избежать ошибок и лучше понять, как правильно выполнять задания\\. \n\n🔗 [Здесь](https://fipi.ru/navigator-podgotovki/navigator-ege) можно скачать документ по каждому предмету на сайте ФИПИ\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//3.5 КРИТЕРИИ ОЦЕНИВАНИЯ
bot.callbackQuery('35', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back3');;
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Подготовка к ЕГЭ_ \n➡️ _Критерии оценивания_ \n\n🔹 *Максимальные баллы* за каждое задание и его *уровень сложности* можно посмотреть в [*спецификации*](https://fipi.ru/ege/demoversii-specifikacii-kodifikatory) по предмету\\. \n\n🔹 *Как оцениваются задания и по каким критериям* – эта информация есть в [*демоверсии*](https://fipi.ru/ege/demoversii-specifikacii-kodifikatory)\\. \n\n🔹 *Подробные разборы ответов и анализ ошибок* можно найти в [*Методических материалах*](https://fipi.ru/ege/dlya-predmetnyh-komissiy-subektov-rf#!/tab/173729394-10) для экспертов ЕГЭ \\(они доступны всем\\!\\)\\. Ознакомьтесь с ними тоже, в них много полезного\\!', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _Подготовка к ЕГЭ_ \n➡️ _Критерии оценивания_ \n\n🔹 *Максимальные баллы* за каждое задание и его *уровень сложности* можно посмотреть в [*спецификации*](https://fipi.ru/ege/demoversii-specifikacii-kodifikatory) по предмету\\. \n\n🔹 *Как оцениваются задания и по каким критериям* – эта информация есть в [*демоверсии*](https://fipi.ru/ege/demoversii-specifikacii-kodifikatory)\\. \n\n🔹 *Подробные разборы ответов и анализ ошибок* можно найти в [*Методических материалах*](https://fipi.ru/ege/dlya-predmetnyh-komissiy-subektov-rf#!/tab/173729394-10) для экспертов ЕГЭ \\(они доступны всем\\!\\)\\. Ознакомьтесь с ними тоже, в них много полезного\\!', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//3.6 РЕКОМЕНДАЦИИ ПО ПОДГОТОВКЕ К ЕГЭ
bot.callbackQuery('36', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back3');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Подготовка к ЕГЭ_ \n➡️ _Рекомендации по подготовке к ЕГЭ_ \n\n📌 *Советы для успешной подготовки к ЕГЭ:* \n\n✅ *Изучите формат экзамена* как можно раньше: решите *демоверсию*, проверьте ответы, посчитайте баллы и определите свои слабые места\\. \n\n✅ *Используйте кодификатор* как план: проработайте все темы, особенно сложные\\. \n\n✅ *Составьте план подготовки*, не забывая про отдых\\. \n\n✅ *Регулярно решайте задания* из открытого банка ФИПИ\\. \n\n✅ *Пользуйтесь навигатором самоподготовки* – там разбор ошибок и полезные рекомендации\\. \n\n✅ *Обязательно участвуйте в пробных ЕГЭ*, которые проводят в школе\\. \n\n✅ *Начинайте готовиться заранее* – лучше уже с 10 класса\\. Так нагрузка будет меньше, и успеете пройти весь материал\\. \n\n✅ Если начали готовиться *поздно*, сосредоточьтесь на *заданиях попроще*, чтобы набрать больше баллов\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _Подготовка к ЕГЭ_ \n➡️ _Рекомендации по подготовке к ЕГЭ_ \n\n📌 *Советы для успешной подготовки к ЕГЭ:* \n\n✅ *Изучите формат экзамена* как можно раньше: решите *демоверсию*, проверьте ответы, посчитайте баллы и определите свои слабые места\\. \n\n✅ *Используйте кодификатор* как план: проработайте все темы, особенно сложные\\. \n\n✅ *Составьте план подготовки*, не забывая про отдых\\. \n\n✅ *Регулярно решайте задания* из открытого банка ФИПИ\\. \n\n✅ *Пользуйтесь навигатором самоподготовки* – там разбор ошибок и полезные рекомендации\\. \n\n✅ *Обязательно участвуйте в пробных ЕГЭ*, которые проводят в школе\\. \n\n✅ *Начинайте готовиться заранее* – лучше уже с 10 класса\\. Так нагрузка будет меньше, и успеете пройти весь материал\\. \n\n✅ Если начали готовиться *поздно*, сосредоточьтесь на *заданиях попроще*, чтобы набрать больше баллов\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//4 ПРАВИЛА И ТРЕБОВАНИЯ НА ЭКЗАМЕНЕ
bot.callbackQuery('4', async (ctx) => {
    await ctx.answerCallbackQuery();
    const EGEfourKeyboard = new InlineKeyboard().text('Необходимые документы и принадлежности', '41').row().text('Что можно брать с собой на экзамен', '42').row().text('Что нельзя брать с собой на экзамен', '43').row().text('Правила поведения на экзамене и последствия', '44').row().text('Назад', 'back');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Правила и требования на экзамене_ \n', {
            reply_markup: EGEfourKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        await ctx.reply('📍 ЕГЭ \n\n➡️ _Правила и требования на экзамене_ \n', {
            reply_markup: EGEfourKeyboard
        });
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
       
});

//4 ПРАВИЛА И ТРЕБОВАНИЯ НА ЭКЗАМЕНЕ (БЕЗ ИСЧЕЗАНИЯ)
bot.callbackQuery('back4', async (ctx) => {
    await ctx.answerCallbackQuery();
    if (previousMessage) {
        // Удаляем клавиатуру из предыдущего сообщения
        await bot.api.editMessageReplyMarkup(
            previousMessage.chat_id,
            previousMessage.message_id,
            undefined
        );
    } else {
        console.log("Нет предыдущего сообщения для удаления клавиатуры.");
    }
    const EGEfourKeyboard = new InlineKeyboard().text('Необходимые документы и принадлежности', '41').row().text('Что можно брать с собой на экзамен', '42').row().text('Что нельзя брать с собой на экзамен', '43').row().text('Правила поведения на экзамене и последствия', '44').row().text('Назад', 'back');
    await ctx.reply('📍 ЕГЭ \n\n➡️ _Правила и требования на экзамене_ \n', {
        reply_markup: EGEfourKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
    });
       
});

//4.1 НЕОБХОДИМЫЕ ДОКУМЕНТЫ И ПРИНАДЛЕЖНОСТИ
bot.callbackQuery('41', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back4');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Правила и требования на экзамене_ \n➡️ _Необходимые документы и принадлежности_ \n\n🔹 гелевая или капиллярная ручка с чернилами черного цвета; \n\n🔹 документ, удостоверяющий личность \\(паспорт\\)\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _Правила и требования на экзамене_ \n➡️ _Рекомендации по подготовке к ЕГЭ_ \n\n🔹 гелевая или капиллярная ручка с чернилами черного цвета; \n\n🔹 документ, удостоверяющий личность \\(паспорт\\)\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//4.2 ЧТО МОЖНО БРАТЬ С СОБОЙ НА ЭКЗАМЕН В АУДИТОРИЮ
bot.callbackQuery('42', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back4');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Правила и требования на экзамене_ \n➡️ _Что можно брать с собой на экзамен в аудиторию_ \n\n🔹 лекарства \\(при необходимости\\); \n\n🔹 продукты питания для дополнительного приема пищи \\(перекус\\), бутилированная питьевая вода при условии, что упаковка указанных продуктов питания и воды, а также их потребление не будут отвлекать других участников экзаменов от выполнения ими экзаменационной работы \\(при необходимости\\); \n\n🔹 для сдающих биологию: непрограммируемый калькулятор \\(не имеющий доступа к Интернету, не являющийся средством связи и хранилищем баз данных\\); \n\n🔹 для сдающих географию: непрограммируемый калькулятор; \n\n🔹 для сдающих литературу: орфографический словарь, позволяющий устанавливать нормативное написание слов; \n\n🔹 для сдающих математику: линейка, не содержащая справочной информации для построения чертежей и рисунков; \n\n🔹 для сдающих физику: линейка, не содержащая справочной информации; непрограммируемый калькулятор; \n\n🔹 для сдающих химию: непрограммируемый калькулятор; Периодическая система химических элементов Д\\.И\\. Менделеева; таблица растворимостей кислот и оснований в воде; электрохимический ряд напряжений металлов\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _Правила и требования на экзамене_ \n➡️ _Что можно брать с собой на экзамен в аудиторию_ \n\n🔹 лекарства \\(при необходимости\\); \n\n🔹 продукты питания для дополнительного приема пищи \\(перекус\\), бутилированная питьевая вода при условии, что упаковка указанных продуктов питания и воды, а также их потребление не будут отвлекать других участников экзаменов от выполнения ими экзаменационной работы \\(при необходимости\\); \n\n🔹 для сдающих биологию: непрограммируемый калькулятор \\(не имеющий доступа к Интернету, не являющийся средством связи и хранилищем баз данных\\); \n\n🔹 для сдающих географию: непрограммируемый калькулятор; \n\n🔹 для сдающих литературу: орфографический словарь, позволяющий устанавливать нормативное написание слов; \n\n🔹 для сдающих математику: линейка, не содержащая справочной информации для построения чертежей и рисунков; \n\n🔹 для сдающих физику: линейка, не содержащая справочной информации; непрограммируемый калькулятор; \n\n🔹 для сдающих химию: непрограммируемый калькулятор; Периодическая система химических элементов Д\\.И\\. Менделеева; таблица растворимостей кислот и оснований в воде; электрохимический ряд напряжений металлов\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//4.3 ЧТО НЕЛЬЗЯ БРАТЬ С СОБОЙ НА ЭКЗАМЕН В АУДИТОРИЮ
bot.callbackQuery('43', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back4');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Правила и требования на экзамене_ \n➡️ _Что нельзя брать с собой на экзамен в аудиторию_ \n\n📌 Все личные вещи, кроме необходимых и разрешенных, участники экзаменов оставляют в специально отведенном месте для хранения личных вещей\\. \n\n*В аудиторию проведения ЕГЭ нельзя проносить:* \n\n🔸 средства связи; \n🔸 фото\\-, аудио\\- и видеоаппаратуру; \n🔸 электронно\\-вычислительную технику; \n🔸 справочные материалы; \n🔸 письменные заметки; \n🔸 иные средства хранения и передачи информации\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _Правила и требования на экзамене_ \n➡️ _Что нельзя брать с собой на экзамен в аудиторию_ \n\n📌 Все личные вещи, кроме необходимых и разрешенных, участники экзаменов оставляют в специально отведенном месте для хранения личных вещей\\. \n\n*В аудиторию проведения ЕГЭ нельзя проносить:* \n\n🔸 средства связи; \n🔸 фото\\-, аудио\\- и видеоаппаратуру; \n🔸 электронно\\-вычислительную технику; \n🔸 справочные материалы; \n🔸 письменные заметки; \n🔸 иные средства хранения и передачи информации\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//4.4 ПРАВИЛА ПОВЕДЕНИЯ НА ЭКЗАМЕНЕ И ПОСЛЕДСТВИЯ НАРУШЕНИЙ
bot.callbackQuery('44', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back4');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Правила и требования на экзамене_ \n➡️ _Правила поведения на экзамене и последствия нарушений_ \n\n*Во время экзамена нельзя:* \n\n🔸 общаться друг с другом; \n🔸 свободно перемещаться по аудитории и пункту проведения экзамена \\(ППЭ\\); \n🔸 выносить из аудиторий и ППЭ черновики, экзаменационные материалы на бумажном и \\(или\\) электронном носителях, фотографировать экзаменационные материалы, черновики\\. \n\n*Во время экзамена можно:* \n\n🔹 выходить из аудитории и перемещаться по ППЭ в сопровождении одного из организаторов\\. \n\n⚠️ Если нарушите требования порядка проведения экзамена, то Вас удалят из ППЭ, организатор поставит в соответствующем поле бланка регистрации участника экзамена необходимую отметку, а результаты экзаменов будут *аннулированы*\\. \n\n❗ В таком случае *пересдать обязательные предметы* \\(математику базового уровня и русский язык\\) можно будет только в *дополнительный период*, но не ранее 1 сентября\\. Если нарушение совершено во время проведения ЕГЭ *по предметам по выбору*, то пересдать можно *не ранее следующего года*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _Правила и требования на экзамене_ \n➡️ _Правила поведения на экзамене и последствия нарушений_ \n\n*Во время экзамена нельзя:* \n\n🔸 общаться друг с другом; \n🔸 свободно перемещаться по аудитории и пункту проведения экзамена \\(ППЭ\\); \n🔸 выносить из аудиторий и ППЭ черновики, экзаменационные материалы на бумажном и \\(или\\) электронном носителях, фотографировать экзаменационные материалы, черновики\\. \n\n*Во время экзамена можно:* \n\n🔹 выходить из аудитории и перемещаться по ППЭ в сопровождении одного из организаторов\\. \n\n⚠️ Если нарушите требования порядка проведения экзамена, то Вас удалят из ППЭ, организатор поставит в соответствующем поле бланка регистрации участника экзамена необходимую отметку, а результаты экзаменов будут *аннулированы*\\. \n\n❗ В таком случае *пересдать обязательные предметы* \\(математику базового уровня и русский язык\\) можно будет только в *дополнительный период*, но не ранее 1 сентября\\. Если нарушение совершено во время проведения ЕГЭ *по предметам по выбору*, то пересдать можно *не ранее следующего года*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//5 РЕЗУЛЬТАТЫ ЕГЭ
bot.callbackQuery('5', async (ctx) => {
    await ctx.answerCallbackQuery();
    const EGEfiveKeyboard = new InlineKeyboard().text('Как узнать результаты ЕГЭ', '51').row().text('Таблицы соответствия первичных и тестовых баллов ЕГЭ', '52').row().text('Минимальные баллы для получения аттестата', '53').row().text('Минимальные баллы для поступления в вуз', '54').row().text('Сколько действуют результаты ЕГЭ', '55').row().text('Назад', 'back');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Результаты ЕГЭ_ \n', {
            reply_markup: EGEfiveKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        await ctx.reply('📍 ЕГЭ \n\n➡️ _Результаты ЕГЭ_ \n', {
            reply_markup: EGEfiveKeyboard
        });
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
       
});

//5 РЕЗУЛЬТАТЫ ЕГЭ (БЕЗ ИСЧЕЗАНИЯ)
bot.callbackQuery('back5', async (ctx) => {
    await ctx.answerCallbackQuery();
    if (previousMessage) {
        // Удаляем клавиатуру из предыдущего сообщения
        await bot.api.editMessageReplyMarkup(
            previousMessage.chat_id,
            previousMessage.message_id,
            undefined
        );
    } else {
        console.log("Нет предыдущего сообщения для удаления клавиатуры.");
    }
    const EGEfiveKeyboard = new InlineKeyboard().text('Как узнать результаты ЕГЭ', '51').row().text('Таблицы соответствия первичных и тестовых баллов ЕГЭ', '52').row().text('Минимальные баллы для получения аттестата', '53').row().text('Минимальные баллы для поступления в вуз', '54').row().text('Сколько действуют результаты ЕГЭ', '55').row().text('Назад', 'back');
    await ctx.reply('📍 ЕГЭ \n\n➡️ _Результаты ЕГЭ_ \n', {
        reply_markup: EGEfiveKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
    });
});

//5.1 КАК УЗНАТЬ РЕЗУЛЬТАТЫ ЕГЭ
bot.callbackQuery('51', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back5');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Результаты ЕГЭ_ \n➡️ _Как узнать результаты ЕГЭ_ \n\nПерсональные результаты участников ЕГЭ доступны через: \n\n✅ [официальный информационный портал ЕГЭ](https://checkege.rustest.ru/)\\. Для этого необходимо ввести ФИО, номер паспорта или код регистрации, указать регион сдачи ЕГЭ, дать согласие на обработку персональных данных\\. \n\n✅ федеральную государственную информационную систему [«Единый портал государственных и муниципальных услуг \\(функций\\)»](gosuslugi.ru)\\. Для этого потребуется подтвержденная учётная запись на Госуслугах\\. Затем в личном кабинете нужно запросить данные в разделе «Документы» \\- «Образование»\\. \n\n✅ ведомственную [автоматизированную информационную систему «ГИА Тамбовской области»](kk.rcoi68.ru)\\. \n\n📝 Результаты ЕГЭ появляются примерно через одну\\-две недели после сдачи экзамена\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _Результаты ЕГЭ_ \n➡️ _Как узнать результаты ЕГЭ_ \n\nПерсональные результаты участников ЕГЭ доступны через: \n\n✅ [официальный информационный портал ЕГЭ](https://checkege.rustest.ru/)\\. Для этого необходимо ввести ФИО, номер паспорта или код регистрации, указать регион сдачи ЕГЭ, дать согласие на обработку персональных данных\\. \n\n✅ федеральную государственную информационную систему [«Единый портал государственных и муниципальных услуг \\(функций\\)»](gosuslugi.ru)\\. Для этого потребуется подтвержденная учётная запись на Госуслугах\\. Затем в личном кабинете нужно запросить данные в разделе «Документы» \\- «Образование»\\. \n\n✅ ведомственную [автоматизированную информационную систему «ГИА Тамбовской области»](kk.rcoi68.ru)\\. \n\n📝 Результаты ЕГЭ появляются примерно через одну\\-две недели после сдачи экзамена\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//5.2 ТАБЛИЦЫ СООТВЕТСТВИЯ ПЕРВИЧНЫХ И ТЕСТОВЫХ БАЛЛОВ ЕГЭ
bot.callbackQuery('52', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back5');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Результаты ЕГЭ_ \n➡️ _Таблицы соответствия первичных и тестовых баллов ЕГЭ_ \n\n📌 Таблицы соответствия первичных и тестовых баллов ЕГЭ на 2025 год будут представлены после завершения досрочного периода проведения ЕГЭ\\. \n\n🔗 Данные за 2024 год представлены [по ссылке](https://obrnadzor.gov.ru/wp-content/uploads/2024/05/tabliczy_sootvetstvij_itog_na-sajt.pdf) \n\n🔗 С алгоритмом установления соответствия первичных и тестовых баллов ЕГЭ можно ознакомиться [по ссылке](https://obrnadzor.gov.ru/wp-content/uploads/2023/04/algoritm-ustanovleniya-sootvetstviya-pervichnyh-i-testovyh-ballov-ege.pdf)', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _Результаты ЕГЭ_ \n➡️ _Таблицы соответствия первичных и тестовых баллов ЕГЭ_ \n\n📌 Таблицы соответствия первичных и тестовых баллов ЕГЭ на 2025 год будут представлены после завершения досрочного периода проведения ЕГЭ\\. \n\n🔗 Данные за 2024 год представлены [по ссылке](https://obrnadzor.gov.ru/wp-content/uploads/2024/05/tabliczy_sootvetstvij_itog_na-sajt.pdf) \n\n🔗 С алгоритмом установления соответствия первичных и тестовых баллов ЕГЭ можно ознакомиться [по ссылке](https://obrnadzor.gov.ru/wp-content/uploads/2023/04/algoritm-ustanovleniya-sootvetstviya-pervichnyh-i-testovyh-ballov-ege.pdf)', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//5.3 МИНИМАЛЬНЫЕ БАЛЛЫ ДЛЯ ПОЛУЧЕНИЯ АТТЕСТАТА
bot.callbackQuery('53', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back5');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Результаты ЕГЭ_ \n➡️ _Минимальные баллы для получения аттестата_ \n\n📌 Чтобы получить *аттестат*, нужно набрать *минимальные баллы* по двум обязательным предметам: \n\n✅ Русский язык – от *36* баллов \n\n✅ Математика \\(профиль\\) – от *27* баллов \n\n✅ Математика \\(базовая\\) – от *7* первичных баллов \n\nПри этом математику можно сдавать как базовую, так и профильную\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _Результаты ЕГЭ_ \n➡️ _Минимальные баллы для получения аттестата_ \n\n📌 Чтобы получить *аттестат*, нужно набрать *минимальные баллы* по двум обязательным предметам: \n\n✅ Русский язык – от *36* баллов \n\n✅ Математика \\(профиль\\) – от *27* баллов \n\n✅ Математика \\(базовая\\) – от *7* первичных баллов \n\nПри этом математику можно сдавать как базовую, так и профильную\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//5.4 МИНИМАЛЬНЫЕ БАЛЛЫ ДЛЯ ПОСТУПЛЕНИЯ В ВУЗ
bot.callbackQuery('54', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back5');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Результаты ЕГЭ_ \n➡️ _Минимальные баллы для поступления в вуз_ \n\n📌 Для подачи документов в вуз установлены *свои пороговые баллы* и они отличаются от минимальных баллов для получения аттестата\\! \n\n❗ Если ваши баллы *ниже установленного минимума из следующего списка*, вуз *не сможет принять ваши документы*, даже на платное обучение\\. \n\n🔸 Русский язык – *40* баллов \n🔸 Математика профильного уровня – *40* баллов \n🔸 Физика – *39* баллов \n🔸 Обществознание – *45* баллов \n🔸 История – *36* баллов \n🔸 Информатика – *44* баллов \n🔸 Иностранный язык – *30* баллов \n🔸 Литература – *40* баллов \n🔸 Биология – *39* баллов \n🔸 География – *40* баллов \n🔸 Химия – *39* баллов \n\n❗ *Минимальные баллы для поступления зависят от вуза* – они могут сильно отличаться даже для одной и той же специальности или направления подготовки\\. \n\n🔎 При выборе вуза *смотрите проходные баллы прошлых лет*, но учитывайте, что в этом году они могут измениться и заранее неизвестны\\. \n\n🎯 *Планируйте поступление заранее*: изучите требования на сайтах вузов и рассчитывайте свои примерные баллы\\!', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _Результаты ЕГЭ_ \n➡️ _Минимальные баллы для поступления в вуз_ \n\n📌 Для подачи документов в вуз установлены *свои пороговые баллы* и они отличаются от минимальных баллов для получения аттестата\\! \n\n❗ Если ваши баллы *ниже установленного минимума из следующего списка*, вуз *не сможет принять ваши документы*, даже на платное обучение\\. \n\n🔸 Русский язык – *40* баллов \n🔸 Математика профильного уровня – *40* баллов \n🔸 Физика – *39* баллов \n🔸 Обществознание – *45* баллов \n🔸 История – *36* баллов \n🔸 Информатика – *44* баллов \n🔸 Иностранный язык – *30* баллов \n🔸 Литература – *40* баллов \n🔸 Биология – *39* баллов \n🔸 География – *40* баллов \n🔸 Химия – *39* баллов \n\n❗ *Минимальные баллы для поступления зависят от вуза* – они могут сильно отличаться даже для одной и той же специальности или направления подготовки\\. \n\n🔎 При выборе вуза *смотрите проходные баллы прошлых лет*, но учитывайте, что в этом году они могут измениться и заранее неизвестны\\. \n\n🎯 *Планируйте поступление заранее*: изучите требования на сайтах вузов и рассчитывайте свои примерные баллы\\!', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//5.5 СКОЛЬКО ДЕЙСТВУЮТ РЕЗУЛЬТАТЫ ЕГЭ
bot.callbackQuery('55', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back5');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Результаты ЕГЭ_ \n➡️ _Сколько действуют результаты ЕГЭ_ \n\n📌 *Сколько действуют результаты ЕГЭ?* \n\n✅ *Срок действия – 5 лет*, включая год сдачи\\. \n\n✅ *Результаты ЕГЭ 2025 года* действительны *до конца 2029 года*\\. \n\n✅ В 2025 году можно поступать с результатами *ЕГЭ за 2021–2025 годы*\\. \n\n✅ *Служба в армии не продлевает срок действия*\\. Например, если после школы вы не поступили и пошли в армию, то после службы у вас останется *ещё 3 года* для поступления\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _Результаты ЕГЭ_ \n➡️ _Сколько действуют результаты ЕГЭ_ \n\n📌 *Сколько действуют результаты ЕГЭ?* \n\n✅ *Срок действия – 5 лет*, включая год сдачи\\. \n\n✅ *Результаты ЕГЭ 2025 года* действительны *до конца 2029 года*\\. \n\n✅ В 2025 году можно поступать с результатами *ЕГЭ за 2021–2025 годы*\\. \n\n✅ *Служба в армии не продлевает срок действия*\\. Например, если после школы вы не поступили и пошли в армию, то после службы у вас останется *ещё 3 года* для поступления\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//6 АППЕЛЯЦИЯ И ПЕРЕСДАЧА
bot.callbackQuery('6', async (ctx) => {
    await ctx.answerCallbackQuery();
    const EGEsixKeyboard = new InlineKeyboard().text('Что нельзя оспорить?', '61').row().text('Когда подавать апелляцию?', '62').row().text('Всё о пересдаче', '63').row().text('Пересдача в дополнительный период \(сентябрь\)', '64').row().text('Пересдача предметов по выбору', '65').row().text('Назад', 'back');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Апелляция и пересдача_ \n', {
            reply_markup: EGEsixKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        await ctx.reply('📍 ЕГЭ \n\n➡️ _Апелляция и пересдача_ \n', {
            reply_markup: EGEsixKeyboard
        });
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
       
});

//6 АППЕЛЯЦИЯ И ПЕРЕСДАЧА (БЕЗ ИСЧЕЗАНИЯ)
bot.callbackQuery('back6', async (ctx) => {
    await ctx.answerCallbackQuery();
    if (previousMessage) {
        // Удаляем клавиатуру из предыдущего сообщения
        await bot.api.editMessageReplyMarkup(
            previousMessage.chat_id,
            previousMessage.message_id,
            undefined
        );
    } else {
        console.log("Нет предыдущего сообщения для удаления клавиатуры.");
    }
    const EGEsixKeyboard = new InlineKeyboard().text('Что нельзя оспорить?', '61').row().text('Когда подавать апелляцию?', '62').row().text('Всё о пересдаче', '63').row().text('Пересдача в дополнительный период \(сентябрь\)', '64').row().text('Пересдача предметов по выбору', '65').row().text('Назад', 'back');
    await ctx.reply('📍 ЕГЭ \n\n➡️ _Апелляция и пересдача_ \n', {
        reply_markup: EGEsixKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
    });
    
});

//6.1 ЧТО НЕЛЬЗЯ ОСПОРИТЬ
bot.callbackQuery('61', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back6');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Апелляция и пересдача_ \n➡️ _Что нельзя оспорить?_ \n\n⚠️ Апелляционная комиссия не рассматривает: \n\n❌ Вопросы о содержании и структуре заданий\\. \n\n❌ Оценивание заданий с кратким ответом\\. \n\n❌ Ошибки в заполнении бланков\\. \n\n❌ Записи в черновиках и КИМ\\. \n\n❌ Нарушения, допущенные самим участником экзамена\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _Апелляция и пересдача_ \n➡️ _Что нельзя оспорить?_ \n\n⚠️ Апелляционная комиссия не рассматривает: \n\n❌ Вопросы о содержании и структуре заданий\\. \n\n❌ Оценивание заданий с кратким ответом\\. \n\n❌ Ошибки в заполнении бланков\\. \n\n❌ Записи в черновиках и КИМ\\. \n\n❌ Нарушения, допущенные самим участником экзамена\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//6.2 КОГДА ПОДАВАТЬ АППЕЛЯЦИЮ
bot.callbackQuery('62', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back6');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Апелляция и пересдача_ \n➡️ _Когда подавать апелляцию?_ \n\n🔹 Апелляция о нарушении порядка проведения экзамена – подаётся в день экзамена члену ГЭК, не покидая аудиторию\\. \n\n🔹 Апелляция о несогласии с баллами – подаётся в течение двух рабочих дней, следующих за официальным днем объявления результатов экзамена\\. \n\n📍 Куда подавать? \n\n🔹 В свою школу или организацию, через которую был допуск к экзамену\\. \n\n🔹 Можно подать лично, через родителей или законных представителей\\. \n\n🔔 О времени и месте рассмотрения апелляции Вас уведомят не позже, чем за 1 день до её рассмотрения\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _Апелляция и пересдача_ \n➡️ _Когда подавать апелляцию?_ \n\n🔹 Апелляция о нарушении порядка проведения экзамена – подаётся в день экзамена члену ГЭК, не покидая аудиторию\\. \n\n🔹 Апелляция о несогласии с баллами – подаётся в течение двух рабочих дней, следующих за официальным днем объявления результатов экзамена\\. \n\n📍 Куда подавать? \n\n🔹 В свою школу или организацию, через которую был допуск к экзамену\\. \n\n🔹 Можно подать лично, через родителей или законных представителей\\. \n\n🔔 О времени и месте рассмотрения апелляции Вас уведомят не позже, чем за 1 день до её рассмотрения\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//6.3 ВСЕ О ПЕРЕСДАЧЕ
bot.callbackQuery('63', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back6');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Апелляция и пересдача_ \n➡️ _Всё о пересдаче_ \n\n💡 *Совет* \nЕсли Вы не сдали один обязательный предмет \\(например, математику\\) и один предмет по выбору \\(например, историю\\), то советуем пересдавать обязательный предмет \\(например, математику\\) в резервный период, а предмет по выбору \\(например, историю\\) в *дополнительные дни \\(3 и 4 июля 2025 года\\)\\.* \n\n⚠️ Важно\\! Если Вы не сдали два обязательных предмета \\(русский язык и математику\\) и один предмет по выбору, то Вам в любом случае придётся пересдавать один из обязательных предметов в дополнительный период, то есть в сентябре, когда приемная кампания в вузы в текущем году будет окончена\\. \n\n📌 *Как принять участие в пересдаче в дополнительные дни* \n\nДля пересдачи в дополнительные дни нужно подать заявление в ГЭК не ранее шести рабочих дней и не позднее двух рабочих дней до дня экзамена, пересдаваемого в дополнительный день\\. \n\n📌 *Пересдача в резервные сроки:* \n\n🔸 Если  не смогли прийти на ЕГЭ или завершить экзамен по уважительной причине, *подтвержденной документально*\\. \n\n🔸 Если не сдали один из двух обязательных предметов \\(русский язык или математику\\)\\. \n\n📌 *Пересдача в дополнительные дни \\(3 и 4 июля 2025 года\\)* \n\n🔹 В дополнительные дни *3 и 4 июля 2025 года* по своему желанию можно один раз пересдать *один* любой *предмет* на Ваш выбор даже, если пройден минимальный установленный балл, но результат Вас не устраивает\\. При этом первый результат ЕГЭ по этому предмету *аннулируется*, а при поступлении будет учитываться только второй, выбрать лучший результат нельзя\\. \n\n🔹 Если *не явились* на пересдачу или не завершили выполнение экзаменационной работы по уважительным причинам \\(болезнь или иные обстоятельства\\), *подтвержденным документально*, предыдущий полученный результат ЕГЭ по данному учебному предмету сохраняется\\. \n\n\
📌 *Особенности пересдачи обязательных предметов в дополнительные дни:* \n\n✅ Вы можете пересдать русский язык или математику, даже если Вы *не сдали* их в резервный период\\. Например, Вы не сдали русский язык в основной период и решили пересдать его в резервный\\. Затем повторно не сдали русский язык в резервный период, тем не менее, вы все равно имеете право пересдать русский язык в *дополнительные дни*\\. Если же Вы не сдали русский язык и в дополнительные дни, то тогда пересдать можно только в дополнительный период, то есть в сентябре\\. \n\n✅ Можно *изменить уровень математики* в дополнительные дни\\. Вы можете поменять уровень математики с базового на профильный и наоборот\\. \n\n📌 *Пересдача ЕГЭ по иностранным языкам:* \n\nВ случае пересдачи ЕГЭ по иностранным языкам в дополнительные дни нужно будет пересдавать обе части экзамена: и письменную, и устную\\!', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _Апелляция и пересдача_ \n➡️ _Всё о пересдаче_ \n\n💡 *Совет* \nЕсли Вы не сдали один обязательный предмет \\(например, математику\\) и один предмет по выбору \\(например, историю\\), то советуем пересдавать обязательный предмет \\(например, математику\\) в резервный период, а предмет по выбору \\(например, историю\\) в *дополнительные дни \\(3 и 4 июля 2025 года\\)\\.* \n\n⚠️ Важно\\! Если Вы не сдали два обязательных предмета \\(русский язык и математику\\) и один предмет по выбору, то Вам в любом случае придётся пересдавать один из обязательных предметов в дополнительный период, то есть в сентябре, когда приемная кампания в вузы в текущем году будет окончена\\. \n\n📌 *Как принять участие в пересдаче в дополнительные дни* \n\nДля пересдачи в дополнительные дни нужно подать заявление в ГЭК не ранее шести рабочих дней и не позднее двух рабочих дней до дня экзамена, пересдаваемого в дополнительный день\\. \n\n📌 *Пересдача в резервные сроки:* \n\n🔸 Если  не смогли прийти на ЕГЭ или завершить экзамен по уважительной причине, *подтвержденной документально*\\. \n\n🔸 Если не сдали один из двух обязательных предметов \\(русский язык или математику\\)\\. \n\n📌 *Пересдача в дополнительные дни \\(3 и 4 июля 2025 года\\)* \n\n🔹 В дополнительные дни *3 и 4 июля 2025 года* по своему желанию можно один раз пересдать *один* любой *предмет* на Ваш выбор даже, если пройден минимальный установленный балл, но результат Вас не устраивает\\. При этом первый результат ЕГЭ по этому предмету *аннулируется*, а при поступлении будет учитываться только второй, выбрать лучший результат нельзя\\. \n\n🔹 Если *не явились* на пересдачу или не завершили выполнение экзаменационной работы по уважительным причинам \\(болезнь или иные обстоятельства\\), *подтвержденным документально*, предыдущий полученный результат ЕГЭ по данному учебному предмету сохраняется\\. \n\n\
📌 *Особенности пересдачи обязательных предметов в дополнительные дни:* \n\n✅ Вы можете пересдать русский язык или математику, даже если Вы *не сдали* их в резервный период\\. Например, Вы не сдали русский язык в основной период и решили пересдать его в резервный\\. Затем повторно не сдали русский язык в резервный период, тем не менее, вы все равно имеете право пересдать русский язык в *дополнительные дни*\\. Если же Вы не сдали русский язык и в дополнительные дни, то тогда пересдать можно только в дополнительный период, то есть в сентябре\\. \n\n✅ Можно *изменить уровень математики* в дополнительные дни\\. Вы можете поменять уровень математики с базового на профильный и наоборот\\. \n\n📌 *Пересдача ЕГЭ по иностранным языкам:* \n\nВ случае пересдачи ЕГЭ по иностранным языкам в дополнительные дни нужно будет пересдавать обе части экзамена: и письменную, и устную\\!', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//6.4 ПЕРЕСДАЧА В ДОПОЛНИТЕЛЬНЫЙ ПЕРИОД (СЕНТЯБРЬ)
bot.callbackQuery('64', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back6');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Апелляция и пересдача_ \n➡️ _Пересдача в дополнительный период \\(сентябрь\\)_ \n\n📌 В дополнительный период \\(в сентябре\\) можно пересдать *только русский язык и математику базового уровня\\.* \n\n🔸 Если не сдали русский язык или математику, либо оба этих предмета в основной период\\. \n\nПотребуется только для получения аттестата о среднем общем образовании, так как к этому времени приемная кампания в вузах закончится, но есть вероятность успеть поступить в учреждения среднего профессионального образования\\. \n\n🔸 Если Ваши результаты ЕГЭ по русскому языку или математике были *аннулированы* из\\-за нарушений Вами правил проведения ЕГЭ, например, из\\-за списывания\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _Апелляция и пересдача_ \n➡️ _Пересдача в дополнительный период \\(сентябрь\\)_ \n\n📌 В дополнительный период \\(в сентябре\\) можно пересдать *только русский язык и математику базового уровня\\.* \n\n🔸 Если не сдали русский язык или математику, либо оба этих предмета в основной период\\. \n\nПотребуется только для получения аттестата о среднем общем образовании, так как к этому времени приемная кампания в вузах закончится, но есть вероятность успеть поступить в учреждения среднего профессионального образования\\. \n\n🔸 Если Ваши результаты ЕГЭ по русскому языку или математике были *аннулированы* из\\-за нарушений Вами правил проведения ЕГЭ, например, из\\-за списывания\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//6.5 ПЕРЕСДАЧА ПРЕДМЕТОВ ПО ВЫБОРУ
bot.callbackQuery('65', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back6');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Апелляция и пересдача_ \n➡️ _Пересдача предметов по выбору_ \n\n📌 *Нарушение правил участником* \n\n\\! В случае нарушения порядка проведения ЕГЭ *по предметам по выбору* самим участником ЕГЭ пересдать можно не ранее, чем *через год\\.* \n\n📌 *Если не сдали предметы по выбору:* \n\nЕсли не сдали предметы по выбору, то пересдать можно не ранее, чем через год, за исключением права пересдать один раз один предмет по выбору в дополнительные дни \\(3 и 4 июля 2025 года\\)\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _Апелляция и пересдача_ \n➡️ _Пересдача предметов по выбору_ \n\n📌 *Нарушение правил участником* \n\n\\! В случае нарушения порядка проведения ЕГЭ *по предметам по выбору* самим участником ЕГЭ пересдать можно не ранее, чем *через год\\.* \n\n📌 *Если не сдали предметы по выбору:* \n\nЕсли не сдали предметы по выбору, то пересдать можно не ранее, чем через год, за исключением права пересдать один раз один предмет по выбору в дополнительные дни \\(3 и 4 июля 2025 года\\)\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//7 ПРОФОРИЕНТАЦИЯ И ПОСТУПЛЕНИЕ В ВУЗ ПО РЕЗУЛЬТАТАМ ЕГЭ
bot.callbackQuery('7', async (ctx) => {
    await ctx.answerCallbackQuery();
    const EGEsevenKeyboard = new InlineKeyboard().text('Проходные баллы ЕГЭ для поступления в вуз', '71').row().text('Перечень предметов ЕГЭ для поступления в вуз', '72').row().text('Полезные советы по выбору предметов ЕГЭ', '73').row().text('Назад', 'back');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Профориентация и поступление в вуз по результатам ЕГЭ_ \n', {
            reply_markup: EGEsevenKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        await ctx.reply('📍 ЕГЭ \n\n➡️ _Профориентация и поступление в вуз по результатам ЕГЭ_ \n', {
            reply_markup: EGEsevenKeyboard
        });
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
       
});

//7 ПРОФОРИЕНТАЦИЯ И ПОСТУПЛЕНИЕ В ВУЗ ПО РЕЗУЛЬТАТАМ ЕГЭ (БЕЗ ИСЧЕЗАНИЯ)
bot.callbackQuery('back7', async (ctx) => {
    await ctx.answerCallbackQuery();
    if (previousMessage) {
        // Удаляем клавиатуру из предыдущего сообщения
        await bot.api.editMessageReplyMarkup(
            previousMessage.chat_id,
            previousMessage.message_id,
            undefined
        );
    } else {
        console.log("Нет предыдущего сообщения для удаления клавиатуры.");
    }
    const EGEsevenKeyboard = new InlineKeyboard().text('Проходные баллы ЕГЭ для поступления в вуз', '71').row().text('Перечень предметов ЕГЭ для поступления в вуз', '72').row().text('Полезные советы по выбору предметов ЕГЭ', '73').row().text('Назад', 'back');
    await ctx.reply('📍 ЕГЭ \n\n➡️ _Профориентация и поступление в вуз по результатам ЕГЭ_ \n', {
        reply_markup: EGEsevenKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
    });
});

//7.1 ПРОХОДНЫЕ БАЛЛЫ ЕГЭ ДЛЯ ПОСТУПЛЕНИЯ В ВУЗ
bot.callbackQuery('71', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back7');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Профориентация и поступление в вуз по результатам ЕГЭ_ \n➡️ _Проходные баллы ЕГЭ для поступления в вуз_ \n\n🔹 *Минимальные баллы ЕГЭ* – это *порог*, установленный Рособрнадзором и самими вузами\\. Если баллы ниже, подать документы в вуз *нельзя*, даже на платной основе\\. Например, для математики профильного уровня минимальный балл – 27\\. \n\n🔹 *Проходные баллы ЕГЭ* – это сумма *баллов последнего зачисленного абитуриента* на конкретную специальность или направление подготовки в вузе\\. Они зависят от конкурса и *меняются* каждый год\\. Например, если на юриспруденцию в вузе 50 мест, а 50\\-й по рейтингу абитуриент набрал 84 балла, то проходной балл – *84*\\. Информация о проходных баллах размещается на сайтах вузов\\. \n\n⚡ Главное отличие: минимальные баллы – это "порог для подачи документов", а проходные – "сколько реально нужно для поступления"\\. \n\nЧто может входить в проходные баллы? \n\n✅ Баллы ЕГЭ \n✅ Баллы за индивидуальные достижения \n✅ Баллы за дополнительные вступительные испытания', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _Профориентация и поступление в вуз по результатам ЕГЭ_ \n➡️ _Проходные баллы ЕГЭ для поступления в вуз_ \n\n🔹 *Минимальные баллы ЕГЭ* – это *порог*, установленный Рособрнадзором и самими вузами\\. Если баллы ниже, подать документы в вуз *нельзя*, даже на платной основе\\. Например, для математики профильного уровня минимальный балл – 27\\. \n\n🔹 *Проходные баллы ЕГЭ* – это сумма *баллов последнего зачисленного абитуриента* на конкретную специальность или направление подготовки в вузе\\. Они зависят от конкурса и *меняются* каждый год\\. Например, если на юриспруденцию в вузе 50 мест, а 50\\-й по рейтингу абитуриент набрал 84 балла, то проходной балл – *84*\\. Информация о проходных баллах размещается на сайтах вузов\\. \n\n⚡ Главное отличие: минимальные баллы – это "порог для подачи документов", а проходные – "сколько реально нужно для поступления"\\. \n\nЧто может входить в проходные баллы? \n\n✅ Баллы ЕГЭ \n✅ Баллы за индивидуальные достижения \n✅ Баллы за дополнительные вступительные испытания', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//7.2 ПЕРЕЧЕНЬ ПРЕДМЕТОВ ЕГЭ ДЛЯ ПОСТУПЛЕНИЯ В ВУЗ
bot.callbackQuery('72', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back7');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Профориентация и поступление в вуз по результатам ЕГЭ_ \n➡️ _Перечень предметов ЕГЭ для поступления в вуз_ \n\n📌 *Перечень предметов ЕГЭ* зависит от выбранной специальности или направления подготовки\\. \n\nЕсли в этом перечне есть математика, то это только профильный уровень\\. \n\n⚠️ *Важно\\!* В разных вузах может быть *разный перечень предметов ЕГЭ* для поступления на одну и ту же специальность или направление подготовки\\. \n\nТакже этот перечень может меняться каждый год, поэтому обязательно проверяйте информацию на сайтах вузов *после 20 января*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _Профориентация и поступление в вуз по результатам ЕГЭ_ \n➡️ _Перечень предметов ЕГЭ для поступления в вуз_ \n\n📌 *Перечень предметов ЕГЭ* зависит от выбранной специальности или направления подготовки\\. \n\nЕсли в этом перечне есть математика, то это только профильный уровень\\. \n\n⚠️ *Важно\\!* В разных вузах может быть *разный перечень предметов ЕГЭ* для поступления на одну и ту же специальность или направление подготовки\\. \n\nТакже этот перечень может меняться каждый год, поэтому обязательно проверяйте информацию на сайтах вузов *после 20 января*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//7.3 ПОЛЕЗНЫЕ СОВЕТЫ ПО ВЫБОРУ ПРЕДМЕТОВ ЕГЭ
bot.callbackQuery('73', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back7');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Профориентация и поступление в вуз по результатам ЕГЭ_ \n➡️ _Полезные советы по выбору предметов ЕГЭ_ \n\n✅ *Определитесь с направлениями подготовки или специальностями\\.* \n\n✅ *Изучите требования вузов* – на сайтах университетов есть перечень предметов для каждой специальности или направления подготовки \\(он может отличаться\\!\\)\\. Составьте список предметов, который будет подходить сразу для нескольких направлений или специальностей\\. \n\n✅ *Выбирайте с запасом* – если не уверены в профессии, сдавайте 4\\-5 предметов, чтобы было больше вариантов выбора\\. \n\n✅ *Проверяйте альтернативные предметы* – некоторые вузы дают выбор \\(например, история или обществознание\\)\\. \n\n✅ *Смотрите проходные баллы прошлых лет* – это поможет понять, на какие результаты можно примерно ориентироваться\\. \n\n✅ *Начинайте готовиться заранее* – чем раньше начнёте, тем выше шансы на поступление в вуз\\! 🚀', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _Профориентация и поступление в вуз по результатам ЕГЭ_ \n➡️ _Полезные советы по выбору предметов ЕГЭ_ \n\n✅ *Определитесь с направлениями подготовки или специальностями\\.* \n\n✅ *Изучите требования вузов* – на сайтах университетов есть перечень предметов для каждой специальности или направления подготовки \\(он может отличаться\\!\\)\\. Составьте список предметов, который будет подходить сразу для нескольких направлений или специальностей\\. \n\n✅ *Выбирайте с запасом* – если не уверены в профессии, сдавайте 4\\-5 предметов, чтобы было больше вариантов выбора\\. \n\n✅ *Проверяйте альтернативные предметы* – некоторые вузы дают выбор \\(например, история или обществознание\\)\\. \n\n✅ *Смотрите проходные баллы прошлых лет* – это поможет понять, на какие результаты можно примерно ориентироваться\\. \n\n✅ *Начинайте готовиться заранее* – чем раньше начнёте, тем выше шансы на поступление в вуз\\! 🚀', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//8 КТО МОЖЕТ НЕ СДАВАТЬ ЕГЭ
bot.callbackQuery('8', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'EGE');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Кто может не сдавать ЕГЭ_ \n\n📌 Лица, обучающиеся по образовательным программам среднего общего образования, являющиеся в текущем учебном году: \n\n🔸 *победителями или призерами ЗАКЛЮЧИТЕЛЬНОГО ЭТАПА всероссийской олимпиады* школьников, \n\n🔸 *членами сборных команд Российской Федерации*, участвовавших в международных олимпиадах по общеобразовательным предметам и сформированных в порядке, устанавливаемом Министерством просвещения Российской Федерации \n\nосвобождаются от прохождения ЕГЭ по учебному предмету, *соответствующему профилю* всероссийской олимпиады школьников, международной олимпиады\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _Кто может не сдавать ЕГЭ_ \n\n📌 Лица, обучающиеся по образовательным программам среднего общего образования, являющиеся в текущем учебном году: \n\n🔸 *победителями или призерами ЗАКЛЮЧИТЕЛЬНОГО ЭТАПА всероссийской олимпиады* школьников, \n\n🔸 *членами сборных команд Российской Федерации*, участвовавших в международных олимпиадах по общеобразовательным предметам и сформированных в порядке, устанавливаемом Министерством просвещения Российской Федерации \n\nосвобождаются от прохождения ЕГЭ по учебному предмету, *соответствующему профилю* всероссийской олимпиады школьников, международной олимпиады\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//9 ЕГЭ ДЛЯ ОБУЧАЮЩИХСЯ С ОГРАНИЧЕННЫМИ ВОЗМОЖНОСТЯМИ ЗДОРОВЬЯ, ДЕТЕЙ-ИНВАЛИДОВ И ИНВАЛИДОВ
bot.callbackQuery('9', async (ctx) => {
    await ctx.answerCallbackQuery();
    const EGEnineKeyboard = new InlineKeyboard().text('Итоговое сочинение', '91').row().text('Участие в ЕГЭ и подача заявления', '92').row().text('Условия проведения и продолжительность экзамена', '93').row().text('Апелляции', '94').row().text('Назад', 'back');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _ЕГЭ для обучающихся с ограниченными возможностями здоровья, детей–инвалидов и инвалидов_ \n', {
            reply_markup: EGEnineKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        await ctx.reply('📍 ЕГЭ \n\n➡️ _ЕГЭ для обучающихся с ограниченными возможностями здоровья, детей–инвалидов и инвалидов_ \n', {
            reply_markup: EGEnineKeyboard
        });
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
       
});

//9 ЕГЭ ДЛЯ ОБУЧАЮЩИХСЯ С ОГРАНИЧЕННЫМИ ВОЗМОЖНОСТЯМИ ЗДОРОВЬЯ, ДЕТЕЙ-ИНВАЛИДОВ И ИНВАЛИДОВ (БЕЗ ИСЧЕЗАНИЯ)
bot.callbackQuery('back9', async (ctx) => {
    await ctx.answerCallbackQuery();
    if (previousMessage) {
        // Удаляем клавиатуру из предыдущего сообщения
        await bot.api.editMessageReplyMarkup(
            previousMessage.chat_id,
            previousMessage.message_id,
            undefined
        );
    } else {
        console.log("Нет предыдущего сообщения для удаления клавиатуры.");
    }
    const EGEnineKeyboard = new InlineKeyboard().text('Итоговое сочинение', '91').row().text('Участие в ЕГЭ и подача заявления', '92').row().text('Условия проведения и продолжительность экзамена', '93').row().text('Апелляции', '94').row().text('Назад', 'back');
    await ctx.reply('📍 ЕГЭ \n\n➡️ _ЕГЭ для обучающихся с ограниченными возможностями здоровья, детей–инвалидов и инвалидов_ \n', {
        reply_markup: EGEnineKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
    });       
});

//9.1 ИТОГОВОЕ СОЧИНЕНИЕ
bot.callbackQuery('91', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back9');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _ЕГЭ для обучающихся с ограниченными возможностями здоровья, детей–инвалидов и инвалидов_ \n➡️ _Итоговое сочинение_ \n\n✅ *Условия участия* \n\n🔹 Экзамен проводится с учетом здоровья и особенностей участников\\.\n🔹 Время увеличивается на *1,5 часа*\\. \n🔹 Обеспечивается удобный доступ в аудитории, туалеты и другие помещения \\(пандусы, поручни, лифты\\)\\. \n🔹 Предусмотрены *питание и медперерывы*\\. \n\n✅ *Помощь ассистентов* \n\nАссистенты помогают: \n🔸 передвигаться, ориентироваться в помещении; \n🔸 записывать ответы, фиксировать ручку в руке; \n🔸 пользоваться необходимыми техническими средствами; \n🔸 переносить ответы в бланки; \n🔸 вызывать медперсонал \\(при необходимости\\)\\. \n\n✅ *Специальные условия для разных категорий участников* \n\n🔹 *Слабослышащие и глухие* – звукоусиливающая аппаратура, сурдопереводчик\\. \n🔹 *Слабовидящие* – материалы с увеличенным шрифтом, дополнительное освещение\\. \n🔹 *Слепые* – тексты Брайлем, компьютер с речевым выводом\\. \n🔹 *С нарушением опорно\\-двигательного аппарата* – выполнение работы на компьютере\\. \n🔹 *При расстройствах аутистического спектра* – 40 минут для подготовки к сочинению\\. \n\n✅ *Проведение на дому или в медучреждении* \n\nПри наличии *медицинского заключения и рекомендаций ПМПК* экзамен проводится по месту жительства или в больнице\\. \n\n✅ *Устная форма* \n\nПо желанию и при наличии показаний сочинение можно сдавать *устно*\\. Ответ записывается на аудио, затем переносится в бланк ассистентом\\. \n\n🔗 [Более подробно…](https://obrnadzor.gov.ru/gia/gia-11/uchastniki-ege-s-ovz-deti-invalidy-i-invalidy/)', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _ЕГЭ для обучающихся с ограниченными возможностями здоровья, детей–инвалидов и инвалидов_ \n➡️ _Итоговое сочинение_ \n\n✅ *Условия участия* \n\n🔹 Экзамен проводится с учетом здоровья и особенностей участников\\.\n🔹 Время увеличивается на *1,5 часа*\\. \n🔹 Обеспечивается удобный доступ в аудитории, туалеты и другие помещения \\(пандусы, поручни, лифты\\)\\. \n🔹 Предусмотрены *питание и медперерывы*\\. \n\n✅ *Помощь ассистентов* \n\nАссистенты помогают: \n🔸 передвигаться, ориентироваться в помещении; \n🔸 записывать ответы, фиксировать ручку в руке; \n🔸 пользоваться необходимыми техническими средствами; \n🔸 переносить ответы в бланки; \n🔸 вызывать медперсонал \\(при необходимости\\)\\. \n\n✅ *Специальные условия для разных категорий участников* \n\n🔹 *Слабослышащие и глухие* – звукоусиливающая аппаратура, сурдопереводчик\\. \n🔹 *Слабовидящие* – материалы с увеличенным шрифтом, дополнительное освещение\\. \n🔹 *Слепые* – тексты Брайлем, компьютер с речевым выводом\\. \n🔹 *С нарушением опорно\\-двигательного аппарата* – выполнение работы на компьютере\\. \n🔹 *При расстройствах аутистического спектра* – 40 минут для подготовки к сочинению\\. \n\n✅ *Проведение на дому или в медучреждении* \n\nПри наличии *медицинского заключения и рекомендаций ПМПК* экзамен проводится по месту жительства или в больнице\\. \n\n✅ *Устная форма* \n\nПо желанию и при наличии показаний сочинение можно сдавать *устно*\\. Ответ записывается на аудио, затем переносится в бланк ассистентом\\. \n\n🔗 [Более подробно…](https://obrnadzor.gov.ru/gia/gia-11/uchastniki-ege-s-ovz-deti-invalidy-i-invalidy/)', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//9.2 УЧАСТИЕ В ЕГЭ И ПОДАЧА ЗАЯВЛЕНИЯ
bot.callbackQuery('92', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back9');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _ЕГЭ для обучающихся с ограниченными возможностями здоровья, детей–инвалидов и инвалидов_ \n➡️ _Участие в ЕГЭ и подача заявления_ \n\n📌 Для обучающихся с ограниченными возможностями здоровья, детей\\-инвалидов и инвалидов, государственная итоговая аттестация проводится *в форме ЕГЭ по их желанию*\\. \n\n*Подача заявления на участие в ЕГЭ:* \n\n✅ Участники с ОВЗ предоставляют копию рекомендаций ПМПК\\. \n\n✅ Дети\\-инвалиды и инвалиды – оригинал или заверенную копию справки об инвалидности \\+ копию рекомендаций ПМПК\\. \n\n✅ В заявлении указываются нужные условия для экзамена\\. \n\n🔗 [Более подробно…](https://obrnadzor.gov.ru/gia/gia-11/uchastniki-ege-s-ovz-deti-invalidy-i-invalidy/)', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _ЕГЭ для обучающихся с ограниченными возможностями здоровья, детей–инвалидов и инвалидов_ \n➡️ _Участие в ЕГЭ и подача заявления_ \n\n📌 Для обучающихся с ограниченными возможностями здоровья, детей\\-инвалидов и инвалидов, государственная итоговая аттестация проводится *в форме ЕГЭ по их желанию*\\. \n\n*Подача заявления на участие в ЕГЭ:* \n\n✅ Участники с ОВЗ предоставляют копию рекомендаций ПМПК\\. \n\n✅ Дети\\-инвалиды и инвалиды – оригинал или заверенную копию справки об инвалидности \\+ копию рекомендаций ПМПК\\. \n\n✅ В заявлении указываются нужные условия для экзамена\\. \n\n🔗 [Более подробно…](https://obrnadzor.gov.ru/gia/gia-11/uchastniki-ege-s-ovz-deti-invalidy-i-invalidy/)', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//9.3 УСЛОВИЯ ПРОВЕДЕНИЯ И ПРОДОЛЖИТЕЛЬНОСТЬ ЭКЗАМЕНА
bot.callbackQuery('93', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back9');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _ЕГЭ для обучающихся с ограниченными возможностями здоровья, детей–инвалидов и инвалидов_ \n➡️ _Условия проведения и продолжительность экзамена_ \n\n*Продолжительность экзамена:* \n\n⏳ Для участников с ОВЗ, детей\\-инвалидов и инвалидов время увеличивается на 1,5 часа\\. \n⏳ Раздел «Говорение» \\(иностранный язык\\) – на 30 минут\\. \n\n*Условия проведения экзамена:* \n\n📌 Доступ в аудитории без препятствий \\(пандусы, лифты, поручни\\)\\. \n📌 Организуется питание и перерывы при необходимости\\. \n📌 Возможна помощь ассистента \\(техническая поддержка, передвижение, чтение, запись ответов и т\\.д\\.\\)\\. \n📌 Разрешено использование специальных технических средств \\(увеличенный шрифт, Брайль, звукоусиливающая аппаратура и др\\.\\)\\. \n📌 Экзамен может проводиться на дому, если есть медицинские показания\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _ЕГЭ для обучающихся с ограниченными возможностями здоровья, детей–инвалидов и инвалидов_ \n➡️ _Условия проведения и продолжительность экзамена_ \n\n*Продолжительность экзамена:* \n\n⏳ Для участников с ОВЗ, детей\\-инвалидов и инвалидов время увеличивается на 1,5 часа\\. \n⏳ Раздел «Говорение» \\(иностранный язык\\) – на 30 минут\\. \n\n*Условия проведения экзамена:* \n\n📌 Доступ в аудитории без препятствий \\(пандусы, лифты, поручни\\)\\. \n📌 Организуется питание и перерывы при необходимости\\. \n📌 Возможна помощь ассистента \\(техническая поддержка, передвижение, чтение, запись ответов и т\\.д\\.\\)\\. \n📌 Разрешено использование специальных технических средств \\(увеличенный шрифт, Брайль, звукоусиливающая аппаратура и др\\.\\)\\. \n📌 Экзамен может проводиться на дому, если есть медицинские показания\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//9.4 АПЕЛЛЯЦИИ
bot.callbackQuery('94', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back9');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _ЕГЭ для обучающихся с ограниченными возможностями здоровья, детей–инвалидов и инвалидов_ \n➡️ _Апелляции_ \n\n📌 При рассмотрении могут присутствовать родители и ассистенты\\. \n\n📌 Для слепых и глухих участников – тифлопереводчик или сурдопереводчик\\. \n\n📌 Ошибки при переносе ответов слабовидящих и слепых учитываются как технический брак, работа проверяется повторно\\. \n\n🔗 [Более подробно…](https://obrnadzor.gov.ru/gia/gia-11/uchastniki-ege-s-ovz-deti-invalidy-i-invalidy/)', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _ЕГЭ для обучающихся с ограниченными возможностями здоровья, детей–инвалидов и инвалидов_ \n➡️ _Апелляции_ \n\n📌 При рассмотрении могут присутствовать родители и ассистенты\\. \n\n📌 Для слепых и глухих участников – тифлопереводчик или сурдопереводчик\\. \n\n📌 Ошибки при переносе ответов слабовидящих и слепых учитываются как технический брак, работа проверяется повторно\\. \n\n🔗 [Более подробно…](https://obrnadzor.gov.ru/gia/gia-11/uchastniki-ege-s-ovz-deti-invalidy-i-invalidy/)', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//10 ПРАВИЛА ЗАПОЛНЕНИЯ БЛАНКОВ ЕГЭ
bot.callbackQuery('10', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'EGE');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ЕГЭ \n\n➡️ _Правила заполнения бланков ЕГЭ_ \n\n📝 Правила заполнения бланков ЕГЭ 2025 📝 \n\nЧтобы ваши ответы были правильно обработаны, строго следуйте этим правилам: \n\n🔤 Как писать: \n• Каждую букву и цифру пишите аккуратно, точно копируя образцы, приведенные в верхней части бланков\\. \n• Заполняйте поля с первой клеточки\\. \n\n❌ Что запрещено: \n• Делать пометки вне отведенных полей или в типографских зонах бланков\\. \n• Оставлять на бланках информацию, раскрывающую вашу личность\\. \n\n📄 Дополнительные бланки: \n• Если не хватает места для развернутых ответов, запросите у организатора дополнительный бланк ответов №2\\. \n\n📚 Полные правила: [ссылка](https://doc.fipi.ru/ege/normativno-pravovye-dokumenty/Pravila_zapolneniya_blankov.pdf)', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ЕГЭ \n\n➡️ _Правила заполнения бланков ЕГЭ_ \n\n📝 Правила заполнения бланков ЕГЭ 2025 📝 \n\nЧтобы ваши ответы были правильно обработаны, строго следуйте этим правилам: \n\n🔤 Как писать: \n• Каждую букву и цифру пишите аккуратно, точно копируя образцы, приведенные в верхней части бланков\\. \n• Заполняйте поля с первой клеточки\\. \n\n❌ Что запрещено: \n• Делать пометки вне отведенных полей или в типографских зонах бланков\\. \n• Оставлять на бланках информацию, раскрывающую вашу личность\\. \n\n📄 Дополнительные бланки: \n• Если не хватает места для развернутых ответов, запросите у организатора дополнительный бланк ответов №2\\. \n\n📚 Полные правила: [ссылка](https://doc.fipi.ru/ege/normativno-pravovye-dokumenty/Pravila_zapolneniya_blankov.pdf)', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//НАЗАД ЕГЭ
bot.callbackQuery('back', async (ctx) => {
    await ctx.answerCallbackQuery();
    const EGEKeyboard = new InlineKeyboard().text('1', '1').text('2', '2').text('3', '3').text('4', '4').text('5', '5').row().text('6', '6').text('7', '7').text('8', '8').text('9', '9').text('10', '10');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        await ctx.editMessageText('Вы выбрали ЕГЭ🔥 \n\nЧто вас интересует? \n\n1️⃣ Допуск к ЕГЭ и регистрация на экзамен \n2️⃣ Расписание ЕГЭ 2025\n3️⃣ Подготовка к ЕГЭ \n4️⃣ Правила и требования на экзамене \n5️⃣ Результаты ЕГЭ \n6️⃣ Апелляция и пересдача  \n7️⃣ Профориентация и поступление в вуз по результатам ЕГЭ \n8️⃣ Кто может не сдавать ЕГЭ \n9⃣ ЕГЭ для обучающихся с ограниченными возможностями здоровья, детей–инвалидов и инвалидов \n🔟 Правила заполнения бланков ЕГЭ', {
            reply_markup: EGEKeyboard
        });
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        await ctx.reply('Вы выбрали ЕГЭ🔥 \n\nЧто вас интересует? \n\n1️⃣ Допуск к ЕГЭ и регистрация на экзамен \n2️⃣ Расписание ЕГЭ 2025\n3️⃣ Подготовка к ЕГЭ \n4️⃣ Правила и требования на экзамене \n5️⃣ Результаты ЕГЭ \n6️⃣ Апелляция и пересдача  \n7️⃣ Профориентация и поступление в вуз по результатам ЕГЭ \n8️⃣ Кто может не сдавать ЕГЭ \n9⃣ ЕГЭ для обучающихся с ограниченными возможностями здоровья, детей–инвалидов и инвалидов \n🔟 Правила заполнения бланков ЕГЭ', {
            reply_markup: EGEKeyboard
        });
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

bot.callbackQuery('OGE', async (ctx) => {
    if (previousMessage) {
        // Удаляем клавиатуру из предыдущего сообщения
        await bot.api.editMessageReplyMarkup(
            previousMessage.chat_id,
            previousMessage.message_id,
            undefined
        );
    } else {
        console.log("Нет предыдущего сообщения для удаления клавиатуры.");
    }
    await ctx.answerCallbackQuery();
    const OGEKeyboard = new InlineKeyboard().text('1', '01').text('2', '02').text('3', '03').text('4', '04').text('5', '05').row().text('6', '06').text('7', '07').text('8', '08').text('9', '09').text('10', '010');
    await ctx.reply('Вы выбрали ОГЭ🔥 \n\nЧто вас интересует? \n\n1️⃣ Допуск к ОГЭ и регистрация на экзамен\n2️⃣ Расписание ОГЭ 2025\n3️⃣ Подготовка к ОГЭ\n4️⃣ Правила и требования на экзамене \n5️⃣ Результаты ОГЭ  \n6️⃣ Апелляция и пересдача ОГЭ \n7️⃣ Поступление в 10 класс/колледж \n8️⃣ Советы для родителей и выпускников\n9⃣ ОГЭ для обучающихся с ограниченными возможностями здоровья, детей–инвалидов и инвалидов \n🔟 Правила заполнения бланков ОГЭ', {
        reply_markup: OGEKeyboard
    });
});

//01 ДОПУСК К ОГЭ И РЕГИСТРАЦИЯ НА ЭКЗАМЕН
bot.callbackQuery('01', async (ctx) => {
    await ctx.answerCallbackQuery();
    const OGEoneKeyboard = new InlineKeyboard().text('Итоговое собеседование по русскому языку', '011').row().text('Как и когда подать заявление на ОГЭ', '012').row().text('Что можно сделать, если пропустили срок?', '013').row().row().text('Назад', 'backOge');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Допуск к ОГЭ и регистрация на экзамен_ \n\n✅ Чтобы успешно подготовиться к ОГЭ в 2025 году, важно помнить несколько правил: \n1\\. Нужно получить *«зачёт»* за итоговое собеседование по русскому языку\\. \n\n2\\. *Не должно быть долгов* по предметам и годовых оценок ниже *«3»* за 9 класс\\.', {
            reply_markup: OGEoneKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        await ctx.reply('📍 ОГЭ \n\n➡️ _Допуск к ОГЭ и регистрация на экзамен_ \n\n✅ Чтобы успешно подготовиться к ОГЭ в 2025 году, важно помнить несколько правил: \n1\\. Нужно получить *«зачёт»* за итоговое собеседование по русскому языку\\. \n\n2\\. *Не должно быть долгов* по предметам и годовых оценок ниже *«3»* за 9 класс\\.', {
            reply_markup: OGEoneKeyboard
        });
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
       
});

//01 ДОПУСК К ОГЭ И РЕГИСТРАЦИЯ НА ЭКЗАМЕН (БЕЗ ИСЧЕЗАНИЯ)
bot.callbackQuery('back01', async (ctx) => {
    await ctx.answerCallbackQuery();
    if (previousMessage) {
        // Удаляем клавиатуру из предыдущего сообщения
        await bot.api.editMessageReplyMarkup(
            previousMessage.chat_id,
            previousMessage.message_id,
            undefined
        );
    } else {
        console.log("Нет предыдущего сообщения для удаления клавиатуры.");
    }
    const OGEoneKeyboard = new InlineKeyboard().text('Итоговое собеседование по русскому языку', '011').row().text('Как и когда подать заявление на ОГЭ', '012').row().text('Что можно сделать, если пропустили срок?', '013').row().row().text('Назад', 'backOge');
    await ctx.reply('📍 ОГЭ \n\n➡️ _Допуск к ОГЭ и регистрация на экзамен_ \n\n✅ Чтобы успешно подготовиться к ОГЭ в 2025 году, важно помнить несколько правил: \n1\\. Нужно получить *«зачёт»* за итоговое собеседование по русскому языку\\. \n\n2\\. *Не должно быть долгов* по предметам и годовых оценок ниже *«3»* за 9 класс\\.', {
        reply_markup: OGEoneKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
    });       
});

//01.1 ИТОГОВОЕ СОБЕСЕДОВАНИЕ ПО РУССКОМУ ЯЗЫКУ
bot.callbackQuery('011', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back01');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Допуск к ОГЭ и регистрация на экзамен_ \n➡️ _Итоговое собеседование по русскому языку_ \n\n📌 *Когда проходит итоговое собеседование?* \nОсновная дата — вторая среда февраля\\. \n\n📌 *Как подать заявление?* \nЗаявление на участие нужно подать *не позднее чем за 2 недели* до собеседования\\. Подать его можно в свою школу — лично или через родителей \\(законных представителей\\)\\. \n\n📌 *Какой результат можно получить?* \nЕсть только два варианта: *"зачет"* или *"незачет"*\\. \n\n📌 *Что делать, если не прошел собеседование?* \nЕсли вы не смогли сдать в основной день, у вас есть еще две попытки: \n🗓 *Дополнительные даты* — вторая рабочая среда марта и третий понедельник апреля\\. \nПересдать можно, если: \n✅ Вы получили "незачет"\\. \n✅ Вас удалили за нарушение правил\\. \n✅ Вы не пришли по уважительной причине \\(например, болезнь\\) и у вас есть подтверждающий документ\\. \n✅ Вы начали собеседование, но не смогли его завершить по уважительной причине \\(и тоже есть документ\\)\\. \n\n📌 *Где узнать больше?* \nВсе подробности здесь 👉 [сайт ФИПИ](https://fipi.ru/itogovoye-sobesedovaniye)', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Допуск к ОГЭ и регистрация на экзамен_ \n➡️ _Итоговое собеседование по русскому языку_ \n\n📌 *Когда проходит итоговое собеседование?* \nОсновная дата — вторая среда февраля\\. \n\n📌 *Как подать заявление?* \nЗаявление на участие нужно подать *не позднее чем за 2 недели* до собеседования\\. Подать его можно в свою школу — лично или через родителей \\(законных представителей\\)\\. \n\n📌 *Какой результат можно получить?* \nЕсть только два варианта: *"зачет"* или *"незачет"*\\. \n\n📌 *Что делать, если не прошел собеседование?* \nЕсли вы не смогли сдать в основной день, у вас есть еще две попытки: \n🗓 *Дополнительные даты* — вторая рабочая среда марта и третий понедельник апреля\\. \nПересдать можно, если: \n✅ Вы получили "незачет"\\. \n✅ Вас удалили за нарушение правил\\. \n✅ Вы не пришли по уважительной причине \\(например, болезнь\\) и у вас есть подтверждающий документ\\. \n✅ Вы начали собеседование, но не смогли его завершить по уважительной причине \\(и тоже есть документ\\)\\. \n\n📌 *Где узнать больше?* \nВсе подробности здесь 👉 [сайт ФИПИ](https://fipi.ru/itogovoye-sobesedovaniye)', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//01.2 КАК И КОГДА ПОДАТЬ ЗАЯВЛЕНИЕ НА ОГЭ?
bot.callbackQuery('012', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back01');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Допуск к ОГЭ и регистрация на экзамен_ \n➡️ _Как и когда подать заявление на ОГЭ_ \n\n📌 *Когда и как подать заявление на ОГЭ?* \nЗаявление с выбором предметов и дат экзаменов нужно подать *до 1 марта включительно* в своей школе\\. Можно лично, либо это могут сделать родители или законные представители\\. \n\n📌 *Какие предметы нужно сдавать?* \nВыпускникам 9 классов необходимо сдать ОГЭ по 4 учебным предметам: \n🔹 двум *обязательным* учебным предметам – "Русский язык" и "Математика" \n🔹 двум учебным предметам *по выбору* – "Биология", "География", "Иностранные языки" \\(английский, испанский, немецкий и французский\\), "Информатика", "История", "Литература", "Обществознание", "Физика", "Химия"\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Допуск к ОГЭ и регистрация на экзамен_ \n➡️ _Как и когда подать заявление на ОГЭ_ \n\n📌 *Когда и как подать заявление на ОГЭ?* \nЗаявление с выбором предметов и дат экзаменов нужно подать *до 1 марта включительно* в своей школе\\. Можно лично, либо это могут сделать родители или законные представители\\. \n\n📌 *Какие предметы нужно сдавать?* \nВыпускникам 9 классов необходимо сдать ОГЭ по 4 учебным предметам: \n🔹 двум *обязательным* учебным предметам – "Русский язык" и "Математика" \n🔹 двум учебным предметам *по выбору* – "Биология", "География", "Иностранные языки" \\(английский, испанский, немецкий и французский\\), "Информатика", "История", "Литература", "Обществознание", "Физика", "Химия"\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//01.3 ЧТО МОЖНО СДЕЛАТЬ, ЕСЛИ ПРОПУСТИЛИ СРОК?
bot.callbackQuery('013', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back01');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Допуск к ОГЭ и регистрация на экзамен_ \n➡️ _Что можно сделать, если пропустили срок?_ \n\n📌 *Что делать, если пропустили срок?* \nЕсли вы не успели подать заявление до 1 марта включительно, это можно сделать *только по уважительной причине* \\(например, болезнь или другие обстоятельства, которые нужно *подтвердить документально*\\)\\. \n\n📌 *Как подать заявление после 1 марта?* \nВ этом случае вам нужно обратиться в ГЭК \\(Государственную экзаменационную комиссию\\) и предоставить: \n✅ Заявление на участие в ОГЭ\\. \n✅ Документы, подтверждающие, почему Вы не могли подать заявление вовремя\\. \n\n📌 *Что можно изменить после 1 марта?* \nПеречень учебных предметов, указанных в заявлениях об участии в ОГЭ, а также сроки участия в ОГЭ, но только при наличии уважительных причин \\(болезни или иных обстоятельств\\), *подтвержденных документально*\\. \n\n⚠️ *Важно:* подавать заявления в таких случаях нужно *не позднее чем за 2 недели до экзамена*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Допуск к ОГЭ и регистрация на экзамен_ \n➡️ _Что можно сделать, если пропустили срок?_ \n\n📌 *Что делать, если пропустили срок?* \nЕсли вы не успели подать заявление до 1 марта включительно, это можно сделать *только по уважительной причине* \\(например, болезнь или другие обстоятельства, которые нужно *подтвердить документально*\\)\\. \n\n📌 *Как подать заявление после 1 марта?* \nВ этом случае вам нужно обратиться в ГЭК \\(Государственную экзаменационную комиссию\\) и предоставить: \n✅ Заявление на участие в ОГЭ\\. \n✅ Документы, подтверждающие, почему Вы не могли подать заявление вовремя\\. \n\n📌 *Что можно изменить после 1 марта?* \nПеречень учебных предметов, указанных в заявлениях об участии в ОГЭ, а также сроки участия в ОГЭ, но только при наличии уважительных причин \\(болезни или иных обстоятельств\\), *подтвержденных документально*\\. \n\n⚠️ *Важно:* подавать заявления в таких случаях нужно *не позднее чем за 2 недели до экзамена*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//02 РАСПИСАНИЕ ОГЭ 2025
bot.callbackQuery('02', async (ctx) => {
    await ctx.answerCallbackQuery();
    const OGEtwoKeyboard = new InlineKeyboard().text('ОГЭ в основной период', '021').row().text('ОГЭ в досрочный период', '022').row().text('ОГЭ в дополнительный период', '023').row().text('ОГЭ в резервный период', '024').row().text('Назад', 'backOge');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Расписание ОГЭ 2025_ \n\nОГЭ проводится в досрочный, основной и дополнительный периоды\\. \n\nВ каждом из периодов проведения ОГЭ предусматриваются резервные сроки\\. \n\nОбщий файл с расписанием можно скачать [*здесь*](https://obrnadzor.gov.ru/wp-content/uploads/2024/12/raspisanie-provedeniya-oge-i-gve-9-v-2025-godu.pdf)\\.', {
            reply_markup: OGEtwoKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        await ctx.reply('📍 ОГЭ \n\n➡️ _Расписание ОГЭ 2025_ \n\nОГЭ проводится в досрочный, основной и дополнительный периоды\\. \n\nВ каждом из периодов проведения ОГЭ предусматриваются резервные сроки\\. \n\nОбщий файл с расписанием можно скачать [*здесь*](https://obrnadzor.gov.ru/wp-content/uploads/2024/12/raspisanie-provedeniya-oge-i-gve-9-v-2025-godu.pdf)\\.', {
            reply_markup: OGEtwoKeyboard
        });
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
       
});

//02 РАСПИСАНИЕ ОГЭ 2025 (БЕЗ ИСЧЕЗАНИЯ)
bot.callbackQuery('back02', async (ctx) => {
    await ctx.answerCallbackQuery();
    if (previousMessage) {
        // Удаляем клавиатуру из предыдущего сообщения
        await bot.api.editMessageReplyMarkup(
            previousMessage.chat_id,
            previousMessage.message_id,
            undefined
        );
    } else {
        console.log("Нет предыдущего сообщения для удаления клавиатуры.");
    }
    const OGEtwoKeyboard = new InlineKeyboard().text('ОГЭ в основной период', '021').row().text('ОГЭ в досрочный период', '022').row().text('ОГЭ в дополнительный период', '023').row().text('ОГЭ в резервный период', '024').row().text('Назад', 'backOge');
    await ctx.reply('📍 ОГЭ \n\n➡️ _Расписание ОГЭ 2025_ \n\nОГЭ проводится в досрочный, основной и дополнительный периоды\\. \n\nВ каждом из периодов проведения ОГЭ предусматриваются резервные сроки\\. \n\nОбщий файл с расписанием можно скачать [*здесь*](https://obrnadzor.gov.ru/wp-content/uploads/2024/12/raspisanie-provedeniya-oge-i-gve-9-v-2025-godu.pdf)\\.', {
        reply_markup: OGEtwoKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
    });
});

//02.1 ОГЭ В ОСНОВНОЙ ПЕРИОД
bot.callbackQuery('021', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back02');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Расписание ОГЭ 2025_ \n➡️ _ОГЭ в основной период_ \n\n🔸 21 и 22 мая \\(среда и четверг\\) – иностранные языки \n🔸 26 мая \\(понедельник\\) – биология, информатика, обществознание, химия \n🔸 29 мая \\(четверг\\) – география, история, физика, химия \n🔸 3 июня \\(вторник\\) – математика \n🔸 6 июня \\(пятница\\) – география, информатика и обществознание \n🔸 9 июня \\(понедельник\\) – русский язык \n🔸 16 июня \\(понедельник\\) – биология, информатика, литература, физика', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Расписание ОГЭ 2025_ \n➡️ _ОГЭ в основной период_ \n\n🔸 21 и 22 мая \\(среда и четверг\\) – иностранные языки \n🔸 26 мая \\(понедельник\\) – биология, информатика, обществознание, химия \n🔸 29 мая \\(четверг\\) – география, история, физика, химия \n🔸 3 июня \\(вторник\\) – математика \n🔸 6 июня \\(пятница\\) – география, информатика и обществознание \n🔸 9 июня \\(понедельник\\) – русский язык \n🔸 16 июня \\(понедельник\\) – биология, информатика, литература, физика', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//02.2 ОГЭ В ДОСРОЧНЫЙ ПЕРИОД
bot.callbackQuery('022', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back02');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Расписание ОГЭ 2025_ \n➡️ _ОГЭ в досрочный период_ \n\n📌 *Кто может сдавать ОГЭ досрочно \\(до основного периода\\)?* \n\nЕсли Вы *не можете сдавать экзамены в основной период* по уважительной причине \\(например, болезнь или другие обстоятельства, *подтвержденные документами*\\), то *по решению председателя ГЭК* вам могут разрешить сдачу *в досрочный период*\\. \n\n📌 *Когда проходит досрочная сдача?* \n\nНе раньше *20 апреля* текущего года\\. \n\n🔸 22 апреля \\(вторник\\) – математика \n🔸 25 апреля \\(пятница\\) – русский язык \n🔸 29 апреля \\(вторник\\) – информатика, литература, обществознание, химия \n🔸 6 мая \\(вторник\\) – биология, география, иностранные языки, история, физика', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Расписание ОГЭ 2025_ \n➡️ _ОГЭ в досрочный период_ \n\n📌 *Кто может сдавать ОГЭ досрочно \\(до основного периода\\)?* \n\nЕсли Вы *не можете сдавать экзамены в основной период* по уважительной причине \\(например, болезнь или другие обстоятельства, *подтвержденные документами*\\), то *по решению председателя ГЭК* вам могут разрешить сдачу *в досрочный период*\\. \n\n📌 *Когда проходит досрочная сдача?* \n\nНе раньше *20 апреля* текущего года\\. \n\n🔸 22 апреля \\(вторник\\) – математика \n🔸 25 апреля \\(пятница\\) – русский язык \n🔸 29 апреля \\(вторник\\) – информатика, литература, обществознание, химия \n🔸 6 мая \\(вторник\\) – биология, география, иностранные языки, история, физика', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//02.3 ОГЭ В ДОПОЛНИТЕЛЬНЫЙ ПЕРИОД
bot.callbackQuery('023', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back02');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Расписание ОГЭ 2025_ \n➡️ _ОГЭ в дополнительный период_ \n\n📌 *Кто может сдавать ОГЭ в дополнительный период \\(сентябрь\\)?* \n\nСдавать экзамены *не раньше 1 сентября* могут: \n\n✅ *Те, кого не допустили к ОГЭ* вовремя, но позже дали допуск, когда основной период уже закончился\\. \n✅ *Те, кто не прошел ОГЭ* \\(включая тех, чьи результаты аннулировали за нарушения\\)\\. \n✅ *Те, кто не сдал более двух предметов* или повторно не сдал один\\-два предмета в резервные сроки\\. \n\n📌 *Когда и как подать заявление?* \n\nПодать заявление нужно *не позднее чем за 2 недели до начала дополнительного периода*\\. Это можно сделать: \n\n🔹 Лично\\. \n🔹 Через родителей или законных представителей\\. \n\n🔸 2 сентября \\(вторник\\) – математика \n🔸 5 сентября \\(пятница\\) – русский язык \n🔸 9 сентября \\(вторник\\) – биология, география, история, физика \n🔸 12 сентября \\(пятница\\) – иностранные языки, информатика, литература, обществознание, химия', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Расписание ОГЭ 2025_ \n➡️ _ОГЭ в дополнительный период_ \n\n📌 *Кто может сдавать ОГЭ в дополнительный период \\(сентябрь\\)?* \n\nСдавать экзамены *не раньше 1 сентября* могут: \n\n✅ *Те, кого не допустили к ОГЭ* вовремя, но позже дали допуск, когда основной период уже закончился\\. \n✅ *Те, кто не прошел ОГЭ* \\(включая тех, чьи результаты аннулировали за нарушения\\)\\. \n✅ *Те, кто не сдал более двух предметов* или повторно не сдал один\\-два предмета в резервные сроки\\. \n\n📌 *Когда и как подать заявление?* \n\nПодать заявление нужно *не позднее чем за 2 недели до начала дополнительного периода*\\. Это можно сделать: \n\n🔹 Лично\\. \n🔹 Через родителей или законных представителей\\. \n\n🔸 2 сентября \\(вторник\\) – математика \n🔸 5 сентября \\(пятница\\) – русский язык \n🔸 9 сентября \\(вторник\\) – биология, география, история, физика \n🔸 12 сентября \\(пятница\\) – иностранные языки, информатика, литература, обществознание, химия', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//02.4 ОГЭ В РЕЗЕРВНЫЙ ПЕРИОД
bot.callbackQuery('024', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back02');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Расписание ОГЭ 2025_ \n➡️ _ОГЭ в резервный период_ \n\n📌 *Кто может пересдать ОГЭ в резервные дни?* \n\n✅ Те, у кого *два экзамена совпали по датам\\.* \n✅ Те, кто *не сдал* не более *двух предметов*\\. ✅ Те, кто *пропустил экзамен по уважительной причине* \\(болезнь или другие обстоятельства, *подтвержденные документально*\\)\\. \n✅ Те, кто *не смог закончить экзамен* по уважительной причине \\(и есть *подтверждающие документы*\\)\\. \n✅ Те, чьи *апелляции о нарушениях на экзамене были удовлетворены*\\. \n✅ Те, чьи результаты *аннулировали из\\-за нарушений*, но не по их вине\\. \n\n*Резервные дни в основной период:* \n\n🔸 26 июня \\(четверг\\) – русский язык \n🔸 27 июня \\(пятница\\) – по всем учебным предметам \\(за исключением русского языка и математики\\) \n🔸 28 июня \\(суббота\\) – по всем учебным предметам \\(за исключением русского языка и математики\\) \n🔸 30 июня \\(понедельник\\) – математика \n🔸 1 июля \\(вторник\\) – по всем учебным предметам \n🔸 2 июля \\(среда\\) – по всем учебным предметам \n\n*Резервные дни в досрочный период:* \n\n🔹 12 мая \\(понедельник\\) – математика \n🔹 13 мая \\(вторник\\) – информатика, литература, обществознание, химия \n🔹 14 мая \\(среда\\) – биология, география, иностранные языки, история, физика \n🔹 15 мая \\(четверг\\) – русский язык \n🔹 17 мая \\(суббота\\) – по всем учебным предметам \n\n*Резервные дни в дополнительный период:* \n\n🔸 17 сентября \\(среда\\) – русский язык \n🔸 18 сентября \\(четверг\\) – математика \n🔸 19 сентября \\(пятница\\) – по всем учебным предметам \\(за исключением русского языка и математики\\) \n🔸 22 сентября \\(понедельник\\) – по всем учебным предметам \\(за исключением русского языка и математики\\) \n🔸 23 сентября \\(вторник\\) – по всем учебным предметам', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Расписание ОГЭ 2025_ \n➡️ _ОГЭ в резервный период_ \n\n📌 *Кто может пересдать ОГЭ в резервные дни?* \n\n✅ Те, у кого *два экзамена совпали по датам\\.* \n✅ Те, кто *не сдал* не более *двух предметов*\\. ✅ Те, кто *пропустил экзамен по уважительной причине* \\(болезнь или другие обстоятельства, *подтвержденные документально*\\)\\. \n✅ Те, кто *не смог закончить экзамен* по уважительной причине \\(и есть *подтверждающие документы*\\)\\. \n✅ Те, чьи *апелляции о нарушениях на экзамене были удовлетворены*\\. \n✅ Те, чьи результаты *аннулировали из\\-за нарушений*, но не по их вине\\. \n\n*Резервные дни в основной период:* \n\n🔸 26 июня \\(четверг\\) – русский язык \n🔸 27 июня \\(пятница\\) – по всем учебным предметам \\(за исключением русского языка и математики\\) \n🔸 28 июня \\(суббота\\) – по всем учебным предметам \\(за исключением русского языка и математики\\) \n🔸 30 июня \\(понедельник\\) – математика \n🔸 1 июля \\(вторник\\) – по всем учебным предметам \n🔸 2 июля \\(среда\\) – по всем учебным предметам \n\n*Резервные дни в досрочный период:* \n\n🔹 12 мая \\(понедельник\\) – математика \n🔹 13 мая \\(вторник\\) – информатика, литература, обществознание, химия \n🔹 14 мая \\(среда\\) – биология, география, иностранные языки, история, физика \n🔹 15 мая \\(четверг\\) – русский язык \n🔹 17 мая \\(суббота\\) – по всем учебным предметам \n\n*Резервные дни в дополнительный период:* \n\n🔸 17 сентября \\(среда\\) – русский язык \n🔸 18 сентября \\(четверг\\) – математика \n🔸 19 сентября \\(пятница\\) – по всем учебным предметам \\(за исключением русского языка и математики\\) \n🔸 22 сентября \\(понедельник\\) – по всем учебным предметам \\(за исключением русского языка и математики\\) \n🔸 23 сентября \\(вторник\\) – по всем учебным предметам', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//03 ПОДГОТОВКА К ОГЭ
bot.callbackQuery('03', async (ctx) => {
    await ctx.answerCallbackQuery();
    const OGEthreeKeyboard = new InlineKeyboard().text('Список проверяемых тем и умений', '031').row().text('Формат заданий ', '032').row().text('Материалы для подготовки', '033').row().text('📌 Как использовать Навигатор самоподготовки?', '034').row().text('Критерии оценивания', '035').row().text('Рекомендации по подготовке к ОГЭ', '036').row().text('Назад', 'backOge');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Подготовка к ОГЭ_', {
            reply_markup: OGEthreeKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        await ctx.reply('📍 ОГЭ \n\n➡️ _Подготовка к ОГЭ_', {
            reply_markup: OGEthreeKeyboard
        });
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
       
});

//03 ПОДГОТОВКА К ОГЭ (БЕЗ ИСЧЕЗАНИЯ)
bot.callbackQuery('back03', async (ctx) => {
    await ctx.answerCallbackQuery();
    if (previousMessage) {
        // Удаляем клавиатуру из предыдущего сообщения
        await bot.api.editMessageReplyMarkup(
            previousMessage.chat_id,
            previousMessage.message_id,
            undefined
        );
    } else {
        console.log("Нет предыдущего сообщения для удаления клавиатуры.");
    }
    const OGEthreeKeyboard = new InlineKeyboard().text('Список проверяемых тем и умений', '031').row().text('Формат заданий ', '032').row().text('Материалы для подготовки', '033').row().text('📌 Как использовать Навигатор самоподготовки?', '034').row().text('Критерии оценивания', '035').row().text('Рекомендации по подготовке к ОГЭ', '036').row().text('Назад', 'backOge');
    await ctx.reply('📍 ОГЭ \n\n➡️ _Подготовка к ОГЭ_', {
        reply_markup: OGEthreeKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
    });       
});

//03.1 СПИСОК ПРОВЕРЯЕМЫХ ТЕМ И УМЕНИЙ
bot.callbackQuery('031', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back03');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Подготовка к ОГЭ_ \n➡️ _Список проверяемых тем и умений_ \n\n📌 Все темы и умения, которые могут попасться Вам на ОГЭ, указаны в *кодификаторе*\\. \n\n⚠️ Важно: на ОГЭ могут быть *любые темы* из кодификатора, даже, если Вы не проходили это в школе по каким\\-либо причинам, поэтому обязательно ознакомьтесь с кодификатором\\! \n\n🔗 Кодификатор можно скачать [с сайта ФИПИ](https://fipi.ru/oge/demoversii-specifikacii-kodifikatory), выбрав интересующий Вас предмет\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Подготовка к ОГЭ_ \n➡️ _Список проверяемых тем и умений_ \n\n📌 Все темы и умения, которые могут попасться Вам на ОГЭ, указаны в *кодификаторе*\\. \n\n⚠️ Важно: на ОГЭ могут быть *любые темы* из кодификатора, даже, если Вы не проходили это в школе по каким\\-либо причинам, поэтому обязательно ознакомьтесь с кодификатором\\! \n\n🔗 Кодификатор можно скачать [с сайта ФИПИ](https://fipi.ru/oge/demoversii-specifikacii-kodifikatory), выбрав интересующий Вас предмет\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//03.2 ФОРМАТ ЗАДАНИЙ
bot.callbackQuery('032', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back03');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Подготовка к ОГЭ_ \n➡️ _Формат заданий_ \n\n📌 *Где можно узнать формат заданий ОГЭ?* \nФормат заданий на этот год можно найти в *демоверсии* — это образец экзамена \\(с ответами\\)\\. \n\n📝 В демоверсии можно увидеть примерные задания, их формат и общую структуру экзамена и проверить себя\\. Это поможет понять, какие задания будут на настоящем экзамене и как к ним подготовиться\\. \n\n📅 Демоверсия обновляется каждый год и размещается *примерно в августе* [на официальном сайте ФИПИ](https://fipi.ru/oge/demoversii-specifikacii-kodifikatory)\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Подготовка к ОГЭ_ \n➡️ _Формат заданий_ \n\n📌 *Где можно узнать формат заданий ОГЭ?* \nФормат заданий на этот год можно найти в *демоверсии* — это образец экзамена \\(с ответами\\)\\. \n\n📝 В демоверсии можно увидеть примерные задания, их формат и общую структуру экзамена и проверить себя\\. Это поможет понять, какие задания будут на настоящем экзамене и как к ним подготовиться\\. \n\n📅 Демоверсия обновляется каждый год и размещается *примерно в августе* [на официальном сайте ФИПИ](https://fipi.ru/oge/demoversii-specifikacii-kodifikatory)\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//03.3 МАТЕРИАЛЫ ДЛЯ ПОДГОТОВКИ
bot.callbackQuery('033', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back03');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Подготовка к ОГЭ_ \n➡️ _Материалы для подготовки_ \n\n🔗 Для подготовки можно использовать *открытый банк заданий* по каждому предмету [на сайте ФИПИ](https://fipi.ru/oge/otkrytyy-bank-zadaniy-oge)\\. \n\n📝 В банке заданий можно отсортировать задания по типам с помощью встроенного фильтра\\. Эти задания могут встретиться на настоящем экзамене, так как все задания ОГЭ берутся из открытого банка\\. \n\n⚠️ Будьте осторожны с материалами с других сайтов, они могут быть *устаревшими* или содержать ошибки\\. Лучше используйте *официальный банк заданий*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Подготовка к ОГЭ_ \n➡️ _Материалы для подготовки_ \n\n🔗 Для подготовки можно использовать *открытый банк заданий* по каждому предмету [на сайте ФИПИ](https://fipi.ru/oge/otkrytyy-bank-zadaniy-oge)\\. \n\n📝 В банке заданий можно отсортировать задания по типам с помощью встроенного фильтра\\. Эти задания могут встретиться на настоящем экзамене, так как все задания ОГЭ берутся из открытого банка\\. \n\n⚠️ Будьте осторожны с материалами с других сайтов, они могут быть *устаревшими* или содержать ошибки\\. Лучше используйте *официальный банк заданий*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//03.4 КАК ИСПОЛЬЗОВАТЬ НАВИГАТОР САМОПОДГОТОВКИ?
bot.callbackQuery('034', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back03');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Подготовка к ОГЭ_ \n➡️ _Как использовать Навигатор самоподготовки?_ \n\n📌 *Навигатор самоподготовки* включает анализ типичных ошибок, советы, рекомендации, а также темы, на которые стоит обратить особое внимание, и разбор ответов с высокими и низкими баллами\\. \n\n📝 Ознакомьтесь с этим документом, чтобы избежать ошибок и лучше понять, как правильно выполнять задания\\. \n\n🔗 Cкачать документ по каждому предмету можно [*на сайте ФИПИ*](https://fipi.ru/navigator-podgotovki/navigator-oge)\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Подготовка к ОГЭ_ \n➡️ _Как использовать Навигатор самоподготовки?_ \n\n📌 *Навигатор самоподготовки* включает анализ типичных ошибок, советы, рекомендации, а также темы, на которые стоит обратить особое внимание, и разбор ответов с высокими и низкими баллами\\. \n\n📝 Ознакомьтесь с этим документом, чтобы избежать ошибок и лучше понять, как правильно выполнять задания\\. \n\n🔗 Cкачать документ по каждому предмету можно [*на сайте ФИПИ*](https://fipi.ru/navigator-podgotovki/navigator-oge)\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//03.5 КРИТЕРИИ ОЦЕНИВАНИЯ
bot.callbackQuery('035', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back03');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Подготовка к ОГЭ_ \n➡️ _Критерии оценивания_ \n\n🔹 *Максимальные баллы* за каждое задание и его *уровень сложности* можно посмотреть в [*спецификации по предмету*](https://fipi.ru/oge/demoversii-specifikacii-kodifikatory)\\. \n\n🔹 *Как оцениваются задания и по каким критериям* – эта информация есть в [*демоверсии*](https://fipi.ru/oge/demoversii-specifikacii-kodifikatory)\\. \n\n🔹 *Подробные разборы ответов и анализ ошибок* можно найти в 👉 [*Методических материалах*](https://fipi.ru/oge/dlya-predmetnyh-komissiy-subektov-rf) для экспертов ОГЭ \\(они доступны всем\\!\\)\\. Ознакомьтесь с ними тоже, в них много полезного\\!', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Подготовка к ОГЭ_ \n➡️ _Критерии оценивания_ \n\n🔹 *Максимальные баллы* за каждое задание и его *уровень сложности* можно посмотреть в [*спецификации по предмету*](https://fipi.ru/oge/demoversii-specifikacii-kodifikatory)\\. \n\n🔹 *Как оцениваются задания и по каким критериям* – эта информация есть в [*демоверсии*](https://fipi.ru/oge/demoversii-specifikacii-kodifikatory)\\. \n\n🔹 *Подробные разборы ответов и анализ ошибок* можно найти в 👉 [*Методических материалах*](https://fipi.ru/oge/dlya-predmetnyh-komissiy-subektov-rf) для экспертов ОГЭ \\(они доступны всем\\!\\)\\. Ознакомьтесь с ними тоже, в них много полезного\\!', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//03.6 РЕКОМЕНДАЦИИ ПО ПОДГОТОВКЕ К ОГЭ
bot.callbackQuery('036', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back03');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Подготовка к ОГЭ_ \n➡️ _Рекомендации по подготовке к ОГЭ_ \n\n✅ *Изучите формат экзамена* как можно раньше: решите *демоверсию*, проверьте ответы, посчитайте баллы и определите свои слабые места\\. \n\n✅ *Используйте кодификатор* как план: проработайте все темы, особенно сложные\\. \n\n✅ *Составьте план подготовки*, не забывая про отдых\\. \n\n✅ *Прорешайте задания* из открытого банка ФИПИ ведь на самом экзамене все задания берутся из этого банка\\. \n\n✅ *Пользуйтесь навигатором самоподготовки* – там разбор ошибок и полезные рекомендации\\. \n\n✅ *Обязательно участвуйте в пробных ОГЭ*, которые проводят в школе\\. \n\n✅ *Начинайте готовиться заранее* – лучше уже с 8 класса\\. Так нагрузка будет меньше, и успеете пройти весь материал\\. \n\n✅ Если начали готовиться *поздно*, сосредоточьтесь на *заданиях попроще*, чтобы набрать больше баллов\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Подготовка к ОГЭ_ \n➡️ _Рекомендации по подготовке к ОГЭ_ \n\n✅ *Изучите формат экзамена* как можно раньше: решите *демоверсию*, проверьте ответы, посчитайте баллы и определите свои слабые места\\. \n\n✅ *Используйте кодификатор* как план: проработайте все темы, особенно сложные\\. \n\n✅ *Составьте план подготовки*, не забывая про отдых\\. \n\n✅ *Прорешайте задания* из открытого банка ФИПИ ведь на самом экзамене все задания берутся из этого банка\\. \n\n✅ *Пользуйтесь навигатором самоподготовки* – там разбор ошибок и полезные рекомендации\\. \n\n✅ *Обязательно участвуйте в пробных ОГЭ*, которые проводят в школе\\. \n\n✅ *Начинайте готовиться заранее* – лучше уже с 8 класса\\. Так нагрузка будет меньше, и успеете пройти весь материал\\. \n\n✅ Если начали готовиться *поздно*, сосредоточьтесь на *заданиях попроще*, чтобы набрать больше баллов\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//04 ПРАВИЛА И ТРЕБОВАНИЯ НА ЭКЗАМЕНЕ
bot.callbackQuery('04', async (ctx) => {
    await ctx.answerCallbackQuery();
    const OGEfourKeyboard = new InlineKeyboard().text('Необходимые документы и принадлежности', '041').row().text('Что можно брать с собой на экзамен', '042').row().text('Что нельзя брать с собой на экзамен', '043').row().text('Правила поведения на экзамене и последствия нарушений', '044').row().text('Назад', 'backOge');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Правила и требования на экзамене_', {
            reply_markup: OGEfourKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        await ctx.reply('📍 ОГЭ \n\n➡️ _Правила и требования на экзамене_', {
            reply_markup: OGEfourKeyboard
        });
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
       
});

//04 ПРАВИЛА И ТРЕБОВАНИЯ НА ЭКЗАМЕНЕ (БЕЗ ИСЧЕЗАНИЯ)
bot.callbackQuery('back04', async (ctx) => {
    await ctx.answerCallbackQuery();
    if (previousMessage) {
        // Удаляем клавиатуру из предыдущего сообщения
        await bot.api.editMessageReplyMarkup(
            previousMessage.chat_id,
            previousMessage.message_id,
            undefined
        );
    } else {
        console.log("Нет предыдущего сообщения для удаления клавиатуры.");
    }
    const OGEfourKeyboard = new InlineKeyboard().text('Необходимые документы и принадлежности', '041').row().text('Что можно брать с собой на экзамен', '042').row().text('Что нельзя брать с собой на экзамен', '043').row().text('Правила поведения на экзамене и последствия нарушений', '044').row().text('Назад', 'backOge');
    await ctx.reply('📍 ОГЭ \n\n➡️ _Правила и требования на экзамене_', {
        reply_markup: OGEfourKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
    });
       
});

//04.1 НЕОБХОДИМЫЕ ДОКУМЕНТЫ И ПРИНАДЛЕЖНОСТИ
bot.callbackQuery('041', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back04');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Правила и требования на экзамене_ \n➡️ _Необходимые документы и принадлежности_ \n\n✅ На столе можно иметь только: \n\n🖊 Ручку \\(гелевую или капиллярную\\) с черными чернилами \n\n📄 Документ, удостоверяющий личность', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Правила и требования на экзамене_ \n➡️ _Необходимые документы и принадлежности_ \n\n✅ На столе можно иметь только: \n\n🖊 Ручку \\(гелевую или капиллярную\\) с черными чернилами \n\n📄 Документ, удостоверяющий личность', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//04.2 ЧТО МОЖНО БРАТЬ С СОБОЙ НА ЭКЗАМЕН
bot.callbackQuery('042', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back04');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Правила и требования на экзамене_ \n➡️ _Что можно брать с собой на экзамен_ \n\n🔹 лекарства \\(при необходимости\\); \n\n🔹 продукты питания для дополнительного приема пищи \\(перекус\\), бутилированная питьевая вода при условии, что упаковка указанных продуктов питания и воды, а также их потребление не будут отвлекать других участников экзаменов от выполнения ими экзаменационной работы \\(при необходимости\\); \n\n🔹 для сдающих биологию: линейка, не содержащая справочной информации, непрограммируемый калькулятор \\(не имеющий доступа к Интернету, не являющийся средством связи и хранилищем баз данных\\); \n\n🔹 для сдающих географию: линейка для измерения расстояний по топографической карте, непрограммируемый калькулятор, географические атласы для 7\\-9 классов для решения практических заданий; \n\n🔹 для сдающих литературу: орфографический словарь, позволяющий устанавливать нормативное написание слов, полные тексты художественных произведений, а также сборники лирики; \n\n🔹 для сдающих математику: линейка для построения чертежей и рисунков, справочные материалы, содержащие основные формулы курса математики программы основного общего образования; \n\n🔹 для сдающих русский язык: орфографический словарь, позволяющий устанавливать нормативное написание слов; \n\n🔹 для сдающих физику: линейка для построения графиков и схем, непрограммируемый калькулятор; \n\n🔹 для сдающих химию: непрограммируемый калькулятор, периодическая система химических элементов Д\\.И\\. Менделеева, таблица растворимости солей, кислот и оснований в воде, электрохимический ряд напряжений металлов\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Правила и требования на экзамене_ \n➡️ _Что можно брать с собой на экзамен_ \n\n🔹 лекарства \\(при необходимости\\); \n\n🔹 продукты питания для дополнительного приема пищи \\(перекус\\), бутилированная питьевая вода при условии, что упаковка указанных продуктов питания и воды, а также их потребление не будут отвлекать других участников экзаменов от выполнения ими экзаменационной работы \\(при необходимости\\); \n\n🔹 для сдающих биологию: линейка, не содержащая справочной информации, непрограммируемый калькулятор \\(не имеющий доступа к Интернету, не являющийся средством связи и хранилищем баз данных\\); \n\n🔹 для сдающих географию: линейка для измерения расстояний по топографической карте, непрограммируемый калькулятор, географические атласы для 7\\-9 классов для решения практических заданий; \n\n🔹 для сдающих литературу: орфографический словарь, позволяющий устанавливать нормативное написание слов, полные тексты художественных произведений, а также сборники лирики; \n\n🔹 для сдающих математику: линейка для построения чертежей и рисунков, справочные материалы, содержащие основные формулы курса математики программы основного общего образования; \n\n🔹 для сдающих русский язык: орфографический словарь, позволяющий устанавливать нормативное написание слов; \n\n🔹 для сдающих физику: линейка для построения графиков и схем, непрограммируемый калькулятор; \n\n🔹 для сдающих химию: непрограммируемый калькулятор, периодическая система химических элементов Д\\.И\\. Менделеева, таблица растворимости солей, кислот и оснований в воде, электрохимический ряд напряжений металлов\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//04.3 ЧТО НЕЛЬЗЯ БРАТЬ С СОБОЙ НА ЭКЗАМЕН
bot.callbackQuery('043', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back04');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Правила и требования на экзамене_ \n➡️ _Что нельзя брать с собой на экзамен_ \n\n📌 Все личные вещи, кроме необходимых и разрешенных, участники экзаменов оставляют в специально отведенном месте для хранения личных вещей\\. \n\nВ аудиторию проведения ОГЭ *нельзя* проносить: \n\n🔸 средства связи; \n🔸 фото\\-, аудио\\- и видеоаппаратуру; \n🔸 электронно\\-вычислительную технику; \n🔸 справочные материалы; \n🔸 письменные заметки; \n🔸 иные средства хранения и передачи информации\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Правила и требования на экзамене_ \n➡️ _Что нельзя брать с собой на экзамен_ \n\n📌 Все личные вещи, кроме необходимых и разрешенных, участники экзаменов оставляют в специально отведенном месте для хранения личных вещей\\. \n\nВ аудиторию проведения ОГЭ *нельзя* проносить: \n\n🔸 средства связи; \n🔸 фото\\-, аудио\\- и видеоаппаратуру; \n🔸 электронно\\-вычислительную технику; \n🔸 справочные материалы; \n🔸 письменные заметки; \n🔸 иные средства хранения и передачи информации\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//04.4 ПРАВИЛА ПОВЕДЕНИЯ НА ЭКЗАМЕНЕ И ПОСЛЕДСТВИЯ НАРУШЕНИЙ
bot.callbackQuery('044', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back04');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Правила и требования на экзамене_ \n➡️ _Правила поведения на экзамене и последствия нарушений_ \n\n*Во время экзамена нельзя:* \n\n❌ общаться друг с другом; \n\n❌ свободно перемещаться по аудитории и пункту проведения экзамена \\(ППЭ\\); \n\n❌ выносить из аудиторий и ППЭ черновики, экзаменационные материалы на бумажном и \\(или\\) электронном носителях, фотографировать экзаменационные материалы, черновики\\. \n\n*Во время экзамена можно:* \n\n✅ выходить из аудитории и перемещаться по ППЭ в сопровождении одного из организаторов\\. \n\n⚠️ Если нарушите требования порядка проведения экзамена, то Вас удалят из ППЭ, организатор поставит в соответствующем поле бланка регистрации участника экзамена необходимую отметку, а результаты экзаменов будут *аннулированы*\\. В таком случае *пересдать* можно будет в дополнительный период, но *не ранее 1 сентября* текущего года\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Правила и требования на экзамене_ \n➡️ _Правила поведения на экзамене и последствия нарушений_ \n\n*Во время экзамена нельзя:* \n\n❌ общаться друг с другом; \n\n❌ свободно перемещаться по аудитории и пункту проведения экзамена \\(ППЭ\\); \n\n❌ выносить из аудиторий и ППЭ черновики, экзаменационные материалы на бумажном и \\(или\\) электронном носителях, фотографировать экзаменационные материалы, черновики\\. \n\n*Во время экзамена можно:* \n\n✅ выходить из аудитории и перемещаться по ППЭ в сопровождении одного из организаторов\\. \n\n⚠️ Если нарушите требования порядка проведения экзамена, то Вас удалят из ППЭ, организатор поставит в соответствующем поле бланка регистрации участника экзамена необходимую отметку, а результаты экзаменов будут *аннулированы*\\. В таком случае *пересдать* можно будет в дополнительный период, но *не ранее 1 сентября* текущего года\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//05 РЕЗУЛЬТАТЫ ОГЭ
bot.callbackQuery('05', async (ctx) => {
    await ctx.answerCallbackQuery();
    const OGEfiveKeyboard = new InlineKeyboard().text('Минимальные баллы ОГЭ', '051').row().text('Перевод первичных баллов ОГЭ в оценки', '052').row().text('Как узнать результаты ОГЭ', '053').row().text('Назад', 'backOge');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Результаты ОГЭ_', {
            reply_markup: OGEfiveKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        await ctx.reply('📍 ОГЭ \n\n➡️ _Результаты ОГЭ_', {
            reply_markup: OGEfiveKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
       
});

//05 РЕЗУЛЬТАТЫ ОГЭ (БЕЗ ИСЧЕЗАНИЯ)
bot.callbackQuery('back05', async (ctx) => {
    await ctx.answerCallbackQuery();
    if (previousMessage) {
        // Удаляем клавиатуру из предыдущего сообщения
        await bot.api.editMessageReplyMarkup(
            previousMessage.chat_id,
            previousMessage.message_id,
            undefined
        );
    } else {
        console.log("Нет предыдущего сообщения для удаления клавиатуры.");
    }
    const OGEfiveKeyboard = new InlineKeyboard().text('Минимальные баллы ОГЭ', '051').row().text('Перевод первичных баллов ОГЭ в оценки', '052').row().text('Как узнать результаты ОГЭ', '053').row().text('Назад', 'backOge');
    await ctx.reply('📍 ОГЭ \n\n➡️ _Результаты ОГЭ_', {
        reply_markup: OGEfiveKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
    });
});

//05.1 МИНИМАЛЬНЫЕ БАЛЛЫ ОГЭ
bot.callbackQuery('051', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back05');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Результаты ОГЭ_ \n➡️ _Минимальные баллы ОГЭ_ \n\n📌 Минимальное количество первичных баллов ОГЭ, соответствующее отметке «3» по пятибалльной системе оценивания: \n\n🔸 Русский язык – *15* \n🔸 Математика – *8* \\(из них не менее 2 баллов получено за выполнение заданий по геометрии \\(задания 15\\-19, 23\\-25\\)\\) \n🔸 Физика – *10* \n🔸 Обществознание – *14* \n🔸 Литература – *16* \n🔸 Химия – *10* \n🔸 Информатика – *5* \n🔸 География – *12* \n🔸 Биология – *13* \n🔸 История – *11* \n🔸 Иностранные языки – *29*', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Результаты ОГЭ_ \n➡️ _Минимальные баллы ОГЭ_ \n\n📌 Минимальное количество первичных баллов ОГЭ, соответствующее отметке «3» по пятибалльной системе оценивания: \n\n🔸 Русский язык – *15* \n🔸 Математика – *8* \\(из них не менее 2 баллов получено за выполнение заданий по геометрии \\(задания 15\\-19, 23\\-25\\)\\) \n🔸 Физика – *10* \n🔸 Обществознание – *14* \n🔸 Литература – *16* \n🔸 Химия – *10* \n🔸 Информатика – *5* \n🔸 География – *12* \n🔸 Биология – *13* \n🔸 История – *11* \n🔸 Иностранные языки – *29*', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//05.2 ПЕРЕВОД ПЕРВИЧНЫХ БАЛЛОВ ОГЭ В ОЦЕНКИ
bot.callbackQuery('052', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('1', '0521').text('2', '0522').text('3', '0523').text('4', '0524').text('5', '0525').text('6', '0526').row().text('7', '0527').text('8', '0528').text('9', '0529').text('10', '05210').text('11', '05211').text('12', '05');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Результаты ОГЭ_ \n➡️ _Перевод первичных баллов ОГЭ в оценки_ \n\n📌 Выберете интересующий вас предмет: \n\n1 👉 Русский язык \n2 👉 Математика \n3 👉 Физика \n4 👉 Химия \n5 👉 Биология \n6 👉 География \n7 👉 Обществознание \n8 👉 История \n9 👉 Литература \n10 👉 Информатика \n11 👉 Иностранные языки \n12 👉 Назад', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Результаты ОГЭ_ \n➡️ _Перевод первичных баллов ОГЭ в оценки_ \n\n📌 Выберете интересующий вас предмет: \n\n1 👉 Русский язык \n2 👉 Математика \n3 👉 Физика \n4 👉 Химия \n5 👉 Биология \n6 👉 География \n7 👉 Обществознание \n8 👉 История \n9 👉 Литература \n10 👉 Информатика \n11 👉 Иностранные языки \n12 👉 Назад', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//05.2 ПЕРЕВОД ПЕРВИЧНЫХ БАЛЛОВ ОГЭ В ОЦЕНКИ (НАЗАД)
bot.callbackQuery('back052', async (ctx) => {
    await ctx.answerCallbackQuery();
    if (previousMessage) {
        // Удаляем клавиатуру из предыдущего сообщения
        await bot.api.editMessageReplyMarkup(
            previousMessage.chat_id,
            previousMessage.message_id,
            undefined
        );
    } else {
        console.log("Нет предыдущего сообщения для удаления клавиатуры.");
    }
    const InlineMenuKeyboard = new InlineKeyboard().text('1', '0521').text('2', '0522').text('3', '0523').text('4', '0524').text('5', '0525').text('6', '0526').row().text('7', '0527').text('8', '0528').text('9', '0529').text('10', '05210').text('11', '05211').text('12', 'back05');
    const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Результаты ОГЭ_ \n➡️ _Перевод первичных баллов ОГЭ в оценки_ \n\n📌 Выберете интересующий вас предмет: \n\n1 👉 Русский язык \n2 👉 Математика \n3 👉 Физика \n4 👉 Химия \n5 👉 Биология \n6 👉 География \n7 👉 Обществознание \n8 👉 История \n9 👉 Литература \n10 👉 Информатика \n11 👉 Иностранные языки \n12 👉 Назад', {
        reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
    });
    previousMessage = {
        chat_id: sentMessage.chat.id,
        message_id: sentMessage.message_id,
    }    
});

//05.2.1 РУССКИЙ ЯЗЫК
bot.callbackQuery('0521', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back052');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Результаты ОГЭ_ \n➡️ _Перевод первичных баллов ОГЭ в оценки_ \n➡️ _Русский язык_ \n\n«2»: 0\\-14 \n«3»: 15\\-25 \n«4»: 26\\-32, из них не менее 6 баллов за грамотность \\(по критериям ГК1–ГК4\\)\\. Если по критериям ГК1–ГК4 обучающийся набрал менее 6 баллов, выставляется отметка «3»\\. \n«5»: 33\\-37, из них не менее 9 баллов за грамотность \\(по критериям ГК1–ГК4\\)\\. Если по критериям ГК1–ГК4 обучающийся набрал менее 9 баллов, выставляется отметка «4»\\. \n\nРекомендуемый минимальный первичный балл для отбора обучающихся в профильные классы для обучения по образовательным программам среднего общего образования – *28 баллов*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Результаты ОГЭ_ \n➡️ _Перевод первичных баллов ОГЭ в оценки_ \n➡️ _Русский язык_ \n\n«2»: 0\\-14 \n«3»: 15\\-25 \n«4»: 26\\-32, из них не менее 6 баллов за грамотность \\(по критериям ГК1–ГК4\\)\\. Если по критериям ГК1–ГК4 обучающийся набрал менее 6 баллов, выставляется отметка «3»\\. \n«5»: 33\\-37, из них не менее 9 баллов за грамотность \\(по критериям ГК1–ГК4\\)\\. Если по критериям ГК1–ГК4 обучающийся набрал менее 9 баллов, выставляется отметка «4»\\. \n\nРекомендуемый минимальный первичный балл для отбора обучающихся в профильные классы для обучения по образовательным программам среднего общего образования – *28 баллов*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//05.2.2 МАТЕМАТИКА
bot.callbackQuery('0522', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back052');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Результаты ОГЭ_ \n➡️ _Перевод первичных баллов ОГЭ в оценки_ \n➡️ _Математика_ \n\n*«2»*: 0\\-7 \n*«3»*: 8\\-14, из них не менее 2 баллов получено за выполнение заданий по геометрии\\. В случае получения менее 2 баллов за выполнение заданий по геометрии выставляется отметка «2»\\. \n*«4»*: 15\\-21, из них не менее 2 баллов получено за выполнение заданий по геометрии\\. В случае получения менее 2 баллов за выполнение заданий по геометрии выставляется отметка «2»\\. \n*«5»*: 22\\-31, из них не менее 2 баллов получено за выполнение заданий по геометрии\\. В случае получения менее 2 баллов за выполнение заданий по геометрии выставляется отметка «2»\\. \n\nЗадания по геометрии: 15\\-19, 23\\-25\\. \n\nРекомендуемый минимальный первичный балл для отбора обучающихся в профильные классы для обучения по образовательным программам среднего общего образования: \n\n🔹 *для естественнонаучного профиля*: 18 баллов, из них не менее 6 по геометрии; \n🔹 *для экономического профиля*: 18 баллов, из них не менее 5 по геометрии; \n🔹 *для физико\\-математического профиля*: 19 баллов, из них не менее 7 по геометрии\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Результаты ОГЭ_ \n➡️ _Перевод первичных баллов ОГЭ в оценки_ \n➡️ _Математика_ \n\n*«2»*: 0\\-7 \n*«3»*: 8\\-14, из них не менее 2 баллов получено за выполнение заданий по геометрии\\. В случае получения менее 2 баллов за выполнение заданий по геометрии выставляется отметка «2»\\. \n*«4»*: 15\\-21, из них не менее 2 баллов получено за выполнение заданий по геометрии\\. В случае получения менее 2 баллов за выполнение заданий по геометрии выставляется отметка «2»\\. \n*«5»*: 22\\-31, из них не менее 2 баллов получено за выполнение заданий по геометрии\\. В случае получения менее 2 баллов за выполнение заданий по геометрии выставляется отметка «2»\\. \n\nЗадания по геометрии: 15\\-19, 23\\-25\\. \n\nРекомендуемый минимальный первичный балл для отбора обучающихся в профильные классы для обучения по образовательным программам среднего общего образования: \n\n🔹 *для естественнонаучного профиля*: 18 баллов, из них не менее 6 по геометрии; \n🔹 *для экономического профиля*: 18 баллов, из них не менее 5 по геометрии; \n🔹 *для физико\\-математического профиля*: 19 баллов, из них не менее 7 по геометрии\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//05.2.3 ФИЗИКА
bot.callbackQuery('0523', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back052');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Результаты ОГЭ_ \n➡️ _Перевод первичных баллов ОГЭ в оценки_ \n➡️ _Физика_ \n\n*«2»*: 0\\-9 \n*«3»*: 10\\-19 \n*«4»*: 20\\-29 \n*«5»*: 30\\-39 \n\nРекомендуемый минимальный первичный балл для отбора обучающихся в профильные классы для обучения по образовательным программам среднего общего образования – *26 баллов*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Результаты ОГЭ_ \n➡️ _Перевод первичных баллов ОГЭ в оценки_ \n➡️ _Физика_ \n\n*«2»*: 0\\-9 \n*«3»*: 10\\-19 \n*«4»*: 20\\-29 \n*«5»*: 30\\-39 \n\nРекомендуемый минимальный первичный балл для отбора обучающихся в профильные классы для обучения по образовательным программам среднего общего образования – *26 баллов*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//05.2.4 ХИМИЯ
bot.callbackQuery('0524', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back052');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Результаты ОГЭ_ \n➡️ _Перевод первичных баллов ОГЭ в оценки_ \n➡️ _Химия_ \n\n*«2»*: 0\\-9 \n*«3»*: 10\\-20 \n*«4»*: 21\\-30 \n*«5»*: 31\\-38 \n\nРекомендуемый минимальный первичный балл для отбора обучающихся в профильные классы для обучения по образовательным программам среднего общего образования – *27 баллов*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Результаты ОГЭ_ \n➡️ _Перевод первичных баллов ОГЭ в оценки_ \n➡️ _Химия_ \n\n*«2»*: 0\\-9 \n*«3»*: 10\\-20 \n*«4»*: 21\\-30 \n*«5»*: 31\\-38 \n\nРекомендуемый минимальный первичный балл для отбора обучающихся в профильные классы для обучения по образовательным программам среднего общего образования – *27 баллов*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//05.2.5 БИОЛОГИЯ
bot.callbackQuery('0525', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back052');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Результаты ОГЭ_ \n➡️ _Перевод первичных баллов ОГЭ в оценки_ \n➡️ _Биология_ \n\n*«2»*: 0\\-12 \n*«3»*: 13\\-25 \n*«4»*: 26\\-37 \n*«5»*: 38\\-48 \n\nРекомендуемый минимальный первичный балл для отбора обучающихся в профильные классы для обучения по образовательным программам среднего общего образования – *33 балла*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Результаты ОГЭ_ \n➡️ _Перевод первичных баллов ОГЭ в оценки_ \n➡️ _Биология_ \n\n*«2»*: 0\\-12 \n*«3»*: 13\\-25 \n*«4»*: 26\\-37 \n*«5»*: 38\\-48 \n\nРекомендуемый минимальный первичный балл для отбора обучающихся в профильные классы для обучения по образовательным программам среднего общего образования – *33 балла*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//05.2.6 ГЕОГРАФИЯ
bot.callbackQuery('0526', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back052');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Результаты ОГЭ_ \n➡️ _Перевод первичных баллов ОГЭ в оценки_ \n➡️ _География_ \n\n*«2»*: 0\\-11 \n*«3»*: 12\\-18 \n*«4»*: 19\\-25 \n*«5»*: 26\\-31 \n\nРекомендуемый минимальный первичный балл для отбора обучающихся в профильные классы для обучения по образовательным программам среднего общего образования – *23 балла*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Результаты ОГЭ_ \n➡️ _Перевод первичных баллов ОГЭ в оценки_ \n➡️ _География_ \n\n*«2»*: 0\\-11 \n*«3»*: 12\\-18 \n*«4»*: 19\\-25 \n*«5»*: 26\\-31 \n\nРекомендуемый минимальный первичный балл для отбора обучающихся в профильные классы для обучения по образовательным программам среднего общего образования – *23 балла*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//05.2.7 ОБЩЕСТВОЗНАНИЕ
bot.callbackQuery('0527', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back052');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Результаты ОГЭ_ \n➡️ _Перевод первичных баллов ОГЭ в оценки_ \n➡️ _Обществознание_ \n\n*«2»*: 0\\-13 \n*«3»*: 14\\-23 \n*«4»*: 24\\-31 \n*«5»*: 32\\-37 \n\nРекомендуемый минимальный первичный балл для отбора обучающихся в профильные классы для обучения по образовательным программам среднего общего образования – *29 баллов*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Результаты ОГЭ_ \n➡️ _Перевод первичных баллов ОГЭ в оценки_ \n➡️ _Обществознание_ \n\n*«2»*: 0\\-13 \n*«3»*: 14\\-23 \n*«4»*: 24\\-31 \n*«5»*: 32\\-37 \n\nРекомендуемый минимальный первичный балл для отбора обучающихся в профильные классы для обучения по образовательным программам среднего общего образования – *29 баллов*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//05.2.8 ИСТОРИЯ
bot.callbackQuery('0528', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back052');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Результаты ОГЭ_ \n➡️ _Перевод первичных баллов ОГЭ в оценки_ \n➡️ _История_ \n\n*«2»*: 0\\-10 \n*«3»*: 11\\-20 \n*«4»*: 21\\-29 \n*«5»*: 30\\-37 \n\nРекомендуемый минимальный первичный балл для отбора обучающихся в профильные классы для обучения по образовательным программам среднего общего образования – *26 баллов*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Результаты ОГЭ_ \n➡️ _Перевод первичных баллов ОГЭ в оценки_ \n➡️ _История_ \n\n*«2»*: 0\\-10 \n*«3»*: 11\\-20 \n*«4»*: 21\\-29 \n*«5»*: 30\\-37 \n\nРекомендуемый минимальный первичный балл для отбора обучающихся в профильные классы для обучения по образовательным программам среднего общего образования – *26 баллов*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//05.2.9 ЛИТЕРАТУРА
bot.callbackQuery('0529', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back052');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Результаты ОГЭ_ \n➡️ _Перевод первичных баллов ОГЭ в оценки_ \n➡️ _Литература_ \n\n*«2»*: 0\\-15 \n*«3»*: 16\\-23 \n*«4»*: 24\\-31 \n*«5»*: 32\\-37 \n\nРекомендуемый минимальный первичный балл для отбора обучающихся в профильные классы для обучения по образовательным программам среднего общего образования – *27 баллов*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Результаты ОГЭ_ \n➡️ _Перевод первичных баллов ОГЭ в оценки_ \n➡️ _Литература_ \n\n*«2»*: 0\\-15 \n*«3»*: 16\\-23 \n*«4»*: 24\\-31 \n*«5»*: 32\\-37 \n\nРекомендуемый минимальный первичный балл для отбора обучающихся в профильные классы для обучения по образовательным программам среднего общего образования – *27 баллов*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//05.2.10 ИНФОРМАТИКА
bot.callbackQuery('05210', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back052');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Результаты ОГЭ_ \n➡️ _Перевод первичных баллов ОГЭ в оценки_ \n➡️ _Информатика_ \n\n*«2»*: 0\\-4 \n*«3»*: 5\\-10 \n*«4»*: 11\\-16 \n*«5»*: 17\\-21 \n\nРекомендуемый минимальный первичный балл для отбора обучающихся в профильные классы для обучения по образовательным программам среднего общего образования – *15 баллов*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Результаты ОГЭ_ \n➡️ _Перевод первичных баллов ОГЭ в оценки_ \n➡️ _Информатика_ \n\n*«2»*: 0\\-4 \n*«3»*: 5\\-10 \n*«4»*: 11\\-16 \n*«5»*: 17\\-21 \n\nРекомендуемый минимальный первичный балл для отбора обучающихся в профильные классы для обучения по образовательным программам среднего общего образования – *15 баллов*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//05.2.11 ИНОСТРАННЫЕ ЯЗЫКИ
bot.callbackQuery('05211', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back052');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Результаты ОГЭ_ \n➡️ _Перевод первичных баллов ОГЭ в оценки_ \n➡️ _Иностранные языки_ \n\n*«2»*: 0\\-28 \n*«3»*: 29\\-45 \n*«4»*: 46\\-57 \n*«5»*: 58\\-68 \n\nРекомендуемый минимальный первичный балл для отбора обучающихся в профильные классы для обучения по образовательным программам среднего общего образования – *55 баллов*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Результаты ОГЭ_ \n➡️ _Перевод первичных баллов ОГЭ в оценки_ \n➡️ _Иностранные языки_ \n\n*«2»*: 0\\-28 \n*«3»*: 29\\-45 \n*«4»*: 46\\-57 \n*«5»*: 58\\-68 \n\nРекомендуемый минимальный первичный балл для отбора обучающихся в профильные классы для обучения по образовательным программам среднего общего образования – *55 баллов*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//05.3 КАК УЗНАТЬ РЕЗУЛЬТАТЫ ОГЭ
bot.callbackQuery('053', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back05');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Результаты ОГЭ_ \n➡️ _Как узнать результаты ОГЭ_ \n\n📌 Узнать результаты ОГЭ можно в своей школе или онлайн: \n\n✅ [Портал «Госуслуги»](gosuslugi.ru) \n\n✅ [Ведомственная автоматизированная информационная система «ГИА Тамбовской области»](kk.rcoi68.ru)', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Результаты ОГЭ_ \n➡️ _Как узнать результаты ОГЭ_ \n\n📌 Узнать результаты ОГЭ можно в своей школе или онлайн: \n\n✅ [Портал «Госуслуги»](gosuslugi.ru) \n\n✅ [Ведомственная автоматизированная информационная система «ГИА Тамбовской области»](kk.rcoi68.ru)', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//06 АПЕЛЛЯЦИЯ И ПЕРЕСДАЧА ОГЭ
bot.callbackQuery('06', async (ctx) => {
    await ctx.answerCallbackQuery();
    const OGEsixKeyboard = new InlineKeyboard().text('Что нельзя оспорить?', '061').row().text('Когда подавать апелляцию?', '062').row().text('Всё о пересдаче', '063').row().text('Назад', 'backOge');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Апелляция и пересдача ОГЭ_', {
            reply_markup: OGEsixKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        await ctx.reply('📍 ОГЭ \n\n➡️ _Апелляция и пересдача ОГЭ_', {
            reply_markup: OGEsixKeyboard
        });
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
       
});

//06 АПЕЛЛЯЦИЯ И ПЕРЕСДАЧА ОГЭ (НАЗАД)
bot.callbackQuery('back06', async (ctx) => {
    await ctx.answerCallbackQuery();
    if (previousMessage) {
        // Удаляем клавиатуру из предыдущего сообщения
        await bot.api.editMessageReplyMarkup(
            previousMessage.chat_id,
            previousMessage.message_id,
            undefined
        );
    } else {
        console.log("Нет предыдущего сообщения для удаления клавиатуры.");
    }
    const OGEsixKeyboard = new InlineKeyboard().text('Что нельзя оспорить?', '061').row().text('Когда подавать апелляцию?', '062').row().text('Всё о пересдаче', '063').row().text('Назад', 'backOge');
    await ctx.reply('📍 ОГЭ \n\n➡️ _Апелляция и пересдача ОГЭ_', {
        reply_markup: OGEsixKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
    });
});

//06.1 ЧТО НЕЛЬЗЯ ОСПОРИТЬ?
bot.callbackQuery('061', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back06');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Апелляция и пересдача ОГЭ_ \n➡️ _Что нельзя оспорить?_ \n\n⚠️Апелляционная комиссия *не рассматривает*: \n\n❌ Вопросы о содержании и структуре заданий\\. \n❌ Оценивание заданий с кратким ответом\\. \n❌ Ошибки в заполнении бланков\\. \n❌ Записи в черновиках и КИМ\\. \n❌ Нарушения, допущенные самим участником экзамена\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Апелляция и пересдача ОГЭ_ \n➡️ _Что нельзя оспорить?_ \n\n⚠️Апелляционная комиссия *не рассматривает*: \n\n❌ Вопросы о содержании и структуре заданий\\. \n❌ Оценивание заданий с кратким ответом\\. \n❌ Ошибки в заполнении бланков\\. \n❌ Записи в черновиках и КИМ\\. \n❌ Нарушения, допущенные самим участником экзамена\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//06.2 КОГДА ПОДАВАТЬ АПЕЛЛЯЦИЮ?
bot.callbackQuery('062', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back06');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Апелляция и пересдача ОГЭ_ \n➡️ _Когда подавать апелляцию?_ \n\n🔹 *Апелляция о нарушении порядка проведения экзамена* – подаётся *в день экзамена* члену ГЭК, *не покидая аудиторию*\\. \n🔹 *Апелляция о несогласии с баллами* – подаётся в течение *двух рабочих дней, следующих за* официальным днем объявления результатов экзамена\\. \n\n📌 *Куда и как подавать?* \n\n🔹 В свою *школу* или *организацию*, через которую был допуск к экзамену\\. \n🔹 Можно подать *лично*, через *родителей* или *законных представителей*\\. \n\n🔔 О времени и месте рассмотрения апелляции Вас уведомят не позже, чем *за 1 день до её рассмотрения*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Апелляция и пересдача ОГЭ_ \n➡️ _Когда подавать апелляцию?_ \n\n🔹 *Апелляция о нарушении порядка проведения экзамена* – подаётся *в день экзамена* члену ГЭК, *не покидая аудиторию*\\. \n🔹 *Апелляция о несогласии с баллами* – подаётся в течение *двух рабочих дней, следующих за* официальным днем объявления результатов экзамена\\. \n\n📌 *Куда и как подавать?* \n\n🔹 В свою *школу* или *организацию*, через которую был допуск к экзамену\\. \n🔹 Можно подать *лично*, через *родителей* или *законных представителей*\\. \n\n🔔 О времени и месте рассмотрения апелляции Вас уведомят не позже, чем *за 1 день до её рассмотрения*\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//06.3 ВСЕ О ПЕРЕСДАЧЕ
bot.callbackQuery('063', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back06');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Апелляция и пересдача ОГЭ_ \n➡️ _Всё о пересдаче_ \n\n📌 *В резервные сроки могут пересдать:* \n\n🔸 те, кто не сдал ОГЭ не более чем по двум учебным предметам; \n🔸 те, чьи результаты были аннулированы по решению председателя ГЭК из\\-за нарушений на экзамене, но не по вине участников\\. \n\n📌 *В дополнительные сроки \\(не ранее 1 сентября\\) могут пересдать:* \n\n🔸 те, чьи результаты были аннулированы по решению председателя ГЭК в случае выявления фактов нарушения порядка проведения экзамена самими участниками ОГЭ \\(например, списывание\\); \n🔸 те, кто не сдал ОГЭ более чем по двум предметам, либо не сдал повторно один или два предмета в резервные сроки\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Апелляция и пересдача ОГЭ_ \n➡️ _Всё о пересдаче_ \n\n📌 *В резервные сроки могут пересдать:* \n\n🔸 те, кто не сдал ОГЭ не более чем по двум учебным предметам; \n🔸 те, чьи результаты были аннулированы по решению председателя ГЭК из\\-за нарушений на экзамене, но не по вине участников\\. \n\n📌 *В дополнительные сроки \\(не ранее 1 сентября\\) могут пересдать:* \n\n🔸 те, чьи результаты были аннулированы по решению председателя ГЭК в случае выявления фактов нарушения порядка проведения экзамена самими участниками ОГЭ \\(например, списывание\\); \n🔸 те, кто не сдал ОГЭ более чем по двум предметам, либо не сдал повторно один или два предмета в резервные сроки\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//07 ПОСТУПЛЕНИЕ В 10 КЛАСС/КОЛЛЕДЖ
bot.callbackQuery('07', async (ctx) => {
    await ctx.answerCallbackQuery();
    const OGEsevenKeyboard = new InlineKeyboard().text('Условия поступления в 10 класс', '071').row().text('Отбор в классы с углубленным изучением отдельных предметов', '072').row().text('Отбор в классы профильного обучения', '073').row().text('Условия поступления в колледж', '074').row().text('Назад', 'backOge');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Поступление в 10 класс/колледж_', {
            reply_markup: OGEsevenKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        await ctx.reply('📍 ОГЭ \n\n➡️ _Поступление в 10 класс/колледж_', {
            reply_markup: OGEsevenKeyboard
        });
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
       
});

//07 ПОСТУПЛЕНИЕ В 10 КЛАСС/КОЛЛЕДЖ (НАЗАД)
bot.callbackQuery('back07', async (ctx) => {
    await ctx.answerCallbackQuery();
    if (previousMessage) {
        // Удаляем клавиатуру из предыдущего сообщения
        await bot.api.editMessageReplyMarkup(
            previousMessage.chat_id,
            previousMessage.message_id,
            undefined
        );
    } else {
        console.log("Нет предыдущего сообщения для удаления клавиатуры.");
    }
    const OGEsevenKeyboard = new InlineKeyboard().text('Условия поступления в 10 класс', '071').row().text('Отбор в классы с углубленным изучением отдельных предметов', '072').row().text('Отбор в классы профильного обучения', '073').row().text('Условия поступления в колледж', '074').row().text('Назад', 'backOge');
    await ctx.reply('📍 ОГЭ \n\n➡️ _Поступление в 10 класс/колледж_', {
        reply_markup: OGEsevenKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
    });
});

//07.1 УСЛОВИЯ ПОСТУПЛЕНИЯ В 10 КЛАСС
bot.callbackQuery('071', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back07');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Поступление в 10 класс/колледж_ \n➡️ _Условия поступления в 10 класс_ \n\n📌 Поступление в 10\\-й класс школ Тамбовской области обычно происходит после завершения 9\\-го класса и получения аттестата об основном общем образовании\\. \n\n✅ Для поступления в 10 класс в школы Тамбовской области нужно сдать ОГЭ по 4 предметам\\. \n\n📝 Процедура приема может различаться в зависимости от конкретной школы, поэтому для более точной и конкретной информации обращайтесь непосредственно в интересующую Вас школу и на её сайт\\. \n\n⚠️ Некоторые школы проводят *индивидуальный отбор* учащихся на основе среднего балла аттестата, результатов ОГЭ и других достижений\\. Порядок отбора учащихся и требования определяет сама школа\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Поступление в 10 класс/колледж_ \n➡️ _Условия поступления в 10 класс_ \n\n📌 Поступление в 10\\-й класс школ Тамбовской области обычно происходит после завершения 9\\-го класса и получения аттестата об основном общем образовании\\. \n\n✅ Для поступления в 10 класс в школы Тамбовской области нужно сдать ОГЭ по 4 предметам\\. \n\n📝 Процедура приема может различаться в зависимости от конкретной школы, поэтому для более точной и конкретной информации обращайтесь непосредственно в интересующую Вас школу и на её сайт\\. \n\n⚠️ Некоторые школы проводят *индивидуальный отбор* учащихся на основе среднего балла аттестата, результатов ОГЭ и других достижений\\. Порядок отбора учащихся и требования определяет сама школа\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//07.2 ОТБОР В КЛАССЫ С УГЛУБЛЕННЫМ ИЗУЧЕНИЕМ ОТДЕЛЬНЫХ ПРЕДМЕТОВ
bot.callbackQuery('072', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back07');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Поступление в 10 класс/колледж_ \n➡️ _Отбор в классы с углубленным изучением отдельных предметов_ \n\n📌 Перечень школ, где проводится индивидуальный отбор при приеме либо переводе в классы с *углубленным изучением отдельных предметов*: \n\n🔹 Муниципальное автономное общеобразовательное учреждение средняя общеобразовательная школа №1 – «Школа Сколково – Тамбов»; \n🔹 Муниципальное автономное общеобразовательное учреждение «Средняя общеобразовательная школа № 2»; \n🔹 Муниципальное автономное общеобразовательное учреждение «Лицей № 6»; \n🔹 Муниципальное автономное общеобразовательное учреждение «Гимназия № 7 имени святителя Питирима, епископа Тамбовского»; \n🔹 Муниципальное автономное общеобразовательное учреждение «Гимназия №12 имени Г\\.Р\\. Державина»; \n🔹 Муниципальное автономное общеобразовательное учреждение «Лицей №14 имени Заслуженного учителя Российской Федерации А\\.М\\. Кузьмина»; \n🔹 Муниципальное автономное общеобразовательное учреждение «Лицей №21»; \n🔹 Муниципальное автономное общеобразовательное учреждение «Средняя общеобразовательная школа № 22 имени Героя Российской Федерации Д\\.Е\\. Иванова»; \n🔹 Муниципальное автономное общеобразовательное учреждение «Лицей №28 имени Н\\.А\\. Рябова»; \n🔹 Муниципальное автономное общеобразовательное учреждение «Лицей №29»; \n🔹 Муниципальное автономное общеобразовательное учреждение «Средняя общеобразовательная школа № 36»; \n🔹 Муниципальное бюджетное общеобразовательное учреждение «Цнинская СОШ №1»; \n🔹 Муниципальное бюджетное общеобразовательное учреждение «Цнинская СОШ №2»\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Поступление в 10 класс/колледж_ \n➡️ _Отбор в классы с углубленным изучением отдельных предметов_ \n\n📌 Перечень школ, где проводится индивидуальный отбор при приеме либо переводе в классы с *углубленным изучением отдельных предметов*: \n\n🔹 Муниципальное автономное общеобразовательное учреждение средняя общеобразовательная школа №1 – «Школа Сколково – Тамбов»; \n🔹 Муниципальное автономное общеобразовательное учреждение «Средняя общеобразовательная школа № 2»; \n🔹 Муниципальное автономное общеобразовательное учреждение «Лицей № 6»; \n🔹 Муниципальное автономное общеобразовательное учреждение «Гимназия № 7 имени святителя Питирима, епископа Тамбовского»; \n🔹 Муниципальное автономное общеобразовательное учреждение «Гимназия №12 имени Г\\.Р\\. Державина»; \n🔹 Муниципальное автономное общеобразовательное учреждение «Лицей №14 имени Заслуженного учителя Российской Федерации А\\.М\\. Кузьмина»; \n🔹 Муниципальное автономное общеобразовательное учреждение «Лицей №21»; \n🔹 Муниципальное автономное общеобразовательное учреждение «Средняя общеобразовательная школа № 22 имени Героя Российской Федерации Д\\.Е\\. Иванова»; \n🔹 Муниципальное автономное общеобразовательное учреждение «Лицей №28 имени Н\\.А\\. Рябова»; \n🔹 Муниципальное автономное общеобразовательное учреждение «Лицей №29»; \n🔹 Муниципальное автономное общеобразовательное учреждение «Средняя общеобразовательная школа № 36»; \n🔹 Муниципальное бюджетное общеобразовательное учреждение «Цнинская СОШ №1»; \n🔹 Муниципальное бюджетное общеобразовательное учреждение «Цнинская СОШ №2»\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//07.3 ОТБОР В КЛАССЫ ПРОФИЛЬНОГО ОБУЧЕНИЯ
bot.callbackQuery('073', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back07');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Поступление в 10 класс/колледж_ \n➡️ _Отбор в классы профильного обучения_ \n\n📌 Перечень школ, где проводится индивидуальный отбор при приеме либо переводе в классы *профильного обучения*: \n\n🔸 Муниципальное автономное общеобразовательное учреждение средняя общеобразовательная школа №1 – «Школа Сколково – Тамбов»; \n🔸 Муниципальное автономное общеобразовательное учреждение «Средняя общеобразовательная школа № 2»; \n🔸 Муниципальное автономное общеобразовательное учреждение «Лицей № 6»; \n🔸 Муниципальное автономное общеобразовательное учреждение «Гимназия № 7 имени святителя Питирима, епископа Тамбовского»; \n🔸 Муниципальное автономное общеобразовательное учреждение «Гимназия №12 имени Г\\.Р\\. Державина»; \n🔸 Муниципальное автономное общеобразовательное учреждение «Центр образования № 13 имени Героя Советского Союза Н\\.А\\. Кузнецова»; \n🔸 Муниципальное автономное общеобразовательное учреждение «Лицей №14 имени Заслуженного учителя Российской Федерации А\\.М\\. Кузьмина»; \n🔸 Муниципальное автономное общеобразовательное учреждение «Лицей №21»; \n🔸 Муниципальное автономное общеобразовательное учреждение «Средняя общеобразовательная школа № 22 имени Героя Российской Федерации Д\\.Е\\. Иванова»; \n🔸 Муниципальное автономное общеобразовательное учреждение «Лицей №28 имени Н\\.А\\. Рябова»; \n🔸 Муниципальное автономное общеобразовательное учреждение «Лицей №29»; \n🔸 Муниципальное автономное общеобразовательное учреждение «Средняя общеобразовательная школа № 36»\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Поступление в 10 класс/колледж_ \n➡️ _Отбор в классы профильного обучения_ \n\n📌 Перечень школ, где проводится индивидуальный отбор при приеме либо переводе в классы *профильного обучения*: \n\n🔸 Муниципальное автономное общеобразовательное учреждение средняя общеобразовательная школа №1 – «Школа Сколково – Тамбов»; \n🔸 Муниципальное автономное общеобразовательное учреждение «Средняя общеобразовательная школа № 2»; \n🔸 Муниципальное автономное общеобразовательное учреждение «Лицей № 6»; \n🔸 Муниципальное автономное общеобразовательное учреждение «Гимназия № 7 имени святителя Питирима, епископа Тамбовского»; \n🔸 Муниципальное автономное общеобразовательное учреждение «Гимназия №12 имени Г\\.Р\\. Державина»; \n🔸 Муниципальное автономное общеобразовательное учреждение «Центр образования № 13 имени Героя Советского Союза Н\\.А\\. Кузнецова»; \n🔸 Муниципальное автономное общеобразовательное учреждение «Лицей №14 имени Заслуженного учителя Российской Федерации А\\.М\\. Кузьмина»; \n🔸 Муниципальное автономное общеобразовательное учреждение «Лицей №21»; \n🔸 Муниципальное автономное общеобразовательное учреждение «Средняя общеобразовательная школа № 22 имени Героя Российской Федерации Д\\.Е\\. Иванова»; \n🔸 Муниципальное автономное общеобразовательное учреждение «Лицей №28 имени Н\\.А\\. Рябова»; \n🔸 Муниципальное автономное общеобразовательное учреждение «Лицей №29»; \n🔸 Муниципальное автономное общеобразовательное учреждение «Средняя общеобразовательная школа № 36»\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//07.4 УСЛОВИЯ ПОСТУПЛЕНИЯ В КОЛЛЕДЖ
bot.callbackQuery('074', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back07');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Поступление в 10 класс/колледж_ \n➡️ _Условия поступления в колледж_ \n\n⚠️ Поступление в колледж после 9 класса *зависит от конкурса аттестатов*\\. \n\n🔹 Оценки в аттестате выставляются на основе среднего арифметического годовой отметки и результата ОГЭ по четырем предметам: русский язык, математика и два предмета по выбору\\. \n\n🔹 Эти оценки округляются до целого числа по правилам математики\\. Таким образом, результаты ОГЭ влияют на итоговые оценки в аттестате, а значит, и на шансы поступить в колледж\\. \n\n📌 *Нужно ли сдавать ОГЭ по выбору для поступления в колледжи Тамбовской области?* \n\nДа, нужно\\. Выпускники 9 классов *сдают четыре ОГЭ*: два обязательных \\(русский язык и математика\\) и два по выбору\\. \n\nВ 2025 году в 12 регионах России проходит эксперимент, где для поступления в колледж достаточно сдать только два обязательных ОГЭ\\. Однако Тамбовская область в этот эксперимент не входит, поэтому здесь действуют общие правила\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Поступление в 10 класс/колледж_ \n➡️ _Условия поступления в колледж_ \n\n⚠️ Поступление в колледж после 9 класса *зависит от конкурса аттестатов*\\. \n\n🔹 Оценки в аттестате выставляются на основе среднего арифметического годовой отметки и результата ОГЭ по четырем предметам: русский язык, математика и два предмета по выбору\\. \n\n🔹 Эти оценки округляются до целого числа по правилам математики\\. Таким образом, результаты ОГЭ влияют на итоговые оценки в аттестате, а значит, и на шансы поступить в колледж\\. \n\n📌 *Нужно ли сдавать ОГЭ по выбору для поступления в колледжи Тамбовской области?* \n\nДа, нужно\\. Выпускники 9 классов *сдают четыре ОГЭ*: два обязательных \\(русский язык и математика\\) и два по выбору\\. \n\nВ 2025 году в 12 регионах России проходит эксперимент, где для поступления в колледж достаточно сдать только два обязательных ОГЭ\\. Однако Тамбовская область в этот эксперимент не входит, поэтому здесь действуют общие правила\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//08 СОВЕТЫ ДЛЯ РОДИТЕЛЕЙ И ВЫПУСКНИКОВ
bot.callbackQuery('08', async (ctx) => {
    await ctx.answerCallbackQuery();
    const OGEeightKeyboard = new InlineKeyboard().text('Советы выпускникам', '081').row().text('Советы родителям', '082').row().text('Назад', 'backOge');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Советы для родителей и выпускников_', {
            reply_markup: OGEeightKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        await ctx.reply('📍 ОГЭ \n\n➡️ _Советы для родителей и выпускников_', {
            reply_markup: OGEeightKeyboard
        });
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
       
});

//08 СОВЕТЫ ДЛЯ РОДИТЕЛЕЙ И ВЫПУСКНИКОВ (НАЗАД)
bot.callbackQuery('back08', async (ctx) => {
    await ctx.answerCallbackQuery();
    if (previousMessage) {
        // Удаляем клавиатуру из предыдущего сообщения
        await bot.api.editMessageReplyMarkup(
            previousMessage.chat_id,
            previousMessage.message_id,
            undefined
        );
    } else {
        console.log("Нет предыдущего сообщения для удаления клавиатуры.");
    }
    const OGEeightKeyboard = new InlineKeyboard().text('Советы выпускникам', '081').row().text('Советы родителям', '082').row().text('Назад', 'backOge');
    await ctx.reply('📍 ОГЭ \n\n➡️ _Советы для родителей и выпускников_', {
        reply_markup: OGEeightKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
    });
});

//08.1 СОВЕТЫ ВЫПУСКНИКАМ
bot.callbackQuery('081', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back08');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Советы для родителей и выпускников_ \n➡️ _Советы выпускникам_ \n\n📌 *Сдача ОГЭ* — важный этап, который поможет вам определиться с будущим: поступить в колледж, перейти в 10 класс или выбрать профессию, поэтому: \n\n*1\\. Определитесь с целями* \n\n🔹 Если Вы хотите *поступить в колледж*, узнайте, какие баллы нужны для выбранной специальности\\. \n🔹 Если планируете *пойти в 10 класс*, уточните в своей школе, какие предметы требуются для перевода\\. \n🔹 Если Вы еще не определились с профессией, выбирайте предметы по интересам — это поможет понять, в какой области Вам комфортнее развиваться\\. \n\n*2\\. Готовьтесь заранее* \n\n🔸 Начните подготовку как можно раньше\\. Составьте план занятий и регулярно повторяйте материал\\. \n🔸 Используйте открытые задания ОГЭ на сайте ФИПИ — они помогут понять структуру экзамена и потренироваться\\. \n\n*3\\. Выбирайте предметы с умом* \n\n🔹 Если вы уже знаете, куда хотите поступать, выбирайте предметы, которые будут полезны для вашей будущей профессии, а не те, которые легче сдать\\. Например: \n   *Медицина, биология* — химия и биология\\. \n   *IT\\-сфера* — информатика и математика\\. \n   *Гуманитарные науки* — история, обществознание, литература, иностранный язык\\. \n🔹 Если пока не определились, выбирайте то, что Вам интересно и что лучше получается\\. \n\n*4\\. Используйте ОГЭ как возможность узнать себя* \n\n🔸 ОГЭ — это не только экзамен, но и шанс понять, какие предметы Вам ближе\\. Если у Вас хорошо с определенным предметом, это может стать подсказкой для выбора профессии\\. \n\n*5\\. Не переживайте из\\-за ошибок* \n\n🔹 Ошибки — это нормально\\. Они помогают понять, над чем нужно работать\\. \n🔹 Если что\\-то не получилось с первого раза, у вас всегда есть возможность пересдать\\. \n\n*6\\. Думайте о будущем* \n\n🔸 Если вы хотите *поступить в колледж*, узнайте, какие специальности востребованы в вашем регионе\\. Поговорите с родителями, учителями или посетите дни открытых дверей в колледжах\\. \n🔸 Если вы идете в *10 класс*, подумайте, какой профиль \\(гуманитарный, технический, естественно\\-научный и т\\.д\\.\\) Вам подходит\\. Это поможет углубленно изучать предметы, которые пригодятся для поступления в вуз\\. \n\n*7\\. Не забывайте отдыхать* \n\n🔹 Подготовка к экзаменам — это важно, но не забывайте про отдых и сон\\. Переутомление только снизит Вашу продуктивность\\. \
\n🔹 Найдите время для хобби и общения с друзьями — это поможет снять стресс\\. \n\n*8\\. Верьте в себя* \n\n🔸 ОГЭ — это не конец света, а всего лишь этап\\. Даже если что\\-то пойдет не так, у вас всегда есть возможность исправить ситуацию\\. \n🔸 Помните, что экзамены — это не только про оценки, но и про Ваш опыт и развитие\\. \n\n*Удачи на ОГЭ\\! Вы справитесь\\!* 😊', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Советы для родителей и выпускников_ \n➡️ _Советы выпускникам_ \n\n📌 *Сдача ОГЭ* — важный этап, который поможет вам определиться с будущим: поступить в колледж, перейти в 10 класс или выбрать профессию, поэтому: \n\n*1\\. Определитесь с целями* \n\n🔹 Если Вы хотите *поступить в колледж*, узнайте, какие баллы нужны для выбранной специальности\\. \n🔹 Если планируете *пойти в 10 класс*, уточните в своей школе, какие предметы требуются для перевода\\. \n🔹 Если Вы еще не определились с профессией, выбирайте предметы по интересам — это поможет понять, в какой области Вам комфортнее развиваться\\. \n\n*2\\. Готовьтесь заранее* \n\n🔸 Начните подготовку как можно раньше\\. Составьте план занятий и регулярно повторяйте материал\\. \n🔸 Используйте открытые задания ОГЭ на сайте ФИПИ — они помогут понять структуру экзамена и потренироваться\\. \n\n*3\\. Выбирайте предметы с умом* \n\n🔹 Если вы уже знаете, куда хотите поступать, выбирайте предметы, которые будут полезны для вашей будущей профессии, а не те, которые легче сдать\\. Например: \n   *Медицина, биология* — химия и биология\\. \n   *IT\\-сфера* — информатика и математика\\. \n   *Гуманитарные науки* — история, обществознание, литература, иностранный язык\\. \n🔹 Если пока не определились, выбирайте то, что Вам интересно и что лучше получается\\. \n\n*4\\. Используйте ОГЭ как возможность узнать себя* \n\n🔸 ОГЭ — это не только экзамен, но и шанс понять, какие предметы Вам ближе\\. Если у Вас хорошо с определенным предметом, это может стать подсказкой для выбора профессии\\. \n\n*5\\. Не переживайте из\\-за ошибок* \n\n🔹 Ошибки — это нормально\\. Они помогают понять, над чем нужно работать\\. \n🔹 Если что\\-то не получилось с первого раза, у вас всегда есть возможность пересдать\\. \n\n*6\\. Думайте о будущем* \n\n🔸 Если вы хотите *поступить в колледж*, узнайте, какие специальности востребованы в вашем регионе\\. Поговорите с родителями, учителями или посетите дни открытых дверей в колледжах\\. \n🔸 Если вы идете в *10 класс*, подумайте, какой профиль \\(гуманитарный, технический, естественно\\-научный и т\\.д\\.\\) Вам подходит\\. Это поможет углубленно изучать предметы, которые пригодятся для поступления в вуз\\. \n\n*7\\. Не забывайте отдыхать* \n\n🔹 Подготовка к экзаменам — это важно, но не забывайте про отдых и сон\\. Переутомление только снизит Вашу продуктивность\\. \
\n🔹 Найдите время для хобби и общения с друзьями — это поможет снять стресс\\. \n\n*8\\. Верьте в себя* \n\n🔸 ОГЭ — это не конец света, а всего лишь этап\\. Даже если что\\-то пойдет не так, у вас всегда есть возможность исправить ситуацию\\. \n🔸 Помните, что экзамены — это не только про оценки, но и про Ваш опыт и развитие\\. \n\n*Удачи на ОГЭ\\! Вы справитесь\\!* 😊', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//08.2 СОВЕТЫ РОДИТЕЛЯМ
bot.callbackQuery('082', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back08');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Советы для родителей и выпускников_ \n➡️ _Советы родителям_ \n\n📌 Приближается пора экзаменов\\. Федеральная служба по надзору в сфере образования и науки совместно с психологом и педагогом Анной Быковой даёт несколько полезных советов, как поддержать школьника во время подготовки к ОГЭ и ЕГЭ\\. \n\n🔸 *Организация режима дня* \n\nНе забывайте о балансе: ребёнок должен *не только готовиться к экзаменам*, но и *достаточно спать и гулять* на свежем воздухе\\. \nТакже изученный материал запоминается ещё лучше, если повторить его перед сном\\. \nНо если после повторения выпускник не лег спать, пошёл на «тусовку» или забил информацию эмоциональными событиями и разговорами, то утром нужного эффекта не будет\\. \n\n🔸 *Индивидуальные особенности* \n\nПомните, что ваш ребёнок — уникальный, да и все дети разные\\. Одни учат материал неспешно, с начала года до самих экзаменов, другие быстро схватывают информацию в короткие сроки\\. \nКаждый из таких выпускников может успешно справиться с ЕГЭ и ОГЭ\\. Можно рассказать ребёнку *о различных способах запоминания, приёмах мнемотехники*\\. \n\n🔸 *Не заменяйте учителя* \n\nНе становитесь для ребёнка учителем, даже если сами хорошо разбираетесь в предмете\\. Это другая роль, которая может сильно подпортить отношения\\. \nБывает, что в выпускном классе все общение детей и родителей сводится к теме экзаменов\\. Родители наседают, требуют, контролируют, проверяют\\. Это очень выматывает обе стороны и провоцирует ссоры\\. \nПроцесс подготовки к экзаменам лучше *переложить на плечи профессионалов*\\. \n\n🔸 *Обсудите план* \n\nВсе планы по покорению лучших вузов и подготовке к экзаменам стоит согласовывать с самим ребёнком\\. Хорошо, когда у вас есть план А, план B и план C\\. \nУ детей бывает *линейное восприятие*: они нарисовали у себя в голове одну стратегию и не видят другого пути\\. \n*Задача родителей* – показать разнообразие вариантов\\. Дорога к мечте не всегда бывает прямой\\. К желанной цели есть сотни разных путей, и нужно помочь ребёнку их увидеть\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Советы для родителей и выпускников_ \n➡️ _Советы выпускникам_ \n\n📌 Приближается пора экзаменов\\. Федеральная служба по надзору в сфере образования и науки совместно с психологом и педагогом Анной Быковой даёт несколько полезных советов, как поддержать школьника во время подготовки к ОГЭ и ЕГЭ\\. \n\n🔸 *Организация режима дня* \n\nНе забывайте о балансе: ребёнок должен *не только готовиться к экзаменам*, но и *достаточно спать и гулять* на свежем воздухе\\. \nТакже изученный материал запоминается ещё лучше, если повторить его перед сном\\. \nНо если после повторения выпускник не лег спать, пошёл на «тусовку» или забил информацию эмоциональными событиями и разговорами, то утром нужного эффекта не будет\\. \n\n🔸 *Индивидуальные особенности* \n\nПомните, что ваш ребёнок — уникальный, да и все дети разные\\. Одни учат материал неспешно, с начала года до самих экзаменов, другие быстро схватывают информацию в короткие сроки\\. \nКаждый из таких выпускников может успешно справиться с ЕГЭ и ОГЭ\\. Можно рассказать ребёнку *о различных способах запоминания, приёмах мнемотехники*\\. \n\n🔸 *Не заменяйте учителя* \n\nНе становитесь для ребёнка учителем, даже если сами хорошо разбираетесь в предмете\\. Это другая роль, которая может сильно подпортить отношения\\. \nБывает, что в выпускном классе все общение детей и родителей сводится к теме экзаменов\\. Родители наседают, требуют, контролируют, проверяют\\. Это очень выматывает обе стороны и провоцирует ссоры\\. \nПроцесс подготовки к экзаменам лучше *переложить на плечи профессионалов*\\. \n\n🔸 *Обсудите план* \n\nВсе планы по покорению лучших вузов и подготовке к экзаменам стоит согласовывать с самим ребёнком\\. Хорошо, когда у вас есть план А, план B и план C\\. \nУ детей бывает *линейное восприятие*: они нарисовали у себя в голове одну стратегию и не видят другого пути\\. \n*Задача родителей* – показать разнообразие вариантов\\. Дорога к мечте не всегда бывает прямой\\. К желанной цели есть сотни разных путей, и нужно помочь ребёнку их увидеть\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//09 ОГЭ ДЛЯ ОБУЧАЮЩИХСЯ С ОВЗ, ДЕТЕЙ -ИНВАЛИДОВ И ИНВАЛИДОВ
bot.callbackQuery('09', async (ctx) => {
    await ctx.answerCallbackQuery();
    const OGEnineKeyboard = new InlineKeyboard().text('Итоговое собеседование по русскому языку', '091').row().text('Участие в ОГЭ и подача заявления', '092').row().text('Условия проведения и продолжительность экзамена', '093').row().text('Назад', 'backOge');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        await ctx.editMessageText('📍 ОГЭ \n\n➡️ _ОГЭ для обучающихся с ограниченными возможностями здоровья, детей–инвалидов и инвалидов_', {
            reply_markup: OGEnineKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        await ctx.reply('📍 ОГЭ \n\n➡️ _ОГЭ для обучающихся с ограниченными возможностями здоровья, детей–инвалидов и инвалидов_', {
            reply_markup: OGEnineKeyboard
        });
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
       
});

//09 ОГЭ ДЛЯ ОБУЧАЮЩИХСЯ С ОВЗ, ДЕТЕЙ -ИНВАЛИДОВ И ИНВАЛИДОВ (НАЗАД)
bot.callbackQuery('back09', async (ctx) => {
    await ctx.answerCallbackQuery();
    if (previousMessage) {
        // Удаляем клавиатуру из предыдущего сообщения
        await bot.api.editMessageReplyMarkup(
            previousMessage.chat_id,
            previousMessage.message_id,
            undefined
        );
    } else {
        console.log("Нет предыдущего сообщения для удаления клавиатуры.");
    }
    const OGEnineKeyboard = new InlineKeyboard().text('Итоговое собеседование по русскому языку', '091').row().text('Участие в ОГЭ и подача заявления', '092').row().text('Условия проведения и продолжительность экзамена', '093').row().text('Назад', 'backOge');
    await ctx.reply('📍 ОГЭ \n\n➡️ _ОГЭ для обучающихся с ограниченными возможностями здоровья, детей–инвалидов и инвалидов_', {
        reply_markup: OGEnineKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
    });
});

//09.1 ИТОГОВОЕ СОБЕСЕДОВАНИЕ ПО РУССКОМУ ЯЗЫКУ
bot.callbackQuery('091', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back09');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _ОГЭ для обучающихся с ограниченными возможностями здоровья, детей–инвалидов и инвалидов_ \n➡️ _Итоговое собеседование по русскому языку_ \n\n📌 *Итоговое собеседование* по русскому языку — *обязательное* условие для допуска к ОГЭ для всех девятиклассников\\. \n\nУчастники с ограниченными возможностями здоровья \\(ОВЗ\\), дети\\-инвалиды и инвалиды также участвуют в собеседовании\\. \n\nДля этого при подаче заявления нужно предоставить документы: рекомендации ПМПК \\(для лиц с ОВЗ\\) или справку об инвалидности \\(для детей\\-инвалидов и инвалидов\\)\\. \n\n📌 Для участников с особыми потребностями *создаются специальные условия*: \n\n🔹 *Слабослышащие*: аудитории оборудуются звукоусиливающей аппаратурой, при необходимости привлекается сурдопереводчик\\. \n🔹 *Глухие*: предоставляется ассистент\\-сурдопереводчик\\. \n🔹 *Слепые*: задания оформляются шрифтом Брайля или в электронном виде\\. \n🔹 *Слабовидящие*: задания увеличиваются, используются лупы и дополнительное освещение\\. \n🔹 *С расстройствами аутистического спектра*: собеседником может быть знакомый педагог, психолог или дефектолог\\. \n🔹 *С нарушениями опорно\\-двигательного аппарата*: разрешается использование компьютера со специализированным ПО\\. \n\nДля участников, которые не могут выполнить все задания из\\-за особенностей здоровья, ОИВ устанавливает минимальное количество баллов для зачета, отличное от общего\\. Основанием для этого являются рекомендации ПМПК\\. \n\n🔗 [Более подробно…](https://obrnadzor.gov.ru/gia/gia-9/uchastniki-gia-9-s-ovz-deti-invalidy-i-invalidy/)', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _ОГЭ для обучающихся с ограниченными возможностями здоровья, детей–инвалидов и инвалидов_ \n➡️ _Итоговое собеседование по русскому языку_ \n\n📌 *Итоговое собеседование* по русскому языку — *обязательное* условие для допуска к ОГЭ для всех девятиклассников\\. \n\nУчастники с ограниченными возможностями здоровья \\(ОВЗ\\), дети\\-инвалиды и инвалиды также участвуют в собеседовании\\. \n\nДля этого при подаче заявления нужно предоставить документы: рекомендации ПМПК \\(для лиц с ОВЗ\\) или справку об инвалидности \\(для детей\\-инвалидов и инвалидов\\)\\. \n\n📌 Для участников с особыми потребностями *создаются специальные условия*: \n\n🔹 *Слабослышащие*: аудитории оборудуются звукоусиливающей аппаратурой, при необходимости привлекается сурдопереводчик\\. \n🔹 *Глухие*: предоставляется ассистент\\-сурдопереводчик\\. \n🔹 *Слепые*: задания оформляются шрифтом Брайля или в электронном виде\\. \n🔹 *Слабовидящие*: задания увеличиваются, используются лупы и дополнительное освещение\\. \n🔹 *С расстройствами аутистического спектра*: собеседником может быть знакомый педагог, психолог или дефектолог\\. \n🔹 *С нарушениями опорно\\-двигательного аппарата*: разрешается использование компьютера со специализированным ПО\\. \n\nДля участников, которые не могут выполнить все задания из\\-за особенностей здоровья, ОИВ устанавливает минимальное количество баллов для зачета, отличное от общего\\. Основанием для этого являются рекомендации ПМПК\\. \n\n🔗 [Более подробно…](https://obrnadzor.gov.ru/gia/gia-9/uchastniki-gia-9-s-ovz-deti-invalidy-i-invalidy/)', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//09.2 УЧАСТИЕ В ОГЭ И ПОДАЧА ЗАЯВЛЕНИЯ
bot.callbackQuery('092', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back09');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _ОГЭ для обучающихся с ограниченными возможностями здоровья, детей–инвалидов и инвалидов_ \n➡️ _Участие в ОГЭ и подача заявления_ \n\nУчастники с ограниченными возможностями здоровья \\(ОВЗ\\), дети\\-инвалиды и инвалиды могут сдавать ОГЭ по желанию\\. \n\n📌 *Выбор предметов* \n\nУчастники могут сдавать только обязательные предметы \\(русский язык и математика\\) или выбрать четыре предмета \\(два обязательных и два по выбору\\)\\. \n\n📌 *Подача заявления* \n\nПри подаче заявления необходимо предоставить: \n🔸 Участникам с ОВЗ — копию рекомендаций ПМПК\\. \n🔸 Детям\\-инвалидам и инвалидам — справку об инвалидности и рекомендации ПМПК\\. \n\nВ заявлении указываются специальные условия, необходимые для сдачи экзаменов с учетом состояния здоровья\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _ОГЭ для обучающихся с ограниченными возможностями здоровья, детей–инвалидов и инвалидов_ \n➡️ _Участие в ОГЭ и подача заявления_ \n\nУчастники с ограниченными возможностями здоровья \\(ОВЗ\\), дети\\-инвалиды и инвалиды могут сдавать ОГЭ по желанию\\. \n\n📌 *Выбор предметов* \n\nУчастники могут сдавать только обязательные предметы \\(русский язык и математика\\) или выбрать четыре предмета \\(два обязательных и два по выбору\\)\\. \n\n📌 *Подача заявления* \n\nПри подаче заявления необходимо предоставить: \n🔸 Участникам с ОВЗ — копию рекомендаций ПМПК\\. \n🔸 Детям\\-инвалидам и инвалидам — справку об инвалидности и рекомендации ПМПК\\. \n\nВ заявлении указываются специальные условия, необходимые для сдачи экзаменов с учетом состояния здоровья\\.', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//09.3 УСЛОВИЯ ПРОВЕДЕНИЯ И ПРОДОЛЖИТЕЛЬНОСТЬ ЭКЗАМЕНА
bot.callbackQuery('093', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'back09');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _ОГЭ для обучающихся с ограниченными возможностями здоровья, детей–инвалидов и инвалидов_ \n➡️ _Условия проведения и продолжительность экзамена_ \n\nДля участников с ОВЗ, детей\\-инвалидов и инвалидов создаются особые условия\\. \n\n📌 *Увеличение времени:*  \n\n🔹 На 30 минут для итогового собеседования и устных ответов на ОГЭ по иностранным языкам\\. \n🔹 На 1,5 часа для экзаменов по предметам\\. \n\n📌 *Дополнительные условия:* \n\n🔸 Ассистенты для помощи в передвижении, чтении заданий и заполнении бланков\\. \n🔸 Звукоусиливающая аппаратура для слабослышащих\\. \n🔸 Сурдопереводчики для глухих и слабослышащих\\. \n🔸 Задания шрифтом Брайля или в электронном виде для слепых\\. \n🔸 Увеличенные материалы и увеличительные устройства для слабовидящих\\. \n🔸 Возможность выполнения письменной работы на компьютере\\. \n\nЭти условия обеспечиваются на основании рекомендаций ПМПК и справок об инвалидности\\. \n\n🔗 [Более подробно…](https://obrnadzor.gov.ru/gia/gia-9/uchastniki-gia-9-s-ovz-deti-invalidy-i-invalidy/)', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _ОГЭ для обучающихся с ограниченными возможностями здоровья, детей–инвалидов и инвалидов_ \n➡️ _Условия проведения и продолжительность экзамена_ \n\nДля участников с ОВЗ, детей\\-инвалидов и инвалидов создаются особые условия\\. \n\n📌 *Увеличение времени:*  \n\n🔹 На 30 минут для итогового собеседования и устных ответов на ОГЭ по иностранным языкам\\. \n🔹 На 1,5 часа для экзаменов по предметам\\. \n\n📌 *Дополнительные условия:* \n\n🔸 Ассистенты для помощи в передвижении, чтении заданий и заполнении бланков\\. \n🔸 Звукоусиливающая аппаратура для слабослышащих\\. \n🔸 Сурдопереводчики для глухих и слабослышащих\\. \n🔸 Задания шрифтом Брайля или в электронном виде для слепых\\. \n🔸 Увеличенные материалы и увеличительные устройства для слабовидящих\\. \n🔸 Возможность выполнения письменной работы на компьютере\\. \n\nЭти условия обеспечиваются на основании рекомендаций ПМПК и справок об инвалидности\\. \n\n🔗 [Более подробно…](https://obrnadzor.gov.ru/gia/gia-9/uchastniki-gia-9-s-ovz-deti-invalidy-i-invalidy/)', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//010 ПРАВИЛА ЗАПОЛНЕНИЯ БЛАНКОВ ОГЭ
bot.callbackQuery('010', async (ctx) => {
    await ctx.answerCallbackQuery();
    const InlineMenuKeyboard = new InlineKeyboard().text('ОГЭ', 'OGE').text('ЕГЭ', 'EGE').row().text('Назад', 'OGE');
    //const essayKeyboard = new InlineKeyboard().text('Назад', '1');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        const sentMessage = await ctx.editMessageText('📍 ОГЭ \n\n➡️ _Правила заполнения бланков ОГЭ_ \n\n*Перед экзаменами обязательно ознакомьтесь с правилами заполнения бланков:* \n\n🖊 Заполняйте бланки только чёрной гелевой или капиллярной ручкой\\. \n🔠 Пишите разборчиво, печатными заглавными буквами, строго по образцу\\. \n📌 Начинайте с первой клеточки, не выходите за поля\\. \n🚫 Не используйте корректоры, не рисуйте и не делайте пометок вне полей\\. \n✍️ Ошибки исправляйте в специально отведённых полях\\. \n\n📚 Полные правила: [ссылка](https://shkolatatanovo.gosuslugi.ru/netcat_files/userfiles/2/GIA_2025/Obschaya/Pravila_zapolneniya_blankov_OGE_2025.pdf)', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        const sentMessage = await ctx.reply('📍 ОГЭ \n\n➡️ _Правила заполнения бланков ОГЭ_ \n\n*Перед экзаменами обязательно ознакомьтесь с правилами заполнения бланков:* \n\n🖊 Заполняйте бланки только чёрной гелевой или капиллярной ручкой\\. \n🔠 Пишите разборчиво, печатными заглавными буквами, строго по образцу\\. \n📌 Начинайте с первой клеточки, не выходите за поля\\. \n🚫 Не используйте корректоры, не рисуйте и не делайте пометок вне полей\\. \n✍️ Ошибки исправляйте в специально отведённых полях\\. \n\n📚 Полные правила: [ссылка](https://shkolatatanovo.gosuslugi.ru/netcat_files/userfiles/2/GIA_2025/Obschaya/Pravila_zapolneniya_blankov_OGE_2025.pdf)', {
            //reply_markup: essayKeyboard
            reply_markup: InlineMenuKeyboard, parse_mode: 'MarkdownV2', disable_web_page_preview: true
        });
        previousMessage = {
            chat_id: sentMessage.chat.id,
            message_id: sentMessage.message_id,
        }
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//НАЗАД ОГЭ
bot.callbackQuery('backOge', async (ctx) => {
    await ctx.answerCallbackQuery();
    const OGEKeyboard = new InlineKeyboard().text('1', '01').text('2', '02').text('3', '03').text('4', '04').text('5', '05').row().text('6', '06').text('7', '07').text('8', '08').text('9', '09').text('10', '010');
    try {
        // Редактируем предыдущее сообщение, заменяя его новым текстом и клавиатурой
        await ctx.editMessageText('Вы выбрали ОГЭ🔥 \n\nЧто вас интересует? \n\n1️⃣ Допуск к ОГЭ и регистрация на экзамен\n2️⃣ Расписание ОГЭ 2025\n3️⃣ Подготовка к ОГЭ\n4️⃣ Правила и требования на экзамене \n5️⃣ Результаты ОГЭ  \n6️⃣ Апелляция и пересдача ОГЭ \n7️⃣ Поступление в 10 класс/колледж \n8️⃣ Советы для родителей и выпускников\n9⃣ ОГЭ для обучающихся с ограниченными возможностями здоровья, детей–инвалидов и инвалидов \n🔟 Правила заполнения бланков ОГЭ', {
            reply_markup: OGEKeyboard
        });
    } catch (error) {
        console.error('Ошибка при редактировании сообщения:', error);
        // Если редактирование не удалось (например, сообщение слишком старое),
        // можно отправить новое сообщение и удалить старое.
        await ctx.reply('Вы выбрали ОГЭ🔥 \n\nЧто вас интересует? \n\n1️⃣ Допуск к ОГЭ и регистрация на экзамен\n2️⃣ Расписание ОГЭ 2025\n3️⃣ Подготовка к ОГЭ\n4️⃣ Правила и требования на экзамене \n5️⃣ Результаты ОГЭ  \n6️⃣ Апелляция и пересдача ОГЭ \n7️⃣ Поступление в 10 класс/колледж \n8️⃣ Советы для родителей и выпускников\n9⃣ ОГЭ для обучающихся с ограниченными возможностями здоровья, детей–инвалидов и инвалидов \n🔟 Правила заполнения бланков ОГЭ', {
            reply_markup: OGEKeyboard
        });
        //  Попытка удалить исходное сообщение (не всегда срабатывает из-за ограничений API)
        // await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
    
});

//НАПОМИНАНИЕ!
/*bot.on('message', async (ctx) => {
    await ctx.reply('❗Дорогой друг, напоминаю, что *до 1 февраля* нужно подать заявление на регистрацию для участия в ЕГЭ🕑 \n\n*После 1 февраля* подать заявление уже нельзя, а также *нельзя* добавить и/или изменить предметы\\!', {
        parse_mode: 'MarkdownV2'
    });
});*/

bot.catch((err) => {
    const ctx = err.ctx;
    console.error('Error while handling update ${ctx.update.update_id}:');
    const e = err.error;
    if (e instanceof GrammyError) {
        console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
        console.error("Could not contact Telegram:", e);
    } else {
        console.error("Unknown error:", e);
    }
});

bot.start();