# 样式
  - 互不影响

# 组件通信
  - 使用 webpack5 联邦，不加载子应用就能使用组件，但有一些注意点（见项目 webpack5-vue2-apps）
  - 父子通信，每个应用定义相同的 window.$microApp 对象，同域下可互相访问（之前一体化项目 window.dd = window.parent.dd 没出过问题，可都采用简单的方式调用）

# 页面跳转
  - 利用 window.$microApp 实现参数传递跳转页面
  - 子应用在主应用内的时候，自己初始化不要随便跳页面，让主应用调子应用 toPage 方法的时候，再跳