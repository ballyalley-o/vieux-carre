export const parseAddress = (address: ShippingAddress) => {
  const street = address?.streetAddress || ''
  const city = address?.city || ''
  const postalCode = address?.postalCode || ''
  const country = address?.country || ''

  const addressParts = [street, city, postalCode, country]
  const nonEmptyAddressParts = addressParts.filter((part) => part.trim() !== '')

  return nonEmptyAddressParts.join(', ')
}