import { useState } from 'react';

const OrderModal = ({ isOpen, onClose, selectedProduct, products = [], lang = 'EN', onSubmitSuccess, t }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    product: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [prevSelectedProduct, setPrevSelectedProduct] = useState(null);
  const [prevIsOpen, setPrevIsOpen] = useState(false);

  if (selectedProduct !== prevSelectedProduct || isOpen !== prevIsOpen) {
    setPrevSelectedProduct(selectedProduct);
    setPrevIsOpen(isOpen);
    setFormData((prev) => ({
      ...prev,
      product: selectedProduct ? selectedProduct.id : 'custom'
    }));
  }

  const modalT = t.modal;

  const productsList = [
    ...products.map((p) => {
      const name = p.names?.[lang] || p.name || p.names?.['EN'] || '';
      return {
        value: p.id,
        label: `${name} (${p.price})`
      };
    }),
    { value: 'custom', label: modalT.customOption }
  ];

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = modalT.errorName;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = modalT.errorPhone;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      const chosenProductLabel = productsList.find(p => p.value === formData.product)?.label || modalT.customOption;
      const successMessage = modalT.success.replace('{product}', chosenProductLabel.split(' (')[0]);

      // WhatsApp Redirection
      const phoneNumber = '66956680015';
      let messageText = '';
      if (modalT.title === 'Оформление заказа') {
        messageText = `Здравствуйте! Я хочу оформить заказ:\n\n🌸 Товар: ${chosenProductLabel}\n👤 Имя: ${formData.name}\n📞 Телефон: ${formData.phone}\n📝 Пожелания: ${formData.notes || '-'}`;
      } else if (modalT.title === 'รายละเอียดการสั่งซื้อ') {
        messageText = `สวัสดีค่ะ/ครับ! ฉันต้องการสั่งซื้อสินค้า:\n\n🌸 สินค้า: ${chosenProductLabel}\n👤 ชื่อ: ${formData.name}\n📞 เบอร์โทรศัพท์: ${formData.phone}\n📝 รายละเอียดเพิ่มเติม: ${formData.notes || '-'}`;
      } else {
        messageText = `Hello! I would like to place an order:\n\n🌸 Product: ${chosenProductLabel}\n👤 Name: ${formData.name}\n📞 Phone: ${formData.phone}\n📝 Notes: ${formData.notes || '-'}`;
      }

      const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageText)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');

      onSubmitSuccess(successMessage);
      setFormData({
        name: '',
        phone: '',
        product: '',
        notes: ''
      });
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="modal-header">
          <span className="modal-star">✦</span>
          <h2>{modalT.title}</h2>
        </div>
        <p className="modal-subtitle">
          {modalT.subtitle}
        </p>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>{modalT.labelName}</label>
            <input
              type="text"
              name="name"
              placeholder={modalT.placeholderName}
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'input-error' : ''}
              disabled={isSubmitting}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>{modalT.labelPhone}</label>
            <input
              type="text"
              name="phone"
              placeholder={modalT.placeholderPhone}
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? 'input-error' : ''}
              disabled={isSubmitting}
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label>{modalT.labelProduct}</label>
            <select
              name="product"
              value={formData.product}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              {productsList.map((product) => (
                <option key={product.value} value={product.value}>
                  {product.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>{modalT.labelNotes}</label>
            <textarea
              name="notes"
              placeholder={modalT.placeholderNotes}
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              disabled={isSubmitting}
            ></textarea>
          </div>

          <button type="submit" className="btn-filled btn-submit-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <svg className="spinner" viewBox="0 0 24 24" width="18" height="18">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="30 30" />
                </svg>
                {modalT.btnProcessing}
              </>
            ) : (
              <>
                {modalT.btnConfirm} <span className="submit-star">✦</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
