import router from '@/router'
import store from '@/store'

// 提供给子应用
window.$mApp = {
  vm: null,
  store,
  router,
  toPage({ routeName = '', params, query, method = 'replace' }) {
    router[method]({
      name: routeName,
      params,
      query
    })
  }
}

/**
 * 安全地获取父应用的组件
 * @param {string} componentName - 组件名称
 * @returns {Object|null} 组件对象或null
 */
function getParentComponent(componentName) {
  try {
    // 检查是否在同域环境下
    if (window.parent === window) {
      console.warn('[子应用] 无法访问父应用，可能处于独立运行模式')
      return null
    }
    
    // 检查父应用的 $mApp 对象是否存在
    if (!window.parent || !window.parent.$mApp) {
      console.warn('[子应用] 父应用的 $mApp 对象不存在')
      return null
    }
    
    // 检查 components 是否存在
    if (!window.parent.$mApp.components) {
      console.warn('[子应用] 父应用的 components 未定义')
      return null
    }
    
    const component = window.parent.$mApp.components[componentName]
    if (!component) {
      console.warn(`[子应用] 父应用组件 ${componentName} 不存在`)
      return null
    }
    
    return component
  } catch (error) {
    // 跨域情况下会抛出错误
    console.error(`[子应用] 获取父应用组件 ${componentName} 失败:`, error.message)
    return null
  }
}

export default {
  async install(Vue) {
    // 方案1: 使用 window.parent（当前方案，适合同域场景）
    // 优点：简单直接，实现快速
    // 缺点：不支持跨域，耦合度高
    
    const Comp1 = getParentComponent('Comp1')
    const Comp2 = getParentComponent('Comp2')
    
    if (Comp1) {
      Vue.component('Comp1', Comp1)
    }
    if (Comp2) {
      Vue.component('Comp2', Comp2)
    }
    
    // 方案2: 使用 wujie 的 props（推荐，支持跨域）
    // 如果使用 props，可以通过 window.$wujie.props 获取
    // 示例：
    // if (window.$wujie && window.$wujie.props && window.$wujie.props.components) {
    //   const { Comp1, Comp2 } = window.$wujie.props.components
    //   Comp1 && Vue.component('Comp1', Comp1)
    //   Comp2 && Vue.component('Comp2', Comp2)
    // }
  }
}