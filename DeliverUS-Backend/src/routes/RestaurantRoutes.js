import RestaurantController from '../controllers/RestaurantController.js'

const loadFileRoutes = function (app) {

  app.route('/restaurants') 
  .get( 
    RestaurantController.index) 
  .post( 
    RestaurantController.create)

  app.route('/restaurants/:restaurantId') //no se ponen las llaves {}, se pone dos puntos :
  .get(
  RestaurantController.show)
  .put(
    RestaurantController.update)
  .delete(
    RestaurantController.destroy)
}
export default loadFileRoutes
