import org.apache.commons.lang.SystemUtils

timestamps {
    node () {
        stage ('puppeteer-spectre-spotify-logo - Checkout') {
            checkout([
                $class: 'GitSCM',
                branches: [[name: '*/master']],
                doGenerateSubmoduleConfigurations: false,
                extensions: [],
                submoduleCfg: [],
                userRemoteConfigs: [[
                    credentialsId: 'c26adecf-6375-4562-9872-2e94e387017e',
                    url: 'git@github.com:weaddquality/javascript-visual-regression.git'
                ]]
            ])
    	}

    	stage ('puppeteer-spectre-spotify-logo - Build') {

    	    if (SystemUtils.IS_OS_WINDOWS){
                bat 'npm install'
                bat 'npm test ./test/puppeteer-spectre.js'
            }

            else if (SystemUtils.IS_OS_LINUX){
                sh 'npm install'
                sh 'npm test ./test/puppeteer-spectre.js'
            }

            else if (SystemUtils.IS_OS_MAC){
                sh 'npm install'
                sh 'npm test ./test/puppeteer-spectre.js'
            }
    	}
    }
}
