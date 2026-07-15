import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Award, 
  Clock, 
  Users, 
  Sparkles, 
  UserPlus, 
  UserCheck, 
  Video, 
  MapPin, 
  User, 
  Mail, 
  ChevronDown, 
  CheckCircle 
} from 'lucide-react';
import { mentorContent } from '../data/mentorContent';
import styles from './MentorRegistration.module.css';

export default function MentorRegistration() {
  const navigate = useNavigate();
  const formRef = useRef(null);

  // Form states (kept exactly matching the original)
  const [formData, setFormData] = useState({
    name: '',
    field: '',
    contactInfo: '',
    bio: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // FAQ state: track which accordion index is open (-1 means all closed)
  const [openFaqIndex, setOpenFaqIndex] = useState(-1);

  // Section variants for scroll reveal
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
      setTimeout(() => {
        navigate('/map');
      }, 3000);
    }, 1000);
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
      field: value
    }));
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(prevIndex => prevIndex === index ? -1 : index);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Helper icons mapping for Section 3 Benefits
  const getBenefitIcon = (index) => {
    const icons = [Award, Clock, Users, Sparkles];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className={styles.benefitIcon} size={32} />;
  };

  // Helper icons mapping for Section 5 Process
  const getProcessIcon = (index) => {
    const icons = [UserPlus, UserCheck, Video, MapPin];
    const IconComponent = icons[index % icons.length];
    return <IconComponent size={24} />;
  };

  return (
    <div className={styles.mentorPage}>
      
      {/* SECTION 1: HERO */}
      <motion.section 
        className={styles.heroSection}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <h1 className={`${styles.heroTitle} dm-title-crystal`}>{mentorContent.hero.title}</h1>
        <p className={styles.heroSubtitle}>{mentorContent.hero.subtitle}</p>
        <button className="btn-primary" onClick={scrollToForm} style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
          {mentorContent.hero.ctaBtn}
        </button>
      </motion.section>

      {/* SECTION 2: NGƯỜI TRUYỀN LỬA LÀ AI */}
      <motion.section 
        className={styles.aboutSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <h2 className={styles.aboutTitle}>{mentorContent.about.title}</h2>
        <p className={styles.aboutDesc}>{mentorContent.about.description}</p>
      </motion.section>

      {/* SECTION 3: VÌ SAO NÊN THAM GIA */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <h2 className={styles.sectionTitle}>{mentorContent.benefits.title}</h2>
        <div className={styles.benefitsGrid}>
          {mentorContent.benefits.list.map((benefit, index) => (
            <div key={index} className={styles.benefitCard}>
              {getBenefitIcon(index)}
              <h3 className={styles.benefitTitle}>{benefit.title}</h3>
              <p className={styles.benefitDesc}>{benefit.description}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* SECTION 4: NGƯỜI TRUYỀN LỬA HIỆN CÓ (Ẩn nếu data rỗng) */}
      {mentorContent.existingMentors && mentorContent.existingMentors.length > 0 && (
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <h2 className={styles.sectionTitle}>Những Người Đã Truyền Lửa</h2>
          <div className={styles.showcaseGrid}>
            {mentorContent.existingMentors.map((mentor, index) => (
              <div key={index} className={styles.showcaseCard}>
                <div className={styles.mentorAvatar}>{mentor.initial || "M"}</div>
                <h3 className={styles.mentorName}>{mentor.name}</h3>
                <span className={styles.mentorField}>{mentor.field}</span>
                <p className={styles.mentorQuote}>"{mentor.quote}"</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* SECTION 5: QUY TRÌNH THAM GIA */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <h2 className={styles.sectionTitle}>{mentorContent.process.title}</h2>
        <div className={styles.timeline}>
          {mentorContent.process.steps.map((step, index) => (
            <div key={index} className={styles.stepNode}>
              <div className={styles.stepIconContainer}>
                {getProcessIcon(index)}
                <span className={styles.stepNumber}>{step.number}</span>
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* SECTION 6: FORM ĐĂNG KÝ (Bản nâng cấp UX) */}
      <motion.section 
        ref={formRef}
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
              <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>Đăng ký thành công!</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Cảm ơn bạn đã đăng ký! Ban quản trị dự án sẽ liên hệ với bạn qua thông tin liên lạc được cung cấp khi có ước mơ phù hợp với lĩnh vực của bạn.
              </p>
            </div>
          ) : (
            <>
              <h2 className={styles.formTitle}>{mentorContent.form.title}</h2>
              <p className={styles.formSubtitle}>{mentorContent.form.description}</p>
              
              <form onSubmit={handleSubmit} className={styles.form}>
                
                {/* Họ và tên field */}
                <div className={styles.formGroup}>
                  <label>{mentorContent.form.fields.name.label}</label>
                  <div className={styles.inputWrapper}>
                    <User className={styles.inputIcon} size={18} />
                    <input 
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={mentorContent.form.fields.name.placeholder}
                      className={styles.inputField}
                    />
                  </div>
                </div>

                {/* Lĩnh vực (Chip / Tag selector) */}
                <div className={styles.formGroup}>
                  <label>{mentorContent.form.fields.field.label}</label>
                  <div className={styles.chipGrid}>
                    {mentorContent.form.fields.field.options.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        className={`${styles.chip} ${formData.field === opt.value ? styles.chipActive : ''}`}
                        onClick={() => handleChipSelect(opt.value)}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  {/* Keep invisible input for form validation validation required */}
                  <input 
                    type="text" 
                    required 
                    tabIndex={-1}
                    value={formData.field} 
                    onChange={() => {}}
                    style={{ opacity: 0, height: 0, width: 0, padding: 0, border: 0, margin: 0, position: 'absolute' }}
                  />
                </div>

                {/* Thông tin liên hệ field */}
                <div className={styles.formGroup}>
                  <label>{mentorContent.form.fields.contact.label}</label>
                  <div className={styles.inputWrapper}>
                    <Mail className={styles.inputIcon} size={18} />
                    <input 
                      type="text"
                      name="contactInfo"
                      required
                      value={formData.contactInfo}
                      onChange={handleChange}
                      placeholder={mentorContent.form.fields.contact.placeholder}
                      className={styles.inputField}
                    />
                  </div>
                </div>

                {/* Giới thiệu ngắn field */}
                <div className={styles.formGroup}>
                  <label>{mentorContent.form.fields.bio.label}</label>
                  <textarea 
                    name="bio"
                    rows="4"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder={mentorContent.form.fields.bio.placeholder}
                    className={styles.textareaField}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '1.5rem', width: '100%' }}>
                  Đăng ký ngay
                </button>
              </form>
            </>
          )}
        </div>
      </motion.section>

      {/* SECTION 7: FAQ (Accordion) */}
      <motion.section 
        className={styles.faqSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <h2 className={styles.sectionTitle}>{mentorContent.faq.title}</h2>
        <div className={styles.faqList}>
          {mentorContent.faq.list.map((item, index) => (
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
