const route = require('express').Router()

route.use('/generator', require('./generator'))

exports = module.exports = {
    route
}