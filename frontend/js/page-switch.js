const pageUrls = {
    F1: new URL('../index.html', document.currentScript.src).href,
    F2: new URL('../page/economic-data.html', document.currentScript.src).href,
    F3: new URL('../page/news.html', document.currentScript.src).href,
    F4: new URL('../page/journal.html', document.currentScript.src).href,
    F5: new URL('../page/portofolio.html', document.currentScript.src).href,
    F6: new URL('../page/account.html', document.currentScript.src).href
};

document.addEventListener('keydown', function(e) {
    const targetUrl = pageUrls[e.key];
    if (!targetUrl) {
        return;
    }

    e.preventDefault();
    window.location.href = targetUrl;
});