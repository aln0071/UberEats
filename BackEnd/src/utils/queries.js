module.exports = {
  _login: 'select * from users where email = :email',
  _register:
    'insert into users(email, password, type, name) values( :email, :password, :type, :name )',
  _updateLocationInUserTable:
    'update users set locationid = :locationid where userid = :userid',
  _addLocation:
    'insert into locations (citycode, location, zip) values ( :citycode, :location, :zip )',
  _getCountries: 'select * from countries',
  _getStates: 'select * from states where countrycode = :countrycode',
  _getCities: 'select * from cities where statecode = :statecode',
};
