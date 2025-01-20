
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
    'index.csr.html': {size: 25211, hash: '983896881aca7e1c019e5e15aa1c671e07ccc39d59c063152fe6e6d1de7a1a93', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17211, hash: '0ccc6b3eb4159420e02d0a4c93fe0f0089953f9d37a2b66e42b1a6dbd5a60680', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 52316, hash: '54c6a3e2dab8b0a0e291112df8ae0488b615133e6a5fa31749ac49a595868ec3', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-NORZC6OF.css': {size: 20611, hash: 'DVkIfEesptY', text: () => import('./assets-chunks/styles-NORZC6OF_css.mjs').then(m => m.default)}
  },
};
