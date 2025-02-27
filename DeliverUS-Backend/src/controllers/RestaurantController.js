import { Restaurant, Product, RestaurantCategory, ProductCategory } from '../models/models.js'

const index = async function (req, res) { //funcion asincrona: no se queda esperando, hace otras operaciones mientras.
  try { //req=request, res=response
    const restaurants = await Restaurant.findAll( //uso await pq es asincrona
      {
        attributes: { exclude: ['userId'] }, //excluye la foreing key userId
        include:
      {
        model: RestaurantCategory,
        as: 'restaurantCategory'
      },
        order: [[{ model: RestaurantCategory, as: 'restaurantCategory' }, 'name', 'ASC']]
      }
    )
    res.json(restaurants)
  } catch (err) {
    res.status(500).send(err)
  }
}

// TODO: Complete the following functions

const create = async function (req, res) {
  const newRestaurant = Restaurant.build(req.body) //req.body es la info del restaurante
   // newRestaurant.userId = req.user.id // authenticated user
 newRestaurant.userId = 1
 try {
  const restaurant = await newRestaurant.save() //con .save se guarda en la base de datos
  res.json(restaurant)
} catch (err) {
    res.status(500).send(err)
}
}

const show = async function (req, res) {
try{
  const restaurant = await Restaurant.findByPk(req.params.restaurantId, {
    attributes: {exclude: ['userId']},
    include: [{
      model:Product,
      as: 'products',
      include: {model:ProductCategory, as: 'productCategory'}
    },
  {
    model:RestaurantCategory,
    as:'restaurantCategory'
  }],
  order: [[{model:Product, as:'products'}, 'order', 'ASC']] //ordena los productos de manera ascendente
  }
  ) 
  res.json(restaurant)
} catch (err){
  res.status(500).send(err)
}
}

const update = async function (req, res) {
try{
  await Restaurant.update(req.body, { where: {id: req.params.restaurantId}})
  const updatedRestaurant = await Restaurant.findByPk(req.params.restaurantId)
  res.json(updatedRestaurant)
} catch (err){
  res.status(500).send(err)
 }
}

const destroy = async function (req, res) {
try{
  const result = await Restaurant.destroy({where: { id: req.params.restaurantId}})
  let message = ''
  if(result ===1){
    message = 'sucessfuly deleted restaurant id.' + req.params.restaurantId
  }else{
    message = 'Could not delete restaurant.'
  }
  res.json(message)
} catch (err){
  res.status(500).send(err)
}
}

const RestaurantController = {
  index,
  create,
  show,
  update,
  destroy
}
export default RestaurantController
