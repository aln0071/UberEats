module.exports = {
  _login:
    'select * from users where username = :username and password = :password',
  _registerUser:
    'insert into users(email, password, type, name) values( :email, :password, "c", :name )',
};
