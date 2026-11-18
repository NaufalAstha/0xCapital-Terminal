// Time
const clock = document.getElementById('clock');
const chartGrid = document.getElementById('chart-grid');
const chartConfig = document.getElementById('tradingview-config');
const layoutButtons = document.querySelectorAll('.nav button[data-chart-count]');

function updateClock() {
	const now = new Date();
	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');

	clock.textContent = `${hours}:${minutes}`;
}

updateClock();
setInterval(updateClock, 1000);

function renderCharts(count) {
	if (!chartGrid || !chartConfig) return;

	const configuration = JSON.parse(chartConfig.textContent);
	chartGrid.querySelectorAll('.tradingview-widget-container').forEach((container) => container.remove());
	chartGrid.dataset.chartCount = String(count);
	chartGrid.style.setProperty('--chart-rows', count > 2 ? '2' : '1');

	for (let index = 0; index < count; index += 1) {
		const container = document.createElement('div');
		container.className = 'tradingview-widget-container';
		container.setAttribute('aria-label', `TradingView chart ${index + 1}`);

		const widget = document.createElement('div');
		widget.className = 'tradingview-widget-container__widget';

		const tradingViewScript = document.createElement('script');
		tradingViewScript.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
		tradingViewScript.async = true;
		tradingViewScript.textContent = JSON.stringify(configuration);

		container.append(widget, tradingViewScript);
		chartGrid.appendChild(container);
	}
}

layoutButtons.forEach((button) => {
	button.addEventListener('click', () => {
		const count = Number(button.dataset.chartCount);
		layoutButtons.forEach((layoutButton) => {
			const isActive = layoutButton === button;
			layoutButton.classList.toggle('active', isActive);
			layoutButton.setAttribute('aria-pressed', String(isActive));
		});
		renderCharts(count);
	});
});

renderCharts(Number((chartGrid && chartGrid.dataset.chartCount) || 2));

// Session
const sessionCount = document.querySelectorAll('.session');
const sessionTimes = [
	{id: 'asia', start: 7 * 60, end: 13 * 60 + 59},
	{id: 'overlap-asia-euro', start: 14 * 60, end: 15 * 60 + 59},
	{id: 'europe', start: 16 * 60, end: 18 * 60 + 59},
	{id: 'overlap-euro-america', start: 19 * 60, end: 22 * 60 + 59},
	{id: 'america', start: 23 * 60, end: 3 * 60 + 59}
];

function activeSession() {
	const now = new Date();
	const currentTime = now.getHours() * 60 + now.getMinutes();
	const activeSessionId = sessionTimes.find((session) => {
		if (session.start <= session.end) {
			return currentTime >= session.start && currentTime <= session.end;
		}

		return currentTime >= session.start || currentTime <= session.end;
	})?.id;

	sessionCount.forEach((session) => {
		session.classList.toggle('active-session', session.id === activeSessionId);
	});
}

activeSession();
setInterval(activeSession, 1000);

// Entry Button
const Urls = {
    1: new URL('../page/journal.html', document.currentScript.src).href,
    2: new URL('../page/journal.html', document.currentScript.src).href,
};

document.addEventListener('keydown', function(e) {
    const targetUrl = Urls[e.key];
    if (!targetUrl) {
        return;
    }

    e.preventDefault();
    window.location.href = targetUrl;
});