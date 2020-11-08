module.exports = {
  experimental: {
    applyComplexClasses: true,
    uniformColorPalette: true
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  purge: {
    enabled: false,
    layers: ['utilities'],
    content: ['./src/**/*.svelte', './src/**/*.html'],
    options: {
      keyframes: true
    }
  },
  theme: {
    extend: {}
  },
  variants: {},
  plugins: [require('@tailwindcss/ui')]
};
