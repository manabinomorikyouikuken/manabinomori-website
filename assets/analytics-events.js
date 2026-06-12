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
    if (source.indexOf('parent_meeting_school_collaboration') !== -1 || source.indexOf('保護者面談') !== -1) {
      return 'parent_meeting_school_collaboration';
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

  function pageLanguage() {
    return (document.documentElement.getAttribute('lang') || '').toLowerCase() || 'unknown';
  }

  function currentProductName() {
    return productName(window.location.pathname, document.title);
  }

  function policyType(pathname) {
    if (/\/legal\.html$/i.test(pathname)) return 'legal';
    if (/\/privacy\.html$/i.test(pathname)) return 'privacy';
    return 'unknown';
  }

  function sendEvent(name, params) {
    if (!canTrack()) return;
    window.gtag('event', name, Object.assign({
      page_path: window.location.pathname,
      page_title: document.title
    }, params || {}));
  }

  function trackPageEvents() {
    var path = window.location.pathname;

    if (/\/[^/]*thank-you\.html$/i.test(path) || /\/thank-you\.html$/i.test(path)) {
      sendEvent('purchase_complete', {
        product: currentProductName(),
        page_language: pageLanguage()
      });
    }

    if (/\/worksheets_sample\.html$/i.test(path) || /sample/i.test(path)) {
      sendEvent('sample_view', {
        product: currentProductName(),
        page_language: pageLanguage()
      });
    }

    if (/\/(?:legal|privacy)\.html$/i.test(path)) {
      sendEvent('policy_view', {
        policy_type: policyType(path),
        page_language: pageLanguage()
      });
    }
  }

  function isPolicyLink(absoluteHref) {
    try {
      var url = new URL(absoluteHref, window.location.href);
      return url.origin === window.location.origin && /\/(?:legal|privacy)\.html$/i.test(url.pathname);
    } catch (error) {
      return false;
    }
  }

  document.addEventListener('click', function (event) {
    var link = event.target && event.target.closest ? event.target.closest('a[href]') : null;
    if (!link) return;

    var href = link.getAttribute('href') || '';
    var absoluteHref = link.href || href;
    var text = cleanText(link.textContent);
    var source = href + ' ' + text;

    if (isPolicyLink(absoluteHref)) {
      var policyUrl = new URL(absoluteHref, window.location.href);
      sendEvent('policy_click', {
        policy_type: policyType(policyUrl.pathname),
        link_url: safeUrl(absoluteHref),
        link_text: text
      });
      return;
    }

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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', trackPageEvents, { once: true });
  } else {
    trackPageEvents();
  }

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
