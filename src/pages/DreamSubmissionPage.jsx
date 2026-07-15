import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { 
  ShieldCheck, 
  ChevronDown, 
  CheckCircle, 
  FileText, 
  UserCheck, 
  Send, 
  MapPin, 
  Sparkles 
} from 'lucide-react';
import { dreamSubmissionContent } from '../data/dreamSubmissionContent';
import { mentorContent } from '../data/mentorContent';
import styles from './DreamSubmissionPage.module.css';

export default function DreamSubmissionPage() {
  const navigate = useNavigate();
  const formRef = useRef(null);

  // Form states (an toàn bảo mật: không lấy liên hệ của trẻ)
  const [formData, setFormData] = useState({
    childName: '',
    childAge: '',
    childDream: '',
    childField: '',
    adultRole: '',
    adultName: '',
    adultSchool: '',
    adultContact: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(-1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const { data, error } = await supabase
        .from('dreams')
        .insert([
          {
            child_name: formData.childName,
            child_age: formData.childAge || null,
            child_dream: formData.childDream,
            child_field: formData.childField || null,
            adult_role: formData.adultRole,
            adult_name: formData.adultName,
            adult_school: formData.adultSchool,
            adult_contact: formData.adultContact,
            status: 'pending'
          }
        ]);

      if (error) throw error;

      setSubmitted(true);
      setTimeout(() => {
        navigate('/map');
      }, 4000);
    } catch (err) {
      console.error('Error submitting dream:', err);
      setSubmitError(err.message || 'Đã xảy ra lỗi khi gửi ước mơ. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChipSelect = (value) => {
    setFormData(prev => ({
      ...prev,
      childField: value
    }));
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(prevIndex => prevIndex === index ? -1 : index);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Helper icons for Section 2 Timeline
  const getTimelineIcon = (index) => {
    const icons = [FileText, UserCheck, Send];
    const IconComponent = icons[index % icons.length];
    return <IconComponent size={24} />;
  };

  // Re-use options list from mentorContent.js
  const fieldOptions = mentorContent.form.fields.field.options;

  return (
    <div className={styles.submitPage}>
      
      {/* SECTION 1: HERO */}
      <motion.section 
        className={styles.heroSection}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <h1 className={`${styles.heroTitle} dm-title-crystal`}>{dreamSubmissionContent.hero.title}</h1>
        <p className={styles.heroSubtitle}>{dreamSubmissionContent.hero.subtitle}</p>
        <button className="btn-primary" onClick={scrollToForm} style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
          {dreamSubmissionContent.hero.ctaBtn}
        </button>
      </motion.section>

      {/* SECTION 2: SAU KHI GỬI THÌ ĐIỀU GÌ XẢY RA */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <h2 className={styles.sectionTitle}>{dreamSubmissionContent.process.title}</h2>
        <div className={styles.timeline}>
          {dreamSubmissionContent.process.steps.map((step, index) => (
            <div key={index} className={styles.stepNode}>
              <div className={styles.stepIconContainer}>
                {getTimelineIcon(index)}
                <span className={styles.stepNumber}>{step.number}</span>
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* SIDE-BY-SIDE: SECTION 3 (FORM) & SECTION 4 (SECURITY) */}
      <div className={styles.formStoryLayout} ref={formRef}>
        
        {/* SECTION 3: FORM GỬI ƯỚC MƠ */}
        <motion.section 
          className={styles.formSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <div className={styles.formCard}>
            {submitted ? (
              <div className={styles.successCard}>
                <CheckCircle size={48} style={{ color: 'var(--color-cyan)' }} />
                <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>Gửi thành công!</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  Cảm ơn bạn đã đại diện gửi thay ước mơ của em nhỏ. Đội ngũ DreamMap sẽ kiểm duyệt nội dung và hiển thị ước mơ của em lên bản đồ, đồng thời liên hệ với bạn ngay khi có thông điệp từ Người Truyền Lửa phù hợp.
                </p>
              </div>
            ) : (
              <>
                <h2 className={styles.formTitle}>{dreamSubmissionContent.form.title}</h2>
                <p className={styles.formSubtitle}>{dreamSubmissionContent.form.description}</p>
                
                <form onSubmit={handleSubmit} className={styles.form}>
                  
                  {/* NHÓM 1: THÔNG TIN EM NHỎ */}
                  <h3 className={styles.subSectionTitle}>{dreamSubmissionContent.form.childSection.title}</h3>
                  
                  <div className={styles.formGroup}>
                    <label>{dreamSubmissionContent.form.childSection.fields.name.label}</label>
                    <input 
                      type="text"
                      name="childName"
                      required
                      value={formData.childName}
                      onChange={handleChange}
                      placeholder={dreamSubmissionContent.form.childSection.fields.name.placeholder}
                      className={styles.inputField}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>{dreamSubmissionContent.form.childSection.fields.age.label}</label>
                    <select
                      name="childAge"
                      required
                      value={formData.childAge}
                      onChange={handleChange}
                      className={styles.selectField}
                    >
                      {dreamSubmissionContent.form.childSection.fields.age.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label>{dreamSubmissionContent.form.childSection.fields.dream.label}</label>
                    <textarea 
                      name="childDream"
                      required
                      rows="4"
                      value={formData.childDream}
                      onChange={handleChange}
                      placeholder={dreamSubmissionContent.form.childSection.fields.dream.placeholder}
                      className={styles.textareaField}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>{dreamSubmissionContent.form.childSection.fields.field.label}</label>
                    <div className={styles.chipGrid}>
                      {fieldOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          className={`${styles.chip} ${formData.childField === opt.value ? styles.chipActive : ''}`}
                          onClick={() => handleChipSelect(opt.value)}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                    {/* Hidden input for HTML5 standard validation */}
                    <input 
                      type="text" 
                      required 
                      tabIndex={-1}
                      value={formData.childField} 
                      onChange={() => {}}
                      style={{ opacity: 0, height: 0, width: 0, padding: 0, border: 0, margin: 0, position: 'absolute' }}
                    />
                  </div>

                  <div className={styles.formSectionDivider} />

                  {/* NHÓM 2: THÔNG TIN NGƯỜI GỬI THAY */}
                  <h3 className={styles.subSectionTitle}>{dreamSubmissionContent.form.adultSection.title}</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '-1rem', marginBottom: '1.5rem' }}>
                    {dreamSubmissionContent.form.adultSection.subtitle}
                  </p>

                  <div className={styles.formGroup}>
                    <label>{dreamSubmissionContent.form.adultSection.fields.role.label}</label>
                    <select
                      name="adultRole"
                      required
                      value={formData.adultRole}
                      onChange={handleChange}
                      className={styles.selectField}
                    >
                      {dreamSubmissionContent.form.adultSection.fields.role.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label>{dreamSubmissionContent.form.adultSection.fields.name.label}</label>
                    <input 
                      type="text"
                      name="adultName"
                      required
                      value={formData.adultName}
                      onChange={handleChange}
                      placeholder={dreamSubmissionContent.form.adultSection.fields.name.placeholder}
                      className={styles.inputField}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>{dreamSubmissionContent.form.adultSection.fields.school.label}</label>
                    <input 
                      type="text"
                      name="adultSchool"
                      value={formData.adultSchool}
                      onChange={handleChange}
                      placeholder={dreamSubmissionContent.form.adultSection.fields.school.placeholder}
                      className={styles.inputField}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>{dreamSubmissionContent.form.adultSection.fields.contact.label}</label>
                    <input 
                      type="text"
                      name="adultContact"
                      required
                      value={formData.adultContact}
                      onChange={handleChange}
                      placeholder={dreamSubmissionContent.form.adultSection.fields.contact.placeholder}
                      className={styles.inputField}
                    />
                  </div>

                  {submitError && (
                    <div style={{ color: '#ff6b6b', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center', backgroundColor: 'rgba(255, 107, 107, 0.1)', padding: '0.5rem', borderRadius: '4px' }}>
                      {submitError}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="btn-primary" 
                    disabled={isSubmitting} 
                    style={{ marginTop: '1.5rem', width: '100%', opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                  >
                    {isSubmitting ? 'Đang gửi...' : dreamSubmissionContent.form.submitBtn}
                  </button>

                </form>
              </>
            )}
          </div>
        </motion.section>

        {/* SECTION 4: CAM KẾT BẢO MẬT */}
        <motion.section 
          className={styles.securityCard}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <div className={styles.securityHeader}>
            <ShieldCheck className={styles.securityIcon} size={36} />
            <h3 className={styles.securityTitle}>{dreamSubmissionContent.security.title}</h3>
          </div>
          <p className={styles.securityDesc}>{dreamSubmissionContent.security.description}</p>
        </motion.section>

      </div>

      {/* SECTION 5: FAQ (ACCORDION) */}
      <motion.section 
        className={styles.faqSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <h2 className={styles.sectionTitle}>{dreamSubmissionContent.faq.title}</h2>
        <div className={styles.faqList}>
          {dreamSubmissionContent.faq.list.map((item, index) => (
            <div key={index} className={styles.faqItem}>
              <div className={styles.faqHeader} onClick={() => toggleFaq(index)}>
                <span className={styles.faqQuestion}>{item.question}</span>
                <ChevronDown className={`${styles.faqIcon} ${openFaqIndex === index ? styles.faqIconRotated : ''}`} size={20} />
              </div>
              <AnimatePresence initial={false}>
                {openFaqIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={styles.faqAnswer}
                  >
                    <div className={styles.faqAnswerInner}>
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.section>

    </div>
  );
}
