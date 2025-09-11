# Webpack5 Module Federation 微前端配置

## 项目结构

```
micro-apps/
├── webpack5-main/          # 主应用 (宿主应用)
├── webpack5-child1/        # 子应用1 (远程模块)
├── webpack5-child2/        # 子应用2 (远程模块)
├── start-micro-apps.sh     # 启动脚本
└── README-微前端配置.md    # 说明文档
```

## 配置说明

### 1. 主应用 (webpack5-main)
- **端口**: 8080
- **角色**: 宿主应用，消费来自子应用的模块
- **配置**: 在 `vue.config.js` 中配置 `remotes` 来引用子应用

### 2. 子应用1 (webpack5-child1)
- **端口**: 8081
- **角色**: 远程模块提供者
- **暴露组件**: 
  - `./HelloWorld` - HelloWorld 组件
  - `./AboutView` - About 页面组件

### 3. 子应用2 (webpack5-child2)
- **端口**: 8082
- **角色**: 远程模块提供者
- **暴露组件**:
  - `./HelloWorld` - HelloWorld 组件
  - `./HomeView` - Home 页面组件

## 核心配置

### ModuleFederationPlugin 配置

#### 主应用配置
```javascript
new ModuleFederationPlugin({
  name: 'main',
  remotes: {
    child1: 'child1@http://localhost:8081/remoteEntry.js',
    child2: 'child2@http://localhost:8082/remoteEntry.js'
  },
  shared: {
    vue: { singleton: true, requiredVersion: '^2.6.14' },
    'vue-router': { singleton: true, requiredVersion: '^3.5.1' },
    vuex: { singleton: true, requiredVersion: '^3.6.2' }
  }
})
```

#### 子应用配置
```javascript
new ModuleFederationPlugin({
  name: 'child1', // 或 'child2'
  filename: 'remoteEntry.js',
  exposes: {
    './HelloWorld': './src/components/HelloWorld.vue',
    './AboutView': './src/views/AboutView.vue' // 或 './HomeView'
  },
  shared: {
    vue: { singleton: true, requiredVersion: '^2.6.14' },
    'vue-router': { singleton: true, requiredVersion: '^3.5.1' },
    vuex: { singleton: true, requiredVersion: '^3.6.2' }
  }
})
```

## 启动方式

### 方式1: 使用启动脚本 (推荐)
```bash
cd /Users/wanpeng/Documents/micro-apps
./start-micro-apps.sh
```

### 方式2: 手动启动
需要同时启动三个应用：

```bash
# 终端1 - 启动主应用
cd webpack5-main
npm run serve

# 终端2 - 启动子应用1
cd webpack5-child1
npm run serve

# 终端3 - 启动子应用2
cd webpack5-child2
npm run serve
```

## 访问地址

- **主应用**: http://localhost:8080
- **子应用1**: http://localhost:8081
- **子应用2**: http://localhost:8082

## 功能特性

### 主应用功能
- 展示本地 HelloWorld 组件
- 动态加载并展示来自 child1 和 child2 的组件
- 错误处理和加载状态显示

### Child1 应用功能
- 提供 HelloWorld 组件 (紫色渐变主题)
- 提供 About 页面组件 (粉色渐变主题)
- 包含交互式计数器功能

### Child2 应用功能
- 提供 HelloWorld 组件 (蓝色渐变主题)
- 提供 Home 页面组件 (青色渐变主题)
- 包含实时时间显示和交互功能

## 技术特点

1. **共享依赖**: Vue、Vue Router、Vuex 等核心依赖在应用间共享
2. **独立部署**: 每个应用可以独立开发和部署
3. **动态加载**: 组件按需动态加载，提高性能
4. **样式隔离**: 每个组件都有独立的样式作用域
5. **错误处理**: 完善的错误处理和加载状态管理

## 开发建议

1. **启动顺序**: 建议先启动子应用，再启动主应用
2. **端口配置**: 确保端口不冲突 (8080, 8081, 8082)
3. **依赖版本**: 保持共享依赖版本一致
4. **组件命名**: 避免组件名称冲突
5. **样式隔离**: 使用 scoped 样式避免样式污染

## 故障排除

### 常见问题

1. **组件加载失败**
   - 检查子应用是否正常启动
   - 检查端口配置是否正确
   - 检查网络连接

2. **样式问题**
   - 确保使用 scoped 样式
   - 检查 CSS 加载顺序

3. **依赖冲突**
   - 确保共享依赖版本一致
   - 检查 package.json 配置

### 调试技巧

1. 打开浏览器开发者工具查看网络请求
2. 检查控制台错误信息
3. 验证 remoteEntry.js 文件是否可访问
4. 检查组件导入路径是否正确

## 扩展功能

可以考虑添加的功能：
- 路由级别的微前端集成
- 状态管理共享
- 主题和样式系统
- 错误边界处理
- 性能监控
- 热更新支持
