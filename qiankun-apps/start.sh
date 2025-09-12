#!/bin/bash

echo "启动 Qiankun 微前端 Demo..."
echo

echo "正在安装依赖..."
npm run install:all
if [ $? -ne 0 ]; then
    echo "依赖安装失败！"
    exit 1
fi

echo
echo "依赖安装完成，正在启动应用..."
echo "主应用将在 http://localhost:8080 启动"
echo "子应用1将在 http://localhost:8081 启动"
echo "子应用2将在 http://localhost:8082 启动"
echo

npm run start:all
