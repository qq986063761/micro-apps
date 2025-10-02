# 可支持
- 主应用在子应用不加载，就能引入子应用组件，提高性能
- 子应用之间，可在对方不加载，直接引入对方组件，提高性能
- 应用之间可以选择是否共享 vue、vuex、vue-router，共享后提高性能，但全局 $ajax、$store、$router 冲突

# 问题
- 子应用必须配 configureWebpack.optimization.splitChunks = false，不然导出的包引入时报错；这样子应用不能做包分割，但是我们可以用cdn、懒加载、异步组件分割页面和组件；
- 直接导出的组件和插件，比如 Button 组件、modal 插件，可设计成 this 数据（this.$ajax）用自己应用的，也可不用自己的二只能选一，css 只会带组件文件自己的样式，不会带自己应用内 base.scss 样式
- 子应用不加载就被使用组件的时候，内部如果有用 store 数据，需要自己初始化好或者让使用方传入参数
- 子应用不加载就被使用 element 组件时，需要子组件自己注册 element 组件

