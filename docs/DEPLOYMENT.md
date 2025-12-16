# 本地部署指南

## 环境要求
- Node.js ≥ 18（推荐 18.18+ 或 20 LTS）
- npm ≥ 9（或 pnpm/yarn，以下示例使用 npm）

## 安装步骤
- 安装依赖：`npm install`
- 开发启动：`npm run dev`（启动后显示本地访问地址，例如 `http://localhost:3000/`）
- 生产构建：`npm run build`
- 预览生产构建：`npm run preview`（默认 `http://localhost:4173/`）

## 配置说明
- 精选作品数据源：`public/artworks/config.json`
- 作品图片：`public/artworks/images/*`
- 服务层加载策略：
  - 请求路径：`/artworks/config.json?t=<timestamp>`
  - 强制禁用浏览器缓存（`Cache-Control: no-store`）
  - 5 分钟内存缓存命中（按语言）

## 启动命令
- 开发模式：`npm run dev`
- 构建产物：`npm run build`
- 本地预览：`npm run preview`

## 本地功能验证
- 多语言切换：
  - 进入首页，确认英文精选作品显示正常
  - 点击导航右上角切换按钮切换到中文
  - 观察精选作品列表应显示 6 条中文作品
  - 再切回英文，列表正常
- 网络请求验证：
  - 打开浏览器开发者工具 Network 面板
  - 搜索 `config.json`，确认切到中文时出现一次 `200 OK` 请求
  - 请求 URL 包含 `?t=<timestamp>`，响应体包含 `zh` 节点数据
- 控制台日志：
  - 无 `Error fetching artworks` 报错
  - 切换语言时不出现异常

