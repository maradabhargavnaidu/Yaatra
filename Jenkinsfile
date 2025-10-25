pipeline {
    agent any

    tools {
        nodejs "node"
    }
    environment{
        DOCKER_IMAGE = "maradabhargavnaidu/yaatra"
    }
    stages {
        stage('Cloning') {
            steps {
                git 'https://github.com/maradabhargavnaidu/Yaatra'
            }
        }
        stage('Installing'){
            steps{
                sh 'npm install'
            }
        }
        stage('Build Docker Image'){
            steps{
                 sh 'docker build -t $DOCKER_IMAGE:$BUILD_NUMBER .'
            }
        }
        stage('Pushing Image to Docker'){
            steps{
                withCredentials([usernamePassword(credentialsId:'docker-creds',usernameVariable:'USERNAME',passwordVariable:'PASSWORD')]){
                    sh """
                        echo $PASSWORD | docker login -u $USERNAME --password-stdin
                        docker push $DOCKER_IMAGE:$BUILD_NUMBER
                    """
                }
            }
        }
        stage('Deploy to AKS'){
            steps{
                withCredentials([file(credentialsId:'aks-config',variable:'KUBECONFIG')]){
                    sh '''
                        kubectl config use-context clusterone
                        kubectl set image deployment/yaatra yaatra=$DOCKER_IMAGE:$BUILD_NUMBER --namespace=default
                    '''
                }
            }
        }
    }
}
