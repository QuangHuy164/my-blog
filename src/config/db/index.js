const mongoose = require('mongoose');

const connect = async () => {
    try {
         mongoose.set('strictQuery', false);
        await mongoose.connect('mongodb://localhost:27017/myblog_dev');
        console.log('success');
    } catch (error) {
        console.log('failed');
    }
};

module.exports = { connect };
