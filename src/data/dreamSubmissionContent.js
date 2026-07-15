export const dreamSubmissionContent = {
  hero: {
    title: "Ước mơ nào của em cũng xứng đáng được lắng nghe",
    subtitle: "Hãy giúp một em nhỏ vùng cao gửi ước mơ của mình đến những người có thể truyền cảm hứng và đồng hành cùng em.",
    ctaBtn: "Gửi ước mơ ngay"
  },
  process: {
    title: "Điều gì xảy ra sau khi ước mơ được gửi?",
    steps: [
      {
        number: "01",
        title: "Ước mơ được ghi nhận",
        description: "Đội ngũ DreamMap xem xét và đưa ước mơ của em lên Bản Đồ Ước Mơ."
      },
      {
        number: "02",
        title: "Người Truyền Lửa phù hợp xem được",
        description: "Những Người Truyền Lửa hoạt động trong đúng lĩnh vực em quan tâm sẽ nhìn thấy ước mơ này."
      },
      {
        number: "03",
        title: "Kết nối và truyền cảm hứng",
        description: "Nhà trường hoặc DreamMap sẽ là cầu nối để đưa video, lời nhắn của Người Truyền Lửa đến với em, theo cách an toàn và phù hợp với lứa tuổi."
      }
    ]
  },
  form: {
    title: "Gửi ước mơ của em",
    description: "Nếu bạn là giáo viên, phụ huynh, hoặc người giám hộ muốn gửi ước mơ thay cho một em nhỏ, hãy điền thông tin dưới đây.",
    childSection: {
      title: "Thông tin về em nhỏ",
      fields: {
        name: {
          label: "Tên hoặc biệt danh của em",
          placeholder: "Tên hoặc biệt danh — không bắt buộc họ tên đầy đủ"
        },
        age: {
          label: "Độ tuổi",
          options: [
            { label: "-- Chọn độ tuổi --", value: "" },
            { label: "Dưới 6 tuổi", value: "under6" },
            { label: "6-10 tuổi", value: "6to10" },
            { label: "11-14 tuổi", value: "11to14" },
            { label: "15-18 tuổi", value: "15to18" }
          ]
        },
        dream: {
          label: "Ước mơ của em là gì?",
          placeholder: "Em ước mơ trở thành... / Em muốn khám phá về..."
        },
        field: {
          label: "Lĩnh vực em quan tâm"
        }
      }
    },
    adultSection: {
      title: "Thông tin người gửi thay (bắt buộc)",
      subtitle: "Bạn là ai trong hành trình của em?",
      fields: {
        role: {
          label: "Vai trò của bạn",
          options: [
            { label: "-- Chọn vai trò --", value: "" },
            { label: "Giáo viên", value: "teacher" },
            { label: "Phụ huynh/Người giám hộ", value: "parent" },
            { label: "Cán bộ Đoàn/Hội trường học", value: "union" },
            { label: "Khác", value: "other" }
          ]
        },
        name: {
          label: "Họ và tên của bạn",
          placeholder: "Nhập họ tên của bạn"
        },
        school: {
          label: "Trường/Đơn vị công tác (tuỳ chọn)",
          placeholder: "Ví dụ: Trường Tiểu học..."
        },
        contact: {
          label: "Thông tin liên hệ của bạn (Email hoặc Zalo/SĐT)",
          placeholder: "Số điện thoại, Zalo hoặc Email để liên lạc"
        }
      }
    },
    submitBtn: "Gửi ước mơ"
  },
  security: {
    title: "Chúng tôi bảo vệ thông tin của em",
    description: "DreamMap không thu thập hoặc hiển thị thông tin liên hệ cá nhân của trẻ em. Mọi trao đổi đều được thực hiện thông qua người lớn đứng ra gửi thay (giáo viên, phụ huynh, hoặc nhà trường). Khi hiển thị công khai trên Bản Đồ Ước Mơ, chúng tôi chỉ đăng tên hoặc biệt danh của em cùng ước mơ — không đăng thông tin định danh cá nhân, hình ảnh gương mặt rõ nét, hoặc bất kỳ thông tin nào có thể dùng để xác định hoặc liên hệ trực tiếp với em."
  },
  faq: {
    title: "Câu hỏi thường gặp",
    list: [
      {
        question: "Tôi có phải là giáo viên hoặc phụ huynh mới được gửi ước mơ thay cho em không?",
        answer: "Đúng vậy. Để bảo vệ trẻ em, DreamMap chỉ nhận ước mơ được gửi thông qua người lớn đáng tin cậy như giáo viên, phụ huynh, người giám hộ, hoặc cán bộ Đoàn/Hội của trường học."
      },
      {
        question: "Thông tin của em nhỏ có được công khai không?",
        answer: "Chỉ tên hoặc biệt danh của em cùng nội dung ước mơ được hiển thị công khai trên Bản Đồ Ước Mơ. Thông tin liên hệ và các chi tiết định danh cá nhân của em không bao giờ được công khai."
      },
      {
        question: "Sau khi gửi, tôi có thể theo dõi tiến trình không?",
        answer: "Đội ngũ DreamMap sẽ liên hệ lại với bạn qua thông tin đã cung cấp để cập nhật khi ước mơ của em được kết nối với Người Truyền Lửa phù hợp."
      }
    ]
  }
};
