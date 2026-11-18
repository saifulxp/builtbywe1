const pre=document.querySelector(".preloader"),fill=document.querySelector(".drop-fill"),pct=document.querySelector(".drop-percent strong"),status=document.querySelector(".loader-status");
const start=performance.now(),duration=1900;
function loader(now){const p=Math.min(1,(now-start)/duration),e=1-Math.pow(1-p,3),n=Math.round(e*100);fill.setAttribute("y",250-e*242);fill.setAttribute("height",e*242);pct.textContent=n;status.textContent=n<35?"INITIALIZING EXPERIENCE":n<70?"CONNECTING THE SYSTEM":"BUILT BY WE / READY";if(p<1)requestAnimationFrame(loader);else setTimeout(()=>pre.classList.add("done"),420)}requestAnimationFrame(loader);
const hero=document.querySelector(".hero-photo"), who=document.querySelector(".who-image");
window.addEventListener("scroll",()=>{let y=scrollY;hero.style.transform=`scale(1.08) translateY(${y*.05}px)`;who.style.transform=`scale(1.05) translateY(${Math.max(-30, y*.02)}px)`},{passive:true});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".belief-main,.belief-cards>div,.services article,.roles>div,.movement-grid>div,.final-copy").forEach(x=>io.observe(x));

/* WHO IS WE — hover only. No automatic activation. */
const whoRoles = document.querySelectorAll('.who .roles > div');
whoRoles.forEach(card => {
  card.addEventListener('pointerenter', () => card.classList.add('is-hovered'));
  card.addEventListener('pointerleave', () => card.classList.remove('is-hovered'));
  card.addEventListener('focusin', () => card.classList.add('is-hovered'));
  card.addEventListener('focusout', () => card.classList.remove('is-hovered'));
});

const steps=[...document.querySelectorAll(".steps>div")];const ps=document.querySelector(".progress");function step(){let r=ps.getBoundingClientRect(),p=Math.max(0,Math.min(1,(innerHeight-r.top)/(r.height-innerHeight)));let n=Math.min(4,Math.floor(p*5));steps.forEach((s,i)=>s.classList.toggle("active",i<=n))}addEventListener("scroll",step,{passive:true});step();
/* Scroll-revealed floating menu and right-side navigation drawer */
(() => {
  const header = document.querySelector('.header');
  const floating = document.querySelector('.floating-menu');
  const panel = document.querySelector('.navigation-panel');
  const scrim = document.querySelector('.navigation-scrim');
  const closeButtons = document.querySelectorAll('[data-nav-close]');
  const mobileMenu = document.querySelector('.header .menu');
  if (!header || !floating || !panel) return;

  const updateScrollState = () => {
    const scrolled = window.scrollY > 150;
    header.classList.toggle('nav-scrolled', scrolled);
    floating.classList.toggle('is-visible', scrolled);
  };
  const openMenu = () => {
    document.body.classList.add('navigation-open');
    panel.setAttribute('aria-hidden', 'false');
    floating.setAttribute('aria-expanded', 'true');
    if (mobileMenu) mobileMenu.setAttribute('aria-expanded', 'true');
  };
  const closeMenu = () => {
    document.body.classList.remove('navigation-open');
    panel.setAttribute('aria-hidden', 'true');
    floating.setAttribute('aria-expanded', 'false');
    if (mobileMenu) mobileMenu.setAttribute('aria-expanded', 'false');
  };
  floating.addEventListener('click', openMenu);
  if (mobileMenu) mobileMenu.addEventListener('click', openMenu);
  closeButtons.forEach(button => button.addEventListener('click', closeMenu));
  if (scrim) scrim.addEventListener('click', closeMenu);
  panel.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  window.addEventListener('scroll', updateScrollState, {passive:true});
  updateScrollState();
})();

// Close the navigation after any in-page navigation.
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",()=>document.body.classList.remove("navigation-open")));

/* ===== AUTHORITATIVE PRELOADER CONTROLLER ===== */
(() => {
  const pre = document.getElementById("preloader");
  if (!pre) return;

  const fill = pre.querySelector(".drop-fill");
  const pct = pre.querySelector(".drop-percent strong");
  const status = pre.querySelector(".loader-status");

  const start = performance.now();
  const duration = 3100;

  const stages = [
    [0,  "INITIALIZING EXPERIENCE"],
    [22, "CONNECTING THE SYSTEM"],
    [48, "BUILDING THE NETWORK"],
    [72, "ALIGNING THE WORK"],
    [92, "BUILT BY WE / READY"]
  ];

  function frame(now) {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 2.25);
    const value = Math.round(eased * 100);

    // The SVG drop is 380 units tall. Its water surface starts at 380
    // and rises continuously to 0, exactly tracking the percentage.
    if (fill) {
      fill.setAttribute("y", String(380 - 380 * eased));
      fill.setAttribute("height", String(380 * eased));
      fill.style.transform = "none";
    }

    if (pct) pct.textContent = String(value);

    let label = stages[0][1];
    for (const [threshold, text] of stages) {
      if (value >= threshold) label = text;
    }
    if (status) status.textContent = label;

    if (progress < 1) {
      requestAnimationFrame(frame);
    } else {
      if (pct) pct.textContent = "100";
      if (fill) {
        fill.setAttribute("y", "0");
        fill.setAttribute("height", "380");
      }
      setTimeout(() => pre.classList.add("done"), 600);
    }
  }

  requestAnimationFrame(frame);
})();


/* MAGNETIC NAVBAR EFFECT */
(() => {
  const initMagneticNav = () => {
    const links = document.querySelectorAll('.header nav a.magnetic-nav');
    if (!links.length || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    links.forEach(link => {
      let raf = null;
      let targetX = 0, targetY = 0;
      let currentX = 0, currentY = 0;

      const animate = () => {
        currentX += (targetX - currentX) * 0.16;
        currentY += (targetY - currentY) * 0.16;

        link.style.transform =
          `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

        if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
          raf = requestAnimationFrame(animate);
        } else {
          raf = null;
        }
      };

      link.addEventListener('mousemove', (event) => {
        const rect = link.getBoundingClientRect();
        const x = event.clientX - (rect.left + rect.width / 2);
        const y = event.clientY - (rect.top + rect.height / 2);

        // Gentle magnetic pull — intentionally restrained for a premium feel.
        targetX = Math.max(-10, Math.min(10, x * 0.22));
        targetY = Math.max(-7, Math.min(7, y * 0.28));

        if (!raf) raf = requestAnimationFrame(animate);
      });

      link.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
        if (!raf) raf = requestAnimationFrame(animate);
      });
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMagneticNav);
  } else {
    initMagneticNav();
  }
})();


/* MAGNETIC HERO BUTTONS */
(() => {
  const initMagneticButtons = () => {
    const buttons = document.querySelectorAll('.magnetic-button');
    if (!buttons.length || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    buttons.forEach(button => {
      let raf = null;
      let targetX = 0, targetY = 0;
      let currentX = 0, currentY = 0;

      const animate = () => {
        currentX += (targetX - currentX) * 0.16;
        currentY += (targetY - currentY) * 0.16;

        button.style.transform =
          `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

        if (
          Math.abs(targetX - currentX) > 0.05 ||
          Math.abs(targetY - currentY) > 0.05
        ) {
          raf = requestAnimationFrame(animate);
        } else {
          raf = null;
        }
      };

      button.addEventListener('mousemove', (event) => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - (rect.left + rect.width / 2);
        const y = event.clientY - (rect.top + rect.height / 2);

        targetX = Math.max(-10, Math.min(10, x * 0.18));
        targetY = Math.max(-7, Math.min(7, y * 0.22));

        if (!raf) raf = requestAnimationFrame(animate);
      });

      button.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
        if (!raf) raf = requestAnimationFrame(animate);
      });
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMagneticButtons);
  } else {
    initMagneticButtons();
  }
})();


/* 05 — role selector and native share action */
(() => {
  const roleSelect = document.getElementById('movement-role');
  const statement = document.getElementById('movement-statement');
  const shareButton = document.querySelector('[data-share-movement]');
  const feedback = document.querySelector('.take-place-feedback');
  if (!roleSelect || !statement || !shareButton) return;

  const currentMessage = () => {
    const option = roleSelect.options[roleSelect.selectedIndex];
    return (option.dataset.statement || 'I am part of WE.').replace(/\\n/g, '\n');
  };

  roleSelect.addEventListener('change', () => {
    statement.textContent = currentMessage();
    if (feedback) feedback.textContent = '';
  });

  shareButton.addEventListener('click', () => {
    const message = `Built by WE — ${currentMessage().replace(/\n/g, ' ')}`;
    const shareData = {
      title: 'Built by WE',
      text: message,
      // Native share sheets generally expect a web URL. Avoid passing file:// URLs.
      ...(window.location.protocol === 'http:' || window.location.protocol === 'https:'
        ? { url: window.location.href }
        : {})
    };

    // Call Web Share API immediately inside the click event so the browser
    // retains the user's activation and can open the native macOS share sheet.
    if (typeof navigator.share === 'function') {
      try {
        const sharePromise = navigator.share(shareData);
        if (sharePromise && typeof sharePromise.catch === 'function') {
          sharePromise.catch((error) => {
            if (error && error.name !== 'AbortError' && feedback) {
              feedback.textContent = 'The share menu could not be opened. Try using the site over HTTPS or localhost.';
            }
          });
        }
      } catch (error) {
        if (feedback) feedback.textContent = 'The share menu could not be opened. Try using the site over HTTPS or localhost.';
      }
      return;
    }

    // Fallback for browsers that do not implement Web Share. This cannot
    // reproduce the operating-system share sheet, so copy the same content.
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      navigator.clipboard.writeText(`${message}${shareData.url ? ` ${shareData.url}` : ''}`)
        .then(() => {
          if (feedback) feedback.textContent = 'Sharing is not supported in this browser. Your message has been copied.';
        })
        .catch(() => {
          if (feedback) feedback.textContent = 'Please open this site over HTTPS or localhost to use sharing.';
        });
    } else if (feedback) {
      feedback.textContent = 'Open this site over HTTPS or localhost in a browser that supports native sharing.';
    }
  });
})();
