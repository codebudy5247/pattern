const formatAddress = (_str: string) => {
  return (
    _str.substring(0, 6) + '...' + _str.substring(_str.length - 5, _str.length)
  )
}

export default formatAddress
