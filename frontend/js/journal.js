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