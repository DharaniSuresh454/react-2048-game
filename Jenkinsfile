pipeline {
    agent any

    environment {
        DOCKER_HUB_REPO = "dharanisuresh2005/react-2048-game"
        CONTAINER_NAME = "react-2048-container"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/DharaniSuresh454/react-2048-game'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t $DOCKER_HUB_REPO .'
                }
            }
        }

        stage('Login to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                sh 'docker push $DOCKER_HUB_REPO'
            }
        }

        stage('Run Container') {
            steps {
                script {
                    // Stop and remove old container if already running
                    sh '''
                        docker rm -f $CONTAINER_NAME || true
                        docker run -d --name $CONTAINER_NAME -p 80:80 $DOCKER_HUB_REPO
                    '''
                }
            }
        }
    }
}