import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import VietnamD3Map from '../components/VietnamD3Map';
import Modal from '../components/Modal';
import styles from './PublicMap.module.css';
import { motion, AnimatePresence } from 'framer-motion';

export default function PublicMap() {
  const [totalDreams, setTotalDreams] = useState(41);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [zoomControls, setZoomControls] = useState(null);
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const navigate = useNavigate();

  const handleClusterClick = (school) => {
    setSelectedSchool(school);
  };

  return (
    <main className={styles.mapPage}>
      {/* Top Left: Stats Indicator */}
      <motion.div 
        className={styles.topLeft}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className={styles.glassCard}>
          <div className={styles.statsRow}>
            <span className={styles.statsNumber}>{totalDreams}</span>
            <span className={styles.statsLabel}>Ước mơ đã thắp sáng</span>
          </div>
        </div>
      </motion.div>

      {/* Bottom Left: Legend (Collapsible) */}
      <div className={styles.bottomLeft}>
        <div 
          className={`${styles.glassCard} ${styles.legendCard} ${isLegendOpen ? styles.open : ''}`}
          onMouseEnter={() => setIsLegendOpen(true)}
          onMouseLeave={() => setIsLegendOpen(false)}
          onClick={() => setIsLegendOpen(!isLegendOpen)}
        >
          {!isLegendOpen ? (
            <span className={styles.legendIcon}>i</span>
          ) : (
            <motion.div 
              initial={{ opacity: 0, width: 0 }} 
              animate={{ opacity: 1, width: 'auto' }} 
              className={styles.legendContent}
            >
              <div className={styles.legendDot}></div>
              <span>1 vòng tròn = 1 điểm trường<br/>Số ở giữa = số ước mơ</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Top Right: Action Button */}
      <div className={styles.topRight}>
        <button 
          className="btn-primary" 
          style={{ boxShadow: '0 8px 32px rgba(244, 185, 66, 0.4)' }}
          onClick={() => navigate('/volunteer')}
          title="Dành cho TNV/Giáo viên"
        >
          + Gửi một ước mơ
        </button>
      </div>

      {/* Bottom Right: Action Stack */}
      <div className={styles.bottomRight}>
        {zoomControls && (
          <div className={`${styles.glassCard} ${styles.zoomControls}`}>
            <button onClick={zoomControls.zoomIn} aria-label="Zoom In">+</button>
            <hr className={styles.controlDivider} />
            <button onClick={zoomControls.zoomOut} aria-label="Zoom Out">-</button>
            <hr className={styles.controlDivider} />
            <button onClick={zoomControls.resetZoom} aria-label="Reset Zoom">&#x21ba;</button>
          </div>
        )}
      </div>

      <div className={styles.mapWrapper}>
        <VietnamD3Map onClusterClick={handleClusterClick} setZoomFn={setZoomControls} />
      </div>

      <Modal 
        isOpen={!!selectedSchool} 
        onClose={() => setSelectedSchool(null)}
        title={selectedSchool?.name}
      >
        {selectedSchool && (
          <div>
            <p className={styles.provinceText}>{selectedSchool.province}</p>
            <div className={styles.dreamList}>
              <div className={styles.dreamCard}>
                <p className="handwriting" style={{ fontSize: '1.75rem', margin: '0 0 1rem', lineHeight: 1.4 }}>
                  "Con muốn làm bác sĩ để chữa bệnh cho mẹ."
                </p>
                <div className={styles.dreamMeta}>
                  <span>Mí (7 tuổi)</span>
                  <span className={styles.statusBadge}>Đang chờ Người Truyền Lửa</span>
                </div>
              </div>
              
              <div className={styles.dreamCard}>
                <p className="handwriting" style={{ fontSize: '1.75rem', margin: '0 0 1rem', lineHeight: 1.4 }}>
                  "Em ước được vẽ tranh thật đẹp."
                </p>
                <div className={styles.dreamMeta}>
                  <span>Sùng A Súa</span>
                  <span className={`${styles.statusBadge} ${styles.hasMentor}`}>Đã có phản hồi</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
}
