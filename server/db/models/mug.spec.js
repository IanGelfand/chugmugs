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
  })
})
