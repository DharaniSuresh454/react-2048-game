pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "dharanisuresh2005/react-2048-game"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/DharaniSuresh454/react-2048-game.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${DOCKER_IMAGE}:latest")
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                        dockerImage.push("latest")
                    }
                }
            }
        }
    }
}
