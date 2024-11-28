document.addEventListener("DOMContentLoaded", () => {
    const likeButtons = document.querySelectorAll(".like-button");
  
    likeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault(); // หยุดการรีเฟรชหน้า
  
        const postId = button.dataset.postId;
        const url = button.dataset.url;
        const method = button.dataset.method;
  
        fetch(url, {
          method: method.toUpperCase(),
          headers: {
            "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content,
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            // อัปเดตส่วนจำนวนไลค์ในหน้า
            const likeSection = document.querySelector(`#like-section-${postId}`);
            if (likeSection) {
              likeSection.innerHTML = `
                <p class="likes-count">${data.likes_count} Likes</p>
                ${
                  data.liked
                    ? `<button class="like-button unlike" data-post-id="${postId}" data-url="${url}" data-method="delete">Unlike</button>`
                    : `<button class="like-button like" data-post-id="${postId}" data-url="${url}" data-method="post">Like</button>`
                }
              `;
            }
          })
          .catch((error) => console.error("Error:", error));
      });
    });
  });
  