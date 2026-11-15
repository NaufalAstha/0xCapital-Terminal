const clock = document.getElementById('clock');
const chartContainer = document.querySelector('.tradingview-widget-container');
const chartConfig = document.getElementById('tradingview-config');

function updateClock() {
	const now = new Date();
	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');

	clock.textContent = `${hours}:${minutes}`;
}

updateClock();
setInterval(updateClock, 1000);

if (chartContainer && chartConfig) {
	const tradingViewScript = document.createElement('script');
	tradingViewScript.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
	tradingViewScript.async = true;
	tradingViewScript.textContent = JSON.stringify(JSON.parse(chartConfig.textContent));
	chartContainer.appendChild(tradingViewScript);
}
