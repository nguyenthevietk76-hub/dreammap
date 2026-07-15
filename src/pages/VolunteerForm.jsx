import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import styles from './Forms.module.css'; // Shared form styles

export default function VolunteerForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    schoolId: '',
    contentType: 'text',
    content: '',
    childName: '',
    childAge: '',
    field: '',
    parentConsent: false
  });
  const [submitted, setSubmitted] = useState(false);

  // Check if form has unsaved data
  const isDirty = !submitted && (formData.content.length > 0 || formData.schoolId !== '' || formData.field !== '');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      // Reset after a while
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ ...formData, content: '', childName: '', childAge: '', parentConsent: false });
        navigate('/map');
      }, 3000);
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <Modal 
      isOpen={true} 
      onClose={() => navigate('/map')} 
      title="Gửi ước mơ (dành cho TNV)"
      isDirty={isDirty}
    >
      <div className={styles.formContainer} style={{ background: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}>
        <p className={styles.subtitle} style={{ marginBottom: '1.5rem' }}>Nhập thông tin ước mơ từ thẻ giấy hoặc ghi âm của các em.</p>

        {submitted ? (
          <div className={styles.successMessage}>
            Đã gửi thành công! Ước mơ đang chờ duyệt để hiển thị lên bản đồ.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Điểm trường</label>
              <select name="schoolId" value={formData.schoolId} onChange={handleChange} required>
                <option value="">-- Chọn điểm trường --</option>
                <option value="s1">Điểm trường Nậm Mười, Yên Bái</option>
                <option value="s2">Điểm trường Trạm Tấu, Yên Bái</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Lĩnh vực nghề nghiệp / Ước mơ</label>
              <select name="field" value={formData.field} onChange={handleChange} required>
                <option value="">-- Chọn lĩnh vực --</option>
                <option value="health">Y tế / Bác sĩ</option>
                <option value="education">Giáo dục / Giáo viên</option>
                <option value="art">Nghệ thuật / Âm nhạc / Hội hoạ</option>
                <option value="tech">Kỹ thuật / Công nghệ</option>
                <option value="other">Khác</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Nội dung ước mơ</label>
              <textarea 
                name="content" 
                rows="4" 
                placeholder="Nhập chính xác nội dung em nhỏ viết hoặc nói..."
                value={formData.content}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Tên/Biệt danh bé (Tuỳ chọn)</label>
                <input 
                  type="text" 
                  name="childName" 
                  value={formData.childName} 
                  onChange={handleChange} 
                  placeholder="VD: Mí, Sùng A Súa..."
                />
              </div>
              <div className={styles.formGroup}>
                <label>Tuổi (Tuỳ chọn)</label>
                <input 
                  type="number" 
                  name="childAge" 
                  value={formData.childAge} 
                  onChange={handleChange} 
                  min="3" max="15"
                />
              </div>
            </div>

            <div className={styles.checkboxGroup}>
              <input 
                type="checkbox" 
                id="parentConsent" 
                name="parentConsent"
                checked={formData.parentConsent}
                onChange={handleChange}
              />
              <label htmlFor="parentConsent">
                Đã có sự đồng ý của phụ huynh/giáo viên để hiển thị tên thật (nếu để trống, tên sẽ được ẩn danh hoặc dùng biệt danh).
              </label>
            </div>

            <button type="submit" className={styles.submitButton}>Gửi ước mơ</button>
          </form>
        )}
      </div>
    </Modal>
  );
}
