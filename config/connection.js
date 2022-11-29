const mongoose = require('mongoose');
//connecting Mongoose and creating our database
mongoose.connect('mongodb://localhost:27017/socialMediaDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


module.exports = mongoose.connection;
