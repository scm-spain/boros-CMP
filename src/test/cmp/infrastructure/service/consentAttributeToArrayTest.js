import {expect} from 'chai'
import {consentAttributeToArray} from '../../../../cmp/infrastructure/service/consentAttributeToArray'

describe('consentAttributeToArray', () => {
  describe('Given a valid object populated with number keys and boolean values', () => {
    it('Should return an array with the id keys wich values are evaluated to true', () => {
      const givenObject = {
        1: true,
        2: false,
        3: true,
        4: false,
        5: true
      }
      const expectedResult = [1, 3, 5]
      const result = consentAttributeToArray(givenObject)
      expect(result, 'should contain the true valued keys').to.deep.equal(
        expectedResult
      )
    })
  })
  describe('Given an invalid object populated with data', () => {
    it('Should return an array with the number keys wich values are boolean evaluated to true', () => {
      const givenObject = {
        1: true,
        2: false,
        3: true,
        what: true,
        '4': true,
        5: 'not a boolean'
      }
      const expectedResult = [1, 3, 4]
      const result = consentAttributeToArray(givenObject)
      expect(result, 'should contain the true valued keys').to.deep.equal(
        expectedResult
      )
    })
  })
  describe('Given an empty object', () => {
    it('Should return an empty array for an empty object', () => {
      const givenObject = {}
      const expectedResult = []
      const result = consentAttributeToArray(givenObject)
      expect(result, 'should be an empty array').to.deep.equal(expectedResult)
    })
    it('Should return an empty array for an undefined input', () => {
      const expectedResult = []
      const result = consentAttributeToArray()
      expect(result, 'should be an empty array').to.deep.equal(expectedResult)
    })
  })
})
