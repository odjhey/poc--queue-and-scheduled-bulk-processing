import crypto from 'crypto'

import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const someTransactions: QueryResolvers['someTransactions'] = () => {
  return db.someTransaction.findMany()
}

export const someTransaction: QueryResolvers['someTransaction'] = ({ id }) => {
  return db.someTransaction.findUnique({
    where: { id },
  })
}

export const createSomeTransaction: MutationResolvers['createSomeTransaction'] =
  ({ input }) => {
    const processingKey = crypto.randomUUID()

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
