#!/bin/bash

echo "🚀 启动 Monorepo 微前端应用..."

# 检查 Node.js 版本
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 14 ]; then
    echo "❌ 错误: 需要 Node.js 14.x 或更高版本，当前版本: $(node -v)"
    exit 1
fi

echo "✅ Node.js 版本检查通过: $(node -v)"

# 检查是否已安装依赖
if [ ! -d "node_modules" ]; then
    echo "📦 安装根目录依赖..."
    npm install
fi

# 检查子应用依赖
for app in main child1 child2; do
    if [ ! -d "apps/$app/node_modules" ]; then
        echo "📦 安装 $app 应用依赖..."
        cd "apps/$app" && npm install && cd ../..
    fi
done

echo "🎉 依赖安装完成！"
echo ""
echo "启动应用..."
echo "主应用: http://localhost:8080"
echo "子应用1: http://localhost:8081"
echo "子应用2: http://localhost:8082"
echo ""

# 启动所有应用
npm run dev
