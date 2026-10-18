// Данные о владельце портфолио — показываются в шапке, на главной и в контактах.
window.OWNER = {
    name: "Захар Белолугов",
    role: "Веб-разработчик",
    about: "Делаю сайты на HTML, CSS, Vue, React — от лендингов до портфолио для художников и студий, а также мини-приложения для Telegram.",
    // Форма «Связаться» отправляется через Web3Forms: письма приходят на почту, к которой привязан ключ.
    // Ключ берётся на https://web3forms.com (его можно хранить в открытом виде).
    // Пустой ключ — форма просто откроет почтовый клиент (mailto).
    formEndpoint: "https://api.web3forms.com/submit",
    formAccessKey: "d9b3a632-1550-4d73-8122-90b2125dd14a",
    email: "belolugovz@gmail.com",
    contacts: [
        { label: "Email", href: "mailto:belolugovz@gmail.com", text: "belolugovz@gmail.com" },
        { label: "Telegram", href: "https://t.me/zak1real", text: "@zak1real" },
        { label: "GitHub", href: "https://github.com/zak1real", text: "github.com/zak1real" }
    ]
};

// Проекты. Порядок в массиве = порядок на сайте.
// type: раздел на главной — "site" (по умолчанию) или "telegram".
// status: "done" — готовый проект-пример, "wip" — ещё в разработке.
// gallery: src — скриншот десктопа, mobile — скриншот телефона (необязательно, показывается рядом в рамке телефона).
//          Кадры только с mobile (без src) выводятся рядом в ряд телефонов; если у проекта нет cover,
//          обложкой карточки становятся первые три таких кадра.
window.PROJECTS = [
    {
        slug: "5treet-justies",
        title: "Nikita Shvarnukov",
        subtitle: "Сайт-портфолио художника",
        year: "2026",
        status: "wip",
        cover: "assets/5treet-index.jpg",
        gallery: [
            { src: "assets/5treet-index.jpg", mobile: "assets/5treet-index-m.jpg", caption: "Главная: полноэкранное видео-обложка" },
            { src: "assets/5treet-series.jpg", mobile: "assets/5treet-series-m.jpg", caption: "Страница серии работ" },
            { src: "assets/5treet-about.jpg", mobile: "assets/5treet-about-m.jpg", caption: "Биография художника" }
        ],
        description: [
            "Минималистичный монохромный сайт для художника Никиты Шварнукова (команда Lovemarket): видео-обложка на главной, разделы с сериями работ, выставками, биографией и контактами.",
            "Сайт написан без фреймворков и сборки. Серии и работы хранятся в одном JS-файле с данными, страницы списка и отдельной серии собираются из него автоматически — чтобы добавить работу, не нужно трогать вёрстку."
        ],
        role: "Дизайн и вёрстка, адаптив, мобильное меню",
        stack: ["HTML", "CSS", "JavaScript"],
        links: {
            demo: "",
            code: ""
        }
    },
    {
        slug: "wallie-skateshop",
        title: "WallieSkateshop",
        subtitle: "Интернет-магазин скейтшопа",
        year: "2026",
        status: "done",
        cover: "assets/skateshop-index.jpg",
        gallery: [
            { src: "assets/skateshop-index.jpg", mobile: "assets/skateshop-index-m.jpg", caption: "Главная: баннеры и лента новинок" },
            { src: "assets/skateshop-catalog.jpg", mobile: "assets/skateshop-catalog-m.jpg", caption: "Каталог с фильтрами по брендам, размерам и цене" },
            { src: "assets/skateshop-product.jpg", mobile: "assets/skateshop-product-m.jpg", caption: "Карточка товара с выбором размера" }
        ],
        description: [
            "Учебный интернет-магазин скейтшопа: главная с баннерами и подборками, каталог, карточки товаров, корзина и страница о магазине.",
            "Каталог целиком задаётся параметрами в адресе — фильтры, поиск и сортировку можно сохранить или отправить ссылкой. Корзина хранится в localStorage, товары, бренды и категории — в одном файле с данными, меню и фильтры собираются из него автоматически."
        ],
        role: "Дизайн и вёрстка, каталог с фильтрами, корзина",
        stack: ["HTML", "CSS", "JavaScript", "localStorage"],
        links: {
            demo: "",
            code: ""
        }
    },
    {
        slug: "dimzerz",
        title: "Dimzerz",
        subtitle: "Сайт скейт-оператора и филмера",
        year: "2026",
        status: "done",
        cover: "assets/dimzerz-index.jpg",
        gallery: [
            { src: "assets/dimzerz-index.jpg", mobile: "assets/dimzerz-index-m.jpg", caption: "Обложка с фоновым видео и рассказом об авторе" },
            { src: "assets/dimzerz-projects.jpg", mobile: "assets/dimzerz-projects-m.jpg", caption: "Главные видеопроекты и релизы" },
            { src: "assets/dimzerz-video.jpg", mobile: "assets/dimzerz-video-m.jpg", caption: "Плейлист видео с YouTube" },
            { src: "assets/dimzerz-photo.jpg", mobile: "assets/dimzerz-photo-m.jpg", caption: "Слайдер фото и блок донатов" }
        ],
        description: [
            "Сайт-портфолио скейт-оператора Dimzerz (Дмитрий Забозлаев), перенесённый с Tilda на чистый код: обложка с фоновым видео, главные видеопроекты, плейлист, фото и блок поддержки автора.",
            "Ролики с YouTube показываются превью с кнопкой Play, а плеер загружается только по клику — страница открывается быстрее. Плейлист и кнопки доната собираются из данных в скрипте: чтобы добавить видео или способ оплаты, не нужно трогать вёрстку."
        ],
        role: "Дизайн и адаптив, мобильное меню",
        stack: ["HTML", "CSS", "JavaScript", "YouTube"],
        links: {
            demo: "",
            code: ""
        }
    },
    {
        slug: "roliki",
        title: "Секция роллерспорта",
        subtitle: "Сайт спортивной секции в Нижнем Новгороде",
        year: "2026",
        status: "wip",
        cover: "assets/roliki-index.jpg",
        gallery: [
            { src: "assets/roliki-index.jpg", mobile: "assets/roliki-index-m.jpg", caption: "Главная: первый экран с видео тренировки" },
            { src: "assets/roliki-place.jpg", mobile: "assets/roliki-place-m.jpg", caption: "Место занятий, расписание и тренеры" },
            { src: "assets/roliki-media.jpg", mobile: "assets/roliki-media-m.jpg", caption: "Фото с выездов и соревнований" },
            { src: "assets/roliki-contact.jpg", mobile: "assets/roliki-contact-m.jpg", caption: "Страница записи: форма и телефоны тренеров" }
        ],
        description: [
            "Сайт секции роллерспорта Федерации роллер спорта Нижегородской области: о секции, место и расписание занятий, тренеры, цены, фото и видео.",
            "На странице записи — форма, которая проверяет имя, телефон и группу и открывает почтовый клиент с готовым письмом, контакты тренеров и Яндекс Карта с адресом площадки."
        ],
        role: "Дизайн и вёрстка, форма записи, адаптив",
        stack: ["HTML", "CSS", "JavaScript"],
        links: {
            demo: "",
            code: ""
        }
    },
    {
        slug: "tg-shop",
        type: "telegram",
        title: "Зерно",
        subtitle: "Магазин кофейни — Telegram Mini App",
        year: "2026",
        status: "done",
        gallery: [
            { mobile: "assets/tgshop-catalog-m.jpg", caption: "Каталог с категориями и поиском" },
            { mobile: "assets/tgshop-product-m.jpg", caption: "Карточка товара с выбором объёма" },
            { mobile: "assets/tgshop-cart-m.jpg", caption: "Корзина и расчёт доставки" },
            { mobile: "assets/tgshop-checkout-m.jpg", caption: "Оформление заказа" }
        ],
        description: [
            "Демо-магазин кофейни, который открывается прямо в Telegram по кнопке в боте: каталог с категориями и поиском, карточка товара с выбором объёма, корзина с расчётом доставки и оформление заказа с доставкой или самовывозом.",
            "Приложение подстраивается под тему Telegram пользователя, использует нативные кнопки и вибрацию, подставляет имя из профиля и не даёт случайно закрыться с полной корзиной. Весь ассортимент, цены и фирменный цвет задаются в одном файле с данными — под нового клиента магазин перенастраивается без правки вёрстки."
        ],
        role: "Дизайн и разработка, интеграция с Telegram Web App API, подключение к боту",
        stack: ["HTML", "CSS", "JavaScript", "Telegram Mini Apps"],
        links: {
            demo: "https://t.me/bot_coffe_coffe_bbboobot",
            code: ""
        }
    },
    {
        slug: "tg-expenses",
        type: "telegram",
        title: "Монетка",
        subtitle: "Учёт расходов — Telegram Mini App",
        year: "2026",
        status: "done",
        gallery: [
            { mobile: "assets/tgexpenses-home-m.jpg", caption: "Итоги месяца, бюджет и траты по категориям" },
            { mobile: "assets/tgexpenses-list-m.jpg", caption: "История операций по дням" },
            { mobile: "assets/tgexpenses-add-m.jpg", caption: "Добавление расхода" }
        ],
        description: [
            "Мини-приложение для учёта личных финансов прямо в Telegram: расходы и доходы по месяцам, лимит бюджета с подсказкой, сколько можно тратить в день, круговая диаграмма по категориям и история операций с фильтрами.",
            "Данные хранятся в облаке Telegram — у каждого пользователя свои и доступны с любого его устройства, без отдельного сервера и базы. Категории, валюта, бюджет и фирменный цвет задаются в одном файле настроек."
        ],
        role: "Дизайн и разработка, диаграмма на SVG, хранение в Telegram CloudStorage",
        stack: ["HTML", "CSS", "JavaScript", "Telegram Mini Apps", "CloudStorage"],
        links: {
            demo: "",
            code: ""
        }
    },
    {
        slug: "tg-habits",
        type: "telegram",
        title: "Ритм",
        subtitle: "Привычки и задачи с напоминаниями — Telegram Mini App + бот",
        year: "2026",
        status: "done",
        gallery: [
            { mobile: "assets/tghabits-habits-m.jpg", caption: "Привычки: прогресс дня и серии" },
            { mobile: "assets/tghabits-tasks-m.jpg", caption: "Задачи по срокам" },
            { mobile: "assets/tghabits-habit-m.jpg", caption: "Настройка привычки: дни и напоминание" },
            { mobile: "assets/tghabits-task-m.jpg", caption: "Новая задача с напоминанием" }
        ],
        description: [
            "Трекер привычек и задач в Telegram: привычки по дням недели с сериями «дней подряд» и историей за неделю, задачи с датой и временем, сгруппированные по срокам, быстрое добавление в одну строку.",
            "Напоминания присылает сам бот: мини-приложение передаёт расписание на сервер на Node.js, сервер проверяет подпись Telegram и в нужное время пишет пользователю в чат — с учётом его часового пояса и без напоминаний о том, что уже сделано."
        ],
        role: "Дизайн и разработка мини-приложения, сервер напоминаний на Node.js, Bot API",
        stack: ["HTML", "CSS", "JavaScript", "Telegram Mini Apps", "Node.js", "Bot API"],
        links: {
            demo: "",
            code: ""
        }
    }
];
