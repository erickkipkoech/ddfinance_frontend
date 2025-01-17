
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
    'index.csr.html': {size: 25195, hash: 'c95605b3e2054efdf8097b721eca3e0d37683c95aa8cadc93273852e8f65662b', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17195, hash: 'fe93cc3ba1e49260b261cc2e8c13b21da8de46e8df83b54f92024d45fc602296', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 51793, hash: '7701ad09d4ce6816df84cd6fc6303cefd7b0ff5a2a7c0c7a0c3b7b0f684146c3', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-X5UJMOIL.css': {size: 19605, hash: 'lJShwQNfrP4', text: () => import('./assets-chunks/styles-X5UJMOIL_css.mjs').then(m => m.default)}
  },
};
