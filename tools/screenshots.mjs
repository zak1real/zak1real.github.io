// Скриншоты проектов для портфолио: десктоп 1440×900 и телефон 390×844 (iPhone, плотность 2x).
// Телефон снимается через DevTools Protocol с настоящей эмуляцией мобильного устройства —
// обычный `chrome --headless --window-size=390,...` на Windows не даёт окну стать уже ~500px.
//
// Запуск из папки portfolio:   node tools/screenshots.mjs [часть имени]
// Пример: node tools/screenshots.mjs dimzerz  — переснять только dimzerz-*
// Результат: assets/<name>.jpg (десктоп) и assets/<name>-m.jpg (телефон).
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { writeFileSync, createReadStream, statSync } from "node:fs";
import { join, dirname, extname, normalize } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const OUT = join(here, "..", "assets");
// Папка, где лежат сами проекты (рядом с portfolio)
const PROJECTS = join(here, "..", "..");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const filter = process.argv[2] || "";

// name   — имя файла в assets (без расширения)
// page   — путь к странице относительно папки с проектами, можно с ?параметрами
// scroll — CSS-селектор блока, к которому прокрутить перед снимком
// mobileOnly — снимать только телефон (Telegram-приложения и другие мобильные интерфейсы)
// action — JS, который выполняется на странице перед снимком (клики, ввод); доступны click(селектор),
//          type(селектор, текст) и wait(мс). localStorage перед каждой съёмкой очищается.
const TG_CART = `click('[data-id="croissant"] [data-action="add"]'); click('[data-id="donut"] [data-action="add"]');
    click('[data-id="cappuccino"] [data-action="add"]'); click('[data-option="m"]'); click('[data-sheet="add"]');`;
const SHOTS = [
    { name: "5treet-index", page: "5treet_justies/index.html" },
    { name: "5treet-series", page: "5treet_justies/series.html" },
    { name: "5treet-about", page: "5treet_justies/about.html" },
    { name: "skateshop-index", page: "skateshop/index.html" },
    { name: "skateshop-catalog", page: "skateshop/catalog.html" },
    { name: "skateshop-product", page: "skateshop/product.html?id=night-shift-longsleeve" },
    { name: "dimzerz-index", page: "dimzerz/index.html" },
    { name: "dimzerz-projects", page: "dimzerz/index.html", scroll: ".projects" },
    { name: "dimzerz-video", page: "dimzerz/index.html", scroll: "#video" },
    { name: "dimzerz-photo", page: "dimzerz/index.html", scroll: "#photo" },
    { name: "roliki-index", page: "roliki/index.html" },
    { name: "roliki-place", page: "roliki/index.html", scroll: "#place" },
    { name: "roliki-media", page: "roliki/index.html", scroll: "#media" },
    { name: "roliki-contact", page: "roliki/contact.html" },
    { name: "tgshop-catalog", page: "tg-shop/index.html", mobileOnly: true, action: TG_CART + "await wait(2000);" },
    { name: "tgshop-product", page: "tg-shop/index.html", mobileOnly: true, action: `click('[data-id="raf"]'); click('[data-option="m"]');` },
    { name: "tgshop-cart", page: "tg-shop/index.html", mobileOnly: true, action: TG_CART + "click('#cartPill'); await wait(2000);" },
    { name: "tgshop-checkout", page: "tg-shop/index.html", mobileOnly: true,
      action: TG_CART + "click('#cartPill'); click('#mainBtn'); type('#f-name', 'Анна'); type('#f-phone', '+7 900 123-45-67'); type('#f-address', 'ул. Ленина, 5, кв. 12'); await wait(2000);" },
    // Мини-приложения сами заполняются примером данных при первом запуске
    { name: "tgexpenses-home", page: "tg-expenses/index.html?demo", mobileOnly: true },
    { name: "tgexpenses-list", page: "tg-expenses/index.html?demo", mobileOnly: true, scroll: ".section-head" },
    { name: "tgexpenses-add", page: "tg-expenses/index.html?demo", mobileOnly: true,
      action: "click('#mainBtn'); await wait(300); type('#opAmount', '450'); click('[data-pick-cat=\"cafe\"]'); type('#opNote', 'Кофе с собой'); await wait(600);" },
    { name: "tghabits-habits", page: "tg-habits/index.html?demo", mobileOnly: true },
    { name: "tghabits-tasks", page: "tg-habits/index.html?demo", mobileOnly: true, action: "click('[data-tab=\"tasks\"]');" },
    { name: "tghabits-habit", page: "tg-habits/index.html?demo", mobileOnly: true, action: "click('[data-habit=\"demo1\"]'); await wait(600);" },
    { name: "tghabits-task", page: "tg-habits/index.html?demo", mobileOnly: true,
      action: "click('[data-tab=\"tasks\"]'); click('#mainBtn'); await wait(300); type('#fTitle', 'Купить билеты в кино'); type('#fTime', '19:00'); document.querySelector('#fTime').dispatchEvent(new Event('change', { bubbles: true })); click('[data-switch]'); document.querySelector('.sheet__note').textContent = 'Бот пришлёт сообщение в Telegram в это время.'; await wait(600);" }
].filter(s => s.name.includes(filter));

const DEVICES = [
    { suffix: "", metrics: { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false } },
    {
        suffix: "-m",
        metrics: { width: 390, height: 844, deviceScaleFactor: 2, mobile: true },
        userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1"
    }
];

// Страницы отдаются через локальный http-сервер, а не file:// — так сайты ведут себя как на хостинге
// (например, встроенные YouTube-видео в file:// не работают и сайт показывает заглушку).
const TYPES = {
    ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json",
    ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".svg": "image/svg+xml", ".webp": "image/webp",
    ".gif": "image/gif", ".mp4": "video/mp4", ".mov": "video/mp4", ".webm": "video/webm",
    ".woff": "font/woff", ".woff2": "font/woff2"
};
const server = createServer((req, res) => {
    const file = normalize(join(PROJECTS, decodeURIComponent(req.url.split("?")[0])));
    let size;
    try { size = statSync(file).size; } catch { res.writeHead(404); res.end(); return; }
    const headers = { "Content-Type": TYPES[extname(file).toLowerCase()] || "application/octet-stream", "Accept-Ranges": "bytes" };
    // Range-запросы нужны видео: браузер подгружает ролик кусками
    const range = /bytes=(\d*)-(\d*)/.exec(req.headers.range || "");
    if (range) {
        const start = range[1] ? +range[1] : 0;
        const end = range[2] ? +range[2] : size - 1;
        res.writeHead(206, { ...headers, "Content-Range": `bytes ${start}-${end}/${size}`, "Content-Length": end - start + 1 });
        createReadStream(file, { start, end }).pipe(res);
    } else {
        res.writeHead(200, { ...headers, "Content-Length": size });
        createReadStream(file).pipe(res);
    }
});
await new Promise(r => server.listen(0, "127.0.0.1", r));
const BASE = `http://127.0.0.1:${server.address().port}/`;

const PORT = 9333;
const chrome = spawn(CHROME, [
    "--headless=new", "--hide-scrollbars", `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${join(tmpdir(), "portfolio-screenshots")}`,
    "--autoplay-policy=no-user-gesture-required", "--allow-file-access-from-files", "about:blank"
], { stdio: "ignore" });

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function getTarget() {
    for (let i = 0; i < 50; i++) {
        try {
            const list = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json();
            const page = list.find(t => t.type === "page");
            if (page) return page.webSocketDebuggerUrl;
        } catch {}
        await sleep(200);
    }
    throw new Error("Chrome не запустился");
}

const ws = new WebSocket(await getTarget());
await new Promise(r => ws.addEventListener("open", r, { once: true }));

let seq = 0;
const pending = new Map();
const listeners = [];
ws.addEventListener("message", e => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) {
        const { resolve, reject } = pending.get(msg.id);
        pending.delete(msg.id);
        msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
    } else if (msg.method) {
        listeners.forEach(l => l(msg));
    }
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++seq;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
});
const once = method => new Promise(r => {
    const l = m => {
        if (m.method !== method) return;
        listeners.splice(listeners.indexOf(l), 1);
        r(m);
    };
    listeners.push(l);
});
const evaluate = expr => send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true });

function pageUrl(page) {
    return BASE + encodeURI(page);
}

await send("Page.enable");
await send("Runtime.enable");

for (const device of DEVICES) {
    await send("Emulation.setDeviceMetricsOverride", device.metrics);
    await send("Emulation.setTouchEmulationEnabled", { enabled: device.metrics.mobile });
    if (device.userAgent) await send("Emulation.setUserAgentOverride", { userAgent: device.userAgent });

    for (const shot of SHOTS) {
        if (shot.mobileOnly && !device.metrics.mobile) continue;
        // Сайты хранят состояние (корзину и т. п.) в localStorage — каждый снимок начинаем с чистого листа
        await send("Storage.clearDataForOrigin", { origin: BASE.slice(0, -1), storageTypes: "local_storage" });
        const loaded = once("Page.loadEventFired");
        await send("Page.navigate", { url: pageUrl(shot.page) });
        await Promise.race([loaded, sleep(15000)]);

        // Ждём шрифты и первый кадр видео, иначе вместо видео будет чёрный прямоугольник
        await evaluate(`(async () => {
            await document.fonts.ready;
            const v = document.querySelector("video");
            if (!v) return;
            v.preload = "auto";
            if (v.readyState < 2) {
                await Promise.race([
                    new Promise(r => v.addEventListener("loadeddata", r, { once: true })),
                    new Promise(r => setTimeout(r, 6000))
                ]);
            }
            if (v.readyState >= 2 && v.paused && v.currentTime === 0) v.currentTime = 1;
            await new Promise(r => setTimeout(r, 800));
        })()`);

        if (shot.action) {
            const res = await evaluate(`(async () => {
                const wait = ms => new Promise(r => setTimeout(r, ms));
                const click = sel => document.querySelector(sel).click();
                const type = (sel, text) => {
                    const input = document.querySelector(sel);
                    input.value = text;
                    input.dispatchEvent(new Event("input", { bubbles: true }));
                };
                ${shot.action}
            })()`);
            if (res.exceptionDetails) console.log(shot.name, "⚠ ошибка в action:", res.exceptionDetails.exception?.description);
        }

        if (shot.scroll) {
            await evaluate(`(() => {
                const el = document.querySelector(${JSON.stringify(shot.scroll)});
                const header = document.querySelector("header");
                const sticky = header && /sticky|fixed/.test(getComputedStyle(header).position);
                window.scrollTo(0, el.getBoundingClientRect().top + scrollY - (sticky ? header.offsetHeight : 0) - 16);
            })()`);
        }
        await sleep(1200);

        const check = await evaluate("document.documentElement.scrollWidth > innerWidth");
        // JPEG: на фото и кадрах видео в разы легче PNG, текст при качестве 88 остаётся чётким
        const { data } = await send("Page.captureScreenshot", { format: "jpeg", quality: 88 });
        const file = shot.name + device.suffix + ".jpg";
        writeFileSync(join(OUT, file), Buffer.from(data, "base64"));
        console.log(file.padEnd(26), check.result.value ? "⚠ есть горизонтальный скролл" : "ok");
    }
}

ws.close();
chrome.kill();
server.close();
process.exit(0);
