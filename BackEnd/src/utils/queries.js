/* eslint max-len: 0 */
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
  _placeOrder:
    'insert into orders (userid, restaurantid, locationid, status, created, price, deliverymode) values( :userid, :restaurantid, :locationid, 1, :created, :price, :deliverymode )',
  _addRelatedAddress:
    'insert into locationrel (userid, locationid) values ( :userid, :locationid )',
  _addOrderDetails: 'insert into orderdetails values :fields',
  _getOrderList:
    'select o.*, l.*, u.name from orders o left join users u on o.restaurantid = u.userid left join locations l on o.locationid = l.locationid where o.userid = :userid',
  _getOrderDetails:
    'select * from orderdetails natural join dishes where orderid in (select orderid from orders where userid = :userid)',
  _getOrderListOfRestaurant:
    'select * from orders o left join locations l on o.locationid = l.locationid  where restaurantid = :restaurantid',
  _getOrderDetailsOfRestaurant:
    'select * from orderdetails natural join dishes where restaurantid = :restaurantid',
  _updateOrders: 'update orders set :optionalfields where orderid = :orderid',
  _addFavorite:
    'insert into favorites(userid, restaurantid) values ( :userid, :restaurantid )',
  _removeFavorite:
    'delete from favorites where userid = :userid and restaurantid = :restaurantid',
  // _getFavorites: 'select * from favorites f left join (select * from users u left join locations l on u.locationid = l.locationid left join cities c on l.citycode = c.citycode left join states s on c.statecode = s.statecode left join countries cn on s.countrycode = cn.countrycode where type = "r") as a on a.userid = f.restaurantid where f.userid = :userid'
  _getFavorites: 'select restaurantid from favorites where userid = :userid',
};
