import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    categories: [],
    orders: [],
    loading: false
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    ADD_PRODUCT(state, product) {
      state.products.push(product)
    },
    UPDATE_PRODUCT(state, product) {
      const index = state.products.findIndex(p => p.id === product.id)
      if (index !== -1) {
        state.products.splice(index, 1, product)
      }
    },
    DELETE_PRODUCT(state, productId) {
      state.products = state.products.filter(p => p.id !== productId)
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories
    },
    ADD_CATEGORY(state, category) {
      state.categories.push(category)
    },
    UPDATE_CATEGORY(state, category) {
      const index = state.categories.findIndex(c => c.id === category.id)
      if (index !== -1) {
        state.categories.splice(index, 1, category)
      }
    },
    DELETE_CATEGORY(state, categoryId) {
      state.categories = state.categories.filter(c => c.id !== categoryId)
    },
    SET_ORDERS(state, orders) {
      state.orders = orders
    },
    UPDATE_ORDER(state, order) {
      const index = state.orders.findIndex(o => o.id === order.id)
      if (index !== -1) {
        state.orders.splice(index, 1, order)
      }
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      commit('SET_LOADING', true)
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        const products = [
          { id: 1, name: 'iPhone 15 Pro', price: 7999, stock: 50, category: 'electronics', status: 'active' },
          { id: 2, name: 'MacBook Pro', price: 12999, stock: 25, category: 'electronics', status: 'active' },
          { id: 3, name: 'Nike运动鞋', price: 599, stock: 100, category: 'clothing', status: 'active' }
        ]
        commit('SET_PRODUCTS', products)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async fetchCategories({ commit }) {
      commit('SET_LOADING', true)
      try {
        await new Promise(resolve => setTimeout(resolve, 800))
        const categories = [
          { id: 1, name: '电子产品', description: '手机、电脑等', productCount: 25, status: 'active' },
          { id: 2, name: '服装', description: '男装、女装等', productCount: 48, status: 'active' },
          { id: 3, name: '图书', description: '技术书籍等', productCount: 156, status: 'active' }
        ]
        commit('SET_CATEGORIES', categories)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async fetchOrders({ commit }) {
      commit('SET_LOADING', true)
      try {
        await new Promise(resolve => setTimeout(resolve, 1200))
        const orders = [
          { id: 1, orderNumber: 'ORD001', customer: { name: '张三' }, totalAmount: 9998, status: 'pending' },
          { id: 2, orderNumber: 'ORD002', customer: { name: '李四' }, totalAmount: 12999, status: 'processing' }
        ]
        commit('SET_ORDERS', orders)
      } catch (error) {
        console.error('Failed to fetch orders:', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    addProduct({ commit }, product) {
      const newProduct = {
        ...product,
        id: Date.now(),
        status: 'active'
      }
      commit('ADD_PRODUCT', newProduct)
    },
    updateProduct({ commit }, product) {
      commit('UPDATE_PRODUCT', product)
    },
    deleteProduct({ commit }, productId) {
      commit('DELETE_PRODUCT', productId)
    },
    addCategory({ commit }, category) {
      const newCategory = {
        ...category,
        id: Date.now(),
        productCount: 0,
        status: 'active'
      }
      commit('ADD_CATEGORY', newCategory)
    },
    updateCategory({ commit }, category) {
      commit('UPDATE_CATEGORY', category)
    },
    deleteCategory({ commit }, categoryId) {
      commit('DELETE_CATEGORY', categoryId)
    },
    updateOrder({ commit }, order) {
      commit('UPDATE_ORDER', order)
    }
  },
  getters: {
    activeProducts: state => state.products.filter(product => product.status === 'active'),
    productsByCategory: state => category => state.products.filter(product => product.category === category),
    totalProducts: state => state.products.length,
    totalOrders: state => state.orders.length,
    pendingOrders: state => state.orders.filter(order => order.status === 'pending').length
  }
})
