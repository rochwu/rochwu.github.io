/**
 * Handles the hack done in 404.html
 * Put it here instead of index.html just to be minimize it
 * as much as possible
 */

// Inspired by https://github.com/rafgraph/spa-github-pages
(({hash, href}) => {
  // Match 404.html magic key
  if (hash.startsWith('#?')) {
    window.history.replaceState(null, '', href.replace('/#?', ''));
  }
})(window.location);
