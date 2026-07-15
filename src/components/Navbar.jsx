import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logo}>
          <span className="text-gold">Dream</span>Map
        </Link>
        <div className={styles.links}>
          <Link to="/" className={location.pathname === '/' ? 'text-gold' : ''}>Trang chủ</Link>
          <Link to="/map" className={location.pathname === '/map' ? 'text-gold' : ''}>Bản Đồ Ước Mơ</Link>
          <Link to="/mentors" className={location.pathname === '/mentors' ? 'text-gold' : ''}>Người Truyền Lửa</Link>
          <Link to="/stories" className={location.pathname === '/stories' ? 'text-gold' : ''}>Câu chuyện</Link>
          <Link to="/about" className={location.pathname === '/about' ? 'text-gold' : ''}>Về dự án</Link>
          <Link to="/gui-uoc-mo" className={location.pathname === '/gui-uoc-mo' ? 'text-gold' : ''}>Gửi ước mơ</Link>
        </div>
        <div className={styles.cta}>
          <Link to="/map" className="btn-primary" style={{ padding: '0.5rem 1.5rem', minHeight: '36px' }}>
            Khám phá bản đồ
          </Link>
        </div>
      </div>
    </nav>
  );
}
