const path = require("path");
module.exports = {
    entry: "./src/app.ts",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /nodu_modules/    
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, "dist")
    },
    mode: "development"
}