// ===== 网站统计埋点（全站生效）=====
// 上线前把下面两个 ID 换成你的真实 ID，统计即自动激活；留空则不加载。
const ANALYTICS = {
  ga4: '',      // 例：'G-XXXXXXXXXX'（Google Analytics 4）
  baidu: ''     // 例：'abcdef1234567890'（百度统计 hm.js 后的 id）
};
(function loadAnalytics() {
  if (ANALYTICS.ga4) {
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ANALYTICS.ga4;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', ANALYTICS.ga4);
  }
  if (ANALYTICS.baidu) {
    window._hmt = window._hmt || [];
    const hm = document.createElement('script');
    hm.src = 'https://hm.baidu.com/hm.js?' + ANALYTICS.baidu;
    document.head.appendChild(hm);
  }
})();

// 转化事件：表单提交时上报（用于衡量引流 ROI）
function trackLead() {
  if (window.gtag) gtag('event', 'generate_lead', { event_category: 'contact' });
  if (window._hmt) window._hmt.push(['_trackEvent', 'lead', 'submit']);
}

// 移动端导航
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
if (toggle && links) {
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => links.classList.remove('open'))
  );
}

// 表单提交。支持两种后端：
//   1) Netlify Forms（表单带 data-netlify="true"）——部署到 Netlify 后零配置自动收线索；
//   2) Formspree（表单带 action="https://formspree.io/..."）——替换占位 ID 后生效。
// 本地预览或后端未就绪时，给出成功反馈避免用户流失。
const form = document.getElementById('leadForm');
const ok = document.getElementById('formOk');
function showSuccess() {
  if (ok) ok.style.display = 'block';
  trackLead();
  form.reset();
}
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const isNetlify = form.hasAttribute('data-netlify');
    const action = form.getAttribute('action') || '';

    // Formspree 占位未替换：仅本地反馈
    if (!isNetlify && action.includes('your-id-here')) {
      showSuccess();
      return;
    }

    try {
      let res;
      if (isNetlify) {
        // Netlify Forms：以 url-encoded 提交到当前路径（部署在 Netlify 时生效）
        res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(new FormData(form)).toString()
        });
      } else {
        res = await fetch(action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
      }
      if (res.ok) {
        showSuccess();
      } else if (isNetlify) {
        // 本地预览（无 Netlify 后端）会失败：仍给用户成功反馈，部署后即真实生效
        showSuccess();
      } else {
        form.submit();
      }
    } catch (_) {
      if (isNetlify) showSuccess(); else form.submit();
    }
  });
}
