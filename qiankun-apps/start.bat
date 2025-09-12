@echo off
echo 启动 Qiankun 微前端 Demo...
echo.

echo 正在安装依赖...
call npm run install:all
if %errorlevel% neq 0 (
    echo 依赖安装失败！
    pause
    exit /b 1
)

echo.
echo 依赖安装完成，正在启动应用...
echo 主应用将在 http://localhost:8080 启动
echo 子应用1将在 http://localhost:8081 启动  
echo 子应用2将在 http://localhost:8082 启动
echo.

call npm run start:all

pause
