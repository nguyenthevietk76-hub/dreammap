import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

export default function LandingPage() {
  return (
    <main className={styles.landingPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.videoWrapper}>
          <video 
            autoPlay={true}
            muted={true}
            loop={true}
            playsInline={true}
            poster="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=2000"
            className={styles.bgVideo}
          >
            <source src="/bg-video.mp4" type="video/mp4" />
          </video>
          <div className={styles.videoOverlay}></div>
        </div>

        <div className={styles.heroContent}>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Mỗi ước mơ, <br/><span className="text-gold">một đốm sáng.</span>
          </motion.h1>
          <motion.p 
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Nền tảng kết nối những ước mơ nhỏ bé nơi vùng cao với những người truyền lửa trên khắp mọi miền.
          </motion.p>
          <motion.div 
            className={styles.ctaGroup}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/map" className="btn-primary">Khám phá bản đồ</Link>
            <Link to="/about" className="btn-secondary">Tìm hiểu thêm</Link>
          </motion.div>
        </div>
      </section>

      {/* Live Stats */}
      <section className={styles.statsSection}>
        <div className="glass-panel" style={{ display: 'flex', justifyContent: 'space-around', padding: '3rem', maxWidth: '1000px', margin: '0 auto', flexWrap: 'wrap', gap: '2rem' }}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>1,245</span>
            <span className={styles.statLabel}>Ước mơ được thắp sáng</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>12</span>
            <span className={styles.statLabel}>Điểm trường tham gia</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>86</span>
            <span className={styles.statLabel}>Người Truyền Lửa</span>
          </div>
        </div>
      </section>

      {/* Placeholder for other sections */}
      <section className={styles.genericSection}>
        <h2>Cách hoạt động</h2>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '2rem' }}>
          <div className="glass-panel" style={{ padding: '2rem', flex: 1 }}>
            <h3>1. Gửi ước mơ</h3>
            <p>Trẻ em viết hoặc vẽ ước mơ. TNV hỗ trợ tải lên bản đồ.</p>
          </div>
          <div className="glass-panel" style={{ padding: '2rem', flex: 1 }}>
            <h3>2. Thắp sáng</h3>
            <p>Ước mơ hiện thành một đốm sáng chờ người đồng hành.</p>
          </div>
          <div className="glass-panel" style={{ padding: '2rem', flex: 1 }}>
            <h3>3. Phản hồi</h3>
            <p>Người truyền lửa gửi video truyền cảm hứng lại cho em.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
