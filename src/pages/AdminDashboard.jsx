import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import { Download, LogOut, Key, Mail, Check, Trash } from 'lucide-react';
import styles from './AdminDashboard.module.css';

// Reusable CSV Export Helper
function downloadCSV(data, filename) {
  if (!data || !data.length) return;
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(row => 
    Object.values(row).map(val => {
      let cell = val === null || val === undefined ? '' : String(val);
      cell = cell.replace(/"/g, '""');
      if (cell.includes(',') || cell.includes('\n') || cell.includes('"')) {
        cell = `"${cell}"`;
      }
      return cell;
    }).join(',')
  );
  
  // \uFEFF is the UTF-8 BOM, ensuring Excel opens Vietnamese characters correctly
  const csvContent = "\uFEFF" + [headers, ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  
  // Login Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState(null);

  // App Data States
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'waiting_mentor' | 'mentors'
  const [dreams, setDreams] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  // 1. Check Auth Status on Mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Fetch Data when User logs in
  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setDataLoading(true);
    try {
      const [dreamsResponse, mentorsResponse] = await Promise.all([
        supabase.from('dreams').select('*').order('created_at', { ascending: false }),
        supabase.from('mentors').select('*').order('created_at', { ascending: false })
      ]);

      if (dreamsResponse.error) throw dreamsResponse.error;
      if (mentorsResponse.error) throw mentorsResponse.error;

      setDreams(dreamsResponse.data || []);
      setMentors(mentorsResponse.data || []);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setDataLoading(false);
    }
  };

  // 3. Handle Admin Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (err) {
      console.error('Login error:', err);
      setLoginError(err.message || 'Sai thông tin đăng nhập.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // 4. Handle Sign Out
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  // 5. Approve Dream (update status to waiting_mentor)
  const handleApprove = async (id) => {
    try {
      const { error } = await supabase
        .from('dreams')
        .update({ status: 'waiting_mentor' })
        .eq('id', id);

      if (error) throw error;
      
      setDreams(prev => prev.map(d => d.id === id ? { ...d, status: 'waiting_mentor' } : d));
    } catch (err) {
      alert('Không thể duyệt ước mơ: ' + err.message);
    }
  };

  // 6. Reject/Delete Dream
  const handleReject = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa ước mơ này không?')) return;
    try {
      const { error } = await supabase
        .from('dreams')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setDreams(prev => prev.filter(d => d.id !== id));
    } catch (err) {
      alert('Không thể xóa ước mơ: ' + err.message);
    }
  };

  // 7. Delete Mentor
  const handleDeleteMentor = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa đăng ký mentor này không?')) return;
    try {
      const { error } = await supabase
        .from('mentors')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMentors(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      alert('Không thể xóa mentor: ' + err.message);
    }
  };

  // 8. Export CSV Handlers
  const handleExportDreams = (statusFilter) => {
    const filtered = dreams.filter(d => d.status === statusFilter);
    const filename = statusFilter === 'pending' ? 'danh_sach_uoc_mo_cho_duyet.csv' : 'danh_sach_uoc_mo_da_duyet.csv';
    downloadCSV(filtered, filename);
  };

  const handleExportMentors = () => {
    downloadCSV(mentors, 'danh_sach_nguoi_truyen_lua.csv');
  };

  // Filter lists based on states
  const pendingDreams = dreams.filter(d => d.status === 'pending');
  const waitingMentorDreams = dreams.filter(d => d.status === 'waiting_mentor');

  // Loading Screen for Auth Session
  if (authLoading) {
    return (
      <div className={styles.loginContainer}>
        <div style={{ color: 'var(--color-text-muted)' }}>Đang kiểm tra phiên đăng nhập...</div>
      </div>
    );
  }

  // 9. Render Login Form if Not Logged In
  if (!user) {
    return (
      <main className={styles.loginContainer}>
        <motion.div 
          className={styles.loginCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2>Quản trị DreamMap</h2>
          <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', fontSize: '0.9rem', marginTop: '-0.5rem' }}>
            Đăng nhập để xem danh sách ước mơ & người truyền lửa
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div className={styles.formGroup}>
              <label>Email Admin</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                <input 
                  type="email" 
                  required
                  placeholder="admin@dreammap.vn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.inputField}
                  style={{ paddingLeft: '2.5rem', width: '100%' }}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Mật khẩu</label>
              <div style={{ position: 'relative' }}>
                <Key size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.inputField}
                  style={{ paddingLeft: '2.5rem', width: '100%' }}
                />
              </div>
            </div>

            {loginError && <div className={styles.errorAlert}>{loginError}</div>}

            <button type="submit" disabled={isLoggingIn} className={styles.loginBtn}>
              {isLoggingIn ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>
        </motion.div>
      </main>
    );
  }

  // 10. Render Admin Dashboard if Logged In
  return (
    <main className={styles.adminPage}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarTitle}>
          <h2>Admin Panel</h2>
          <span className={styles.userEmail}>{user.email}</span>
        </div>
        
        <nav>
          <button 
            className={activeTab === 'pending' ? styles.activeTab : ''} 
            onClick={() => setActiveTab('pending')}
          >
            Duyệt Ước Mơ ({pendingDreams.length})
          </button>
          <button 
            className={activeTab === 'waiting_mentor' ? styles.activeTab : ''} 
            onClick={() => setActiveTab('waiting_mentor')}
          >
            Gán Mentor ({waitingMentorDreams.length})
          </button>
          <button 
            className={activeTab === 'mentors' ? styles.activeTab : ''} 
            onClick={() => setActiveTab('mentors')}
          >
            Người Truyền Lửa ({mentors.length})
          </button>
        </nav>

        <button onClick={handleSignOut} className={styles.signOutBtn}>
          <LogOut size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
          Đăng xuất
        </button>
      </div>

      <div className={styles.content}>
        <header className={styles.header} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1>
              {activeTab === 'pending' && 'Duyệt Ước Mơ Mới'}
              {activeTab === 'waiting_mentor' && 'Ước mơ đã duyệt (Chờ Mentor)'}
              {activeTab === 'mentors' && 'Danh sách Người Truyền Lửa đăng ký'}
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: '0.2rem 0 0' }}>
              {activeTab === 'pending' && 'Kiểm duyệt nội dung trước khi xuất hiện trên bản đồ.'}
              {activeTab === 'waiting_mentor' && 'Các ước mơ hợp lệ sẵn sàng kết nối với người truyền lửa.'}
              {activeTab === 'mentors' && 'Thông tin những người đăng ký đồng hành truyền cảm hứng.'}
            </p>
          </div>

          <div className={styles.headerActions}>
            {activeTab === 'pending' && pendingDreams.length > 0 && (
              <button onClick={() => handleExportDreams('pending')} className={styles.exportBtn}>
                <Download size={16} /> Xuất file Excel (CSV)
              </button>
            )}
            {activeTab === 'waiting_mentor' && waitingMentorDreams.length > 0 && (
              <button onClick={() => handleExportDreams('waiting_mentor')} className={styles.exportBtn}>
                <Download size={16} /> Xuất file Excel (CSV)
              </button>
            )}
            {activeTab === 'mentors' && mentors.length > 0 && (
              <button onClick={handleExportMentors} className={styles.exportBtn}>
                <Download size={16} /> Xuất file Excel (CSV)
              </button>
            )}
          </div>
        </header>

        {dataLoading ? (
          <div style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: '3rem' }}>
            Đang tải dữ liệu...
          </div>
        ) : (
          <div className={styles.listContainer}>
            {/* TAB 1: PENDING DREAMS */}
            {activeTab === 'pending' && (
              <>
                {pendingDreams.length === 0 ? (
                  <p className={styles.emptyState}>Không có ước mơ nào đang chờ duyệt.</p>
                ) : (
                  pendingDreams.map(dream => (
                    <motion.div 
                      key={dream.id} 
                      className={styles.dreamCard}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className={styles.dreamInfo}>
                        <p className={styles.dreamText}>"{dream.child_dream}"</p>
                        <div className={styles.dreamMeta}>
                          <span style={{ display: 'block', marginBottom: '0.4rem' }}>
                            <strong>Trẻ:</strong> {dream.child_name || 'Ẩn danh'} ({dream.child_age ? `${dream.child_age} tuổi` : 'Không rõ tuổi'}) 
                            {dream.child_field && ` • Lĩnh vực: ${dream.child_field}`}
                          </span>
                          <span>
                            <strong>Người gửi thay:</strong> {dream.adult_name} ({dream.adult_role}) • Trường: {dream.adult_school} • Liên hệ: <strong>{dream.adult_contact}</strong>
                          </span>
                        </div>
                      </div>
                      <div className={styles.actions}>
                        <button className={styles.approveBtn} onClick={() => handleApprove(dream.id)}>
                          <Check size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Duyệt
                        </button>
                        <button className={styles.rejectBtn} onClick={() => handleReject(dream.id)}>
                          <Trash size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Từ chối
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </>
            )}

            {/* TAB 2: WAITING MENTOR DREAMS */}
            {activeTab === 'waiting_mentor' && (
              <>
                {waitingMentorDreams.length === 0 ? (
                  <p className={styles.emptyState}>Không có ước mơ nào đang chờ mentor.</p>
                ) : (
                  waitingMentorDreams.map(dream => (
                    <div key={dream.id} className={styles.dreamCard}>
                      <div className={styles.dreamInfo}>
                        <p className={styles.dreamText}>"{dream.child_dream}"</p>
                        <div className={styles.dreamMeta}>
                          <span style={{ display: 'block', marginBottom: '0.4rem' }}>
                            <strong>Trẻ:</strong> {dream.child_name || 'Ẩn danh'} ({dream.child_age ? `${dream.child_age} tuổi` : 'Không rõ tuổi'})
                            {dream.child_field && ` • Lĩnh vực: ${dream.child_field}`}
                          </span>
                          <span>
                            <strong>Trường:</strong> {dream.adult_school} • Liên hệ TNV: <strong>{dream.adult_contact}</strong>
                          </span>
                        </div>
                      </div>
                      <div className={styles.actions}>
                        <button className={styles.rejectBtn} onClick={() => handleReject(dream.id)}>
                          <Trash size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Gỡ bỏ
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </>
            )}

            {/* TAB 3: MENTORS LIST */}
            {activeTab === 'mentors' && (
              <>
                {mentors.length === 0 ? (
                  <p className={styles.emptyState}>Không có người truyền lửa nào đăng ký.</p>
                ) : (
                  mentors.map(mentor => (
                    <div key={mentor.id} className={styles.dreamCard}>
                      <div className={styles.dreamInfo}>
                        <p className={styles.dreamText} style={{ fontSize: '1.25rem' }}>{mentor.name}</p>
                        <div className={styles.dreamMeta} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                          <span><strong>Lĩnh vực:</strong> {mentor.field}</span>
                          <span><strong>Thông tin liên hệ:</strong> <strong>{mentor.contact_info}</strong></span>
                          {mentor.bio && <span><strong>Giới thiệu bản thân:</strong> {mentor.bio}</span>}
                        </div>
                      </div>
                      <div className={styles.actions}>
                        <button className={styles.rejectBtn} onClick={() => handleDeleteMentor(mentor.id)}>
                          <Trash size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Xóa đăng ký
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
