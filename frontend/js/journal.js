let tradeSide = 'buy';

function numberFormat(value) {
	const cleaned = value.replace(/[^0-9,]/g, '');
	if (!cleaned) return '';

	const parts = cleaned.split(',');
	const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
	const hasComma = parts.length > 1;
	const decimalPart = hasComma ? parts.slice(1).join('') : '';

	return hasComma ? `${integerPart},${decimalPart}` : integerPart;
}

function parseInputToNumber(value) {
	const normalized = value.replace(/\./g, '').replace(',', '.');
	const parsed = parseFloat(normalized);
	return Number.isNaN(parsed) ? 0 : parsed;
}

function formatResult(num) {
	const rounded = Number(num.toFixed(4));
	const formatted = numberFormat(String(Math.abs(rounded)).replace('.', ','));
	return rounded < 0 ? `-${formatted}` : formatted;
}

const inputEntry = document.getElementById('inputEntry');
const inputTP = document.getElementById('inputTP');
const inputSL = document.getElementById('inputSL');
const profitResult = document.getElementById('profitResult');
const lossResult = document.getElementById('lossResult');

function calculateProfit() {
	if (!inputEntry || !inputTP || !inputSL) return;

	const entry = parseInputToNumber(inputEntry.value);
	const tp = parseInputToNumber(inputTP.value);
	const sl = parseInputToNumber(inputSL.value);

	if (profitResult) {
		if (inputEntry.value && inputTP.value) {
			const profit = tradeSide === 'buy' ? tp - entry : entry - tp;
			profitResult.textContent = formatResult(profit);
		} else {
			profitResult.textContent = '-';
		}
	}

	if (lossResult) {
		if (inputEntry.value && inputSL.value) {
			const loss = tradeSide === 'buy' ? entry - sl : sl - entry;
			lossResult.textContent = formatResult(loss);
		} else {
			lossResult.textContent = '-';
		}
	}
}

// Format otomatis + hitung ulang saat mengetik
document.querySelectorAll('.numberFormat').forEach((input) => {
	input.addEventListener('input', (e) => {
		e.target.value = numberFormat(e.target.value);
		calculateProfit();
	});
});

// Tombol + / -
function addNominal(inputEl, delta) {
	if (!inputEl) return;

	const current = parseInputToNumber(inputEl.value);
	const nextValue = Math.max(0, Number((current + delta).toFixed(4)));
	inputEl.value = numberFormat(String(nextValue).replace('.', ','));
	calculateProfit();
}

document.querySelectorAll('.addButton').forEach((button) => {
	button.addEventListener('click', () => {
		const targetInput = document.getElementById(button.dataset.target);
		const delta = parseFloat(button.dataset.step) || 0;
		addNominal(targetInput, delta);
	});
});

// Lot Preset
const lotButtons = document.querySelectorAll('.presetLot');
const inputLot = document.getElementById('inputLot');

lotButtons.forEach((button) => {
	button.addEventListener('click', () => {
		const targetInput = document.getElementById(button.dataset.target);
		if (!targetInput) return;

		targetInput.value = numberFormat(button.dataset.value);

		lotButtons.forEach((btn) => btn.classList.remove('active'));
		button.classList.add('active');
	});
});

if (inputLot) {
	inputLot.addEventListener('input', () => {
		lotButtons.forEach((btn) => btn.classList.remove('active'));
	});
}

// Buy & Sell Button
const sideBtn = document.querySelectorAll('.button-group button');

sideBtn.forEach((button) => {
	button.addEventListener('click', () => {
		sideBtn.forEach((btn) => btn.classList.remove('active'));
		button.classList.add('active');

		tradeSide = button.dataset.side || 'buy';
		calculateProfit();
	});
});