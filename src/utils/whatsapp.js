const WA_NUMBER = '6282265588823'

/**
 * Build WhatsApp message from cart and form data
 * @param {Array} cartItems - Array of { product, qty }
 * @param {Object} formData - { name, phone, address, notes }
 * @returns {string} Encoded WhatsApp URL
 */
export function buildWhatsAppURL(cartItems, formData) {
  const { name, phone, address, notes } = formData

  const itemLines = cartItems
    .map(
      ({ product, qty }) =>
        `• ${product.name} (${product.weight}) x${qty} = Rp ${new Intl.NumberFormat('id-ID').format(product.price * qty)}`
    )
    .join('\n')

  const total = cartItems.reduce((sum, { product, qty }) => sum + product.price * qty, 0)
  const totalFormatted = `Rp ${new Intl.NumberFormat('id-ID').format(total)}`

  let message = `Halo KOENCHIPS! 👋 Saya mau order:\n\n`
  message += `👤 *Nama:* ${name}\n`
  if (phone) message += `📱 *No. HP:* ${phone}\n`
  message += `\n🛒 *Pesanan:*\n${itemLines}\n\n`
  message += `💰 *Total: ${totalFormatted}*\n`
  if (address) message += `\n📍 *Alamat:* ${address}\n`
  if (notes) message += `📝 *Catatan:* ${notes}\n`
  message += `\nTerima kasih! 🙏`

  const encoded = encodeURIComponent(message)
  return `https://wa.me/${WA_NUMBER}?text=${encoded}`
}

/**
 * Open WhatsApp in new tab
 */
export function openWhatsApp(cartItems, formData) {
  const url = buildWhatsAppURL(cartItems, formData)
  window.open(url, '_blank', 'noopener,noreferrer')
}

/**
 * Direct WA link (no cart)
 */
export function getDirectWALink() {
  return `https://wa.me/${WA_NUMBER}`
}
