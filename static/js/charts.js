// Configuración de gráficos para el dashboard
class RudagCharts {
    constructor() {
        this.charts = new Map();
        this.init();
    }

    init() {
        // Inicializar gráficos cuando estén disponibles
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeCharts();
        });
    }

    initializeCharts() {
        // Ejemplo: Gráfico de transacciones por bloque
        this.createTransactionChart();
        
        // Ejemplo: Gráfico de fees over time
        this.createFeeChart();
    }

    createTransactionChart() {
        const ctx = document.getElementById('transactionChart');
        if (!ctx) return;

        this.charts.set('transactions', new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Transacciones por Bloque',
                    data: [],
                    borderColor: '#58a6ff',
                    backgroundColor: 'rgba(88, 166, 255, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#c9d1d9'
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#8b949e'
                        },
                        grid: {
                            color: '#30363d'
                        }
                    },
                    y: {
                        ticks: {
                            color: '#8b949e'
                        },
                        grid: {
                            color: '#30363d'
                        }
                    }
                }
            }
        }));
    }

    createFeeChart() {
        const ctx = document.getElementById('feeChart');
        if (!ctx) return;

        this.charts.set('fees', new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Fees Acumulados',
                    data: [],
                    backgroundColor: 'rgba(215, 58, 74, 0.8)',
                    borderColor: '#d73a4a',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#c9d1d9'
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#8b949e'
                        },
                        grid: {
                            color: '#30363d'
                        }
                    },
                    y: {
                        ticks: {
                            color: '#8b949e'
                        },
                        grid: {
                            color: '#30363d'
                        }
                    }
                }
            }
        }));
    }

    updateTransactionChart(labels, data) {
        const chart = this.charts.get('transactions');
        if (chart) {
            chart.data.labels = labels;
            chart.data.datasets[0].data = data;
            chart.update();
        }
    }

    updateFeeChart(labels, data) {
        const chart = this.charts.get('fees');
        if (chart) {
            chart.data.labels = labels;
            chart.data.datasets[0].data = data;
            chart.update();
        }
    }

    // Método para cargar datos desde la API
    async loadChartData() {
        try {
            const response = await fetch('/api/chain');
            const data = await response.json();
            
            if (data && data.chain) {
                this.processChartData(data.chain);
            }
        } catch (error) {
            console.error('Error loading chart data:', error);
        }
    }

    processChartData(chain) {
        // Procesar datos para los gráficos
        const recentBlocks = chain.slice(-20); // Últimos 20 bloques
        
        const blockHeights = recentBlocks.map(block => block.indice);
        const transactionsPerBlock = recentBlocks.map(block => block.transacciones.length);
        
        // Calcular fees acumulados
        let cumulativeFees = 0;
        const feesData = recentBlocks.map(block => {
            const blockFees = block.transacciones.reduce((sum, tx) => sum + (tx.fees || 0), 0);
            cumulativeFees += blockFees;
            return cumulativeFees;
        });

        this.updateTransactionChart(blockHeights, transactionsPerBlock);
        this.updateFeeChart(blockHeights, feesData);
    }
}

// Inicializar gráficos
document.addEventListener('DOMContentLoaded', function() {
    window.rudagCharts = new RudagCharts();
    
    // Cargar datos iniciales después de un breve delay
    setTimeout(() => {
        window.rudagCharts.loadChartData();
    }, 1000);
});