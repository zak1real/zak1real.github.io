(function () {
    var owner = window.OWNER || {};
    var projects = window.PROJECTS || [];

    function el(tag, className, text) {
        var node = document.createElement(tag);
        if (className) node.className = className;
        if (text) node.textContent = text;
        return node;
    }

    // Имя владельца в шапке, подвале и заголовке вкладки
    document.querySelectorAll("[data-owner-name]").forEach(function (node) {
        node.textContent = owner.name || "";
    });
    document.querySelectorAll("[data-owner-role]").forEach(function (node) {
        node.textContent = owner.role || "";
    });
    document.querySelectorAll("[data-owner-about]").forEach(function (node) {
        node.textContent = owner.about || "";
    });

    // Контакты
    document.querySelectorAll("[data-contacts]").forEach(function (list) {
        (owner.contacts || []).forEach(function (c) {
            var li = el("li");
            li.appendChild(el("span", "contact-label", c.label));
            var a = el("a", null, c.text);
            a.href = c.href;
            if (/^https?:/.test(c.href)) {
                a.target = "_blank";
                a.rel = "noopener";
            }
            li.appendChild(a);
            list.appendChild(li);
        });
    });

    // Всплывающая форма «Связаться» — создаётся один раз, открывается любой кнопкой [data-contact-open]
    var openers = document.querySelectorAll("[data-contact-open]");
    if (openers.length && window.HTMLDialogElement) {
        var dialog = el("dialog", "modal");
        dialog.setAttribute("aria-labelledby", "contact-title");
        dialog.innerHTML =
            '<form class="modal-form" novalidate>' +
                '<button class="modal-close" type="button" aria-label="Закрыть" data-contact-close>×</button>' +
                '<h2 id="contact-title">Связаться</h2>' +
                '<p class="muted">Напишите пару слов о задаче — отвечу на почту или в Telegram.</p>' +
                '<label>Имя<input name="name" type="text" autocomplete="name" required maxlength="80"></label>' +
                '<fieldset class="contact-field">' +
                    '<legend>Как с вами связаться</legend>' +
                    '<div class="segmented">' +
                        '<label><input type="radio" name="contactType" value="telegram" checked><span>Telegram</span></label>' +
                        '<label><input type="radio" name="contactType" value="email"><span>Email</span></label>' +
                    "</div>" +
                    '<input name="contact" type="text" required maxlength="120" aria-label="Контакт">' +
                "</fieldset>" +
                '<label>Сообщение<textarea name="message" rows="5" required maxlength="2000"></textarea></label>' +
                '<input class="hp" type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true">' +
                '<p class="form-status" role="status" data-form-status></p>' +
                '<button class="btn" type="submit">Отправить</button>' +
            "</form>";
        document.body.appendChild(dialog);

        var form = dialog.querySelector("form");
        var status = dialog.querySelector("[data-form-status]");
        var submit = form.querySelector('[type="submit"]');

        function setStatus(text, type) {
            status.textContent = text;
            status.className = "form-status" + (type ? " is-" + type : "");
        }

        function close() {
            dialog.close();
        }

        // Переключатель Telegram / Email: меняет подсказку, тип поля и проверку
        var CONTACT_TYPES = {
            telegram: {
                label: "Telegram",
                type: "text",
                placeholder: "@username",
                autocomplete: "off",
                inputmode: "text",
                pattern: /^(@|https?:\/\/t\.me\/|t\.me\/)?[a-zA-Z0-9_]{5,32}$/,
                error: "Укажите ник в Telegram, например @username."
            },
            email: {
                label: "Email",
                type: "email",
                placeholder: "name@example.com",
                autocomplete: "email",
                inputmode: "email",
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                error: "Укажите корректный email, например name@example.com."
            }
        };
        var contactInput = form.elements.contact;

        function currentType() {
            return CONTACT_TYPES[form.elements.contactType.value] || CONTACT_TYPES.telegram;
        }

        function applyContactType() {
            var t = currentType();
            contactInput.type = t.type;
            contactInput.placeholder = t.placeholder;
            contactInput.autocomplete = t.autocomplete;
            contactInput.inputMode = t.inputmode;
        }

        form.querySelectorAll('[name="contactType"]').forEach(function (radio) {
            radio.addEventListener("change", function () {
                contactInput.value = "";
                applyContactType();
                setStatus("");
                contactInput.focus();
            });
        });
        applyContactType();

        openers.forEach(function (btn) {
            btn.addEventListener("click", function () {
                setStatus("");
                dialog.showModal();
                form.elements.name.focus();
            });
        });

        dialog.querySelector("[data-contact-close]").addEventListener("click", close);

        // Клик по затемнённому фону закрывает окно
        dialog.addEventListener("click", function (e) {
            if (e.target === dialog) close();
        });

        function mailtoFallback(data) {
            var body = data.message + "\n\n— " + data.name + " (" + data.contactType + ": " + data.contact + ")";
            location.href = "mailto:" + (owner.email || "") +
                "?subject=" + encodeURIComponent("Сообщение с сайта-портфолио") +
                "&body=" + encodeURIComponent(body);
        }

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            var data = {
                name: form.elements.name.value.trim(),
                contactType: currentType().label,
                contact: contactInput.value.trim(),
                message: form.elements.message.value.trim()
            };

            if (!data.name || !data.contact || !data.message) {
                setStatus("Заполните все поля.", "error");
                return;
            }

            if (!currentType().pattern.test(data.contact)) {
                setStatus(currentType().error, "error");
                contactInput.focus();
                return;
            }

            // Ник Telegram приводим к виду @username
            if (data.contactType === "Telegram") {
                data.contact = "@" + data.contact.replace(/^(@|https?:\/\/t\.me\/|t\.me\/)/, "");
            }

            // Бот заполнил скрытое поле — делаем вид, что всё отправлено
            if (form.elements._honey.value) {
                setStatus("Спасибо! Сообщение отправлено.", "ok");
                form.reset();
                applyContactType();
                return;
            }

            if (!owner.formEndpoint) {
                mailtoFallback(data);
                return;
            }

            submit.disabled = true;
            setStatus("Отправляю…");

            fetch(owner.formEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify({
                    name: data.name,
                    contact_type: data.contactType,
                    contact: data.contact,
                    message: data.message,
                    _subject: "Сообщение с сайта-портфолио",
                    _template: "table"
                })
            })
                .then(function (res) {
                    if (!res.ok) throw new Error("HTTP " + res.status);
                    return res.json();
                })
                .then(function (json) {
                    if (json.success === false || json.success === "false") throw new Error(json.message);
                    setStatus("Спасибо! Сообщение отправлено — скоро отвечу.", "ok");
                    form.reset();
                    applyContactType();
                })
                .catch(function () {
                    setStatus("Не получилось отправить. Открываю почтовый клиент…", "error");
                    mailtoFallback(data);
                })
                .finally(function () {
                    submit.disabled = false;
                });
        });
    }

    function tagList(stack) {
        var ul = el("ul", "tags");
        (stack || []).forEach(function (t) {
            ul.appendChild(el("li", null, t));
        });
        return ul;
    }

    // Статус проекта: бейдж «Готово» / «В разработке»
    var STATUSES = {
        done: "Готово",
        wip: "В разработке"
    };

    function statusBadge(status) {
        if (!STATUSES[status]) return null;
        return el("span", "status status-" + status, STATUSES[status]);
    }

    // Главная: сетка карточек
    var grid = document.querySelector("[data-project-grid]");
    if (grid) {
        document.title = (owner.name || "Портфолио") + " — проекты";

        projects.forEach(function (p) {
            var card = el("a", "card");
            card.href = "project.html?id=" + encodeURIComponent(p.slug);

            var media = el("div", "card-media");
            var img = el("img");
            img.src = p.cover;
            img.alt = p.title;
            img.loading = "lazy";
            media.appendChild(img);
            var badge = statusBadge(p.status);
            if (badge) media.appendChild(badge);
            card.appendChild(media);

            var body = el("div", "card-body");
            var head = el("div", "card-head");
            head.appendChild(el("h3", null, p.title));
            head.appendChild(el("span", "muted", p.year));
            body.appendChild(head);
            body.appendChild(el("p", "muted", p.subtitle));
            body.appendChild(tagList(p.stack));
            card.appendChild(body);

            grid.appendChild(card);
        });
    }

    // Страница проекта: project.html?id=<slug>
    var view = document.querySelector("[data-project-view]");
    if (view) {
        var id = new URLSearchParams(location.search).get("id");
        var index = projects.findIndex(function (p) { return p.slug === id; });
        if (index === -1) index = 0;
        var p = projects[index];
        if (!p) return;

        document.title = p.title + " — " + (owner.name || "Портфолио");

        var header = el("header", "project-head");
        header.appendChild(el("p", "eyebrow", p.subtitle + " · " + p.year));
        header.appendChild(el("h1", null, p.title));
        var headBadge = statusBadge(p.status);
        if (headBadge) header.appendChild(headBadge);
        view.appendChild(header);

        var layout = el("div", "project-layout");

        var text = el("div", "project-text");
        (p.description || []).forEach(function (para) {
            text.appendChild(el("p", null, para));
        });
        layout.appendChild(text);

        var meta = el("dl", "project-meta");
        function addMeta(label, value) {
            if (!value) return;
            meta.appendChild(el("dt", null, label));
            var dd = el("dd");
            if (typeof value === "string") dd.textContent = value;
            else dd.appendChild(value);
            meta.appendChild(dd);
        }
        addMeta("Год", p.year);
        addMeta("Роль", p.role);
        addMeta("Стек", tagList(p.stack));

        var links = el("div", "project-links");
        if (p.links && p.links.demo) {
            var demo = el("a", "btn", "Открыть сайт ↗");
            demo.href = p.links.demo;
            demo.target = "_blank";
            demo.rel = "noopener";
            links.appendChild(demo);
        }
        if (p.links && p.links.code) {
            var code = el("a", "btn btn-ghost", "Исходный код ↗");
            code.href = p.links.code;
            code.target = "_blank";
            code.rel = "noopener";
            links.appendChild(code);
        }
        if (links.children.length) addMeta("Ссылки", links);

        layout.appendChild(meta);
        view.appendChild(layout);

        var gallery = el("div", "gallery");
        (p.gallery || []).forEach(function (shot) {
            var fig = el("figure", "shot");
            var img = el("img");
            img.src = shot.src;
            img.alt = shot.caption || p.title;
            img.loading = "lazy";
            fig.appendChild(img);
            if (shot.caption) fig.appendChild(el("figcaption", null, shot.caption));
            gallery.appendChild(fig);
        });
        view.appendChild(gallery);

        // Навигация между проектами
        if (projects.length > 1) {
            var next = projects[(index + 1) % projects.length];
            var nav = el("a", "next-project");
            nav.href = "project.html?id=" + encodeURIComponent(next.slug);
            nav.appendChild(el("span", "muted", "Следующий проект"));
            nav.appendChild(el("strong", null, next.title + " →"));
            view.appendChild(nav);
        }
    }
})();
