import { useState } from 'react'
import styles from './ProductDetail.module.css'
import { useCart } from '../context/CartContext'

// 6 paint colours — image shown as swatch, hex used for selected indicator
const ALL_COLORS = [
  { hex: '#FFFFFF', name: 'White',        img: '/color/white.png'        },
  { hex: '#C4C4C6', name: 'Classic Grey', img: '/color/grey.png'         },
  { hex: '#F0EDB0', name: 'Light Yellow', img: '/color/lightyellow.png'  },
  { hex: '#2D5A27', name: 'Racing Green', img: '/color/racing_green.png' },
  { hex: '#4A5254', name: 'Dove Grey',    img: '/color/dovegrey.png'     },
  { hex: '#A8BC8E', name: 'Sage Green',   img: '/color/lightgreen.png'   },
]

const SIZE_OPTIONS = ['1L', '2.5L', '5L', '10L (Pack of 2 x 5L)']
const SIZE_OPTIONS_2 = ['20L (Pack of 4 x 5L)']

// Image shown when each size is selected (null = use product's own 1L image)
const SIZE_IMAGES = {
  '1L':                    null,
  '2.5L':                  '/paint/paint.jpg',
  '5L':                    '/paint/paint.jpg',
  '10L (Pack of 2 x 5L)':  '/paint/paint.jpg',
  '20L (Pack of 4 x 5L)':  '/paint/paint.jpg',
}

// Default gallery — switches to selected colour image on click
const GALLERY_IMAGES = [
  '/color/white.png',
  '/color/grey.png',
  '/color/lightyellow.png',
  '/color/racing_green.png',
  '/color/dovegrey.png',
  '/color/lightgreen.png',
]

function Stars({ n = 5 }) {
  return (
    <div className={styles.stars}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="18" height="18" viewBox="0 0 24 24"
          style={{ fill: i <= Math.round(n) ? '#e02020' : '#ddd' }}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function ProductDetail({ product, onClose }) {
  const [selectedSize, setSelectedSize] = useState(null)  // null = not yet chosen
  const [selectedColor, setSelectedColor] = useState(null)   // null = show product img
  const [qty, setQty] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [validationMsg, setValidationMsg] = useState('')
  const { addToCart, toggleWishlist, isWishlisted } = useCart()

  if (!product) return null

  const sizeData = product.sizes?.[selectedSize] || {}
  const wishlisted = isWishlisted(product.id)

  // Main image priority: colour selected > size selected > product default
  const sizeImg = SIZE_IMAGES[selectedSize]
  const mainImg = selectedColor !== null
    ? ALL_COLORS[selectedColor].img
    : sizeImg
      ? sizeImg
      : (sizeData.img || GALLERY_IMAGES[0])

  const bothSelected = selectedSize !== null && selectedColor !== null

  const handleAddToCart = () => {
    if (!selectedSize && !selectedColor) {
      setValidationMsg('Please select a size and colour to continue.')
      return
    }
    if (!selectedSize) {
      setValidationMsg('Please select a size to continue.')
      return
    }
    if (selectedColor === null) {
      setValidationMsg('Please select a colour to continue.')
      return
    }
    setValidationMsg('')
    const p = { ...product, price: sizeData.price, oldPrice: sizeData.oldPrice, img: sizeData.img }
    addToCart(p, selectedSize)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)

    // WhatsApp message
    const colorLabel = selectedColor !== null ? ALL_COLORS[selectedColor].name : 'Not selected'
    const waMsg = `Hello! I'd like to order the following:\n\n🛒 *${product.name}*\n🎨 Colour: ${colorLabel}\n📦 Size: ${selectedSize}\n💰 Price: ${sizeData.price}\n\nPlease confirm availability. Thank you!`
    window.open(`https://wa.me/+447878962923?text=${encodeURIComponent(waMsg)}`, '_blank')
  }

  const handleBuyNow = () => {
    if (!selectedSize && selectedColor === null) {
      setValidationMsg('Please select a size and colour to continue.')
      return
    }
    if (!selectedSize) {
      setValidationMsg('Please select a size to continue.')
      return
    }
    if (selectedColor === null) {
      setValidationMsg('Please select a colour to continue.')
      return
    }
    setValidationMsg('')
    const colorLabel = selectedColor !== null ? ALL_COLORS[selectedColor].name : 'Not selected'
    const price = sizeData.price ?? product.price ?? 'N/A'
    const waMsg = `Hello! I want to buy the following:\n\n🛒 *${product.name}*\n🎨 Colour: ${colorLabel}\n📦 Size: ${selectedSize}\n💰 Price: ${price}\n\nPlease confirm and share payment details. Thank you!\n\n_We will reach out to you shortly to confirm your order._`
    window.open(`https://wa.me/+447878962923?text=${encodeURIComponent(waMsg)}`, '_blank')
    
  }

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        {/* Close */}
        <button className={styles.closeBtn} onClick={onClose} title="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <span>Home</span>
          <span className={styles.sep}>—</span>
          <span>All Paints</span>
          <span className={styles.sep}>—</span>
          <span>Premium Paints</span>
          <span className={styles.sep}>—</span>
          <span className={styles.breadActive}>
            {selectedColor !== null ? ALL_COLORS[selectedColor].name : 'Select Colour'}
            {selectedSize && ` — ${selectedSize}`}
          </span>
        </div>

        <div className={styles.body}>
          {/* LEFT: Gallery */}
          <div className={styles.galleryCol}>
            {/* Thumbnails — paint tin images */}
            <div className={styles.thumbCol}>
              {GALLERY_IMAGES.map((img, i) => (
                <button
                  key={i}
                  className={`${styles.thumb} ${selectedColor === i ? styles.thumbActive : ''}`}
                  onClick={() => { setSelectedColor(i); setValidationMsg('') }}
                >
                  <img src={img} alt={`colour ${i+1}`} />
                </button>
              ))}
            </div>

            {/* Main image + feature cards */}
            <div className={styles.mainImgArea}>
              <div className={styles.mainImgWrap}>
                <img
                  key={mainImg}
                  src={mainImg}
                  alt={product.name}
                  className={styles.mainImg}
                />
              </div>

              {/* Feature tiles */}
              <div className={styles.featureTiles}>
                <div className={`${styles.tile} ${styles.tilePink}`}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/>
                    <path d="M15 9l-6 6M9 9l6 6" strokeWidth="2"/>
                  </svg>
                  <div className={styles.tileLabel}>APPLICATION METHOD:</div>
                  <div className={styles.tileValue}>BRUSH, ROLLER OR SPRAY</div>
                </div>
                <div className={`${styles.tile} ${styles.tileTeal}`}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z"/>
                    <path d="M12 8v8M8 14l4 4 4-4"/>
                  </svg>
                  <div className={styles.tileLabel}>Water based:</div>
                  <div className={styles.tileValue}>100%</div>
                </div>
                <div className={`${styles.tile} ${styles.tileGreen}`}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 3l14 9-14 9V3z" strokeLinejoin="round"/>
                  </svg>
                  <div className={styles.tileLabel}>Finish:</div>
                  <div className={styles.tileValue}>MATT</div>
                </div>
                <div className={`${styles.tile} ${styles.tileSalmon}`}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/>
                  </svg>
                  <div className={styles.tileLabel}>12–16 per 1 coat</div>
                  <div className={styles.tileValue}>COVERAGE:</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Product info */}
          <div className={styles.infoCol}>
            <div className={styles.ratingRow}>
              <Stars n={product.rating} />
              <span className={styles.reviewCount}>{product.reviews} reviews</span>
            </div>

            <h1 className={styles.productName}>{product.name}</h1>

            {/* Guarantee */}
            <div className={styles.guarantee}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3abf2e" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline points="9 12 11 14 15 10"/>
              </svg>
              <span>28 day money back guarantee</span>
              <div className={styles.actionIcons}>
                <button className={styles.iconBtn} title="Compare">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="3" width="7" height="18"/><rect x="14" y="8" width="7" height="13"/>
                  </svg>
                </button>
                <button
                  className={`${styles.iconBtn} ${wishlisted ? styles.iconBtnActive : ''}`}
                  onClick={() => toggleWishlist(product)}
                  title="Wishlist"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Size selector */}
            <div className={styles.optionSection}>
              <div className={styles.optionLabel}>Size: <strong>{selectedSize}</strong></div>
              <div className={styles.sizeGrid}>
                {SIZE_OPTIONS.map(size => (
                  <button key={size}
                    className={`${styles.sizeBtn} ${selectedSize === size ? styles.sizeBtnActive : ''}`}
                    onClick={() => { setSelectedSize(size); setSelectedColor(null); setValidationMsg('') }}>{size}</button>
                ))}
                {SIZE_OPTIONS_2.map(size => (
                  <button key={size}
                    className={`${styles.sizeBtn} ${selectedSize === size ? styles.sizeBtnActive : ''}`}
                    onClick={() => { setSelectedSize(size); setSelectedColor(null); setValidationMsg('') }}>{size}</button>
                ))}
              </div>
            </div>

            {/* Color selector — paint tin images as swatches */}
            <div className={styles.optionSection}>
              <div className={styles.optionLabel}>
                Color:&nbsp;
                {selectedColor !== null
                  ? <strong style={{ display:'inline-flex', alignItems:'center', gap:5 }}>
                      <span style={{
                        width:12, height:12, borderRadius:'50%',
                        background: ALL_COLORS[selectedColor].hex,
                        border: '1px solid #ddd',
                        display:'inline-block'
                      }}/>
                      {ALL_COLORS[selectedColor].name}
                    </strong>
                  : <span style={{ color:'#aaa' }}>Select a colour</span>
                }
              </div>
              <div className={styles.colorTinGrid}>
                {ALL_COLORS.map((color, i) => (
                  <button
                    key={i}
                    className={`${styles.colorTin} ${selectedColor === i ? styles.colorTinActive : ''}`}
                    onClick={() => { setSelectedColor(i); setValidationMsg('') }}
                    title={color.hex}
                  >
                    <img src={color.img} alt={color.hex} />
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className={styles.priceSection}>
              {sizeData.oldPrice && <span className={styles.oldPrice}>{sizeData.oldPrice}</span>}
              <span className={styles.price}>{sizeData.price || product.price}</span>
              <span className={styles.saleBadge}>SALE</span>
            </div>

            {/* Qty + Add to Cart */}
            <div className={styles.purchaseRow}>
              <div className={styles.qtyControl}>
                <button className={styles.qtyBtn} onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span className={styles.qtyNum}>{qty}</span>
                <button className={styles.qtyBtn} onClick={() => setQty(q => q + 1)}>+</button>
              </div>
              <button
                className={`${styles.addBtn} ${addedToCart ? styles.addBtnAdded : ''} ${!bothSelected && !addedToCart ? styles.addBtnDisabled : ''}`}
                onClick={handleAddToCart}
              >
                {addedToCart ? '✓ ADDED TO CART' : 'ADD TO CART'}
              </button>
            </div>
            {validationMsg && (
              <p style={{ color: '#e02020', fontSize: '0.78rem', marginTop: 6, marginBottom: 0, fontWeight: 600 }}>
                ⚠ {validationMsg}
              </p>
            )}

            <button className={styles.buyNowBtn} onClick={handleBuyNow}>BUY IT NOW</button>

            <div className={styles.features}>
              {[
                { icon: '🚚', text: 'Free delivery on orders over Rs5,000' },
                { icon: '🔄', text: 'Easy 28-day returns' },
                { icon: '🔒', text: 'Secure checkout' },
              ].map((f, i) => (
                <div key={i} className={styles.featureItem}>
                  <span>{f.icon}</span><span>{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}