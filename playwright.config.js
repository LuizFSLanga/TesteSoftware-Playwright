const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    timeout: 15000,

    reporter: [
        ['list'],
        ['html', { open: 'never' }]
    ],

    use: {
        baseURL: 'http://127.0.0.1:5173',
        trace: 'retain-on-failure'
    },

    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome']
            }
        }
    ],

    webServer: {
        command: 'node server.js',
        url: 'http://127.0.0.1:5173',
        reuseExistingServer: true
    }
});