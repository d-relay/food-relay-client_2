import sveltePreprocess from 'svelte-preprocess';

export const defaults = {
  script: 'typescript'
};

export default {
  // Real svelte-preprocess configuration is in `rollup.config.js`
  // This is only for the language server for VS Code and svelte-check
  preprocess: sveltePreprocess({ defaults }),
  defaults
};

