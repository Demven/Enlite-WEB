let loaded = false;

function _loadGoogleAnalyticsScript() {
  ((i, s, o, g, r, a, m) => {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
      }, i[r].l = 1 * new Date();
    a = s.createElement(o),
      m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
}

function loadOnce() {
  if (!loaded) {
    _loadGoogleAnalyticsScript();
    loaded = true;
  }
}

export function trackPageView() {
  loadOnce();

  window.ga('create', 'UA-81629186-1', 'auto');
  window.ga('send', 'pageview');
}

export function trackEvent(category, name) {
  loadOnce();

  if (category && name) {
    window.ga('send', 'event', category, name);
  }
}
