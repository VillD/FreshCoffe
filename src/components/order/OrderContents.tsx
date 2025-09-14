import { useOrderStore } from '@/stores/order'
import ProductDetails from './ProductDetails'
import { calculateTotal } from '@/utils'
import SubmitOrderForm from './SubmitOrderForm'

export default function OrderContents() {
	const { order } = useOrderStore()
	const total = calculateTotal(order)
	return (
		<>
			{order.length === 0 ? (
				<p className='text-center my-10 text-xls'>El pedido esta vácio</p>
			) : (
				<>
					<h2 className='text-2xl font-bold text-gray-900'>Ajusta tu pedido</h2>
					{order.map((item) => {
						const key = item.size ? `${item.size} - ${item.id}` : item.id
						return <ProductDetails item={item} key={key} />
					})}

					<h2 className='mt-5 text-2xl font-bold text-right'>
						Total a pagar: {total}
					</h2>

          <SubmitOrderForm/>
				</>
			)}
		</>
	)
}
