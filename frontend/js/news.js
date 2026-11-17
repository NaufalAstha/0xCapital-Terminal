async function loadRSSFeed() {
    const jsonUrl = 'https://rss.app/feeds/v1.1/CxbxYmOV55bLyb3m.json';
    const newsList = document.getElementById('news-feed');

    function showMessage(message) {
        const listItem = document.createElement('li');
        listItem.textContent = message;
        newsList.replaceChildren(listItem);
    }

    try {
        const response = await fetch(jsonUrl);
        
        if (!response.ok) {
            throw new Error('Gagal mengambil data dari server.');
        }

        const data = await response.json();
        const items = data.items;

        if (Array.isArray(items) && items.length > 0) {
            newsList.replaceChildren();
            items.slice(0, 50).forEach(item => {
                const li = document.createElement('li');

                const imageUrl = item.image || (Array.isArray(item.attachments) && item.attachments[0]?.url);
                if (imageUrl) {
                    try {
                        const parsedImageUrl = new URL(imageUrl);
                        if (parsedImageUrl.protocol === 'https:' || parsedImageUrl.protocol === 'http:') {
                            const imageContainer = document.createElement('div');
                            imageContainer.className = 'news-image';

                            const image = document.createElement('img');
                            image.src = parsedImageUrl.href;
                            image.alt = '';
                            image.loading = 'lazy';
                            image.decoding = 'async';
                            image.addEventListener('error', () => imageContainer.remove(), { once: true });

                            imageContainer.appendChild(image);
                            li.appendChild(imageContainer);
                        }
                    } catch (error) {
                        console.warn('URL gambar berita tidak valid:', imageUrl);
                    }
                }

                const content = document.createElement('div');
                content.className = 'news-content';

                const title = document.createElement('a');
                title.textContent = item.title || 'Berita tanpa judul';
                try {
                    const articleUrl = new URL(item.url);
                    if (articleUrl.protocol === 'https:' || articleUrl.protocol === 'http:') {
                        title.href = articleUrl.href;
                        title.target = '_blank';
                        title.rel = 'noopener noreferrer';
                    }
                } catch (error) {
                    title.removeAttribute('href');
                }
                content.appendChild(title);

                const publishDate = new Date(item.date_published);
                if (!Number.isNaN(publishDate.getTime())) {
                    const date = document.createElement('span');
                    date.className = 'news-date';
                    date.textContent = publishDate.toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    });
                    content.appendChild(date);
                }

                li.appendChild(content);
                newsList.appendChild(li);
            });
        } else {
            showMessage('Tidak ada berita yang tersedia saat ini.');
        }

    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        showMessage('Gagal memuat berita. Periksa koneksi atau izin CORS.');
    }
}

loadRSSFeed();