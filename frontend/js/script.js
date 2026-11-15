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

document.addEventListener('contextmenu', function(e) {
	e.preventDefault();
});

document.addEventListener('keydown', function(e) {
	if(e.key == 'F12') {
		e.preventDefault();
	}

	if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C' || e.key === 'i' || e.key === 'j' || e.key === 'c')) {
        e.preventDefault();
    }
    
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
    }
});