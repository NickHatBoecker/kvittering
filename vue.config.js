module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/kvittering/' : '/',
    css: {
        loaderOptions: {
            scss: {
                // You need an <style lang="scss"> block anywhere with at least one line of code (e.g. comment) for this to work
                prependData: '@import "~@/assets/css/_settings.scss";',
            },
        },
    },
    pwa: {
        name: 'kvittering',
        themeColor: '#343435',
        display: 'standalone',
        workboxOptions: {
            // This line is required so that changes are displayed directly in the PWA.
            skipWaiting: true,
        },
        manifestOptions: {
            icons: [
                { src: "/favicon.ico", type: "image/x-icon", sizes: "16x16 32x32" },
                { src: "/icon-192.png", type: "image/png", sizes: "192x192" },
                { src: "/icon-512.png", type: "image/png", sizes: "512x512" },
                { src: "/icon-192-maskable.png", type: "image/png", sizes: "192x192", purpose: "maskable" },
                { src: "/icon-512-maskable.png", type: "image/png", sizes: "512x512", purpose: "maskable" },
            ],
        },
    },
}
