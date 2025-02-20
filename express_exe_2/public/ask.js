// Gọi DOM đến textarea và span hiển thị số từ
const textarea = document.querySelector('.question-content');
const wordCountDisplay = document.querySelector('.letter');
const form = document.querySelector('.main-form');

// Giới hạn số từ
const MAX_WORDS = 200;

// Lắng nghe sự kiện nhập liệu trong textarea
textarea.addEventListener('input', () => {
    let words = textarea.value.trim().split(/\s+/).filter(word => word !== '');
    if (words.length > MAX_WORDS) {
        words = words.slice(0, MAX_WORDS); // Cắt bớt nếu quá giới hạn
        textarea.value = words.join(' '); // Gán lại nội dung đã cắt bớt
    }
    wordCountDisplay.textContent = words.length; // Cập nhật số từ
});

// Xử lý sự kiện submit form
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Ngăn chặn reload trang

    const questionText = textarea.value.trim();
    
    // Kiểm tra nếu textarea rỗng
    if (!questionText) {
        alert('Textarea không được bỏ trống');
        return;
    }

    try {
        const response = await fetch('/api/v1/questions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: questionText })
        });

        if (!response.ok) throw new Error('Lỗi khi thêm câu hỏi');

        alert('Thêm câu hỏi thành công!');
        window.location.href = '/'; // Điều hướng về trang chủ
    } catch (error) {
        console.error('Lỗi:', error);
        alert('Có lỗi xảy ra, vui lòng thử lại!');
    }
});
