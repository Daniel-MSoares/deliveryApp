import { ProductProps } from '@/utils/data/products'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

import * as cartInMemory from '@/stores/helpers/cart-in-memory'

export type ProductCartProps = ProductProps & {
  quantity: number
}
type StateProps = {
  products: ProductCartProps[]
  adress: string
  add: (product: ProductProps) => void
  remove: (productId: string) => void
  clear: () => void
  saveAdress: (adress: string) => void
}

export const useCartStore = create(
  persist<StateProps>(
    (set) => ({
      products: [],
      adress: '',
      add: (product: ProductProps) =>
        set((state) => ({
          products: cartInMemory.add(state.products, product),
        })),

      remove: (productId: string) => {
        set((state) => ({
          products: cartInMemory.remove(state.products, productId),
        }))
      },
      clear: () => set({ products: [] }),
      saveAdress: (adress: string) => set({ adress }),
    }),
    {
      name: 'deliveryorderapp:cart',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
