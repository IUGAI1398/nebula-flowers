import { useState } from 'react';

const QuickOrder = ({ onSubmitSuccess, t }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = t.errorName;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t.errorPhone;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      const successMessage = t.success.replace('{name}', formData.name);
      onSubmitSuccess(successMessage);
      setFormData({
        name: '',
        phone: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="quick-order-card glass-panel">
      <div className="card-header">
        <span className="card-star">✦</span>
        <h3>{t.title}</h3>
      </div>
      <p className="card-subtitle">
        {t.subtitle}
      </p>

      <form onSubmit={handleSubmit} className="quick-order-form">
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder={t.placeholderName}
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'input-error' : ''}
            disabled={isSubmitting}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="phone"
            placeholder={t.placeholderPhone}
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? 'input-error' : ''}
            disabled={isSubmitting}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <textarea
            name="message"
            placeholder={t.placeholderMessage}
            value={formData.message}
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
              {t.btnSending}
            </>
          ) : (
            <>
              {t.btnSubmit} <span className="submit-star">✦</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default QuickOrder;
