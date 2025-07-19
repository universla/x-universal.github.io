// Cargar publicaciones desde el backend
async function loadPosts() {
  const res = await fetch('/posts');
  const posts = await res.json();
  const feed = document.getElementById('feed');
  feed.innerHTML = '';

  posts.forEach(p => {
    const div = document.createElement('div');
    div.className = 'post';
    div.innerHTML = `<strong>${p.user}</strong>:<br>${p.content}`;
    feed.appendChild(div);
  });
}

// Cargar publicaciones cada 5 segundos
setInterval(loadPosts, 5000);
loadPosts();
