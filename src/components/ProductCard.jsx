import { useState } from 'react'
import { ShoppingCart, Star, Eye, Package } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/formatCurrency'

export default function ProductCard({ product, onViewDetail }) {
  const { addItem, openDrawer } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const isOutOfStock = product.stock === 0

  const handleAddToCart = () => {
    if (isOutOfStock) return
    setIsAdding(true)
    addItem(product)
    toast.success(`${product.name} ditambahkan ke keranjang!`)
    setTimeout(() => setIsAdding(false), 600)
  }

  const flavorColor = {
    Chocolate: 'bg-amber-100 text-amber-700',
    Matcha: 'bg-primary-50 text-primary-700',
    Vanilla: 'bg-yellow-50 text-yellow-700',
    Taro: 'bg-violet-100 text-violet-700',
    Bundle: 'bg-purple-50 text-purple-700',
  }

  return (
    <motion.div
      className="card-product flex flex-col group"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs font-heading font-semibold bg-white/90 backdrop-blur-sm text-primary-700 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* View Detail Button */}
        {onViewDetail && (
          <button
            onClick={() => onViewDetail(product)}
            aria-label={`Lihat detail ${product.name}`}
            className="absolute bottom-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 hover:bg-white"
          >
            <Eye className="w-4 h-4 text-primary-700" />
          </button>
        )}

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-gray-700 font-heading font-bold px-3 py-1 rounded-full text-sm">
              Habis
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Flavor badge */}
        <span
          className={`text-xs font-heading font-semibold px-2 py-0.5 rounded-full w-fit mb-2 ${flavorColor[product.flavor] || 'bg-gray-100 text-gray-600'}`}
        >
          {product.flavor}
        </span>

        <h3 className="font-heading font-bold text-base text-neutral-900 leading-tight mb-1 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-xs text-gray-500 mb-3 line-clamp-2 flex-1">
          {product.shortDesc}
        </p>

        {/* Rating & Stock */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-accent-500 text-accent-500" />
            <span className="text-xs font-body font-medium text-gray-600">
              {product.rating} ({product.reviews})
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Package className="w-3 h-3" />
            <span>{product.stock > 0 ? `Stok: ${product.stock}` : 'Habis'}</span>
          </div>
        </div>

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between gap-2 mt-auto">
          <span className="font-heading font-bold text-lg text-primary-700">
            {formatPrice(product.price)}
          </span>
          <motion.button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            whileTap={!isOutOfStock ? { scale: 0.9 } : {}}
            aria-label={`Tambah ${product.name} ke keranjang`}
            className={`flex items-center gap-1.5 text-xs font-heading font-semibold px-3 py-2 rounded-full transition-all duration-200 ${
              isOutOfStock
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : isAdding
                ? 'bg-primary-300 text-primary-900 scale-95'
                : 'bg-primary-500 text-white hover:bg-primary-700'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {isAdding ? 'Ditambahkan!' : 'Tambah'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
