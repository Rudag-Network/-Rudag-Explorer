import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Configuración del servidor
    HOST = os.getenv('HOST', '0.0.0.0')
    PORT = int(os.getenv('PORT', 2233))
    DEBUG = os.getenv('DEBUG', False)
    
    # Configuración del nodo Rudag
    RUDAG_NODE_URL = os.getenv('RUDAG_NODE_URL', 'http://192.168.0.104:5000')
    
    # Configuración de la aplicación
    SECRET_KEY = os.getenv('SECRET_KEY', 'rudag-mempool-explorer-secret-key')
    REFRESH_INTERVAL = int(os.getenv('REFRESH_INTERVAL', 10000))  # ms