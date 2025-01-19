
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  assets: {
    'index.csr.html': {size: 25196, hash: 'e16ffc324f340fbff6960de3cc329e880dc68da5448efaa998252935281176af', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17196, hash: 'fff06dc326d6cec6a6a8a1f5a7d0c8335f50eab2448d9c0e475ace9e238a2911', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 52935, hash: 'e237efdf70266530163cd282a45198ce838d76e69256e2ab078559df5b272cdd', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-NORZC6OF.css': {size: 20611, hash: 'DVkIfEesptY', text: () => import('./assets-chunks/styles-NORZC6OF_css.mjs').then(m => m.default)}
  },
};
