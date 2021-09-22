module.exports = {
  _login: 'select * from users where email = :email',
  _registerUser:
    'insert into users(email, password, type, name) values( :email, :password, "c", :name )',
  _getCountries: 'select * from countries',
  _getStates: 'select * from states where countrycode = :countrycode',
  _getCities: 'select * from cities where statecode = :statecode',
};
