module.exports = {
    preset: "ts-jest/presets/js-with-ts",
    testEnvironment: "node",
    watch: false,
    testPathIgnorePatterns: ["/dist/"], // dist 디렉토리에 있는 파일은 테스트에서 제외합니다.
}

