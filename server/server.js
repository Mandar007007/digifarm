const server = require('./app')
const {connectDatabase} = require('./config/database')

connectDatabase()



server.listen(3000, () => {
    console.log('listening on 3000');
});