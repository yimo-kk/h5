'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  //修改为net,线下环境写死
  NODE_ENV: '"development"',
  root: '"http://api.jumeitd.net"'
})
