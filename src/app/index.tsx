import { useState, useRef } from 'react'
import { CategoryButton } from '@/components/categoryButton'
import { Header } from '@/components/header'
import { View, FlatList, SectionList, Text } from 'react-native'
import { Link } from 'expo-router'
// dados
import { CATEGORIES, MENU, ProductProps } from '@/utils/data/products'
import { Product } from '@/components/product'
import { useCartStore } from '@/stores/cart-store'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0])
  const cartStore = useCartStore()
  const sectionListRef = useRef<SectionList<ProductProps>>(null)

  const cartQuantityItems = cartStore.products.reduce(
    (total, product) => total + product.quantity,
    0
  )

  function handleSelectCategory(handlecategory: string) {
    setSelectedCategory(handlecategory)

    const sectionIndex = CATEGORIES.findIndex(
      (category) => category === handlecategory
    )
    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      })
    }
  }

  return (
    <View className='flex-1 pt-4'>
      <Header
        title='cardápio'
        cartQuantityItems={cartQuantityItems}
      />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={item === selectedCategory}
            onPress={() => handleSelectCategory(item)}
          />
        )}
        horizontal
        className='max-h-10 mt-5'
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
      />

      <SectionList
        sections={MENU}
        ref={sectionListRef}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link
            href={`/product/${item.id}`}
            asChild
          >
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className='text-xl  text-white font-heading mt-8 mb-3'>
            {title}
          </Text>
        )}
        className='flex-1 p-5'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  )
}
