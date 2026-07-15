import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_SCHOOLS, PROVINCES } from '../data/mockData';
import Modal from '../components/Modal';
import styles from './JoinPage.module.css';
import formStyles from './Forms.module.css';

export default function JoinPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewSchoolForm, setShowNewSchoolForm] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  
  // New school form state
  const [formData, setFormData] = useState({ name: '', province: '', district: '', address: '' });
  const [submitted, setSubmitted] = useState(false);

  // Check if dirty
  const isDirty = !submitted && (formData.name !== '' || formData.province !== '' || formData.district !== '');

  // Filter schools based on search ignoring accents
  const normalizeText = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  
  const filteredSchools = MOCK_SCHOOLS.filter(s => 
    normalizeText(s.name).includes(normalizeText(searchTerm)) || 
    normalizeText(s.province).includes(normalizeText(searchTerm))
  );

  const handleSearchSelect = (school) => {
    setSearchTerm(school.name);
    setSearchFocused(false);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Mock geocoding and submission
    setTimeout(() => {
      setSubmitted(true);
      setShowNewSchoolForm(false);
    }, 1000);
  };

  return (
    <Modal 
      isOpen={true} 
      onClose={() => navigate('/map')} 
      title="Tìm kiếm hoặc đăng ký trường"
      isDirty={isDirty}
    >
      <div className={formStyles.formContainer} style={{ background: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}>
        <p className={formStyles.subtitle}>
          Trường của bạn đã tham gia Bản Đồ Ước Mơ chưa? Tìm kiếm để bắt đầu, hoặc đăng ký điểm trường mới.
        </p>

          {!submitted ? (
            <div className={styles.searchSection}>
              <div className={styles.searchBox}>
                <input 
                  type="text" 
                  placeholder="Gõ tên trường hoặc tỉnh/thành (ví dụ: Mèo Vạc)"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowNewSchoolForm(false);
                  }}
                  onFocus={() => setSearchFocused(true)}
                  className={styles.searchInput}
                />
                
                <AnimatePresence>
                  {searchFocused && searchTerm.length > 0 && (
                    <motion.div 
                      className={styles.autocompleteDropdown}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      {filteredSchools.length > 0 ? (
                        filteredSchools.map(school => (
                          <div 
                            key={school.id} 
                            className={styles.dropdownItem}
                            onClick={() => handleSearchSelect(school)}
                          >
                            <strong>{school.name}</strong>
                            <span className={styles.itemMeta}>{school.province}</span>
                          </div>
                        ))
                      ) : (
                        <div className={styles.noResult}>
                          Không tìm thấy trường nào. 
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Exact Match Action */}
              {MOCK_SCHOOLS.some(s => s.name === searchTerm) && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }}
                  className={styles.matchFoundAction}
                >
                  <p>Trường đã có trong hệ thống!</p>
                  <Link to="/volunteer" className="btn-primary" style={{ width: '100%', display: 'block', textAlign: 'center' }}>
                    Nhập ước mơ cho trường này
                  </Link>
                </motion.div>
              )}

              {/* Not Found / Add New Action */}
              {!MOCK_SCHOOLS.some(s => s.name === searchTerm) && (
                <div className={styles.addSection}>
                  <p>Trường của bạn chưa có trong danh sách?</p>
                  <button 
                    type="button"
                    className="btn-secondary"
                    onClick={() => setShowNewSchoolForm(true)}
                  >
                    + Thêm trường mới
                  </button>
                </div>
              )}

              {/* Add New Form */}
              <AnimatePresence>
                {showNewSchoolForm && (
                  <motion.form 
                    className={`${formStyles.form} ${styles.newSchoolForm}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleRegisterSubmit}
                  >
                    <hr className={styles.divider} />
                    <h3>Đăng ký điểm trường mới</h3>
                    
                    <div className={formStyles.formGroup}>
                      <label>Tên điểm trường *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="VD: Điểm trường Hấu Chua"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>

                    <div className={formStyles.formRow}>
                      <div className={formStyles.formGroup}>
                        <label>Tỉnh/Thành phố *</label>
                        <select 
                          required
                          value={formData.province}
                          onChange={e => setFormData({...formData, province: e.target.value})}
                        >
                          <option value="">-- Chọn tỉnh --</option>
                          {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </div>
                      <div className={formStyles.formGroup}>
                        <label>Quận/Huyện *</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="VD: Mù Cang Chải"
                          value={formData.district}
                          onChange={e => setFormData({...formData, district: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className={formStyles.formGroup}>
                      <label>Địa chỉ chi tiết (tuỳ chọn)</label>
                      <input 
                        type="text" 
                        placeholder="Thôn/Xã..."
                        value={formData.address}
                        onChange={e => setFormData({...formData, address: e.target.value})}
                      />
                    </div>

                    <div className={styles.geocodingNote}>
                      Hệ thống sẽ tự động xác định toạ độ gần đúng dựa trên địa chỉ. Thông tin sẽ được Ban tổ chức xác minh trước khi hiển thị công khai trên Bản Đồ Ước Mơ.
                    </div>

                    <button type="submit" className={formStyles.submitButton}>Gửi đăng ký chờ duyệt</button>
                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          ) : (
            <motion.div 
              className={formStyles.successMessage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h3>Đăng ký thành công!</h3>
              <p style={{ marginTop: '0.5rem', color: 'var(--color-text-main)' }}>
                Trường <strong>{formData.name}</strong> đã được thêm vào hệ thống với trạng thái <span style={{ color: 'var(--color-gold)' }}>Chờ xác minh</span>.
              </p>
              <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
                Toạ độ ước tính sẽ được kiểm duyệt để đảm bảo độ chính xác trên bản đồ. Chúng tôi sẽ liên hệ với bạn nếu cần thêm thông tin.
              </p>
              <button 
                className="btn-secondary" 
                style={{ marginTop: '1.5rem' }}
                onClick={() => {
                  setSubmitted(false);
                  setSearchTerm('');
                  setFormData({ name: '', province: '', district: '', address: '' });
                }}
              >
                Về trang tìm kiếm
              </button>
            </motion.div>
          )}
      </div>
    </Modal>
  );
}
