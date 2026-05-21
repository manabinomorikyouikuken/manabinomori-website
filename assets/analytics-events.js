(function () {
  'use strict';

  function canTrack() {
    return typeof window.gtag === 'function';
  }

  function cleanText(value) {
    return String(value || '').replace(/\s+/g, ' ').trim().slice(0, 120);
  }

  function safeUrl(value) {
    try {
      var url = new URL(value, window.location.href);
      if (url.origin === window.location.origin) {
        return url.pathname + url.search + url.hash;
      }
      return url.hostname + url.pathname;
    } catch (error) {
      return String(value || '').slice(0, 180);
    }
  }

  function productName(href, text) {
    var source = (href + ' ' + text).toLowerCase();
    if (source.indexOf('9b63cu4tmcy93aw1fr8vi04') !== -1 || source.indexOf('first_30days') !== -1) {
      return 'first_30days_checksheet';
    }
    if (source.indexOf('cni4gy85yaq15ieaq18vi06') !== -1 || source.indexOf('worksheets') !== -1) {
      return 'development_support_worksheets';
    }
    if (source.indexOf('drmcn485yaq1cl6aq18vi00') !== -1 || source.indexOf('/boki3/') !== -1) {
      return 'boki3_jp';
    }
    if (source.indexOf('5kq00iclobu5ete8ht8vi01') !== -1 || source.indexOf('/boki3_en/') !== -1) {
      return 'boki3_en';
    }
    return 'unknown';
  }

  function sendEvent(name, params) {
    if (!canTrack()) return;
    window.gtag('event', name, Object.assign({
      page_path: window.location.pathname,
      page_title: document.title
    }, params || {}));
  }

  document.addEventListener('click', function (event) {
    var link = event.target && event.target.closest ? event.target.closest('a[href]') : null;
    if (!link) return;

    var href = link.getAttribute('href') || '';
    var absoluteHref = link.href || href;
    var text = cleanText(link.textContent);
    var source = href + ' ' + text;

    if (/buy\.stripe\.com/.test(absoluteHref)) {
      sendEvent('purchase_click', {
        product: productName(absoluteHref, text),
        link_url: safeUrl(absoluteHref),
        link_text: text
      });
      return;
    }

    if (/mailto:/i.test(href) || /#contact\b|お問い合わせ|問い合わせ|contact/i.test(source)) {
      sendEvent('contact_click', {
        link_url: safeUrl(absoluteHref),
        link_text: text
      });
      return;
    }

    if (/サンプル|sample|\.pdf(?:$|[?#])/i.test(source)) {
      sendEvent('sample_click', {
        product: productName(absoluteHref, text),
        link_url: safeUrl(absoluteHref),
        link_text: text
      });
    }
  }, true);

  document.addEventListener('submit', function (event) {
    var form = event.target;
    if (!form || form.nodeName !== 'FORM') return;
    var action = form.getAttribute('action') || '';
    var source = action + ' ' + (form.id || '') + ' ' + (form.className || '');
    if (/formspree|contact|問い合わせ/i.test(source)) {
      sendEvent('contact_form_submit', {
        form_id: cleanText(form.id || ''),
        form_action: safeUrl(action)
      });
    }
  }, true);
}());
