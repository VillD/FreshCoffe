import { useOrderStore } from '@/stores/order'
import {ShoppingCartIcon, ShoppingBagIcon} from '@heroicons/react/24/outline'
export default function ShowOrderButton() {

    const {toggleOrderDrawer, order} = useOrderStore()
    const totalItem = order.reduce((total, item)=> total + item.quantity, 0)
  return (
    <button type='button' className='cursor-pointer p-4 flex items-center gap-4' onClick={toggleOrderDrawer}>
        <ShoppingCartIcon className='size-8 text-gray-800'/>
        {totalItem}
    </button>
  )
}
