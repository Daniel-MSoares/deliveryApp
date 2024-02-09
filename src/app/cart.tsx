import { ProductCartProps, useCartStore } from '@/stores/cart-store'
import {
  Alert,
  Keyboard,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import { Header } from '@/components/header'
import { Product } from '@/components/product'
import { formatCurrency } from '@/utils/functions/formatCurrency'
import { AdressInput } from '@/components/adressInput'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button } from '@/components/button'
import { Feather } from '@expo/vector-icons'
import { LinkButton } from '@/components/linkButton'
import { useState } from 'react'
import { useNavigation } from 'expo-router'

function EmptyList() {
  return (
    <Text className='font-body text-slate-400 text-center my-8'>
      Seu carrinho está vazio
    </Text>
  )
}

export const PHONE_NUMBER = '5533987395971'

export default function Cart() {
  const cartStore = useCartStore()
  const navigation = useNavigation()
  const [adress, setAdress] = useState(cartStore.adress || '')
  const total = formatCurrency(
    cartStore.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
  )

  function handleProductRemove(product: ProductCartProps) {
    Alert.alert('Remover', `Deseja remover ${product.title} do pedido?`, [
      { text: 'Cancelar' },
      { text: 'Remover', onPress: () => cartStore.remove(product.id) },
    ])
  }

  function handleOrder() {
    if (adress.trim() === '') {
      return Alert.alert('Pedido', 'informe os dados da entrega.')
    }

    if (cartStore.products.length === 0) {
      return Alert.alert('Pedido', 'Escolha um produto para realizar o pedido.')
    }

    const productsToOrder = cartStore.products
      .map(
        (productItem) =>
          `\n \u2022 ${productItem.quantity} ${productItem.title}`
      )
      .join('')

    const message = `\nNOVO PEDIDO!🍔
    \nEntregar em: ${adress}
    ${productsToOrder}
    \nTotal: ${total}`
    Linking.openURL(
      `http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`
    )
    cartStore.clear()
    navigation.goBack()
  }

  function handleSaveAdress() {
    if (adress.trim() === '') {
      return Alert.alert('Endereço', 'informe um endereço para a entega.')
    }

    cartStore.saveAdress(adress)
    Alert.alert('Endereço', 'O endereço será lembrado.')
  }

  function closeKeyboard() {
    Keyboard.dismiss()
  }
  return (
    <TouchableWithoutFeedback
      touchSoundDisabled
      onPress={closeKeyboard}
    >
      <View className='flex-1 pt-8'>
        <Header title='Seu pedido' />
        <KeyboardAwareScrollView>
          <ScrollView>
            <View className='p-5 flex-1'>
              {cartStore.products.length > 0 ? (
                <View className='border-b border-slate-700'>
                  {cartStore.products.map((product) => (
                    <Product
                      key={product.id}
                      data={product}
                      onPress={() => handleProductRemove(product)}
                    />
                  ))}
                </View>
              ) : (
                <EmptyList />
              )}

              <View className='flex-row gap-2 items-center mt-5 mb-4'>
                <Text className='text-white text-xl font-subtitle'>Total:</Text>
                <Text className='text-lime-400 text-2xl font-heading'>
                  {total}
                </Text>
              </View>

              <AdressInput
                value={adress}
                placeholder='Informe o endereço de entrega com rua, bairro, CEP, número e complemento'
                blurOnSubmit={true}
                onChangeText={setAdress}
                onSubmitEditing={handleOrder}
                returnKeyType='next'
              />

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleSaveAdress}
              >
                <Text className='text-sm text-white self-end'>
                  Lembrar endereço
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
        <View className='p-5 gap-5'>
          <Button onPress={handleOrder}>
            <Button.Text>Finalizar pedido</Button.Text>
            <Button.Icon>
              <Feather
                name='arrow-right-circle'
                size={20}
              />
            </Button.Icon>
          </Button>
          <LinkButton
            title='voltar ao cardápio'
            href='/'
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}
