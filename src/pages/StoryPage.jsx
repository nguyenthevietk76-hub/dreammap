import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './StoryPage.module.css';

export default function StoryPage() {
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionsRef = useRef([]);

  useEffect(() => {
    // Scroll progress calculation
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(scroll * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Intersection Observer for scroll reveal animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15 // Trigger when 15% visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
          // Only trigger once
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    sectionsRef.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* Scroll Progress Bar */}
      <div className={styles.progressBarContainer}>
        <div className={styles.progressBar} style={{ width: `${scrollProgress}%` }}></div>
      </div>

      {/* CHƯƠNG 1: Mở đầu */}
      <section className={`${styles.section} ${styles.heroSection}`} ref={addToRefs}>
        {/* [CHỖ ĐIỀN THẬT] Thay bằng ảnh nền hero thực tế (dầu sao/trẻ em nhìn lên) */}
        <img 
          src="/images/hero-bg.jpg"
          alt="Bầu trời sao đêm" 
          className={styles.heroImage} 
        />
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroText}>
            Đây không phải một câu chuyện về công nghệ. Đây là câu chuyện về những điều đã suýt không ai từng hỏi.
          </h1>
        </div>
        <div className={styles.scrollIndicator}>
          <span>Cuộn để khám phá</span>
          <span>&#x2193;</span>
        </div>
      </section>

      {/* CHƯƠNG 2: Khởi nguồn */}
      <section className={styles.section} ref={addToRefs}>
        <div className={styles.splitContainer}>
          <div className={styles.splitImage}>
            {/* [CHỖ ĐIỀN THẬT] Thay bằng ảnh lớp học không có mặt người/bóng lưng em nhỏ */}
            <img 
              src="/images/lop-hoc.jpg" 
              alt="Lớp học vùng cao" 
              loading="lazy"
            />
          </div>
          <div className={styles.splitText}>
            <p>
              Mọi thứ bắt đầu trong một chuyến đi của dự án Thắp Đuốc đến trường <span className={styles.highlightText}>THCS Mộc Châu, Võ Nhai, Thái Nguyên</span>.
            </p>
            <p>
              Giữa cái lạnh và sự thiếu thốn, chúng tôi mang đến những cuốn sách và câu chuyện về tương lai. Nhưng chính ở đó, một em nhỏ tên Sùng, 8 tuổi, cậu học trò hay đứng nép ở cuối hàng đã kéo áo một tình nguyện viên và hỏi:
            </p>
            <p className={styles.highlightText} style={{ fontSize: '1.75rem', lineHeight: 1.4 }}>
              "Anh ơi, làm kỹ sư là làm gì ạ? Em có làm được không?"
            </p>
            <p>
              Câu hỏi đó ghim chặt vào tâm trí tôi. Không phải vì nó khó trả lời, mà vì tôi nhận ra: em chưa từng gặp một kỹ sư nào ngoài đời để tự mình đi tìm câu trả lời.
            </p>
            <p>
              Từ khoảnh khắc đó, một câu hỏi khác nảy ra trong đầu chúng tôi: điều gì sẽ xảy ra nếu mỗi em nhỏ đều có thể nhìn thấy, dù chỉ qua một đoạn video ngắn, rằng ước mơ của mình là hoàn toàn có thật vì đang có người sống cuộc đời đó ngoài kia? <span className={styles.highlightText}>DreamMap</span> ra đời từ câu hỏi ấy.
            </p>
          </div>
        </div>
      </section>

      {/* CHƯƠNG 3: Câu hỏi chưa ai từng hỏi */}
      <section className={`${styles.section} ${styles.quoteSection}`} ref={addToRefs}>
        <div className={styles.quoteContent}>
          <p className={styles.pullQuote}>
            Không phải các em không có ước mơ. Chỉ là chưa từng có ai dừng lại đủ lâu để hỏi.
          </p>
        </div>
      </section>

      {/* CHƯƠNG 4: Ý tưởng ra đời */}
      <section className={styles.section} ref={addToRefs}>
        <div className={styles.ideaContent}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--color-gold)' }}>Một bản đồ của những giấc mơ</h2>
          <p style={{ fontSize: '1.25rem', lineHeight: 1.8, color: 'var(--color-text-main)' }}>
            Nếu mỗi ước mơ là một đốm sáng, tại sao chúng ta không vẽ nên một bầu trời? Bản Đồ Ước Mơ ra đời từ khát khao kết nối những mong mỏi nhỏ bé, viết tay trên giấy của các em nhỏ vùng cao, với những người truyền lửa sẵn sàng lắng nghe ở mọi miền đất nước.
          </p>

        </div>
      </section>

      {/* CHƯƠNG 5: Câu chuyện điển hình (Mí - Hà Giang) */}
      <section className={`${styles.section} ${styles.dreamSection}`} ref={addToRefs}>
        <div className={styles.dreamContent}>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'var(--color-cyan)', fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Câu chuyện của Mí</h3>
            <p style={{ color: 'var(--color-text-muted)' }}>Mèo Vạc, Hà Giang</p>
          </div>

          <div className={styles.handwritingCard}>
            <p className={styles.handwritingText}>
              "Con muốn làm bác sĩ để chữa bệnh cho mẹ."
            </p>
          </div>

          <div className={styles.mentorCard}>
            <span className={styles.mentorBadge}>Người Truyền Lửa</span>
            <p style={{ fontSize: '1.125rem', lineHeight: 1.7, color: 'var(--color-text-main)' }}>
              Vài tháng sau, ước mơ của Mí xuất hiện trên Bản Đồ Ước Mơ. Anh Tuấn, một bác sĩ trẻ đang công tác tại Hà Nội, tình cờ đọc được dòng chữ ấy. Anh quay một đoạn video ngắn gửi riêng cho Mí, kể về những ngày đầu anh cũng chỉ là một cậu bé mang ước mơ giống em, và nhắn nhủ: "Ước mơ của em hoàn toàn có thể thành sự thật, chỉ cần em không ngừng cố gắng."
            </p>
            <p style={{ fontSize: '1.125rem', lineHeight: 1.7, color: 'var(--color-text-main)', marginTop: '1rem' }}>
              Một kết nối vô hình đã được tạo ra, xóa nhòa khoảng cách hàng trăm km đèo dốc. Mí biết rằng, ở nơi xa đó, có một người đang lắng nghe và tin vào giấc mơ của em.
            </p>
          </div>
        </div>
      </section>

      {/* CHƯƠNG 6: Hành trình phía trước */}
      <section className={`${styles.section} ${styles.journeySection}`} ref={addToRefs}>
        <img 
          src="/vietnam.geojson" /* Just a dummy reference, we use generic map illustration in production */
          alt="" 
          className={styles.journeyMapBg} 
          onError={(e) => e.target.style.display = 'none'}
        />
        <div className={styles.journeyText}>
          <p style={{ marginBottom: '2rem' }}>
            Từ 1 điểm trường lẻ loi ở Thái Nguyên, đến hàng trăm đốm sáng lan tỏa từ Hà Giang đến Cà Mau.
          </p>
          <p>
            Hành trình này không chỉ là thu thập những lời ước, mà là dệt nên một mạng lưới của sự thấu hiểu. Mỗi vòng tròn trên bản đồ là một ngôi trường, mỗi con số là những hy vọng đang chờ được hồi đáp.
          </p>
        </div>
      </section>

      {/* CHƯƠNG 7: Lời mời */}
      <section className={`${styles.section} ${styles.ctaSection}`} ref={addToRefs}>
        <div className={styles.glassCardCta}>
          <h2 className={styles.ctaTitle}>Bầu trời cần nhiều đốm sáng hơn</h2>
          <p className={styles.ctaSubtitle}>
            Không cần phải là điều gì lớn lao, chỉ cần bạn sẵn sàng lắng nghe.
          </p>
          <div className={styles.btnGroup}>
            <button 
              className="btn-primary" 
              onClick={() => navigate('/map')}
              style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}
            >
              Khám phá bản đồ
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => navigate('/mentors')}
              style={{ padding: '1rem 2rem', fontSize: '1.125rem', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 'var(--radius-pill)', cursor: 'pointer', transition: 'all 0.3s' }}
            >
              Trở thành Người Truyền Lửa
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
