const AWS = require('aws-sdk')

function createSDK(config) {
  // http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html
  let profile = process.env.AWS_PROFILE || config.get('quadro.aws.profile') || 'default'
  AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile })

  // https://aws.amazon.com/blogs/developer/support-for-promises-in-the-sdk/
  AWS.config.setPromisesDependency(Promise)

  // http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-region.html
  let region = process.env.AWS_REGION || config.get('quadro.aws.region')
  AWS.config.update({ region })
  return AWS
}

// Expose an SDK factory for testing
let app = Q.app
let container = Q.container
if (app.env === 'test') container.register('aws-factory', createSDK)

module.exports = createSDK
