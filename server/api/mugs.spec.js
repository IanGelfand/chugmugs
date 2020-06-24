/* global describe beforeEach it */
const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Mug = db.model('mug')

describe('Mug routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('/api/mugs/', () => {
    const redMugTitle = 'A red mug'
    const redMugColor = 'red'
    const redMugPrice = 2500
    const redMugCapacity = 8
    beforeEach(() => {
      return Mug.create({
        title: redMugTitle,
        color: redMugColor,
        price: redMugPrice,
        capacity: redMugCapacity,
        description: 'I am a cool Mug'
      })
    })
    it('GET /api/mugs', async () => {
      const res = await request(app)
        .get('/api/mugs')
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0].title).to.be.equal(redMugTitle)
    })
    it('GET /api/mugs', async () => {
      const res = await request(app)
        .get('/api/mugs')
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0].color).to.be.equal(redMugColor)
    })
    it('GET /api/mugs', async () => {
      const res = await request(app)
        .get('/api/mugs')
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0].price).to.be.equal(redMugPrice)
    })
    it('GET /api/mugs', async () => {
      const res = await request(app)
        .get('/api/mugs')
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0].capacity).to.be.equal(redMugCapacity)
    })
    it('GET /api/mugs', async () => {
      const res = await request(app)
        .get('/api/mugs')
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0].description).to.be.equal('I am a cool Mug')
    })
  })
})
