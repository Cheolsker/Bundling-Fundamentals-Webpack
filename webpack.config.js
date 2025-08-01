const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/main.tsx", // 어떤 파일을 진입점으로 번들링할지
  output: {
    filename: "bundle.js", // 번들로 만들어질 파일 이름
    path: path.resolve(__dirname, "dist"), // 번들 파일이 어디에 저장될지
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // .ts와 .tsx 파일을 대상으로
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env", // 최신 JS 문법을 변환해요
                "@babel/preset-react", // JSX를 변환해요
                "@babel/preset-typescript", // 타입스크립트를 변환해요
              ],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // .css 파일을 처리해요
        use: [
          "style-loader", // CSS를 <style> 태그로 주입해요
          "css-loader", // CSS를 JavaScript 모듈로 변환해요
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"], // 파일을 import할 때 확장자를 생략할 수 있어요. TypeScript와 JavaScript를 혼용하는 프로젝트에서 설정해두면 좋아요.
  },
};
