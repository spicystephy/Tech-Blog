async function postFormHandler(event) {
  event.preventDefault();

  if (post_text) {
    const response = await fetch("/api/posts/:id", {
      method: "GET",
      body: JSON.stringify({
        title,
        post_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      location.href = "/api/posts/:id";
    } else {
      alert(response.statusText);
    }
  }
}
document
  .querySelector(".comment-form")
  .addEventListener("submit", commentFormHandler);
