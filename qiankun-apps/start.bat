@echo off
echo ========================================
echo   微前端管理系统启动脚本
echo   Vue2 + qiankun 微前端架构
echo ========================================
echo.

echo 正在启动所有应用...

echo.
echo [1/3] 启动主应用 (端口: 8080)...
start "主应用 - Main App" cmd /k "cd main && npm run serve"

timeout /t 5 /nobreak > nul

echo [2/3] 启动子应用1 - 用户管理 (端口: 8081)...
start "子应用1 - User Management" cmd /k "cd child1 && npm run serve"

timeout /t 5 /nobreak > nul

echo [3/3] 启动子应用2 - 商品管理 (端口: 8082)...
start "子应用2 - Product Management" cmd /k "cd child2 && npm run serve"

echo.
echo ========================================
echo   所有应用启动完成！
echo ========================================
echo.
echo 访问地址:
echo   主应用:     http://localhost:8080
echo   子应用1:    http://localhost:8081 (独立访问)
echo   子应用2:    http://localhost:8082 (独立访问)
echo.
echo 微前端功能:
echo   - 路由切换: 在主应用中切换不同子应用
echo   - 样式隔离: 每个子应用独立的样式作用域
echo   - 状态管理: 全局状态共享和局部状态管理
echo   - 应用通信: 子应用间数据通信和事件传递
echo.
echo 请等待所有应用完全启动后再访问主应用
echo 按任意键关闭此窗口...
pause > nul
