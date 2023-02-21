import type { SomeTransaction } from '@prisma/client'

import {
  someTransactions,
  someTransaction,
  createSomeTransaction,
  updateSomeTransaction,
  deleteSomeTransaction,
} from './someTransactions'
import type { StandardScenario } from './someTransactions.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('someTransactions', () => {
  scenario(
    'returns all someTransactions',
    async (scenario: StandardScenario) => {
      const result = await someTransactions()

      expect(result.length).toEqual(
        Object.keys(scenario.someTransaction).length
      )
    }
  )

  scenario(
    'returns a single someTransaction',
    async (scenario: StandardScenario) => {
      const result = await someTransaction({
        id: scenario.someTransaction.one.id,
      })

      expect(result).toEqual(scenario.someTransaction.one)
    }
  )

  scenario('creates a someTransaction', async () => {
    const result = await createSomeTransaction({
      input: { owner: 'String' },
    })

    expect(result.owner).toEqual('String')
  })

  scenario('updates a someTransaction', async (scenario: StandardScenario) => {
    const original = (await someTransaction({
      id: scenario.someTransaction.one.id,
    })) as SomeTransaction
    const result = await updateSomeTransaction({
      id: original.id,
      input: { owner: 'String2' },
    })

    expect(result.owner).toEqual('String2')
  })

  scenario('deletes a someTransaction', async (scenario: StandardScenario) => {
    const original = (await deleteSomeTransaction({
      id: scenario.someTransaction.one.id,
    })) as SomeTransaction
    const result = await someTransaction({ id: original.id })

    expect(result).toEqual(null)
  })
})
