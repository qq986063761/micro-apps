# 无界微前端
- 用法和 iframe 一样，比 iframe 渲染更快体验更好

# 样式隔离
- 支持沙箱隔离子应用，互相样式不冲突

# 通信
- 可利用 window 调用，也可用 wujie bus 事件
- 子应用调主应用：访问 window.parent.$microApp 我们定方法就行
- 主应用调子应用：访问 child.window.$microApp 我们定方法就行
- 子应用互相调：让所有子应用同时存在，然后访问 window.parent.$microApp 通过父调用 child.window.$microApp 的方法

# 路由
- 每个应用路由独立，通过通信方法通知其他应用跳转路由

# 状态管理
- 每个应用 store 独立，通过通信方法通知其他应用修改状态数据