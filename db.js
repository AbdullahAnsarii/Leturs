//we will save all our critical variables in dotenv file which cannot be accessed by public i.e port number and connectionString

const monogodb = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

monogodb.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client){
    module.exports = client.db();
    const app = require('./app');
    app.listen(process.env.PORT);
})