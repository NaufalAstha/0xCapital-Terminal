// Entry Input
const inputEntry = document.getElementById('inputEntry');

    function numberFormat(value) {
        const cleaned = value.replace(/[^0-9,]/g, '');
        if (!cleaned) return '';

        const parts = cleaned.split(',');
        const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        const hasComma = parts.length > 1;
        const decimalPart = hasComma ? parts.slice(1).join('') : '';

        return hasComma ? `${integerPart},${decimalPart}` : integerPart;
    }

    inputEntry.addEventListener('input', function (e) {
        e.target.value = numberFormat(e.target.value);
    });

// Take Profit
const inputTP = document.getElementById('inputTP');

    function numberFormat(value) {
        const cleaned = value.replace(/[^0-9,]/g, '');
        if (!cleaned) return '';

        const parts = cleaned.split(',');
        const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        const hasComma = parts.length > 1;
        const decimalPart = hasComma ? parts.slice(1).join('') : '';

        return hasComma ? `${integerPart},${decimalPart}` : integerPart;
    }

    inputTP.addEventListener('input', function (e) {
        e.target.value = numberFormat(e.target.value);
    });

// Stop Loss
const inputSL = document.getElementById('inputSL');

    function numberFormat(value) {
        const cleaned = value.replace(/[^0-9,]/g, '');
        if (!cleaned) return '';

        const parts = cleaned.split(',');
        const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        const hasComma = parts.length > 1;
        const decimalPart = hasComma ? parts.slice(1).join('') : '';

        return hasComma ? `${integerPart},${decimalPart}` : integerPart;
    }

    inputSL.addEventListener('input', function (e) {
        e.target.value = numberFormat(e.target.value);
    });

// Add Input
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

function addNominal(inputEl, delta) {
	if (!inputEl) return;

	const current = parseInputToNumber(inputEl.value);
	const nextValue = Math.max(0, Number((current + delta).toFixed(4)));
	inputEl.value = numberFormat(String(nextValue).replace('.', ','));
}

document.querySelectorAll('.numberFormat').forEach((input) => {
	input.addEventListener('input', (e) => {
		e.target.value = numberFormat(e.target.value);
	});
});

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