// Lấy ID từ URL
const getQuestionIdFromUrl = () => {
    const urlParts = window.location.href.split('/');
    return urlParts[urlParts.length - 1]; // Lấy ID cuối cùng trong URL
};

const questionId = getQuestionIdFromUrl();

// Gọi API để lấy thông tin câu hỏi
const fetchQuestionDetails = async () => {
    try {
        const response = await fetch(`/api/v1/questions/${questionId}`);
        if (!response.ok) throw new Error('Failed to fetch question data');

        const question = await response.json();

        // Gắn nội dung câu hỏi vào div.question-content
        document.querySelector('.question-content').textContent = question.content;

        // Tính toán % like và dislike
        const totalVotes = question.like + question.dislike;
        const likePercent = totalVotes ? Math.round((question.like / totalVotes) * 100) : 0;
        const dislikePercent = totalVotes ? 100 - likePercent : 0;

        // Gắn % vào thanh rate-bar
        document.querySelector('.rate-bar .like').style.width = `${likePercent}%`;
        document.querySelector('.rate-bar .dislike').style.width = `${dislikePercent}%`;

        // Hiển thị phần trăm like và dislike
        document.querySelector('.rate-bar .like').textContent = `${likePercent}% Like`;
        document.querySelector('.rate-bar .dislike').textContent = `${dislikePercent}% Dislike`;

    } catch (error) {
        console.error('Error fetching question details:', error);
    }
};

// Điều hướng về trang chủ khi nhấn button
document.querySelector('#btn').onclick = () => {
    window.location.href = '/';
};

// Gọi hàm fetch khi trang được tải
fetchQuestionDetails();
