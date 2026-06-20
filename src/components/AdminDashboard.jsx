import { useState } from 'react';
import Logo from './Logo';
import { defaultProducts, formatPrice } from '../productsService';

const AdminDashboard = ({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onResetDefaults,
  onLogout,
  onBackToSite,
  isLoading
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null if adding new
  const [formData, setFormData] = useState({
    id: '',
    nameRU: '',
    nameEN: '',
    nameTH: '',
    price: '',
    category: 'flowers',
    tagRU: '',
    tagEN: '',
    tagTH: '',
    image: ''
  });

  const [imageType, setImageType] = useState('upload'); // 'upload' | 'default'
  const [selectedDefaultIdx, setSelectedDefaultIdx] = useState(0);
  const [uploadError, setUploadError] = useState('');
  
  // Asynchronous action load states
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Statistics
  const totalCount = products.length;
  const flowersCount = products.filter(p => p.category === 'flowers').length;
  const strawberryCount = products.filter(p => p.category === 'strawberry').length;

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      id: 'prod_' + Math.random().toString(36).substr(2, 9),
      nameRU: '',
      nameEN: '',
      nameTH: '',
      price: '',
      category: 'flowers',
      tagRU: '',
      tagEN: '',
      tagTH: '',
      image: ''
    });
    setImageType('upload');
    setUploadError('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      id: product.id,
      nameRU: product.names.RU || '',
      nameEN: product.names.EN || '',
      nameTH: product.names.TH || '',
      price: product.price.replace(/[^\d]/g, ''), // only digits
      category: product.category || 'flowers',
      tagRU: product.tags?.RU || '',
      tagEN: product.tags?.EN || '',
      tagTH: product.tags?.TH || '',
      image: product.image || ''
    });

    const defaultImgIdx = defaultProducts.findIndex(p => p.image === product.image);
    if (defaultImgIdx !== -1) {
      setImageType('default');
      setSelectedDefaultIdx(defaultImgIdx);
    } else {
      setImageType('upload');
    }

    setUploadError('');
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const name = products.find(p => p.id === id)?.names.EN || 'Product';
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      setDeletingId(id);
      try {
        await onDeleteProduct(id);
      } catch (err) {
        console.error(err);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleResetDefaults = async () => {
    if (window.confirm('Are you sure you want to reset all products to default? Any custom products will be lost.')) {
      await onResetDefaults();
    }
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    setUploadError('');
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setUploadError('Image is too large. Max size is 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, image: reader.result }));
    };
    reader.onerror = () => {
      setUploadError('Error reading file.');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nameRU.trim() || !formData.nameEN.trim() || !formData.nameTH.trim()) {
      alert('Please fill product name in all three languages (RU, EN, TH).');
      return;
    }
    if (!formData.price || isNaN(formData.price)) {
      alert('Please enter a valid numeric price.');
      return;
    }

    let finalImage = formData.image;
    if (imageType === 'default') {
      finalImage = defaultProducts[selectedDefaultIdx].image;
    }

    if (!finalImage) {
      alert('Please upload an image or choose one from the defaults.');
      return;
    }

    const formattedProduct = {
      id: formData.id,
      names: {
        RU: formData.nameRU.trim(),
        EN: formData.nameEN.trim(),
        TH: formData.nameTH.trim()
      },
      price: formatPrice(formData.price),
      category: formData.category,
      image: finalImage,
      tags: {
        RU: formData.tagRU.trim(),
        EN: formData.tagEN.trim(),
        TH: formData.tagTH.trim()
      }
    };

    setIsFormSubmitting(true);
    try {
      let success = false;
      if (editingProduct) {
        success = await onEditProduct(formattedProduct);
      } else {
        success = await onAddProduct(formattedProduct);
      }
      if (success) {
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsFormSubmitting(false);
    }
  };

  return (
    <div className="admin-dashboard-container">
      {/* Admin Header */}
      <header className="admin-header glass-panel">
        <div className="admin-header-content">
          <div className="admin-brand">
            <Logo showText={false} size={42} />
            <div>
              <h3>Nebula Admin</h3>
              <p>Cosmic Control Center</p>
            </div>
          </div>

          <div className="admin-header-actions">
            <button className="btn-admin-header-secondary" onClick={onBackToSite}>
              👁 View Store
            </button>
            <button className="btn-admin-header-danger" onClick={onLogout}>
              🚪 Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container admin-main-content">
        
        {/* Statistics Cards */}
        <section className="admin-stats-grid">
          <div className="admin-stat-card glass-panel border-cyan">
            <div className="stat-icon">🌟</div>
            <div className="stat-info">
              <h4>{isLoading ? '...' : totalCount}</h4>
              <p>Total Products</p>
            </div>
          </div>
          <div className="admin-stat-card glass-panel border-pink">
            <div className="stat-icon">🌸</div>
            <div className="stat-info">
              <h4>{isLoading ? '...' : flowersCount}</h4>
              <p>Flowers Bouquet</p>
            </div>
          </div>
          <div className="admin-stat-card glass-panel border-yellow">
            <div className="stat-icon">🍓</div>
            <div className="stat-info">
              <h4>{isLoading ? '...' : strawberryCount}</h4>
              <p>Chocolate Berries</p>
            </div>
          </div>
        </section>

        {/* Catalog Control Header */}
        <section className="catalog-control-header">
          <div className="control-title">
            <h2>Product Catalog</h2>
            <p>Create, update, and manage products on the live website showcase</p>
          </div>

          <div className="control-buttons">
            <button 
              className="btn-admin-action-success" 
              onClick={handleOpenAdd}
              disabled={isLoading}
            >
              ➕ Add New Product
            </button>
            <button 
              className="btn-admin-action-warning" 
              onClick={handleResetDefaults}
              disabled={isLoading}
            >
              {isLoading ? 'Resetting...' : '🔄 Reset to Defaults'}
            </button>
          </div>
        </section>

        {/* Products Table */}
        <div className="admin-table-container glass-panel">
          <table className="admin-products-table">
            <thead>
              <tr>
                <th>Preview</th>
                <th>Names (EN / RU / TH)</th>
                <th>Category</th>
                <th>Price</th>
                <th>Tags (EN / RU / TH)</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && products.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                    <div className="table-loader-inline">
                      <div className="loading-orbit-mini">
                        <div className="loading-planet-mini"></div>
                      </div>
                      <span>Connecting to Supabase Database...</span>
                    </div>
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                    No products found. Click "Add New Product" to create one or "Reset to Defaults".
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="table-img-wrapper">
                        <img src={product.image} alt={product.names.EN} />
                      </div>
                    </td>
                    <td className="col-names">
                      <div className="name-lang"><span className="lang-lbl">EN:</span> {product.names.EN}</div>
                      <div className="name-lang"><span className="lang-lbl">RU:</span> {product.names.RU}</div>
                      <div className="name-lang"><span className="lang-lbl">TH:</span> {product.names.TH}</div>
                    </td>
                    <td>
                      <span className={`badge-category ${product.category}`}>
                        {product.category === 'flowers' ? 'Flowers' : 'Strawberry'}
                      </span>
                    </td>
                    <td className="col-price">{product.price}</td>
                    <td className="col-tags">
                      {product.tags?.EN || product.tags?.RU || product.tags?.TH ? (
                        <>
                          <div className="tag-lang"><span className="lang-lbl">EN:</span> {product.tags.EN || '—'}</div>
                          <div className="tag-lang"><span className="lang-lbl">RU:</span> {product.tags.RU || '—'}</div>
                          <div className="tag-lang"><span className="lang-lbl">TH:</span> {product.tags.TH || '—'}</div>
                        </>
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>No Tag</span>
                      )}
                    </td>
                    <td>
                      <div className="table-actions">
                        <button 
                          className="btn-table-edit" 
                          onClick={() => handleOpenEdit(product)}
                          disabled={deletingId !== null}
                          title="Edit Product"
                        >
                          ✏️ Edit
                        </button>
                        <button 
                          className="btn-table-delete" 
                          onClick={() => handleDelete(product.id)}
                          disabled={deletingId === product.id}
                          title="Delete Product"
                        >
                          {deletingId === product.id ? 'Deleting...' : '🗑️ Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => !isFormSubmitting && setIsModalOpen(false)}>
          <div className="admin-modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <button 
              className="admin-modal-close" 
              onClick={() => setIsModalOpen(false)}
              disabled={isFormSubmitting}
            >
              ✖
            </button>
            
            <div className="admin-modal-header">
              <h3>{editingProduct ? 'Edit Product Details' : 'Add New Cosmic Product'}</h3>
              <p>Configure product attributes and translations</p>
            </div>

            <form onSubmit={handleSubmit} className="admin-modal-form">
              <div className="modal-form-grid">
                
                {/* Left Column: Details */}
                <div className="modal-form-left">
                  
                  {/* Localized Names */}
                  <div className="form-group-panel">
                    <label className="panel-header">Product Titles (All Languages Required)</label>
                    <div className="form-group">
                      <label>English Name</label>
                      <input
                        type="text"
                        value={formData.nameEN}
                        onChange={(e) => setFormData(prev => ({ ...prev, nameEN: e.target.value }))}
                        placeholder="e.g. Starry Pink Hydrangea"
                        disabled={isFormSubmitting}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Russian Name</label>
                      <input
                        type="text"
                        value={formData.nameRU}
                        onChange={(e) => setFormData(prev => ({ ...prev, nameRU: e.target.value }))}
                        placeholder="e.g. Звездная Розовая Гортензия"
                        disabled={isFormSubmitting}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Thai Name</label>
                      <input
                        type="text"
                        value={formData.nameTH}
                        onChange={(e) => setFormData(prev => ({ ...prev, nameTH: e.target.value }))}
                        placeholder="e.g. ไฮเดรนเยียสีชมพูแห่งดวงดาว"
                        disabled={isFormSubmitting}
                        required
                      />
                    </div>
                  </div>

                  {/* Price & Category */}
                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Price (Thai Baht ฿)</label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                        placeholder="e.g. 2500"
                        min="1"
                        disabled={isFormSubmitting}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                        disabled={isFormSubmitting}
                      >
                        <option value="flowers">Flowers & Bouquets</option>
                        <option value="strawberry">Chocolate Strawberries</option>
                      </select>
                    </div>
                  </div>

                  {/* Localized Tags */}
                  <div className="form-group-panel">
                    <label className="panel-header">Promo Tags (Optional badges e.g. Bestseller)</label>
                    <div className="form-row-3">
                      <div className="form-group">
                        <label>Tag (EN)</label>
                        <input
                          type="text"
                          value={formData.tagEN}
                          onChange={(e) => setFormData(prev => ({ ...prev, tagEN: e.target.value }))}
                          placeholder="Bestseller"
                          disabled={isFormSubmitting}
                        />
                      </div>
                      <div className="form-group">
                        <label>Tag (RU)</label>
                        <input
                          type="text"
                          value={formData.tagRU}
                          onChange={(e) => setFormData(prev => ({ ...prev, tagRU: e.target.value }))}
                          placeholder="Бестселлер"
                          disabled={isFormSubmitting}
                        />
                      </div>
                      <div className="form-group">
                        <label>Tag (TH)</label>
                        <input
                          type="text"
                          value={formData.tagTH}
                          onChange={(e) => setFormData(prev => ({ ...prev, tagTH: e.target.value }))}
                          placeholder="ขายดี"
                          disabled={isFormSubmitting}
                        />
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Column: Image Manager */}
                <div className="modal-form-right">
                  <div className="image-manager-panel">
                    <label className="panel-header">Product Visual Asset</label>
                    
                    <div className="image-type-selector">
                      <label className={`image-type-btn ${imageType === 'upload' ? 'active' : ''}`}>
                        <input
                          type="radio"
                          name="img-type"
                          value="upload"
                          checked={imageType === 'upload'}
                          onChange={() => setImageType('upload')}
                          disabled={isFormSubmitting}
                        />
                        <span>Upload File</span>
                      </label>
                      <label className={`image-type-btn ${imageType === 'default' ? 'active' : ''}`}>
                        <input
                          type="radio"
                          name="img-type"
                          value="default"
                          checked={imageType === 'default'}
                          onChange={() => setImageType('default')}
                          disabled={isFormSubmitting}
                        />
                        <span>Preset Library</span>
                      </label>
                    </div>

                    {imageType === 'upload' ? (
                      <div className="image-uploader-section">
                        <label className="file-upload-box glass-panel">
                          <span>📁 Choose Image File</span>
                          <span className="file-box-desc">PNG, JPG up to 2MB</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageFileChange}
                            disabled={isFormSubmitting}
                            style={{ display: 'none' }}
                          />
                        </label>
                        {uploadError && <div className="img-err-msg">{uploadError}</div>}
                      </div>
                    ) : (
                      <div className="preset-selector-grid">
                        {defaultProducts.map((p, idx) => (
                          <div
                            key={p.id}
                            className={`preset-thumbnail ${selectedDefaultIdx === idx ? 'selected' : ''}`}
                            onClick={() => {
                              if (isFormSubmitting) return;
                              setSelectedDefaultIdx(idx);
                              setFormData(prev => ({ ...prev, image: p.image }));
                            }}
                          >
                            <img src={p.image} alt={p.names.EN} />
                            <span className="chk-bubble">✓</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Image Preview Box */}
                    <div className="image-preview-panel glass-panel">
                      <span className="preview-lbl">Preview</span>
                      {formData.image || (imageType === 'default' && defaultProducts[selectedDefaultIdx]?.image) ? (
                        <img
                          src={imageType === 'default' ? defaultProducts[selectedDefaultIdx].image : formData.image}
                          className="preview-img"
                          alt="Product preview"
                        />
                      ) : (
                        <div className="no-preview">No image selected</div>
                      )}
                    </div>

                  </div>
                </div>

              </div>

              <div className="admin-modal-footer">
                <button 
                  type="button" 
                  className="btn-admin-header-secondary" 
                  onClick={() => setIsModalOpen(false)}
                  disabled={isFormSubmitting}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-filled" disabled={isFormSubmitting}>
                  {isFormSubmitting ? (
                    <>
                      <svg className="spinner" viewBox="0 0 24 24" width="16" height="16">
                        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="30 30" />
                      </svg>
                      <span>Saving to DB...</span>
                    </>
                  ) : editingProduct ? (
                    'Save Product'
                  ) : (
                    <>
                      <span>Launch Product</span>
                      <span className="submit-star">✦</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
