const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/main.tsx", // 어떤 파일을 진입점으로 번들링할지
  output: {
    clean: true, // 번들링 전에 dist 폴더를 비워줘요
    filename: "[name].[contenthash].js", // 번들로 만들어질 파일 이름
    chunkFilename: "[name].[contenthash].js",
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
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // 이미지 파일 확장자
        type: "asset", // Asset Modules 사용
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // 폰트 파일 확장자
        type: "asset/resource", // 폰트는 항상 별도 파일로 내보내요
        generator: {
          filename: "assets/[name][ext]", // 원하는 폴더와 이름 형태로 설정
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"], // 파일을 import할 때 확장자를 생략할 수 있어요. TypeScript와 JavaScript를 혼용하는 프로젝트에서 설정해두면 좋아요.
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // 템플릿 HTML
      filename: "index.html", // 출력될 HTML 파일 이름
      inject: true, // <script> 태그 자동 삽입
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"), // 빌드된 파일을 이 경로에서 서빙해요
    },
    port: 3000, // localhost:3000에서 실행
    open: true, // 서버 실행 시 브라우저 자동 열기
    hot: true, // HMR 사용
    historyApiFallback: true, // SPA 라우팅 지원
    client: {
      overlay: true, // 에러 발생 시 브라우저에 띄워줘요
    },
  },
};
