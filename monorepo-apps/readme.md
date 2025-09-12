# Monorepo 微前端应用 Demo

这是一个基于 Vue2 + qiankun 的微前端应用示例，展示了如何在 Monorepo 结构中组织和管理多个微前端应用。

## 项目结构

```
monorepo-apps/
├── apps/                    # 应用目录
│   ├── main/               # 主应用 (qiankun 基座)
│   ├── child1/             # 子应用1 - 用户管理
│   └── child2/             # 子应用2 - 商品管理
├── packages/               # 共享包目录 (预留)
├── package.json            # 根 package.json
└── README.md              # 项目说明
```

## 技术栈

- **主应用**: Vue2 + qiankun + Element UI
- **子应用**: Vue2 + Vue Router + Element UI
- **构建工具**: Vue CLI 5
- **Node 版本**: 14.x

## 应用说明

### 主应用 (main)
- 端口: 8080
- 功能: 微前端基座应用，负责加载和管理子应用
- 路由: 首页、子应用1、子应用2

### 子应用1 (child1)
- 端口: 8081
- 功能: 用户管理系统
- 路由: 用户列表、用户详情

### 子应用2 (child2)
- 端口: 8082
- 功能: 商品管理系统
- 路由: 商品列表、商品详情

## 快速开始

### 1. 安装依赖

```bash
# 安装根目录依赖
npm install

# 安装所有应用依赖
npm run install:all
```

### 2. 启动开发环境

```bash
# 同时启动所有应用
npm run dev

# 或者分别启动
npm run dev:main    # 启动主应用 (8080)
npm run dev:child1  # 启动子应用1 (8081)
npm run dev:child2  # 启动子应用2 (8082)
```

### 3. 访问应用

- 主应用: http://localhost:8080
- 子应用1: http://localhost:8081
- 子应用2: http://localhost:8082

## 构建部署

```bash
# 构建所有应用
npm run build

# 分别构建
npm run build:main
npm run build:child1
npm run build:child2
```

## 开发说明

### 微前端配置

主应用使用 qiankun 框架来管理子应用：

```javascript
// apps/main/src/main.js
registerMicroApps([
  {
    name: 'child1',
    entry: '//localhost:8081',
    container: '#child1-container',
    activeRule: '/child1'
  },
  {
    name: 'child2',
    entry: '//localhost:8082',
    container: '#child2-container',
    activeRule: '/child2'
  }
])
```

### 子应用配置

每个子应用都需要导出 qiankun 生命周期函数：

```javascript
// 子应用 main.js
export async function bootstrap() {
  console.log('[child] vue app bootstraped')
}

export async function mount(props) {
  console.log('[child] props from main framework', props)
  render(props)
}

export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}
```

### 路由配置

子应用的路由需要根据运行环境设置不同的 base：

```javascript
// 子应用 router/index.js
const router = new VueRouter({
  mode: 'history',
  base: window.__POWERED_BY_QIANKUN__ ? '/child1' : '/',
  routes
})
```

## 特性

- ✅ Monorepo 结构管理
- ✅ 微前端架构 (qiankun)
- ✅ 独立开发和部署
- ✅ 样式隔离
- ✅ 路由管理
- ✅ 状态管理 (可扩展)
- ✅ 组件复用 (可扩展)

## 扩展建议

1. **状态管理**: 可以添加 Vuex 进行状态管理
2. **组件库**: 在 packages 目录下创建共享组件库
3. **工具库**: 创建共享的工具函数库
4. **样式主题**: 统一的设计系统和主题配置
5. **测试**: 添加单元测试和集成测试
6. **CI/CD**: 配置自动化构建和部署流程

## 注意事项

1. 确保 Node.js 版本为 14.x
2. 子应用需要支持跨域访问
3. 生产环境需要配置正确的子应用入口地址
4. 建议使用 HTTPS 协议部署生产环境

## 许可证

MIT
