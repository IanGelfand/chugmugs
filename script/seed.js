'use strict'

const db = require('../server/db')
const {User, Mug, MugOrder, Order} = require('../server/db/models')
const mugsSeedData = require('./mugs-seed')
const usersSeedData = require('./users-seed')
const orderSeedData = require('./orders-seed')
// const orderSeedData = require('./orders-seed')

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
  const orders = await Promise.all(
    orderSeedData.map(order => {
      return Order.create(order)
    })
  )

  // Dummy data for users with mugs in their cart --->

  // const jake = users[0]
  // const dave = users[1]
  // const shia = users[2]

  // const debuggingMug = mugs[0]
  // const pythonMug = mugs[1]
  // const coderMug = mugs[2]

  // await jake.addCart([debuggingMug, pythonMug])
  // await dave.addCart(coderMug)
  // await shia.addCart([coderMug, debuggingMug])

  // <------

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${mugs.length} mugs`)
  console.log(`seeded ${orders.length} orders`)
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
