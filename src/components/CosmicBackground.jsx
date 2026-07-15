import { motion } from 'framer-motion';
import styles from './CosmicBackground.module.css';

export default function CosmicBackground() {
  // Generate random particles
  const particles = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2
  }));

  return (
    <div className={styles.cosmicContainer}>
      {/* Nebula layers */}
      <div className={`${styles.nebula} ${styles.nebula1}`} />
      <div className={`${styles.nebula} ${styles.nebula2}`} />
      <div className={`${styles.nebula} ${styles.nebula3}`} />

      {/* Stars / Particles */}
      <div className={styles.starsLayer}>
        {particles.map(p => (
          <motion.div
            key={p.id}
            className={styles.star}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Shooting Stars (CSS animation) */}
      <div className={styles.shootingStar} style={{ top: '20%', left: '10%', animationDelay: '5s' }} />
      <div className={styles.shootingStar} style={{ top: '50%', right: '20%', animationDelay: '12s' }} />
    </div>
  );
}
