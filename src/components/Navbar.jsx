import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <Link to="/" className={styles.logo} onClick={closeMenu}>
            <span className="text-gold">Dream</span>Map
          </Link>
          
          {/* Desktop Navigation Links */}
          <div className={styles.links}>
            <Link to="/" className={location.pathname === '/' ? 'text-gold' : ''}>Trang chủ</Link>
            <Link to="/map" className={location.pathname === '/map' ? 'text-gold' : ''}>Bản Đồ Ước Mơ</Link>
            <Link to="/mentors" className={location.pathname === '/mentors' ? 'text-gold' : ''}>Người Truyền Lửa</Link>
            <Link to="/stories" className={location.pathname === '/stories' ? 'text-gold' : ''}>Câu chuyện</Link>
            <Link to="/about" className={location.pathname === '/about' ? 'text-gold' : ''}>Về dự án</Link>
            <Link to="/gui-uoc-mo" className={location.pathname === '/gui-uoc-mo' ? 'text-gold' : ''}>Gửi ước mơ</Link>
          </div>

          <div className={styles.cta}>
            <Link to="/map" className="btn-primary" style={{ padding: '0.5rem 1.2rem', minHeight: '36px', fontSize: '0.85rem' }} onClick={closeMenu}>
              Khám phá bản đồ
            </Link>
            
            {/* Hamburger Button */}
            <button className={styles.hamburger} onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <>
          <div className={styles.backdrop} onClick={closeMenu} />
          <div className={styles.drawer}>
            <div className={styles.drawerLinks}>
              <Link to="/" className={location.pathname === '/' ? styles.activeLink : ''} onClick={closeMenu}>Trang chủ</Link>
              <Link to="/map" className={location.pathname === '/map' ? styles.activeLink : ''} onClick={closeMenu}>Bản Đồ Ước Mơ</Link>
              <Link to="/mentors" className={location.pathname === '/mentors' ? styles.activeLink : ''} onClick={closeMenu}>Người Truyền Lửa</Link>
              <Link to="/stories" className={location.pathname === '/stories' ? styles.activeLink : ''} onClick={closeMenu}>Câu chuyện</Link>
              <Link to="/about" className={location.pathname === '/about' ? styles.activeLink : ''} onClick={closeMenu}>Về dự án</Link>
              <Link to="/gui-uoc-mo" className={location.pathname === '/gui-uoc-mo' ? styles.activeLink : ''} onClick={closeMenu}>Gửi ước mơ</Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
