export const mentorContent = {
  hero: {
    title: "Chỉ một đoạn video ngắn của bạn, có thể là lý do một em nhỏ tin vào ước mơ của mình",
    subtitle: "Trở thành Người Truyền Lửa — chia sẻ hành trình, công việc và đam mê của bạn để thắp sáng ước mơ cho trẻ em vùng cao Việt Nam.",
    ctaBtn: "Trở thành Người Truyền Lửa"
  },
  about: {
    title: "Người Truyền Lửa là ai?",
    description: "Người Truyền Lửa là bất kỳ ai — kỹ sư, bác sĩ, nghệ sĩ, người làm kinh doanh, nhà nghiên cứu, hay đơn giản là người đang theo đuổi một công việc mình yêu thích — sẵn sàng dành vài phút quay một đoạn video ngắn để chia sẻ về hành trình của mình. Bạn không cần phải lên lịch dạy học, không cần cam kết thời gian dài hạn. Chỉ cần một câu chuyện thật, được kể theo cách của riêng bạn."
  },
  benefits: {
    title: "Bạn nhận được gì khi tham gia?",
    list: [
      {
        title: "Được ghi nhận công khai",
        description: "Câu chuyện và hồ sơ của bạn được giới thiệu công khai trên DreamMap, tiếp cận đến hàng nghìn trẻ em và cộng đồng."
      },
      {
        title: "Đóng góp ý nghĩa, không tốn nhiều thời gian",
        description: "Chỉ một đoạn video ngắn, không yêu cầu cam kết dài hạn hay lịch trình cố định."
      },
      {
        title: "Kết nối cộng đồng truyền cảm hứng",
        description: "Trở thành một phần của cộng đồng những người trẻ, người đi trước cùng chung sứ mệnh truyền cảm hứng cho thế hệ sau."
      },
      {
        title: "Trải nghiệm mới mẻ",
        description: "Thử sức với việc kể chuyện qua video ngắn — một kỹ năng thú vị và hữu ích trong thời đại số."
      }
    ]
  },
  // Existing mentors list. If empty, Section 4 will hide completely.
  existingMentors: [], 
  process: {
    title: "Quy trình tham gia",
    steps: [
      {
        number: "01",
        title: "Đăng ký",
        description: "Điền thông tin cơ bản và lĩnh vực chuyên môn của bạn vào form bên dưới."
      },
      {
        number: "02",
        title: "Được duyệt",
        description: "Đội ngũ DreamMap xem xét và liên hệ xác nhận với bạn qua email hoặc Zalo/SĐT bạn cung cấp."
      },
      {
        number: "03",
        title: "Quay video ngắn",
        description: "Bạn quay một đoạn video ngắn (khoảng 1-3 phút) chia sẻ về công việc và hành trình của mình — không cần thiết bị chuyên nghiệp, chỉ cần chân thực."
      },
      {
        number: "04",
        title: "Video xuất hiện trên Bản Đồ Ước Mơ",
        description: "Video của bạn được đăng tải, giúp trẻ em vùng cao khám phá và tìm cảm hứng từ chính câu chuyện của bạn."
      }
    ]
  },
  form: {
    title: "Đăng ký trở thành Người Truyền Lửa",
    description: "Gửi những đoạn video ngắn để thắp sáng ước mơ cho các em nhỏ vùng cao.",
    fields: {
      name: {
        label: "Họ và tên",
        placeholder: "Nhập tên của bạn"
      },
      field: {
        label: "Lĩnh vực chuyên môn / Nghề nghiệp",
        options: [
          { label: "Công nghệ", value: "tech" },
          { label: "Y tế", value: "health" },
          { label: "Giáo dục", value: "education" },
          { label: "Nghệ thuật", value: "art" },
          { label: "Khác", value: "other" }
        ]
      },
      contact: {
        label: "Thông tin liên hệ (Email hoặc Zalo/SĐT)",
        placeholder: "Để dự án liên hệ gửi ước mơ cho bạn"
      },
      bio: {
        label: "Lời giới thiệu ngắn (tuỳ chọn)",
        placeholder: "Bạn đang làm công việc gì? Điều gì truyền cảm hứng cho bạn?"
      }
    }
  },
  faq: {
    title: "Câu Hỏi Thường Gặp",
    list: [
      {
        question: "Video của tôi sẽ được sử dụng như thế nào?",
        answer: "Video của bạn sẽ được đăng tải công khai trên Bản Đồ Ước Mơ của DreamMap, giúp trẻ em vùng cao có thể xem và tìm cảm hứng từ câu chuyện của bạn."
      },
      {
        question: "Tôi cần chuẩn bị những gì để quay video?",
        answer: "Bạn không cần thiết bị chuyên nghiệp — chỉ cần điện thoại thông minh và một không gian yên tĩnh. Điều quan trọng nhất là sự chân thực trong câu chuyện bạn chia sẻ."
      },
      {
        question: "Sau khi đăng ký, bao lâu tôi sẽ được liên hệ?",
        answer: "Đội ngũ DreamMap sẽ xem xét và liên hệ với bạn qua email hoặc Zalo/SĐT bạn cung cấp trong thời gian sớm nhất."
      },
      {
        question: "Tôi có thể tham gia nếu không thuộc lĩnh vực chuyên môn cụ thể nào không?",
        answer: "Hoàn toàn có thể. Bất kỳ ai đang theo đuổi một công việc, đam mê hay hành trình đáng chia sẻ đều có thể trở thành Người Truyền Lửa."
      }
    ]
  }
};
