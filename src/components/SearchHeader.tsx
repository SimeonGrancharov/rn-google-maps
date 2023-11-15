import { View, StyleSheet, TextInput } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useReduxStore } from '../hooks/useReduxStore'
import { HeaderHeight } from '../constants/header'
import { useEffect, useState } from 'react'
import { PinT } from '../types/Pin'
import { SearchResults } from './SearchResults'

function useSearchPinsByName(searchText: string): PinT[] {
  const pinsById = useReduxStore((state) => state.pins.pinsById)

  if (!searchText) {
    return []
  }

  return Object.values(pinsById).filter((pin) => {
    return pin.title.toLowerCase().includes(searchText.toLowerCase())
  })
}

type PropsT = {
  onSearchResultPress: (coords: { longitude: number; latitude: number }) => void
}

export const SearchHeader = (props: PropsT) => {
  const [resultsHidden, setResultsHidden] = useState<boolean>(true)
  const [searchText, setSearchText] = useState<string>('')
  const insets = useSafeAreaInsets()

  const searchResults = useSearchPinsByName(searchText)

  useEffect(() => {
    setResultsHidden(searchResults.length === 0)
  }, [searchResults.length])

  return (
    <>
      <View
        style={[
          styles.mainContainer,
          {
            height: insets.top + HeaderHeight
          }
        ]}
      >
        <TextInput
          style={styles.inputContainer}
          placeholder="Type To Search"
          onChangeText={setSearchText}
          maxLength={50}
          onFocus={() => {
            if (resultsHidden) {
              setResultsHidden(false)
            }
          }}
          onBlur={() => {
            setResultsHidden(true)
          }}
        />
      </View>
      <SearchResults
        shown={!resultsHidden}
        results={searchResults}
        onResultPress={props.onSearchResultPress}
      />
    </>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    overflow: 'visible',
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'black',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    paddingHorizontal: 20
  },
  inputContainer: {
    height: 40,
    backgroundColor: '#EEEEEE',
    borderRadius: 12,
    paddingHorizontal: 15
  }
})
