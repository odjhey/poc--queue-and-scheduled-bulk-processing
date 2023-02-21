import type { FindSomeTransactionById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import SomeTransaction from 'src/components/SomeTransaction/SomeTransaction'

export const QUERY = gql`
  query FindSomeTransactionById($id: Int!) {
    someTransaction: someTransaction(id: $id) {
      id
      owner
      lastProcessedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>SomeTransaction not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  someTransaction,
}: CellSuccessProps<FindSomeTransactionById>) => {
  return <SomeTransaction someTransaction={someTransaction} />
}
