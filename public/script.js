
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('post-form');
  const feed = document.getElementById('feed');

  async function loadPosts() {
    const res = await fetch('/posts');
    const posts = await res.json();
    feed.innerHTML = '';
    posts.forEach(p => {
      const div = document.createElement('div');
      div.className = 'post glitch';
      div.innerHTML = `<strong>${p.user}</strong>:<br>${p.content}`;
      feed.appendChild(div);
    });
  }

  form?.addEventListener('submit', async e => {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const content = document.getElementById('content').value;
    await fetch('/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, content })
    });
    loadPosts();
    form.reset();
  });

  loadPosts();
  setInterval(loadPosts, 5000);
});
