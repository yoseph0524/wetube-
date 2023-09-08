const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtn = document.querySelectorAll(".deleteBtn");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");

  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";

  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  newComment.appendChild(icon);

  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  newComment.appendChild(span);

  const span2 = document.createElement("span");
  span2.classList.add("deleteBtn");
  span2.innerText = "❌";
  newComment.appendChild(span2);
  span2.addEventListener("click", handleDelete);

  videoComments.prepend(newComment);
};

const deleteComment = (event) => {
  const commentContainer = document.querySelector(".video__comments ul");
  const commentList = event.target.parentNode;
  commentContainer.removeChild(commentList);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    const { newCommentId } = await response.json();
    textarea.value = "";
    addComment(text, newCommentId);
  }
};

const handleDelete = async (event) => {
  const commentList = event.target.parentNode;
  const commentId = commentList.dataset.id;
  const videoId = videoContainer.dataset.id;
  const response = await fetch(`/api/comments/${commentId}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      videoId,
    }),
  });
  if (response.status === 201) {
    deleteComment(event);
  }

  if (response.status === 403) {
    alert("댓글 주인이 아닙니다.");
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
for (let i = 0; i < deleteBtn.length; i++) {
  deleteBtn[i].addEventListener("click", handleDelete);
}
