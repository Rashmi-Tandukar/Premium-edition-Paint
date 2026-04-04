import { useState } from 'react'
import styles from './TopProducts.module.css'
import ProductDetail from './ProductDetail'

const colorSwatches = {
  masonry: ['#2d4a1e', '#c7521a', '#1a1a1a', '#c4a882', '#6b3f1f', '#7a5c3a', '#5b8a8b', '#2e7a8c', '#1b5e6a', '#2c3e50'],
  antiCondensation: ['#f5f5f0', '#f0ede5', '#e8e5dc', '#ddd9ce', '#d4d0c4', '#c8c4b8', '#e8f0e5', '#f0ede0', '#e5e0d5', '#d8d5cc'],
  smoothMasonry: ['#3d5a3a', '#c7521a', '#1a1a1a', '#c4a882', '#6b3f1f', '#7a5c3a', '#5b8a8b', '#2e7a8c', '#1b5e6a', '#2c3e50'],
  chalkboard: ['#4a4a4a', '#2d4a1e', '#c7521a', '#1a1a1a', '#c4a882', '#6b3f1f', '#7a5c3a', '#5b8a8b', '#2e7a8c', '#1b5e6a'],
}

const sizePrices = {
  '1L':   { price: '£24.61', oldPrice: '£32.00' },
  '2.5L': { price: '£31.89', oldPrice: '£42.00' },
  '5L':   { price: '£42.29', oldPrice: '£55.00' },
}

const products = [
  {
    id: 1,
    name: 'Premium Edition Paint — Racing Green',
    brand: 'Premium Edition Paint',
    rating: 5,
    reviews: 114,
    swatchKey: 'masonry',
    img: '/products/greenracing.jpg',
  },
  {
    id: 2,
    name: 'Premium Edition Paint — Classic Grey',
    brand: 'Premium Edition Paint',
    rating: 5,
    reviews: 23,
    swatchKey: 'antiCondensation',
    img: '/products/classicgrey.jpg',
  },
  {
    id: 3,
    name: 'Premium Edition Paint — Dove Grey',
    brand: 'Premium Edition Paint',
    rating: 5,
    reviews: 204,
    swatchKey: 'smoothMasonry',
    img: '/products/dovegrey.jpg',
  },
  {
    id: 4,
    name: 'Premium Edition Paint — Light Yellow',
    brand: 'Premium Edition Paint',
    rating: 5,
    reviews: 2,
    swatchKey: 'chalkboard',
    img: '/products/lightyellow.jpg',
  },
  {
    id: 5,
    name: 'Premium Edition Paint — Sage Green',
    brand: 'Premium Edition Paint',
    rating: 5,
    reviews: 114,
    swatchKey: 'masonry',
    img: '/products/sagegreen.jpg',
  },
  {
    id: 6,
    name: 'Premium Edition Paint — White',
    brand: 'Premium Edition Paint',
    rating: 5,
    reviews: 23,
    swatchKey: 'antiCondensation',
    img: '/products/white.jpg',
  },
]

function Stars({ n }) {
  return (
    <div className={styles.stars}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" style={{ fill: i <= Math.round(n) ? '#e02020' : '#ddd' }}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      <span className={styles.reviewCount}>({n})</span>
    </div>
  )
}

export default function TopProducts() {
  const [sizes, setSizes] = useState({})
  const [startIndex, setStartIndex] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const visible = 4
  const visibleProducts = products.slice(startIndex, startIndex + visible)

  const setSize = (id, val) => setSizes(s => ({ ...s, [id]: val }))
  const getSize = (id) => sizes[id] || '1L'
  const prev = () => setStartIndex(i => Math.max(0, i - 1))
  const next = () => setStartIndex(i => Math.min(products.length - visible, i + 1))

  return (
    <>
    <section className={styles.section} id="products">
        {/* Title */}
        <div className={styles.titleRow}>
          <h2 className={styles.title}>Top Selling Products 🔥</h2>
          <p className={styles.subtitle}>This months top sellers by category</p>
        </div>

      {/* Carousel wrapper — full width outside container */}
      <div className={styles.carouselRow}>
          <button className={styles.arrowBtn} aria-label="Previous" onClick={prev} disabled={startIndex === 0}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className={styles.grid}>
            {visibleProducts.map((p) => (
              <div key={p.id} className={styles.card}>
                {/* Image area */}
                <div className={styles.imgWrap}>
                  <img src={p.img} alt={p.name} className={styles.productImg} />

                  {/* Bottom overlay */}
                  <div className={styles.imgOverlay}>
                    <span className={styles.productType} style={{ color: p.typeColor }}>{p.type}</span>
                    <span className={styles.saveTag}>{p.save}</span>
                    <p className={styles.overlayBrand}>{p.brand}</p>
                  </div>
                </div>

                {/* Rating + size */}
                <div className={styles.metaRow}>
                  <Stars n={p.rating} />
                  <span className={styles.reviewCount2}>({p.reviews})</span>
                  <div className={styles.sizeSelect}>
                    <select value={getSize(p.id)} onChange={e => setSize(p.id, e.target.value)}>
                      <option>1L</option>
                      <option>2.5L</option>
                      <option>5L</option>
                    </select>
                  </div>
                </div>

                {/* Info */}
                <div className={styles.info}>
                  <h3 className={styles.name}>{p.name}</h3>
                  <div className={styles.priceRow}>
                    <span className={styles.oldPrice}>{sizePrices[getSize(p.id)].oldPrice}</span>
                    <span className={styles.price}>{sizePrices[getSize(p.id)].price}</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className={styles.btnGroup}>
                  <button className={styles.cartBtn}>ADD TO CART</button>
                  <button className={styles.chooseBtn} onClick={() => setSelectedProduct({ ...p, sizes: sizePrices })}>Choose Option</button>
                </div>
              </div>
            ))}
          </div>

          <button className={styles.arrowBtn} aria-label="Next" onClick={next} disabled={startIndex >= products.length - visible}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
    </section>

    {selectedProduct && (
      <ProductDetail
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    )}
    </>
  )
}