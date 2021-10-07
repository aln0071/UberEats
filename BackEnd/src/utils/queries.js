module.exports = {
  _login:
    'select * from users u left join locations l on u.locationid = l.locationid left join cities c on l.citycode = c.citycode left join states s on c.statecode = s.statecode left join countries cn on s.countrycode = cn.countrycode left join restaurants r on u.userid = r.restaurantid where email = :email',
  _register:
    'insert into users(email, password, type, name) values( :email, :password, :type, :name )',
  _updateProfile: 'update users set :optionalfields where userid = :userid',
  _updateLocationInUserTable:
    'update users set locationid = :locationid where userid = :userid',
  _addLocation:
    'insert into locations (citycode, location, zip) values ( :citycode, :location, :zip )',
  _getCountries: 'select * from countries',
  _getStates: 'select * from states where countrycode = :countrycode',
  _getAllStates: 'select * from states',
  _getCities: 'select * from cities where statecode = :statecode',
  _getAllCities: 'select * from cities',
  _findUserWithEmail: 'select * from users where email = :email',
  _getLocation:
    'select * from locations where citycode = :citycode and location = :location and zip = :zip',
  _addDishQuery:
    'insert into dishes ( :optionalfields ) values( :optionalvalues )',
  _getAllDishes: 'select * from dishes where restaurantid = :restaurantid',
  _getAllDishesFromAllRestaurants: 'select * from dishes',
  _getAllRestaurants:
    'select * from users u left join locations l on u.locationid = l.locationid left join cities c on l.citycode = c.citycode left join states s on c.statecode = s.statecode left join countries cn on s.countrycode = cn.countrycode where type = "r"',
  _getAllRestaurantsByCity:
    'select * from users u left join locations l on u.locationid = l.locationid left join cities c on l.citycode = c.citycode left join states s on c.statecode = s.statecode left join countries cn on s.countrycode = cn.countrycode left join restaurants r on u.userid = r.restaurantid where type = "r" and c.citycode = :citycode',
  _addRestaurantDetails:
    'insert into restaurants ( restaurantid ) values ( :restaurantid )',
  _updateRestaurantDetails:
    'update restaurants set :optionalfields where restaurantid = :restaurantid',
  _getAllRelatedAddresses:
    'select * from (select userid, locationid from users where userid = :userid union select * from locationrel where userid = :userid) as temp natural join locations natural join cities',
};
