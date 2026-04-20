document.addEventListener('DOMContentLoaded', () => {
    const hdr = document.getElementById('hdr');
    const btt = document.getElementById('btt');
    const navUl = document.querySelector('#nav ul');
    const mt = document.getElementById('mt');

    // Menú hamburguesa
    mt.addEventListener('click', () => {
        navUl.classList.toggle('op');
        mt.textContent = navUl.classList.contains('op') ? '✕' : '☰';
    });
    navUl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        navUl.classList.remove('op'); mt.textContent = '☰';
    }));

    // Scroll
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        hdr.classList.toggle('sc', y > 60);
        btt.classList.toggle('v', y > 400);
        reveal();
    });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Fade in al scroll
    function reveal() {
        document.querySelectorAll('.fi3').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 80) el.classList.add('v');
        });
    }

    // Contadores animados
    function animar() {
        [
            { id:'s1', v:1596, s:'' },
            { id:'s2', v:5.3,  s:'M' },
            { id:'s3', v:537,  s:'m' },
            { id:'s4', v:51,   s:'' }
        ].forEach(d => {
            const el = document.getElementById(d.id);
            if (!el) return;
            let c = 0; const steps = 60; const inc = d.v / steps;
            const iv = setInterval(() => {
                c += inc;
                if (c >= d.v) { c = d.v; clearInterval(iv); }
                el.textContent = (Number.isInteger(d.v) ? Math.floor(c) : c.toFixed(1)) + d.s;
            }, 25);
        });
    }

    // Filtros galería
    document.querySelectorAll('.fb').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.fb').forEach(b => b.classList.remove('ac'));
            btn.classList.add('ac');
            const f = btn.dataset.f;
            document.querySelectorAll('.gi2').forEach(i => {
                i.classList.toggle('hd', f !== 'all' && i.dataset.c !== f);
            });
        });
    });

    // Formulario
    document.getElementById('benv').addEventListener('click', () => {
        const n = document.getElementById('nom').value.trim();
        const e = document.getElementById('eml').value.trim();
        const m = document.getElementById('msg').value.trim();
        const fb = document.getElementById('ffb');
        if (!n) { fb.textContent = '⚠️ Ingresa tu nombre.'; fb.style.color = '#c0392b'; return; }
        if (!e || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) { fb.textContent = '⚠️ Ingresa un correo válido.'; fb.style.color = '#c0392b'; return; }
        if (!m) { fb.textContent = '⚠️ Escribe un mensaje.'; fb.style.color = '#c0392b'; return; }
        fb.textContent = '✅ ¡Mensaje enviado! Te contactaremos pronto.';
        fb.style.color = '#2d8a4e';
        document.getElementById('nom').value = '';
        document.getElementById('eml').value = '';
        document.getElementById('msg').value = '';
        setTimeout(() => fb.textContent = '', 5000);
    });

    // Nav activo al hacer scroll
    document.querySelectorAll('section[id]').forEach(s => {
        new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    document.querySelectorAll('#nav ul li a').forEach(a => {
                        a.style.color = a.getAttribute('href') === '#' + e.target.id ? 'var(--gold)' : '';
                    });
                }
            });
        }, { rootMargin: '-40% 0px -40% 0px' }).observe(s);
    });

    // Inicializar funciones
    reveal();
    animar();
});