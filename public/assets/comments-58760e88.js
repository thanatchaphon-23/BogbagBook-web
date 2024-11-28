document.addEventListener("turbo:load", () => {
    document.querySelectorAll("[id^=new-comment-form-]").forEach((form) => {
      form.addEventListener("ajax:success", (event) => {
        const [data, _status, _xhr] = event.detail;
        const commentsSection = document.querySelector(`#comments-section-${form.dataset.postId}`);
  
        // เพิ่มคอมเมนต์ใหม่
        const newComment = document.createElement("div");
        newComment.classList.add("comment");
        newComment.innerHTML = `
          <p><strong>${data.user}:</strong> ${data.comment.content}</p>
        `;
        commentsSection.appendChild(newComment);
  
        // ล้างค่าฟอร์ม
        form.reset();
      });
  
      form.addEventListener("ajax:error", (event) => {
        alert("Failed to add comment. Please try again.");
      });
    });
});
  