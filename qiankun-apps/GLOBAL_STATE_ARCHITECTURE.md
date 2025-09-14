# 全局状态管理架构说明

## 概述

本项目已从使用 qiankun 的 `initGlobalState` 迁移到使用主应用的 Vuex Store 进行全局状态管理。这种架构更符合 Vue 生态的习惯，提供了更好的类型安全和开发体验。

## 架构设计

### 1. 主应用 (main)

#### Vuex Store (`main/src/store/index.js`)
- **全局状态**: 用户信息、主题、语言、通知设置等
- **子应用状态**: 跟踪各个子应用的状态
- **Actions**: 提供全局状态更新和子应用状态管理功能

#### 全局状态管理器 (`main/src/micro-apps.js`)
- 替代 `initGlobalState` 的功能
- 提供与 qiankun 兼容的 API
- 使用 Vuex Store 作为底层状态存储

### 2. 子应用 (child1, child2)

#### 本地 Vuex Store
- 管理应用内部业务状态
- 提供与主应用通信的 actions
- 监听并同步主应用的全局状态

#### 状态同步机制
- 在 `main.js` 中初始化全局状态监听
- 自动同步主应用的状态变化
- 支持向主应用发送状态更新

## 使用方法

### 在主应用中

```javascript
// 获取全局状态
this.$store.getters.globalState

// 更新全局状态
this.$store.dispatch('setGlobalState', {
  user: { name: 'New User' },
  theme: 'dark'
})

// 切换主题
this.$store.dispatch('toggleTheme')

// 显示消息
this.$store.dispatch('showMessage', 'Hello World')
```

### 在子应用中

```javascript
// 向主应用发送状态更新
this.$store.dispatch('updateGlobalState', {
  user: { name: 'Child User' },
  message: '来自子应用的消息'
})

// 监听全局状态变化（自动在 main.js 中初始化）
// 状态变化会自动同步到本地 store
```

## 优势

1. **统一的状态管理**: 使用 Vuex 统一管理所有状态
2. **类型安全**: 更好的 TypeScript 支持
3. **开发工具**: 可以使用 Vue DevTools 调试
4. **Vue 生态**: 更符合 Vue 开发者的习惯
5. **灵活性**: 可以轻松扩展状态管理功能

## 迁移对比

### 之前 (使用 initGlobalState)
```javascript
// 主应用
const actions = initGlobalState({...})
window.microAppActions = actions

// 子应用
window.microAppActions.setGlobalState(data)
```

### 现在 (使用 Vuex Store)
```javascript
// 主应用
const globalStateManager = {
  setGlobalState(newState) {
    store.dispatch('setGlobalState', newState)
  }
}
window.microAppActions = globalStateManager

// 子应用
this.$store.dispatch('updateGlobalState', data)
```

## 注意事项

1. **兼容性**: 保持了与 qiankun 的完全兼容
2. **性能**: 使用 Vuex 的响应式系统，性能更优
3. **调试**: 可以通过 Vue DevTools 查看状态变化
4. **扩展性**: 可以轻松添加新的全局状态和 actions

## 示例组件

- `main/src/components/GlobalStateExample.vue`: 主应用中的全局状态管理示例
- `child1/src/components/GlobalStateConsumer.vue`: 子应用中的全局状态消费示例

这些示例展示了如何在组件中使用新的全局状态管理系统。
