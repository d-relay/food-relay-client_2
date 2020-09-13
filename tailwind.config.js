module.exports = {
    purge: {
        content: ["./src/**/*.svelte"],
        options: {
            keyframes: true
        }
    },
    variants: {},
    plugins: [
        require('@tailwindcss/ui')
    ]
}