// Funciones principales de la aplicación
class RudagExplorer {
    constructor() {
        this.baseUrl = '';
        this.currentData = null;
        this.init();
    }

    init() {
        console.log('Rudag Explorer iniciado');
        this.setupEventListeners();
        this.startLiveUpdates();
    }

    setupEventListeners() {
        // Event listeners para elementos interactivos
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeComponents();
        });
    }

    initializeComponents() {
        // Inicializar tooltips de Bootstrap si están disponibles
        if (typeof bootstrap !== 'undefined') {
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        }
    }

    startLiveUpdates() {
        // Actualizar datos cada 10 segundos
        setInterval(() => {
            this.updateDashboard();
        }, 10000);
    }

    async updateDashboard() {
        try {
            const response = await fetch('/api/stats');
            const data = await response.json();
            
            this.updateMempoolCount(data.mempool_count);
            this.updateStatsDisplay(data);
            
        } catch (error) {
            console.error('Error updating dashboard:', error);
        }
    }

    updateMempoolCount(count) {
        const elements = document.querySelectorAll('#mempool-count, #live-mempool-count, #mempool-size, #mempool-badge');
        elements.forEach(element => {
            if (element.id === 'mempool-badge') {
                element.textContent = count;
            } else if (element.id === 'mempool-size') {
                element.textContent = count;
            } else {
                element.textContent = count;
            }
        });

        // Añadir efecto de animación si el contador cambia
        if (this.currentMempoolCount !== count) {
            this.animateMempoolUpdate();
            this.currentMempoolCount = count;
        }
    }

    animateMempoolUpdate() {
        const mempoolElements = document.querySelectorAll('#mempool-size, #live-mempool-count');
        mempoolElements.forEach(element => {
            element.classList.add('pulse');
            setTimeout(() => {
                element.classList.remove('pulse');
            }, 1000);
        });
    }

    updateStatsDisplay(stats) {
        // Actualizar otros elementos del dashboard si es necesario
        console.log('Stats actualizados:', stats);
    }

    // Utilidad para formatear direcciones
    formatAddress(address, length = 12) {
        if (!address) return 'N/A';
        if (address.length <= length) return address;
        return address.substring(0, length) + '...';
    }

    // Utilidad para formatear montos
    formatAmount(amount, decimals = 3) {
        if (amount === null || amount === undefined) return '0';
        return parseFloat(amount).toFixed(decimals);
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    window.rudagExplorer = new RudagExplorer();
});

// Funciones globales de utilidad
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        // Mostrar notificación de copiado
        showNotification('Texto copiado al portapapeles');
    }).catch(function(err) {
        console.error('Error al copiar: ', err);
    });
}

function showNotification(message, type = 'info') {
    // Crear notificación toast
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} position-fixed`;
    toast.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 200px;';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Manejo de errores global
window.addEventListener('error', function(e) {
    console.error('Error global:', e.error);
});