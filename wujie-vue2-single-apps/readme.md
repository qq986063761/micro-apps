# 样式
  - 互不影响
  - 主题：父应用提供主题变量

# 公用组件继承比如 Element
  - 

# 组件调用-方案1-不支持跨域
  - webpack5 联邦，不加载子应用，就能引入子应用的组件（不用一次性把所有子应用都渲染），但子应用要在组件使用前自己加载自己需要的公用数据（组织架构等数据）
  - 每个应用定义自己的 window.$app 对象，同域可引入父应用的 $app（之前我们 window.dd = window.parent.dd 没出问题）
```js
// 只能同域，这种传参可以完全保持支持复杂参数形式，可以传函数
window.parent.$app.useComp({ 
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

# 组件调用-方案2-支持跨域
  - 使用三方库（或自己写 postMessage）
```js
// 跨域方案
// 子应用调用父应用
window.parent.postMessage({
  type: 'useComp',
  name: 'addTask',
  args: [{
    // 只能单纯字符串，不能传函数、Date
    num: 1
  }]
}, '*')

// 子应用接收 cb、onVisible 等回调
window.addEventListener('message', (event) => {
  const { type, args } = event.data

  switch (type) {
    case 'comp-add-task-cb':
      // 接收 cb 参数
      console.log(args)
      break
      
    case 'comp-add-task-visible':
      // 接收 visible 参数
      console.log(args)
      break
  }
})
```

# 页面跳转
  - 利用 window.$app 实现参数传递跳转页面
  - 子应用在主应用内的时候，自己初始化后不要跳页面，等主应用调子应用 toPage 方法的时候再跳页面
  - 何时可安全调用子应用 toPage：
    - 子应用做了无界生命周期改造时：MicroApp 的 afterMount 触发即表示子应用已挂载，此时 window.$app.apps[appName].ready === true
    - 未改造时：主应用提供 whenChildReady(appName)，轮询到子应用 window.$app.toPage 存在即就绪
  - 复杂场景（先跳主应用路由再调子应用 toPage 并传 params: { init: true }）：先主应用 router.push 到子应用页，再 await window.$app.whenChildReady('child1')，然后 window.$app.toPage({ app: 'child1', route: { name: '子应用路由名', params: { init: true }, query } })

# 数据监听变化
  - 