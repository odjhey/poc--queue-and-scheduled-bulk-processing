import type {
  DeleteSomeTransactionMutationVariables,
  FindSomeTransactions,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/SomeTransaction/SomeTransactionsCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_SOME_TRANSACTION_MUTATION = gql`
  mutation DeleteSomeTransactionMutation($id: Int!) {
    deleteSomeTransaction(id: $id) {
      id
    }
  }
`

const SomeTransactionsList = ({ someTransactions }: FindSomeTransactions) => {
  const [deleteSomeTransaction] = useMutation(
    DELETE_SOME_TRANSACTION_MUTATION,
    {
      onCompleted: () => {
        toast.success('SomeTransaction deleted')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

  const onDeleteClick = (id: DeleteSomeTransactionMutationVariables['id']) => {
    if (
      confirm('Are you sure you want to delete someTransaction ' + id + '?')
    ) {
      deleteSomeTransaction({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Owner</th>
            <th>Last processed at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {someTransactions.map((someTransaction) => (
            <tr key={someTransaction.id}>
              <td>{truncate(someTransaction.id)}</td>
              <td>{truncate(someTransaction.owner)}</td>
              <td>{timeTag(someTransaction.lastProcessedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.someTransaction({ id: someTransaction.id })}
                    title={
                      'Show someTransaction ' + someTransaction.id + ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editSomeTransaction({ id: someTransaction.id })}
                    title={'Edit someTransaction ' + someTransaction.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete someTransaction ' + someTransaction.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(someTransaction.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SomeTransactionsList
