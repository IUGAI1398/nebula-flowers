import { useState } from 'react';

const Catalog = ({ products, lang, onSelectProduct, t }) => {
  const [filter, setFilter] = useState('all'); // 'all' | 'strawberry' | 'flowers'

  // Filter products based on active category
  const filteredProducts = products.filter((prod) => {
    if (filter === 'all') return true;
    return prod.category === filter;
  });

  return (
    <section id="catalog" className="catalog-section">
      <div className="container" style={{ padding: 0 }}>
        
        <div className="section-header" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div className="section-title-wrapper">
            <span className="section-star">✦</span>
            <h2 className="section-title">{t.title}</h2>
          </div>
          <p className="section-subtitle">{t.subtitle}</p>
        </div>

        {/* Futuristic Radio Button Category Filter */}
        <div className="catalog-filters-container">
          <div className="catalog-filters glass-panel">
            <label className={`filter-radio-btn ${filter === 'all' ? 'active' : ''}`}>
              <input 
                type="radio" 
                name="catalog-filter" 
                value="all" 
                checked={filter === 'all'} 
                onChange={() => setFilter('all')} 
              />
              <span>{t.filterAll}</span>
            </label>
            
            <label className={`filter-radio-btn ${filter === 'strawberry' ? 'active' : ''}`}>
              <input 
                type="radio" 
                name="catalog-filter" 
                value="strawberry" 
                checked={filter === 'strawberry'} 
                onChange={() => setFilter('strawberry')} 
              />
              <span>{t.filterStrawberry}</span>
            </label>
            
            <label className={`filter-radio-btn ${filter === 'flowers' ? 'active' : ''}`}>
              <input 
                type="radio" 
                name="catalog-filter" 
                value="flowers" 
                checked={filter === 'flowers'} 
                onChange={() => setFilter('flowers')} 
              />
              <span>{t.filterFlowers}</span>
            </label>
          </div>
        </div>

        {/* Products Grid */}
        <div className="catalog-grid">
          {filteredProducts.map((product) => {
            const productName = product.names?.[lang] || product.name || product.names?.['EN'] || '';
            const productTag = product.tags?.[lang] || product.tags?.['EN'] || product.tag || '';

            return (
              <div key={product.id} className="catalog-card glass-panel" onClick={() => onSelectProduct(product)}>
                <div className="card-image-container">
                  <img src={product.image} alt={productName} className="product-image" />
                  <div className="card-overlay-glow"></div>
                  {productTag && <span className="product-tag">{productTag}</span>}
                </div>
                <div className="card-details">
                  <h3 className="product-name">{productName}</h3>
                  <div className="product-footer">
                    <span className="product-price">{product.price}</span>
                    <button className="btn-order-small">
                      {t.btnOrder} <span>✦</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Catalog;
