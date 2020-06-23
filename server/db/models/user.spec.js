/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Validations', () => {
    describe('sets isAdmin to false', () => {
      it('sets isAdmin to false by default', async () => {
        try {
          const user = await User.create({email: 'a'})
          expect(user.isAdmin).to.be.equal(false)
        } catch (error) {
          console.error('An error occurred while creatinguser. Error: ', error)
        }
      })
    })

    it('requires `email`', async () => {
      const user = User.build()
      try {
        await user.validate()
        throw new Error('Validation succeeded but should have failed')
      } catch (err) {
        expect(err.message).to.contain('email')
      }
    })
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
