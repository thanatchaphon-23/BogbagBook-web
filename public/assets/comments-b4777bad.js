document.addEventListener("DOMContentLoaded", () => {
    // Add event listener to comment forms
    document.querySelectorAll("[id^=new-comment-form-]").forEach((form) => {
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
  
        const postId = form.dataset.postId;
        const url = form.action;
        const formData = new FormData(form);
  
        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Accept": "application/json",
            },
            body: formData,
          });
  
          if (response.ok) {
            const data = await response.json();
            const commentsSection = document.querySelector(`#comments-section-${postId}`);
            commentsSection.insertAdjacentHTML("beforeend", data.comment);
            form.reset();
          } else {
            console.error("Failed to add comment.");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      });
    });
  
    // Add event listener to delete buttons
    document.addEventListener("click", async (event) => {
      if (event.target.classList.contains("delete-comment-button")) {
        const button = event.target;
        const commentId = button.dataset.commentId;
        const url = button.dataset.url;
  
        try {
          const response = await fetch(url, {
            method: "DELETE",
            headers: {
              "Accept": "application/json",
            },
          });
  
          if (response.ok) {
            const commentElement = document.querySelector(`#comment-${commentId}`);
            commentElement.remove();
          } else {
            console.error("Failed to delete comment.");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    });
  });
  