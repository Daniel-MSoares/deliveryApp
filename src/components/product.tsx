import { forwardRef } from 'react'
import {
  Image,
  ImageProps,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

type ProductdataProps = {
  title: string
  description: string
  thumbnail: ImageProps
  quantity?: number
}

type ProductProps = TouchableOpacityProps & {
  data: ProductdataProps
}

export const Product = forwardRef<TouchableOpacity, ProductProps>(
  ({ data, ...rest }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        className='w-full flex-row items-center pb-4'
        {...rest}
      >
        <Image
          source={data.thumbnail}
          className='h-20 w-20 rounded-md'
        />
        <View className='flex-1 ml-3'>
          <View className='flex-row items-center'>
            <Text className='text-slate-100 font-subtitle text-base flex-1'>
              {data.title}
            </Text>

            {data.quantity && (
              <Text className='text-slate-400 font-subtitle text-sm'>
                x{data.quantity}
              </Text>
            )}
          </View>

          <Text className='text-slate-400 text-xs leading-5 mt-0.5'>
            {data.description}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
)
