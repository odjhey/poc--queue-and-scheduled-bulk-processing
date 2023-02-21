import crypto from 'crypto'

import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { notificationQueue } from 'src/lib/queue'

export const someTransactions: QueryResolvers['someTransactions'] = () => {
  return db.someTransaction.findMany()
}

export const someTransaction: QueryResolvers['someTransaction'] = ({ id }) => {
  return db.someTransaction.findUnique({
    where: { id },
  })
}

export const createSomeTransaction: MutationResolvers['createSomeTransaction'] =
  async ({ input }) => {
    const processingKey = crypto.randomUUID()

    // if queue push status matters, queue first before create to have the opportunity to handle queue push error
    // if queue push does not matter, then could do this anytime
    const jobName = processingKey // use pk or some concat based on id
    const _schedule = await notificationQueue.add(jobName, {
      input,
      processingKey,
    })
    // if schedule, handle if it matters

    return db.someTransaction.create({
      data: { ...input, processingKey },
    })
  }

export const updateSomeTransaction: MutationResolvers['updateSomeTransaction'] =
  ({ id, input }) => {
    return db.someTransaction.update({
      data: input,
      where: { id },
    })
  }

export const deleteSomeTransaction: MutationResolvers['deleteSomeTransaction'] =
  ({ id }) => {
    return db.someTransaction.delete({
      where: { id },
    })
  }
