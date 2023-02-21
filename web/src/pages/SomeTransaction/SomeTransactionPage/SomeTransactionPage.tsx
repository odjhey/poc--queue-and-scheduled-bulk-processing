import SomeTransactionCell from 'src/components/SomeTransaction/SomeTransactionCell'

type SomeTransactionPageProps = {
  id: number
}

const SomeTransactionPage = ({ id }: SomeTransactionPageProps) => {
  return <SomeTransactionCell id={id} />
}

export default SomeTransactionPage
