var Sequelize = require('sequelize');
// create a sequelize instance with our local postgres database information.
var sequelize = new Sequelize('postgres://aykwjkjxkpptab:ef229592250b0dde4a00d7434bce4dc6a72f64c0f3b1dd1194d8abf878106de1@ec2-107-21-224-76.compute-1.amazonaws.com:5432/da3366ftf8phno');


// setup User model and its fields.
var User = sequelize.define('users', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  hooks: {
  },
});

// create all the defined tables in the specified database.
sequelize.sync()
  .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
  .catch(error => console.log('This error occured', error));

// export User model for use in other files.
module.exports = User;