import type {
  DeleteSomeTransactionMutationVariables,
  FindSomeTransactionById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_SOME_TRANSACTION_MUTATION = gql`
  mutation DeleteSomeTransactionMutation($id: Int!) {
    deleteSomeTransaction(id: $id) {
      id
    }
  }
`

interface Props {
  someTransaction: NonNullable<FindSomeTransactionById['someTransaction']>
}

const SomeTransaction = ({ someTransaction }: Props) => {
  const [deleteSomeTransaction] = useMutation(
    DELETE_SOME_TRANSACTION_MUTATION,
    {
      onCompleted: () => {
        toast.success('SomeTransaction deleted')
        navigate(routes.someTransactions())
      },
      onError: (error) => {
        toast.error(error.message)
      },
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
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            SomeTransaction {someTransaction.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{someTransaction.id}</td>
            </tr>
            <tr>
              <th>Owner</th>
              <td>{someTransaction.owner}</td>
            </tr>
            <tr>
              <th>Last processed at</th>
              <td>{timeTag(someTransaction.lastProcessedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editSomeTransaction({ id: someTransaction.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(someTransaction.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default SomeTransaction
