module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
    purge: {
        layers: ['utilities'],
        content: ["./src/**/*.svelte"],
        options: {
            keyframes: true
        }
    },
    theme: {
        extend: {},
    },
    variants: {},
    plugins: [
        require('@tailwindcss/ui')
    ],
}
