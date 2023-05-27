module.exports = {
    // publicPath: process.env.NODE_ENV === 'production' ? '/some-path/' : '/',
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
        themeColor: '#30304a',
        display: 'standalone',
        workboxOptions: {
            // This line is required so that changes are displayed directly in the PWA.
            skipWaiting: true,
        },
    },
}
