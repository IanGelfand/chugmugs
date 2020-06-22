'use strict'

const db = require('../server/db')
const {User, Mug, Order} = require('../server/db/models')
const mugsSeedData = require('./mugs-seed')
const usersSeedData = require('./users-seed')
const faker = require('faker')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all(
    usersSeedData.map(user => {
      return User.create(user)
    })
  )

  const mugs = await Promise.all(
    mugsSeedData.map(mug => {
      return Mug.create(mug)
    })
  )

  for (let i = users.length - 2; i >= 0; i--) {
    const cart = await Order.create({userId: users[i].id})
    let cartMugs = {}

    users[i].update({cartId: cart.id})

    for (let j = 1; j < 4; j++) {
      let randMug = {}

      while (!randMug.id || cartMugs[randMug.id]) {
        cartMugs[randMug.id] = true
        randMug = mugs[Math.floor(Math.random() * mugs.length)]
      }

      cart.addMug(randMug, {through: {price: randMug.price}})
    }
  }

  for (let i = 0; i < 100; i++) {
    const fakeMug = {
      title: faker.commerce.product(),
      description: faker.commerce.productAdjective(),
      price: faker.random.number(),
      color: faker.commerce.color(),
      imgUrl: faker.image.imageUrl(),
      stock: faker.random.number(),
      capacity: faker.random.number()
    }
    await Mug.create(fakeMug)
  }
  // <--------------------------------------

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${mugs.length} mugs`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
