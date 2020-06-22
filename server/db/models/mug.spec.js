const {expect} = require('chai')
const db = require('../index')
const Mug = db.model('mug')

describe('Mug model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Validations', () => {
    it('requires `title`', async () => {
      const mug = Mug.build()
      try {
        await mug.validate()
        throw new Error('Validation succeeded but should have failed')
      } catch (err) {
        expect(err.message).to.contain('title')
      }
    })

    it('requires `title` to not be an empty string', async () => {
      const mug = Mug.build({
        title: ''
      })
      try {
        await mug.validate()
        throw Error(
          'validation was successful but should have failed if name is an empty string'
        )
      } catch (err) {
        expect(err.message).to.contain('Validation error')
      }
    })

    it('requires `price`', async () => {
      const mug = Mug.build()
      try {
        await mug.validate()
        throw new Error('Validation succeeded but should have failed')
      } catch (err) {
        expect(err.message).to.contain('price')
      }
    })

    it('requires `description`', async () => {
      const mug = Mug.build()
      try {
        await mug.validate()
        throw new Error('Validation succeeded but should have failed')
      } catch (err) {
        expect(err.message).to.contain('description')
      }
    })

    it('`description` can hold a longer string', async () => {
      const longDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.`

      const mug = await Mug.create({
        title: 'Pumpkin',
        description: longDescription,
        price: 1200
      })
      expect(mug.title).to.equal('Pumpkin')
      expect(mug.price).to.equal(1200)
      expect(mug.description).to.equal(longDescription)
    })
  })
})
