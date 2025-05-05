pipeline {
    agent any

    tools {
        nodejs "Node20"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci --legacy-peer-deps --no-cache'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint || true'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t nextjs-portfolio:${BUILD_NUMBER} .'
                sh 'docker tag nextjs-portfolio:${BUILD_NUMBER} nextjs-portfolio:latest'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker stop portfolio-container || true'
                sh 'docker rm portfolio-container || true'

                // Run the new container
                sh 'docker run -d -p 80:80 --name portfolio-container nextjs-portfolio:${BUILD_NUMBER}'

                // Clean up old images (keeping the latest 3)
                sh '''
                    docker images nextjs-portfolio --format "{{.Repository}}:{{.Tag}}" |
                    grep -v latest |
                    sort -r |
                    tail -n +4 |
                    xargs -r docker rmi -f || true
                '''
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo "Deployment successful!"
        }
        failure {
            echo "Deployment failed!"
        }
    }
}