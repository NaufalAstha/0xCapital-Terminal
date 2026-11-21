(function () {
            const container = document.getElementById('dxy-chart-container');
            const iframe = document.getElementById('dxy-chart-iframe');
            let lastWidth = 0;
            let lastHeight = 0;
            let resizeTimer;

            function loadResponsiveChart() {
                const width = Math.floor(container.clientWidth);
                const height = Math.floor(container.clientHeight);

                if (!width || !height) return;

                if (Math.abs(width - lastWidth) < 20 && Math.abs(height - lastHeight) < 50) {
                    return;
                }

                lastWidth = width;
                lastHeight = height;

                const params = new URLSearchParams({
                    pair_ID: '942611',
                    width: width,
                    height: height,
                    interval: '1800',
                    plotStyle: 'line',
                    domain_ID: '1',
                    lang_ID: '1',
                    timezone_ID: '21'
                });

                iframe.src = `https://ssltvc.investing.com/?${params.toString()}`;
            }

            window.addEventListener('DOMContentLoaded', loadResponsiveChart);
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(loadResponsiveChart, 300);
            });
        })();