pipeline {
    agent any

    stages {
        stage('Git Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/DharaniSuresh454/react-2048-game'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t react-2048-app:latest .'
            }
        }

        stage('Remove Old Container') {
            steps {
                sh '''
                    if [ $(docker ps -aq -f name=react-2048-container) ]; then
                        docker stop react-2048-container || true
                        docker rm react-2048-container || true
                    fi
                '''
            }
        }

        stage('Run New Container') {
            steps {
                sh 'docker run -d --name react-2048-container -p 8081:80 react-2048-app:latest'
            }
        }
    }
}