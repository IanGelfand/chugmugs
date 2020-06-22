/* global describe beforeEach it */
const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const agent = request.agent(app)
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
  xdescribe('GET /mugs/:id', () => {
    let coolMug
    beforeEach(async () => {
      const creatingMugs = [
        {
          title: 'Boring Mug',
          price: 1250,
          description: 'This Mug is boring'
        },
        {
          title: 'Cool Mug',
          price: 1250,
          description: 'This Mug is cool'
        },
        {
          title: 'Riveting Mug',
          price: 1250,
          description: 'This Mug is riveting'
        }
      ].map(data => Mug.create(data))
      const createdMugs = await Promise.all(creatingMugs)
      console.log(createdMugs)
      coolMug = createdMugs[1]
    })
    /**
     * This is a proper GET /Mugs/ID request
     * where we search by the ID of the Mug created above
     */
    it('returns the JSON of the Mug based on the id', async () => {
      const res = await agent.get('/mugs/' + coolMug.id).expect(200)
      if (typeof res.body === 'string') {
        res.body = JSON.parse(res.body)
      }
      expect(res.body.title).to.equal('Cool Mug')
    })
    /**
     * Here we pass in a bad ID to the URL, we should get a 404 error
     */
    it('returns a 404 error if the ID is not correct', () => {
      return agent.get('/Mugs/76142896').expect(404)
    })
  })
})
