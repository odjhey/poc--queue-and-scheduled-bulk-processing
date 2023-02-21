import type { Prisma, SomeTransaction } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.SomeTransactionCreateArgs>({
  someTransaction: {
    one: { data: { owner: 'String', processingKey: 'String' } },
    two: { data: { owner: 'String', processingKey: 'String' } },
  },
})

export type StandardScenario = ScenarioData<SomeTransaction, 'someTransaction'>
