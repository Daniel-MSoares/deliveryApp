import { TextInput, TextInputProps } from 'react-native'
import colors from 'tailwindcss/colors'

export function AdressInput({ ...rest }: TextInputProps) {
  return (
    <TextInput
      multiline
      textAlignVertical='top'
      {...rest}
      placeholderTextColor={colors.slate[400]}
      className='h-32 bg-slate-700 rounded-md px-4 py-3 font-body text-sm text-white'
    />
  )
}
