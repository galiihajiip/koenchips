import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ShoppingBag, Trash2, Plus, Minus, MessageCircle,
  User, Phone, MapPin, FileText, ArrowLeft, CheckCircle
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/formatCurrency'
import { openWhatsApp } from '../utils/whatsapp'
import toast from 'react-hot-toast'

export default function Checkout() {
  const { items, totalPrice, removeItem, increaseQty, decreaseQty, clearCart } = useCart()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', phone: '', address: '', notes: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Nama wajib diisi'
    return newErrors
  }

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Keranjang masih kosong!')
      return
    }
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    openWhatsApp(items, form)
    setSubmitted(true)
    clearCart()
  }

  if (submitted) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center py-16 bg-neutral-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-10 text-center shadow-xl max-w-md w-full mx-4"
        >
          <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-10 h-10 text-primary-500" />
          </div>
          <h2 className="font-heading font-bold text-2xl text-neutral-900 mb-2">
            Pesanan Dikirim! 🎉
          </h2>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            WhatsApp sudah terbuka di tab baru. Konfirmasikan pesanan kamu dengan tim KOENCHIPS.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              to="/katalog"
              className="bg-primary-500 text-white font-heading font-semibold py-3 rounded-full hover:bg-primary-700 transition-colors text-center"
            >
              Belanja Lagi
            </Link>
            <Link
              to="/"
              className="border-2 border-primary-500 text-primary-700 font-heading font-semibold py-2.5 rounded-full hover:bg-primary-50 transition-colors text-center text-sm"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </motion.div>
      </section>
    )
  }

  return (
    <section className="bg-neutral-100 min-h-[80vh] py-10 md:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-white hover:bg-gray-50 rounded-full shadow-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </button>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-neutral-900">
            Checkout
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <p className="font-heading font-semibold text-gray-400 text-xl mb-2">
              Keranjang kosong
            </p>
            <p className="text-sm text-gray-400 mb-6">Belum ada produk yang dipilih.</p>
            <Link
              to="/katalog"
              className="bg-primary-500 text-white font-heading font-semibold px-6 py-3 rounded-full hover:bg-primary-700 transition-colors text-sm"
            >
              Lihat Katalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
            {/* Left: Cart items */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <h2 className="font-heading font-bold text-base text-neutral-900 mb-4 flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-primary-500" />
                  Pesanan Kamu ({items.length} produk)
                </h2>

                <ul className="space-y-3">
                  {items.map(({ product, qty }) => (
                    <motion.li
                      key={product.id}
                      layout
                      className="flex gap-3 p-3 bg-gray-50 rounded-xl"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="w-16 h-16 object-cover rounded-lg shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-heading font-bold text-sm text-neutral-900 truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500 mb-2">{product.weight}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => decreaseQty(product.id)}
                              className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-primary-50 hover:border-primary-500 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center text-sm font-heading font-bold">{qty}</span>
                            <button
                              onClick={() => increaseQty(product.id)}
                              className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-primary-50 hover:border-primary-500 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-heading font-bold text-sm text-primary-700">
                            {formatPrice(product.price * qty)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="self-start p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Form */}
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <h2 className="font-heading font-bold text-base text-neutral-900 mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-primary-500" />
                  Detail Pemesan
                </h2>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-heading font-semibold text-gray-700 mb-1.5">
                      Nama Lengkap <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Nama kamu..."
                        className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition ${
                          errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-heading font-semibold text-gray-700 mb-1.5">
                      No. HP{' '}
                      <span className="text-gray-400 font-body font-normal">(opsional)</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="08xx-xxxx-xxxx"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs font-heading font-semibold text-gray-700 mb-1.5">
                      Alamat Pengiriman{' '}
                      <span className="text-gray-400 font-body font-normal">(opsional)</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <textarea
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Jl. Contoh No. 1, Kota..."
                        rows={2}
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition resize-none"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-heading font-semibold text-gray-700 mb-1.5">
                      Catatan{' '}
                      <span className="text-gray-400 font-body font-normal">(opsional)</span>
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <textarea
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        placeholder="Catatan tambahan untuk pesanan..."
                        rows={2}
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Summary */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 shadow-sm sticky top-20">
                <h2 className="font-heading font-bold text-base text-neutral-900 mb-4">
                  Ringkasan Pesanan
                </h2>

                <div className="space-y-2 mb-4">
                  {items.map(({ product, qty }) => (
                    <div key={product.id} className="flex justify-between text-sm">
                      <span className="text-gray-600 truncate flex-1 mr-2">
                        {product.name} x{qty}
                      </span>
                      <span className="font-heading font-semibold text-neutral-900 shrink-0">
                        {formatPrice(product.price * qty)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-3 mb-5">
                  <div className="flex justify-between items-center">
                    <span className="font-heading font-semibold text-gray-700">Total</span>
                    <span className="font-heading font-bold text-xl text-primary-700">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>

                <motion.button
                  onClick={handleCheckout}
                  whileTap={{ scale: 0.97 }}
                  className="w-full flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-700 text-white font-heading font-bold py-3.5 rounded-full transition-all duration-200 hover:scale-[1.01] shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  Checkout via WhatsApp
                </motion.button>

                <p className="text-center text-xs text-gray-400 mt-3">
                  Kamu akan diarahkan ke WhatsApp untuk konfirmasi pesanan.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
