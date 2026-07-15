import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './AdminDashboard.module.css';

const MOCK_DREAMS = [
  { id: 1, text: 'Em muốn làm phi công để bay trên bầu trời', name: 'Thào A Dê', school: 'Trạm Tấu', status: 'pending' },
  { id: 2, text: 'Em ước có một chiếc xe đạp để đi học', name: 'Lò Thị Mai', school: 'Nậm Mười', status: 'pending' },
  { id: 3, text: 'Con muốn trở thành đầu bếp giỏi', name: 'Ẩn danh', school: 'Mèo Vạc', status: 'waiting_mentor' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('pending');
  const [dreams, setDreams] = useState(MOCK_DREAMS);

  const handleApprove = (id) => {
    setDreams(dreams.map(d => d.id === id ? { ...d, status: 'waiting_mentor' } : d));
  };

  const handleReject = (id) => {
    setDreams(dreams.filter(d => d.id !== id));
  };

  const pendingDreams = dreams.filter(d => d.status === 'pending');
  const waitingMentorDreams = dreams.filter(d => d.status === 'waiting_mentor');

  return (
    <main className={styles.adminPage}>
      <div className={styles.sidebar}>
        <h2>Admin Panel</h2>
        <nav>
          <button 
            className={activeTab === 'pending' ? styles.activeTab : ''} 
            onClick={() => setActiveTab('pending')}
          >
            Duyệt Ước Mơ ({pendingDreams.length})
          </button>
          <button 
            className={activeTab === 'mentors' ? styles.activeTab : ''} 
            onClick={() => setActiveTab('mentors')}
          >
            Gán Mentor ({waitingMentorDreams.length})
          </button>
        </nav>
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          <h1>{activeTab === 'pending' ? 'Duyệt Ước Mơ Mới' : 'Quản lý Mentor'}</h1>
        </header>

        <div className={styles.listContainer}>
          {activeTab === 'pending' && pendingDreams.length === 0 && (
            <p className={styles.emptyState}>Không có ước mơ nào đang chờ duyệt.</p>
          )}
          
          {activeTab === 'pending' && pendingDreams.map(dream => (
            <motion.div 
              key={dream.id} 
              className={styles.dreamCard}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className={styles.dreamInfo}>
                <p className={styles.dreamText}>"{dream.text}"</p>
                <div className={styles.dreamMeta}>
                  <span><strong>{dream.name}</strong> • {dream.school}</span>
                </div>
              </div>
              <div className={styles.actions}>
                <button className={styles.approveBtn} onClick={() => handleApprove(dream.id)}>Duyệt</button>
                <button className={styles.rejectBtn} onClick={() => handleReject(dream.id)}>Từ chối</button>
              </div>
            </motion.div>
          ))}

          {activeTab === 'mentors' && waitingMentorDreams.map(dream => (
            <div key={dream.id} className={styles.dreamCard}>
              <div className={styles.dreamInfo}>
                <p className={styles.dreamText}>"{dream.text}"</p>
                <div className={styles.dreamMeta}>
                  <span>Trạng thái: Đang chờ Mentor</span>
                </div>
              </div>
              <div className={styles.actions}>
                <button className={styles.assignBtn}>Gán Mentor</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
