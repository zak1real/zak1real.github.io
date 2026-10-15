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
    }
];
