import { motion } from 'framer-motion';
import styles from './DynamicBackground.module.css';

export default function DynamicBackground() {
  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.gradientMesh}></div>
      <motion.div 
        className={styles.particle} 
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ left: '20%', top: '30%' }}
      />
      <motion.div 
        className={styles.particle} 
        animate={{ 
          y: [0, -30, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        style={{ right: '25%', top: '50%' }}
      />
      <motion.div 
        className={styles.particle} 
        animate={{ 
          y: [0, -15, 0],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        style={{ left: '40%', bottom: '20%' }}
      />
    </div>
  );
}
