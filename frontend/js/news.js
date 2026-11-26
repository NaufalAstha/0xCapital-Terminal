async function loadRSSFeed() {
    const feedUrl = 'https://news.google.com/rss/search?q=financial+markets&hl=en-US&gl=US&ceid=US:en';
    const jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}&count=50`;
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
        if (data.status !== 'ok') {
            throw new Error(data.message || 'Penyedia berita gagal mengembalikan data.');
        }

        const items = data.items;

        if (Array.isArray(items) && items.length > 0) {
            newsList.replaceChildren();
            items.slice(0, 50).forEach(item => {
                const li = document.createElement('li');

                const imageUrl = item.thumbnail || item.enclosure?.link || item.image ||
                    (Array.isArray(item.attachments) && item.attachments[0]?.url);
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
                    const articleUrl = new URL(item.link || item.url);
                    if (articleUrl.protocol === 'https:' || articleUrl.protocol === 'http:') {
                        title.href = articleUrl.href;
                        title.target = '_blank';
                        title.rel = 'noopener noreferrer';
                    }
                } catch (error) {
                    title.removeAttribute('href');
                }
                content.appendChild(title);

                const publishDate = new Date(item.pubDate || item.date_published);
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
        showMessage('Berita tidak dapat dimuat saat ini. Silakan coba lagi nanti.');
    }
}

loadRSSFeed();