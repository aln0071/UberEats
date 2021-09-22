module.exports = {
  _login: 'select * from users where email = :email',
  _registerUser:
    'insert into users(email, password, type, name) values( :email, :password, "c", :name )',
};
