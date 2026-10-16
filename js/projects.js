// Данные о владельце портфолио — показываются в шапке, на главной и в контактах.
window.OWNER = {
    name: "Захар Белолугов",
    role: "Веб-разработчик",
    about: "Делаю сайты на HTML, CSS, Vue, React: от лендингов до портфолио для художников и студий.",
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
// status: "done" — готовый проект-пример, "wip" — ещё в разработке.
// gallery: src — скриншот десктопа, mobile — скриншот телефона (необязательно, показывается рядом в рамке телефона).
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
        status: "wip",
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
        role: "Перенос с Tilda, вёрстка, адаптив, плейлист и слайдер",
        stack: ["HTML", "CSS", "JavaScript", "YouTube"],
        links: {
            demo: "",
            code: ""
        }
    }
];
