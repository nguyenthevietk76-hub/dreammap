import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Map, Sparkles, Heart, Globe, Compass, Users } from 'lucide-react';
import { aboutContent } from '../data/aboutContent';
import styles from './AboutPage.module.css';

export default function AboutPage() {
  const navigate = useNavigate();

  // Animation variants for scroll reveal
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  // Map value index to Lucide icons
  const getValueIcon = (index) => {
    const icons = [Heart, Globe, Compass, Users];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className={styles.valueIcon} size={32} />;
  };

  // Map step index to Lucide icons
  const getStepIcon = (index) => {
    const icons = [UserPlus, Map, Sparkles];
    const IconComponent = icons[index % icons.length];
    return <IconComponent size={30} />;
  };

  return (
    <div className={styles.aboutPage}>
      
      {/* SECTION 1: VẤN ĐỀ (Hero) */}
      <motion.section 
        className={styles.heroSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <h1 className="dm-title-crystal">{aboutContent.hero.title}</h1>
        <h2 className={styles.heroSubtitle}>{aboutContent.hero.subtitle}</h2>
        <p className={styles.heroDesc}>{aboutContent.hero.description}</p>
      </motion.section>

      {/* SECTION 2: SỨ MỆNH & TẦM NHÌN */}
      <motion.section 
        className={styles.missionVisionGrid}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className={styles.missionCard}>
          <h3 className={styles.cardTitle}>{aboutContent.missionVision.mission.title}</h3>
          <p className={styles.cardText}>{aboutContent.missionVision.mission.text}</p>
        </div>
        <div className={styles.missionCard}>
          <h3 className={styles.cardTitle}>{aboutContent.missionVision.vision.title}</h3>
          <p className={styles.cardText}>{aboutContent.missionVision.vision.text}</p>
        </div>
      </motion.section>

      {/* SECTION 3: CÁCH THỨC HOẠT ĐỘNG */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <h2 className={styles.sectionTitle}>{aboutContent.howItWorks.title}</h2>
        <div className={styles.timeline}>
          {aboutContent.howItWorks.steps.map((step, index) => (
            <div key={index} className={styles.stepNode}>
              <div className={styles.stepIconContainer}>
                {getStepIcon(index)}
                <span className={styles.stepNumber}>{step.number}</span>
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* SECTION 4: GIÁ TRỊ CỐT LÕI */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <h2 className={styles.sectionTitle}>{aboutContent.coreValues.title}</h2>
        <div className={styles.valuesGrid}>
          {aboutContent.coreValues.values.map((value, index) => (
            <div key={index} className={styles.valueCard}>
              {getValueIcon(index)}
              <h3 className={styles.valueTitle}>{value.title}</h3>
              <p className={styles.valueDesc}>{value.description}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* SECTION 5: TÁC ĐỘNG / MỤC TIÊU */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <h2 className={styles.sectionTitle}>{aboutContent.impact.title}</h2>
        <div className={styles.metricsGrid}>
          {aboutContent.impact.metrics.map((metric, index) => (
            <div key={index} className={styles.metricCard}>
              <div className={styles.metricValue}>{metric.value}</div>
              <div className={styles.metricLabel}>{metric.label}</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* SECTION 6: CÂU CHUYỆN KHỞI NGUỒN */}
      <motion.section 
        className={styles.storyLayout}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className={styles.storyTextContent}>
          <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '2rem' }}>{aboutContent.originStory.title}</h2>
          <blockquote className={styles.storyQuote} style={{ marginBottom: '2rem' }}>
            {aboutContent.originStory.quote}
          </blockquote>
          <div className={styles.storyText}>
            {aboutContent.originStory.founderText}
          </div>
        </div>
        
        <div className={styles.founderImageContainer}>
          {/* [CHỖ ĐIỀN THẬT] Thay /images/founder.jpg bằng ảnh founder của bạn */}
          <img 
            src="/images/founder.jpg" 
            alt="Founder DreamMap" 
            className={styles.founderImage}
            onError={(e) => {
              e.target.style.display = 'none';
              if (e.target.nextSibling) {
                e.target.nextSibling.style.display = 'flex';
              }
            }}
          />
          <div className={styles.founderPlaceholder}>
            <span>[CHƯA CÓ ẢNH FOUNDER]</span>
            <span style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.7 }}>Đặt ảnh của bạn tại: public/images/founder.jpg</span>
          </div>
        </div>
      </motion.section>

      {/* SECTION 9: LỜI KÊU GỌI HÀNH ĐỘNG */}
      <motion.section 
        className={styles.ctaPanel}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <h2 className={styles.ctaTitle}>{aboutContent.cta.title}</h2>
        <p className={styles.ctaDesc}>{aboutContent.cta.description}</p>
        <div className={styles.btnGroup}>
          <button 
            className="btn-primary" 
            onClick={() => navigate('/mentors')}
            style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}
          >
            {aboutContent.cta.primaryBtn}
          </button>
          <button 
            className="btn-secondary" 
            onClick={() => navigate('/join')}
            style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}
          >
            {aboutContent.cta.secondaryBtn}
          </button>
        </div>
      </motion.section>

      {/* FOOTER NOTE */}
      <div className={styles.footerNote}>
        {aboutContent.footerNote}
      </div>

    </div>
  );
}
