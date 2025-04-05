// main.js
(function () {
  window._Hasync = window._Hasync || [];
  _Hasync.push(['Histats.start', '1,4941939,4,0,0,0,00010000']);
  _Hasync.push(['Histats.fasi', '1']);
  _Hasync.push(['Histats.track_hits', '']);

  const hs = document.createElement('script');
  hs.type = 'text/javascript';
  hs.async = true;
  hs.src = '//s10.histats.com/js15_as.js';

  const target = document.head || document.body;
  if (target) target.appendChild(hs);
})();
