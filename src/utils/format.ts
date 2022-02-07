export function formatPrice(val: string): string {
  const value = String(val).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  return value
}
