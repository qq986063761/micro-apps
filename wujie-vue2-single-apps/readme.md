# 样式
  - 原理类似 iframe，样式互不影响
  - 主题：父应用提供主题变量

# 三方公用组件
  - 比如 Element，可以二次开发生成自己的 cdn，每个应用引用

# 跨应用调用组件
  - webpack5 联邦，不加载子应用，就能引入子应用的组件（不用一次性把所有子应用都渲染），但子应用要在组件使用前自己加载自己需要的公用数据（组织架构等数据）
  - 每个应用定义自己的 window.$app 对象。子应用拿主应用 $app 的方式：
    - **推荐**：主应用通过无界 `:props` 注入 `$app`，子应用用 `window.$wujie.props.$app` 获取，**主子和子不同域名时也能用**（无界注入，不涉及跨 frame 访问）。
    - 同域时也可用 `window.parent.$app`，但主/子部署到不同域名后会被浏览器同源策略拦截，不能再用。
  - 子应用内建议写法：`const $app = window.$wujie?.props?.$app ?? window.parent?.$app`（优先 props，兼容同域与独立运行）
```js
// 推荐：从 props 取（跨域安全）；仅同域时可用 window.parent.$app
const $app = window.$wujie?.props?.$app ?? window.parent?.$app
$app.use({ 
  app: 'okr', 
  name = 'addTask', 
  method = 'show', 
  args = [{
    num: 1,
    cb: (data) => {
      console.log(data)
    },
    onVisible: (val) => {
      console.log(data)
    }
  }]
}
```

# 页面跳转
  - 利用 window.$app 实现参数传递跳转页面
  - 子应用在主应用内的时候，自己初始化后不要跳页面，等主应用调子应用 to 方法的时候再跳页面

# 数据变化后通知其他应用
  - 