if (process.env.NODE_ENV === 'production') {
    module.exports = {mongoURI: 'mongodb+srv://trustme:trust@aotech-smafp.mongodb.net/test?retryWrites=true&w=majority'}
} else {
 module.exports = {mongoURI: 'mongodb://localhost:27017/TrustMeSecurity'}
}
