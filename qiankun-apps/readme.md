# 微前端管理系统 Demo

这是一个基于 **Vue2 + qiankun** 的微前端架构演示项目，展示了现代微前端架构的核心特性：路由切换、样式隔离、状态管理和应用间通信。

## 🚀 项目特性

- **微前端架构**: 基于 qiankun 2.10.16 实现
- **Vue2 技术栈**: 使用 Vue 2.6.14 + Vue Router + Vuex
- **样式隔离**: 每个子应用独立的样式作用域
- **应用间通信**: 全局状态管理和事件传递
- **路由管理**: 主应用路由 + 子应用独立路由
- **主题切换**: 支持浅色/深色主题切换
- **响应式设计**: 现代化的 UI 设计

## 📁 项目结构

```
qiankun-apps/
├── main/                    # 主应用 (端口: 8080)
│   ├── src/
│   │   ├── views/          # 页面组件
│   │   │   ├── HomeView.vue        # 首页
│   │   │   ├── MicroAppView.vue    # 微应用容器
│   │   │   └── AboutView.vue       # 关于页面
│   │   ├── router/         # 路由配置
│   │   ├── store/          # 状态管理
│   │   ├── micro-apps.js   # 微应用管理
│   │   └── main.js         # 应用入口
│   ├── vue.config.js       # 构建配置
│   └── package.json
├── child1/                 # 子应用1 - 用户管理系统 (端口: 8081)
│   ├── src/
│   │   ├── views/          # 用户管理页面
│   │   │   ├── UserList.vue        # 用户列表
│   │   │   ├── UserProfile.vue     # 个人资料
│   │   │   └── UserSettings.vue    # 系统设置
│   │   ├── router/         # 子应用路由
│   │   ├── store/          # 子应用状态
│   │   ├── public-path.js  # 公共路径配置
│   │   └── main.js         # 子应用入口
│   ├── vue.config.js       # 构建配置
│   └── package.json
├── child2/                 # 子应用2 - 商品管理系统 (端口: 8082)
│   ├── src/
│   │   ├── views/          # 商品管理页面
│   │   │   ├── ProductList.vue     # 商品列表
│   │   │   ├── ProductCategory.vue # 分类管理
│   │   │   ├── ProductOrders.vue   # 订单管理
│   │   │   └── ProductAnalytics.vue # 数据分析
│   │   ├── router/         # 子应用路由
│   │   ├── store/          # 子应用状态
│   │   ├── public-path.js  # 公共路径配置
│   │   └── main.js         # 子应用入口
│   ├── vue.config.js       # 构建配置
│   └── package.json
├── start.bat              # Windows 启动脚本
├── start.sh               # Linux/Mac 启动脚本
├── package.json           # 根目录配置
└── readme.md              # 项目文档
```

## 🎯 功能特性

### 主应用 (Main App) - 端口: 8080
- **微应用管理**: 注册和管理子应用
- **全局状态管理**: 用户信息、主题、语言等全局状态
- **应用间通信**: 通过 qiankun 的 initGlobalState 实现
- **主题切换**: 支持浅色/深色主题切换
- **路由管理**: 主应用路由 + 子应用路由集成
- **系统设置**: 统一的系统配置管理

### 子应用1 (Child1) - 用户管理系统 - 端口: 8081
- **用户列表**: 用户信息的增删改查
- **个人资料**: 用户个人资料管理
- **系统设置**: 主题、通知等个性化设置
- **权限管理**: 用户角色和权限控制
- **数据统计**: 用户数量统计和状态展示

### 子应用2 (Child2) - 商品管理系统 - 端口: 8082
- **商品列表**: 商品信息的增删改查
- **分类管理**: 商品分类的创建和管理
- **订单管理**: 订单状态跟踪和处理
- **数据分析**: 销售数据统计和可视化
- **库存管理**: 库存预警和补货提醒

## 🛠 技术栈

- **前端框架**: Vue 2.6.14
- **微前端框架**: qiankun 2.10.16
- **路由管理**: Vue Router 3.5.1
- **状态管理**: Vuex 3.6.2
- **构建工具**: Vue CLI 5.0.0
- **样式处理**: SCSS + CSS3
- **开发工具**: concurrently (并发启动)

## 🚀 快速开始

### 方法一：使用启动脚本 (推荐)

**Windows 用户:**
```bash
# 双击运行 start.bat 文件
# 或在命令行中执行
start.bat
```

**Linux/Mac 用户:**
```bash
# 给脚本执行权限
chmod +x start.sh
# 运行脚本
./start.sh
```

### 方法二：使用 npm 命令

```bash
# 1. 安装所有应用的依赖
npm run install:all

# 2. 同时启动所有应用
npm run start:all

# 或者分别启动
npm run start:main    # 启动主应用 (端口: 8080)
npm run start:child1  # 启动子应用1 (端口: 8081)
npm run start:child2  # 启动子应用2 (端口: 8082)
```

### 3. 访问应用

- **主应用**: http://localhost:8080 (微前端集成访问)
- **子应用1**: http://localhost:8081 (独立访问)
- **子应用2**: http://localhost:8082 (独立访问)

> 💡 **提示**: 建议通过主应用访问，体验完整的微前端功能

## 🔧 微前端特性

### 1. 应用隔离
- **样式隔离**: 每个子应用都有独立的样式作用域，避免样式冲突
- **JavaScript 沙箱**: qiankun 提供 JS 沙箱机制，避免全局变量污染
- **独立运行**: 每个子应用都可以独立开发和部署
- **资源隔离**: 静态资源、API 请求等完全隔离

### 2. 应用间通信
- **全局状态管理**: 使用 qiankun 的 `initGlobalState` 实现应用间状态共享
- **事件通信**: 支持应用间事件传递和监听
- **Props 传递**: 主应用可以向子应用传递数据和配置
- **实时同步**: 状态变化实时同步到所有相关应用

### 3. 路由管理
- **主应用路由**: 负责整体路由管理和子应用切换
- **子应用路由**: 每个子应用有独立的路由系统
- **路由同步**: 支持浏览器前进后退，URL 状态同步
- **动态路由**: 支持动态注册和卸载子应用路由

### 4. 生命周期管理
- **bootstrap**: 应用启动前的初始化
- **mount**: 应用挂载到 DOM 容器
- **unmount**: 应用卸载和资源清理
- **update**: 应用更新时的处理逻辑

## 📖 开发指南

### 添加新的子应用

1. **创建子应用目录结构**
```bash
mkdir new-child-app
cd new-child-app
vue create . --preset default
```

2. **配置子应用**
   - 修改 `package.json` 中的 name 字段
   - 配置 `vue.config.js` 设置端口和 webpack 输出
   - 创建 `public-path.js` 文件

3. **实现生命周期函数**
```javascript
// main.js
import './public-path'

let instance = null

function render(props = {}) {
  const { container } = props
  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

export async function bootstrap() {
  console.log('[new-child-app] vue app bootstraped')
}

export async function mount(props) {
  console.log('[new-child-app] props from main framework', props)
  render(props)
}

export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}
```

4. **在主应用中注册**
```javascript
// main/src/micro-apps.js
registerMicroApps([
  {
    name: 'new-child-app',
    entry: '//localhost:8083',
    container: '#subapp-viewport',
    activeRule: '/new-app',
    props: {
      data: actions.getGlobalState(),
      actions: actions
    }
  }
])
```

### 应用间通信示例

```javascript
// 主应用中初始化全局状态
const actions = initGlobalState({
  user: { name: 'Admin', role: 'administrator' },
  theme: 'light',
  language: 'zh-CN'
})

// 子应用中监听状态变化
actions.onGlobalStateChange((state, prev) => {
  console.log('状态变化:', state, prev)
  // 处理状态变化逻辑
})

// 子应用中更新状态
actions.setGlobalState({
  theme: 'dark',
  lastUpdate: new Date().toISOString()
})
```

### 样式隔离

每个子应用使用独立的 CSS 类名前缀，避免样式冲突：

```css
/* 子应用1 - 用户管理 */
.child1-app {
  /* 用户管理相关样式 */
}

/* 子应用2 - 商品管理 */
.child2-app {
  /* 商品管理相关样式 */
}
```

## 🚀 构建部署

### 开发环境构建

```bash
# 构建所有应用
npm run build:all

# 分别构建
npm run build:main    # 构建主应用
npm run build:child1  # 构建子应用1
npm run build:child2  # 构建子应用2
```

### 生产环境部署

1. **构建所有应用**
```bash
npm run build:all
```

2. **部署到服务器**
   - 将 `main/dist` 部署到主应用服务器
   - 将 `child1/dist` 部署到子应用1服务器
   - 将 `child2/dist` 部署到子应用2服务器

3. **配置服务器路由**
```nginx
# nginx 配置示例
server {
    listen 80;
    server_name your-domain.com;
    
    # 主应用
    location / {
        root /path/to/main/dist;
        try_files $uri $uri/ /index.html;
    }
    
    # 子应用1
    location /user {
        root /path/to/main/dist;
        try_files $uri $uri/ /index.html;
    }
    
    # 子应用2
    location /product {
        root /path/to/main/dist;
        try_files $uri $uri/ /index.html;
    }
}
```

## ❓ 常见问题

### Q: 子应用无法加载？
**A:** 检查以下几点：
- 子应用是否正常启动
- 端口配置是否正确
- CORS 配置是否正确
- 网络连接是否正常

### Q: 样式冲突怎么办？
**A:** 解决方案：
- 确保每个子应用使用独立的 CSS 类名前缀
- 使用 CSS Modules 或 styled-components
- 配置 qiankun 的 strictStyleIsolation

### Q: 如何调试子应用？
**A:** 调试方法：
- 独立启动子应用进行调试
- 使用浏览器开发者工具
- 查看控制台日志和网络请求

### Q: 应用间通信不生效？
**A:** 检查：
- 全局状态是否正确初始化
- 子应用是否正确监听状态变化
- 状态更新方法是否正确调用

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系方式

如有问题，请通过以下方式联系：
- 提交 Issue: [GitHub Issues](https://github.com/your-username/qiankun-micro-frontend-demo/issues)
- 邮箱: your-email@example.com

---

⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！
