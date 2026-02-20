<template>
  <div class="side-menu">
    <div class="menu-header">
      <h2>微前端应用</h2>
    </div>
    <ul class="menu-list">
      <li 
        v-for="item in menuItems" 
        :key="item.routeName"
        :class="{ active: currentRouteName === item.routeName }"
        @click="navigateTo(item)"
      >
        <i :class="item.icon"></i>
        <span>{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SideMenu',
  data() {
    return {
      menuItems: [
        {
          routeName: 'home',
          name: '首页',
          icon: 'el-icon-house'
        },
        {
          routeName: 'child1',
          name: 'Child1',
          icon: 'el-icon-document',
          childApp: 'child1',
          childRoute: {
            name: 'home',
            params: { init: true },
            query: {}
          }
        },
        {
          routeName: 'child2',
          name: 'Child2',
          icon: 'el-icon-folder',
          childApp: 'child2',
          childRoute: {
            name: 'home',
            params: { init: true },
            query: {}
          }
        }
      ]
    }
  },
  computed: {
    currentRouteName() {
      return this.$route.name
    }
  },
  methods: {
    navigateTo(item) {
      const { routeName, childApp, childRoute } = item

      // 子应用跳转
      if (childApp) {
        window.$app.to({
          app: childApp,
          ...childRoute
        })
      } else {
        this.$router.push({ name: routeName })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.side-menu {
  width: 200px;
  height: 100vh;
  background: #304156;
  color: #bfcbd9;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;

  .menu-header {
    padding: 20px;
    border-bottom: 1px solid #434a50;
    
    h2 {
      color: #fff;
      margin: 0;
      font-size: 18px;
      font-weight: 500;
    }
  }

  .menu-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 15px 20px;
      cursor: pointer;
      transition: all 0.3s;
      border-bottom: 1px solid #434a50;
      display: flex;
      align-items: center;

      &:hover {
        background: #263445;
        color: #fff;
      }

      &.active {
        background: #409eff;
        color: #fff;
      }

      i {
        margin-right: 10px;
        font-size: 16px;
      }

      span {
        font-size: 14px;
      }
    }
  }
}
</style>
