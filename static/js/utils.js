// Utilidades generales para el explorador

// Formateador de fechas
function formatTimestamp(timestamp) {
    if (!timestamp) return 'N/A';
    
    const date = new Date(timestamp * 1000);
    return date.toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

// Formateador de direcciones
function formatAddress(address, startLength = 8, endLength = 8) {
    if (!address || address.length <= startLength + endLength) {
        return address || 'N/A';
    }
    return `${address.substring(0, startLength)}...${address.substring(address.length - endLength)}`;
}

// Formateador de montos
function formatCurrency(amount, decimals = 3, suffix = ' RGD') {
    if (amount === null || amount === undefined) return '0' + suffix;
    
    const num = parseFloat(amount);
    if (isNaN(num)) return '0' + suffix;
    
    return num.toFixed(decimals) + suffix;
}

// Calculadora de hash rate (simplificada)
function calculateHashRate(difficulty, blockTime = 60) {
    // Esta es una estimación simplificada
    return (difficulty * Math.pow(2, 32)) / blockTime;
}

// Conversor de unidades
function formatHashRate(hashesPerSecond) {
    const units = ['H/s', 'KH/s', 'MH/s', 'GH/s', 'TH/s', 'PH/s'];
    let unitIndex = 0;
    let rate = hashesPerSecond;

    while (rate >= 1000 && unitIndex < units.length - 1) {
        rate /= 1000;
        unitIndex++;
    }

    return `${rate.toFixed(2)} ${units[unitIndex]}`;
}

// Validación de direcciones Rudag
function isValidRudagAddress(address) {
    if (!address || typeof address !== 'string') return false;
    
    // Patrón básico para direcciones Rudag (ajustar según el formato real)
    const rudagAddressPattern = /^RGD:[a-zA-Z0-9]{30,40}$/;
    return rudagAddressPattern.test(address);
}

// Utilidad para hacer polling
class PollingService {
    constructor(callback, interval = 10000) {
        this.callback = callback;
        this.interval = interval;
        this.timerId = null;
        this.isRunning = false;
    }

    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.execute();
        this.timerId = setInterval(() => {
            this.execute();
        }, this.interval);
    }

    stop() {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }

    async execute() {
        try {
            await this.callback();
        } catch (error) {
            console.error('Error en polling:', error);
        }
    }

    setInterval(interval) {
        this.interval = interval;
        if (this.isRunning) {
            this.stop();
            this.start();
        }
    }
}

// Exportar funciones para uso global
window.RudagUtils = {
    formatTimestamp,
    formatAddress,
    formatCurrency,
    calculateHashRate,
    formatHashRate,
    isValidRudagAddress,
    PollingService
};