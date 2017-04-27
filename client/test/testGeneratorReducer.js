import chai from "chai"
import generatorReducer from './../src/reducers/generatorReducer.js'

let expect = chai.expect

describe("generatorReducer", () => {
  it('should add generator with action: ADD_GENERATOR', () => {
    expect(
      generatorReducer([], {
        type: 'ADD_GENERATOR',
        generator: 'abc'
      })
    ).to.eql(["abc"])
  })

  it('should remove generator with action: REMOVE_GENERATOR', () => {
    expect(
      generatorReducer(['abc'], {
        type: 'REMOVE_GENERATOR',
        generator: 'abc'
      })
    ).to.eql([])
  })

  it('should return default state if action not found', () => {
    expect(
      generatorReducer(['default'], {
        type: 'WRONG_ACTION',
        generator: 'abc'
      })
    ).to.eql(['default'])
  })

  it('should return default state if data is wrong', () => {
    expect(
      generatorReducer(['default'], {
        type: 'ADD_GENERATOR',
        name: 'abc' 
      })
    ).to.eql(['default'])
  })
})