# 🚀 Rudag Explorer

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-2.3+-green.svg)](https://flask.palletsprojects.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Rudag Network](https://img.shields.io/badge/Network-Rudag-orange.svg)](https://github.com/Rudag-Network)

Un explorador de mempool y blockchain profesional para la red Rudag, inspirado en mempool.space pero diseñado específicamente para la blockchain Rudag.

## ✨ Características

- **📊 Dashboard en Tiempo Real**: Monitoreo instantáneo de la red Rudag
- **🔍 Explorador de Bloques**: Navegación completa por toda la cadena de bloques
- **💫 Visualización de Transacciones**: Detalles completos de transacciones coinbase y regulares
- **📈 Mempool Live**: Monitoreo en tiempo real de transacciones pendientes
- **🎨 Interfaz Profesional**: Diseño oscuro moderno inspirado en mempool.space
- **📱 Responsive Design**: Compatible con dispositivos móviles y desktop
- **⚡ Actualización Automática**: Datos actualizados cada 10 segundos
- **🔢 Estadísticas Avanzadas**: Métricas detalladas de la red

## 🛠 Tecnologías Utilizadas

- **Backend**: Python 3.8+, Flask
- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap 5
- **APIs**: RESTful API integrada con nodos Rudag
- **Gráficos**: Chart.js para visualizaciones
- **Iconos**: Font Awesome 6

## 🚀 Instalación Rápida

### Prerrequisitos
- Python 3.8 o superior
- pip (gestor de paquetes de Python)
- Acceso a un nodo Rudag

### 1. Clonar el Repositorio
```bash
git clone https://github.com/Rudag-Network/-Rudag-Explorer.git
cd -Rudag-Explorer
```

### 2. Instalar Dependencias
```bash
pip install -r requirements.txt
```

### 3. Configuración
```bash
# Opción 1: Usar variables de entorno
export RUDAG_NODE_URL="http://192.168.0.104:5000"
export PORT=2233
export DEBUG=True

# Opción 2: Crear archivo .env
cp .env.example .env
# Editar .env con tus configuraciones
```

### 4. Ejecutar la Aplicación
```bash
python app.py
```

### 5. Acceder al Explorador
Abre tu navegador y visita: `http://localhost:2233`

## ⚙️ Configuración

### Variables de Entorno
```env
# URL del nodo Rudag
RUDAG_NODE_URL=http://192.168.0.104:5000

# Puerto del explorador
PORT=2233

# Modo debug (True/False)
DEBUG=False

# Clave secreta para Flask
SECRET_KEY=tu-clave-secreta-aqui

# Intervalo de actualización en milisegundos
REFRESH_INTERVAL=10000
```

### Estructura del Proyecto
```
Rudag-Explorer/
├── app.py                 # Aplicación principal Flask
├── config.py             # Configuración de la aplicación
├── requirements.txt      # Dependencias de Python
├── .env.example         # Ejemplo de variables de entorno
├── static/
│   ├── css/
│   │   ├── style.css    # Estilos principales
│   │   └── dashboard.css # Estilos del dashboard
│   ├── js/
│   │   ├── app.js       # Lógica principal de la aplicación
│   │   ├── charts.js    # Gráficos y visualizaciones
│   │   └── utils.js     # Utilidades JavaScript
│   └── images/          # Imágenes y favicon
└── templates/
    ├── base.html        # Plantilla base
    ├── index.html       # Dashboard principal
    ├── blocks.html      # Lista de bloques
    ├── block_detail.html # Detalle de bloque
    ├── transactions.html # Lista de transacciones
    └── mempool.html     # Vista del mempool
```

## 📡 API Endpoints

### Endpoints de la Aplicación
- `GET /` - Dashboard principal
- `GET /blocks` - Lista de todos los bloques
- `GET /block/<height>` - Detalles de un bloque específico
- `GET /transactions` - Lista de todas las transacciones
- `GET /mempool` - Estado del mempool

### Endpoints API JSON
- `GET /api/chain` - Datos completos de la cadena
- `GET /api/stats` - Estadísticas de la red
- `GET /api/mempool` - Estado del mempool
- `GET /api/recent-blocks` - Bloques recientes

## 🎯 Características de la Red Rudag

### Estructura de Bloques
```json
{
  "indice": 0,
  "hash_anterior": "0000000000000000000000000000000000000000000000000000000000000000",
  "transacciones": [
    {
      "tipo": "coinbase",
      "recompensa": 500,
      "fees": 0,
      "destino": "RGD:1A77LFiAzzVnDdpMRjKqwB3ZjiVnuNqQjk",
      "timestamp": 1760476400.2370994
    }
  ],
  "tiempo": 1760476400.2371097,
  "nonce": 57798
}
```

### Tipos de Transacciones
- **Coinbase**: Recompensa de minería
- **Regulares**: Transferencias entre direcciones

## 🐛 Solución de Problemas

### Problemas Comunes

1. **Error de conexión al nodo**
   ```bash
   # Verificar que el nodo esté ejecutándose
   curl http://192.168.0.104:5000/chain
   ```

2. **Puerto ya en uso**
   ```bash
   # Cambiar el puerto en las variables de entorno
   export PORT=2234
   ```

3. **Dependencias faltantes**
   ```bash
   pip install --upgrade -r requirements.txt
   ```

### Logs y Debug
```bash
# Ejecutar en modo debug para ver logs detallados
export DEBUG=True
python app.py
```

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guía de Estilo
- Sigue PEP 8 para código Python
- Usa comentarios claros y documentación
- Mantén el código modular y reusable

## 📊 Características en Desarrollo

- [ ] Gráficos avanzados de network hash rate
- [ ] Búsqueda por dirección y transacción
- [ ] API más robusta con documentación Swagger
- [ ] Modo dark/light theme
- [ ] Soporte para múltiples idiomas
- [ ] Notificaciones push para nuevos bloques
- [ ] Estadísticas de minería por dirección

## 🛡 Seguridad

- El explorador es de solo lectura
- No almacena claves privadas
- No realiza transacciones
- Solo se conecta a nodos de confianza

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🌐 Enlaces Rápidos

- **Repositorio**: [https://github.com/Rudag-Network/-Rudag-Explorer](https://github.com/Rudag-Network/-Rudag-Explorer)
- **Red Rudag**: [Documentación Oficial](https://github.com/Rudag-Network)
- **Reportar Issues**: [GitHub Issues](https://github.com/Rudag-Network/-Rudag-Explorer/issues)

## 📞 Soporte

- 📧 Email: [soporte@rudag.network](mailto:cmoraes199322@gmail.com)
- 💬 Discord: [Comunidad Rudag](https://discord.gg/rudag)
- 🐛 Issues: [GitHub Issues](https://github.com/Rudag-Network/-Rudag-Explorer/issues)

---

**Rudag Explorer** - Monitoreo profesional para la red Rudag Blockchain 🚀

*Desarrollado con ❤️ por la comunidad Rudag Network*
