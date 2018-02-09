import org.apache.commons.lang.SystemUtils

timestamps {
    node () {

    	stage ('Build') {
    	    if (SystemUtils.IS_OS_WINDOWS) {
                bat 'npm install'
            } else {
                sh 'npm install'
            }
    	}

    	stage ('Test') {
    	    if (SystemUtils.IS_OS_WINDOWS) {
                bat 'npm test ./test/puppeteer-spectre.js'
            } else {
                sh 'npm test ./test/puppeteer-spectre.js'
            }
    	}

    }
}
