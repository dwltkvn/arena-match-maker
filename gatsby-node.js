/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const fs = require("fs")

exports.onPreBootstrap = () => {
  let secrets = ""
  for (var propertyName in process.env) {
    if (
      process.env.hasOwnProperty(propertyName) &&
      ~propertyName.indexOf("GATSBY_")
    ) {
      console.log(" +++ ", propertyName)
      secrets += `${propertyName}=${process.env[propertyName]}\n`
    }
  }

  //console.log(secrets)
  fs.writeFile(".env.development", secrets, err => {
    if (err) throw err
    console.log("Dev env saved")
  })
  fs.writeFile(".env.production", secrets, err => {
    if (err) throw err
    console.log("prod env saved")
  })
}

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  if (stage === "build-html") {
    console.log(" +++ onCreateWebpackConfig/build-html")
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /firebase/,
            use: ["null-loader"],
          },
        ],
      },
    })
  }
}
