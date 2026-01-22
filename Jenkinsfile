pipeline {
    agent any

    environment {
        DEPLOY_HOST = "112.124.50.63"
        DEPLOY_USER = "root"
        DEPLOY_PATH = "/var/project/node-api"
    }

    parameters {
        string(name: 'Branch', defaultValue: 'main', description: '选择要部署的分支')
    }

    stages {
        stage('拉取代码') {
            steps {
                echo "在宿主机拉取最新代码，分支：${params.Branch}"
                sh """
                    ssh ${DEPLOY_USER}@${DEPLOY_HOST} '
                        if [ ! -d ${DEPLOY_PATH} ]; then
                            git clone -b ${params.Branch} git@github.com:huaisangyu/node-api.git ${DEPLOY_PATH}
                        else
                            cd ${DEPLOY_PATH} && git fetch --all && git checkout ${params.Branch} && git reset --hard origin/${params.Branch}
                        fi
                    '
                """
            }
        }

        stage('安装依赖') {
            steps {
                echo "在宿主机安装依赖"
                sh """
                    ssh ${DEPLOY_USER}@${DEPLOY_HOST} '
                        cd ${DEPLOY_PATH} && npm install
                    '
                """
            }
        }

        stage('启动/重启服务') {
            steps {
                echo "使用 PM2 启动或重启 Node 服务"
                sh """
                    ssh ${DEPLOY_USER}@${DEPLOY_HOST} '
                        cd ${DEPLOY_PATH} && pm2 start index.js --name node-api --update-env || pm2 restart node-api
                        pm2 save
                    '
                """
            }
        }

        stage('查看服务状态') {
            steps {
                echo "检查服务状态"
                sh """
                    ssh ${DEPLOY_USER}@${DEPLOY_HOST} 'pm2 status node-api'
                """
            }
        }
    }

    post {
        success {
            echo "部署成功 ✅ 分支：${params.Branch}"
        }
        failure {
            echo "部署失败 ❌"
        }
    }
}