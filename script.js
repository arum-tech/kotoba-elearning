document.addEventListener('DOMContentLoaded', function () {
    // --- Filter & Pencarian Kelas ---
    var cards = [].slice.call(document.querySelectorAll('.course'));
    var chips = [].slice.call(document.querySelectorAll('.chip'));
    var levelSelect = document.getElementById('level-select');
    var q = document.getElementById('q');
    var empty = document.getElementById('empty');
    var searchForm = document.getElementById('search');
    var level = 'all';

    function apply() {
        var t = q ? q.value.trim().toLowerCase() : '';
        var n = 0;

        cards.forEach(function (c) {
            var ok = (level === 'all' || c.getAttribute('data-level') === level) &&
                     (!t || c.textContent.toLowerCase().indexOf(t) > -1);
            c.hidden = !ok;
            if (ok) n++;
        });

        if (empty) {
            empty.hidden = n > 0;
        }
    }

    if (chips.length > 0) {
        chips.forEach(function (ch) {
            ch.addEventListener('click', function () {
                level = ch.getAttribute('data-level');
                chips.forEach(function (o) {
                    o.setAttribute('aria-pressed', o === ch ? 'true' : 'false');
                });
                if (levelSelect) {
                    levelSelect.value = level;
                }
                apply();
            });
        });
    }

    if (levelSelect) {
        levelSelect.addEventListener('change', function () {
            level = levelSelect.value;
            chips.forEach(function (o) {
                o.setAttribute('aria-pressed', o.getAttribute('data-level') === level ? 'true' : 'false');
            });
            apply();
        });
    }

    if (q) {
        q.addEventListener('input', apply);
    }

    if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            apply();
        });
    }

    // --- Interaktif Kartu Kana ---
    var kana = [
        ['あ', 'a'],
        ['い', 'i'],
        ['う', 'u'],
        ['え', 'e'],
        ['お', 'o'],
        ['か', 'ka'],
        ['き', 'ki'],
        ['さ', 'sa'],
        ['た', 'ta'],
        ['な', 'na']
    ];
    var i = 0;
    var back = false;
    var btn = document.getElementById('kana');
    var g = document.getElementById('kana-g');
    var h = document.getElementById('kana-h');

    function render() {
        if (g && h) {
            g.textContent = back ? kana[i][1] : kana[i][0];
            g.className = back ? 'g rom' : 'g';
            h.textContent = back ? 'ketuk untuk lanjut' : 'ketuk kartu';
        }
    }

    if (btn) {
        btn.addEventListener('click', function () {
            if (!back) {
                back = true;
            } else {
                back = false;
                i = (i + 1) % kana.length;
            }
            render();
        });
    }

    // --- Mobile Hamburger Navigation Toggle ---
    var navToggle = document.getElementById('nav-toggle');
    var navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            var isOpen = navMenu.classList.toggle('is-open');
            navToggle.classList.toggle('is-active', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Menutup menu saat link di klik
        navMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.classList.remove('is-active');
                navMenu.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Menutup menu saat klik di luar navbar
        document.addEventListener('click', function (e) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('is-active');
                navMenu.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
});
