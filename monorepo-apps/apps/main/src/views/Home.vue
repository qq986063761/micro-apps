<template>
  <div class="home-content">
    <h1>欢迎使用微前端应用</h1>
    <p>这是一个基于 Vue2 + qiankun 的微前端应用示例</p>
    <p>点击上方导航菜单可以访问不同的子应用</p>
    
    <el-card class="info-card" style="margin-top: 30px;">
      <div slot="header">
        <span>应用信息</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="app-info">
            <h3>主应用</h3>
            <p>端口: 8080</p>
            <p>技术栈: Vue2 + qiankun</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="app-info">
            <h3>子应用1</h3>
            <p>端口: 8081</p>
            <p>技术栈: Vue2</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="app-info">
            <h3>子应用2</h3>
            <p>端口: 8082</p>
            <p>技术栈: Vue2</p>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.app-info {
  text-align: center;
  padding: 20px;
}

.app-info h3 {
  color: #409eff;
  margin-bottom: 10px;
}

.app-info p {
  margin: 5px 0;
  color: #666;
}
</style>
