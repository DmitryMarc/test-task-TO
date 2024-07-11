module.exports = {
    testEnvironment: 'jsdom',
    moduleFileExtensions: ["js", "ts",  "json", "vue"],
    transform: {
        "^.+\\.js$": "babel-jest",
        "^.+\\.vue$": "@vue/vue3-jest"
    }
}