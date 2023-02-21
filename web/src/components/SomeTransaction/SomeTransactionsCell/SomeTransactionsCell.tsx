import type { FindSomeTransactions } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import SomeTransactions from 'src/components/SomeTransaction/SomeTransactions'

export const QUERY = gql`
  query FindSomeTransactions {
    someTransactions {
      id
      owner
      lastProcessedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No someTransactions yet. '}
      <Link to={routes.newSomeTransaction()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  someTransactions,
}: CellSuccessProps<FindSomeTransactions>) => {
  return <SomeTransactions someTransactions={someTransactions} />
}
