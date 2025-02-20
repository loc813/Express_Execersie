document.addEventListener("DOMContentLoaded", async () => {
    const questionContent = document.querySelector(".question-content");
    const likeButton = document.getElementById("like-btn");
    const dislikeButton = document.getElementById("dislike-btn");

    try {
        // Fetch danh sách câu hỏi từ API
        const response = await fetch("/api/v1/questions");
        const questions = await response.json();


        if (!questions.length) {
            questionContent.textContent = "Không có câu hỏi nào!";
            return;
        }

        // Chọn ngẫu nhiên một câu hỏi
        const randomIndex = Math.floor(Math.random() * questions.length);
        const question = questions[randomIndex];

        // Hiển thị nội dung câu hỏi lên giao diện
        questionContent.textContent = question.content;

        // Sự kiện khi nhấn Like
        likeButton.onclick = async () => {
            await updateQuestionLike(question.id, question.like + 1);
        };

        // Sự kiện khi nhấn Dislike
        dislikeButton.onclick = async () => {
            await updateQuestionLike(question.id, question.dislike + 1, false);
        };

    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu câu hỏi:", error);
    }
});

// Hàm cập nhật like hoặc dislike
async function updateQuestionLike(questionId, newValue, isLike = true) {
    try {
        // Gửi yêu cầu PUT cập nhật like/dislike
        const response = await fetch(`/api/v1/questions/${questionId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ [isLike ? "like" : "dislike"]: newValue })
        });

        if (!response.ok) {
            throw new Error("Lỗi khi cập nhật dữ liệu");
        }

        // Điều hướng đến trang chi tiết câu hỏi
        window.location.href = `/question-detail/${questionId}`;
    } catch (error) {
        console.error("Lỗi khi cập nhật câu hỏi:", error);
    }
}
