import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [
      { id: 1, name: 'iPhone 14', price: 5999, category: '手机', stock: 50, sales: 120 },
      { id: 2, name: 'MacBook Pro', price: 12999, category: '电脑', stock: 20, sales: 45 },
      { id: 3, name: 'AirPods Pro', price: 1999, category: '配件', stock: 100, sales: 200 },
      { id: 4, name: 'iPad Air', price: 4399, category: '平板', stock: 30, sales: 80 }
    ],
    categories: ['手机', '电脑', '配件', '平板'],
    orders: [
      { id: 1, productName: 'iPhone 14', customer: '张三', amount: 5999, status: 'completed' },
      { id: 2, productName: 'MacBook Pro', customer: '李四', amount: 12999, status: 'pending' },
      { id: 3, productName: 'AirPods Pro', customer: '王五', amount: 1999, status: 'shipped' }
    ],
    loading: false
  },
  getters: {
    productCount: state => state.products.length,
    productList: state => state.products,
    totalSales: state => state.products.reduce((sum, product) => sum + (product.price * product.sales), 0),
    lowStockProducts: state => state.products.filter(product => product.stock < 30),
    topSellingProducts: state => [...state.products].sort((a, b) => b.sales - a.sales).slice(0, 3)
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    ADD_PRODUCT(state, product) {
      state.products.push(product)
    },
    UPDATE_PRODUCT(state, { id, productData }) {
      const index = state.products.findIndex(product => product.id === id)
      if (index !== -1) {
        state.products.splice(index, 1, { ...state.products[index], ...productData })
      }
    },
    DELETE_PRODUCT(state, id) {
      state.products = state.products.filter(product => product.id !== id)
    },
    ADD_ORDER(state, order) {
      state.orders.push(order)
    },
    UPDATE_ORDER_STATUS(state, { id, status }) {
      const order = state.orders.find(order => order.id === id)
      if (order) {
        order.status = status
      }
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      commit('SET_LOADING', true)
      // 模拟 API 调用
      setTimeout(() => {
        commit('SET_LOADING', false)
      }, 1000)
    },
    addProduct({ commit }, product) {
      const newProduct = {
        ...product,
        id: Date.now(),
        stock: product.stock || 0,
        sales: 0
      }
      commit('ADD_PRODUCT', newProduct)
    },
    updateProduct({ commit }, productData) {
      if (productData.id) {
        commit('UPDATE_PRODUCT', { id: productData.id, productData })
      } else {
        // 如果没有 id，则添加新产品
        commit('ADD_PRODUCT', productData)
      }
    },
    deleteProduct({ commit }, id) {
      commit('DELETE_PRODUCT', id)
    },
    addOrder({ commit }, order) {
      const newOrder = {
        ...order,
        id: Date.now()
      }
      commit('ADD_ORDER', newOrder)
    },
    updateOrderStatus({ commit }, { id, status }) {
      commit('UPDATE_ORDER_STATUS', { id, status })
    },
    // 从主应用同步全局状态到本地
    syncGlobalState({ commit }, globalState) {
      // 可以根据需要同步全局状态到本地
      console.log('同步全局状态:', globalState)
    },
    // 监听主应用状态变化
    watchGlobalState({ dispatch }) {
      if (window.__POWERED_BY_QIANKUN__ && window.microAppStore) {
        // 使用 Vuex 的 watch 功能监听全局状态变化
        window.microAppStore.watch(
          (state) => state.lastUpdate,
          () => {
            const globalState = window.microAppStore.getters.globalState
            dispatch('syncGlobalState', globalState)
          },
          { immediate: true }
        )
      }
    }
  }
})
