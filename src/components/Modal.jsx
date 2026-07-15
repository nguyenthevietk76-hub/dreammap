import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Modal.module.css';

export default function Modal({ isOpen, onClose, title, children, isDirty = false }) {
  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleCloseRequest();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, isDirty]);

  const handleCloseRequest = () => {
    if (isDirty) {
      if (window.confirm("Bạn có chắc muốn thoát? Dữ liệu chưa lưu sẽ mất.")) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className={styles.modalOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleCloseRequest} // Backdrop click
      >
        <motion.div 
          className={styles.modalContent}
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={e => e.stopPropagation()} // Prevent click from bubbling to backdrop
        >
          <button 
            className={styles.closeButton}
            onClick={handleCloseRequest}
            aria-label="Close modal"
          >
            &times;
          </button>
          
          {title && <h2 className={styles.modalTitle}>{title}</h2>}
          
          <div className={styles.modalBody}>
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
