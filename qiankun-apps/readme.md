# Qiankun 微前端 Demo

这是一个基于 qiankun 的微前端架构演示项目，包含一个主应用和两个子应用，都使用 Vue2 技术栈。

## 项目结构

```
qiankun-apps/
├── main/                 # 主应用
│   ├── src/
│   │   ├── views/       # 页面组件
│   │   ├── router/      # 路由配置
│   │   ├── store/       # 状态管理
│   │   └── main.js      # 应用入口
│   └── package.json
├── child1/              # 子应用1 - 用户管理系统
│   ├── src/
│   │   ├── views/       # 用户管理相关页面
│   │   ├── router/      # 子应用路由
│   │   ├── store/       # 子应用状态
│   │   └── main.js      # 子应用入口
│   └── package.json
├── child2/              # 子应用2 - 商品管理系统
│   ├── src/
│   │   ├── views/       # 商品管理相关页面
│   │   ├── router/      # 子应用路由
│   │   ├── store/       # 子应用状态
│   │   └── main.js      # 子应用入口
│   └── package.json
└── package.json         # 根目录配置
```

## 功能特性

### 主应用 (Main App)
- **端口**: 8080
- **功能**: 
  - 子应用注册和管理
  - 全局状态管理
  - 应用间通信
  - 主题切换
  - 路由管理

### 子应用1 (Child1) - 用户管理系统
- **端口**: 8081
- **功能**:
  - 用户列表管理
  - 用户信息编辑
  - 个人资料管理
  - 系统设置
  - 用户权限管理

### 子应用2 (Child2) - 商品管理系统
- **端口**: 8082
- **功能**:
  - 商品列表管理
  - 商品分类管理
  - 订单管理
  - 数据分析
  - 销售统计

## 技术栈

- **框架**: Vue 2.6.14
- **微前端**: qiankun 2.10.16
- **路由**: Vue Router 3.5.1
- **状态管理**: Vuex 3.6.2
- **构建工具**: Vue CLI 5.0.0
- **样式**: CSS3 + Flexbox/Grid

## 快速开始

### 1. 安装依赖

```bash
# 安装所有应用的依赖
npm run install:all

# 或者分别安装
npm run install:main
npm run install:child1
npm run install:child2
```

### 2. 启动应用

```bash
# 同时启动所有应用
npm run start:all

# 或者分别启动
npm run start:main    # 启动主应用 (端口: 8080)
npm run start:child1  # 启动子应用1 (端口: 8081)
npm run start:child2  # 启动子应用2 (端口: 8082)
```

### 3. 访问应用

- 主应用: http://localhost:8080
- 子应用1: http://localhost:8081 (独立访问)
- 子应用2: http://localhost:8082 (独立访问)

## 微前端特性

### 1. 应用隔离
- **样式隔离**: 每个子应用都有独立的样式作用域
- **JavaScript 沙箱**: qiankun 提供 JS 沙箱机制，避免全局变量污染
- **独立运行**: 每个子应用都可以独立开发和部署

### 2. 应用间通信
- **全局状态管理**: 使用 qiankun 的 `initGlobalState` 实现应用间状态共享
- **事件通信**: 支持应用间事件传递
- **Props 传递**: 主应用可以向子应用传递数据

### 3. 路由管理
- **主应用路由**: 负责整体路由管理
- **子应用路由**: 每个子应用有独立的路由系统
- **路由同步**: 支持浏览器前进后退

### 4. 生命周期管理
- **bootstrap**: 应用启动前的初始化
- **mount**: 应用挂载到 DOM
- **unmount**: 应用卸载和清理

## 开发指南

### 添加新的子应用

1. 创建新的子应用目录
2. 配置 `package.json` 和 `vue.config.js`
3. 在主应用中注册新子应用
4. 实现 qiankun 生命周期函数

### 应用间通信示例

```javascript
// 主应用中初始化全局状态
const actions = initGlobalState({
  user: { name: 'Admin', role: 'administrator' },
  theme: 'light'
})

// 子应用中监听状态变化
actions.onGlobalStateChange((state, prev) => {
  console.log('状态变化:', state, prev)
})

// 子应用中更新状态
actions.setGlobalState({
  theme: 'dark'
})
```

### 样式隔离

每个子应用使用独立的 CSS 类名前缀，避免样式冲突：

```css
/* 子应用1 */
.child1-app { /* 样式 */ }

/* 子应用2 */
.child2-app { /* 样式 */ }
```

## 构建部署

### 开发环境构建

```bash
npm run build:all
```

### 生产环境部署

1. 构建所有应用
2. 将构建产物部署到对应的服务器
3. 配置 nginx 或其他服务器进行路由分发

## 常见问题

### Q: 子应用无法加载？
A: 检查子应用是否正常启动，端口是否正确，CORS 配置是否正确。

### Q: 样式冲突怎么办？
A: 确保每个子应用使用独立的 CSS 类名前缀，或者使用 CSS Modules。

### Q: 如何调试子应用？
A: 可以独立启动子应用进行调试，或者使用浏览器开发者工具。

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
