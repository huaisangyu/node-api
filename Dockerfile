# 使用 Node 18 LTS 官方镜像
FROM node:18

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖（生产环境）
RUN npm install --production

# 复制剩余项目文件
COPY . .

# 对外暴露端口
EXPOSE 3000

# 容器启动命令
CMD ["node", "index.js"]