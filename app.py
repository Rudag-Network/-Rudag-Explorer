from flask import Flask, render_template, jsonify, request
import requests
import json
from datetime import datetime
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

class RudagAPI:
    def __init__(self, base_url):
        self.base_url = base_url
    
    def get_chain(self):
        try:
            response = requests.get(f"{self.base_url}/chain", timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error fetching chain: {e}")
            return None
    
    def get_mempool(self):
        try:
            # En Rudag, las transacciones pendientes están en el campo pending_transactions
            chain_data = self.get_chain()
            if chain_data:
                return {
                    'count': chain_data.get('pending_transactions', 0),
                    'transactions': []  # En una implementación real, habría un endpoint específico
                }
            return {'count': 0, 'transactions': []}
        except Exception as e:
            print(f"Error fetching mempool: {e}")
            return {'count': 0, 'transactions': []}

rudag_api = RudagAPI(Config.RUDAG_NODE_URL)

def format_timestamp(timestamp):
    try:
        return datetime.fromtimestamp(timestamp).strftime('%Y-%m-%d %H:%M:%S')
    except:
        return str(timestamp)

def calculate_block_stats(chain_data):
    if not chain_data or 'chain' not in chain_data:
        return {}
    
    chain = chain_data['chain']
    total_blocks = len(chain)
    total_transactions = 0
    total_fees = 0
    coinbase_transactions = 0
    regular_transactions = 0
    
    for block in chain:
        for tx in block.get('transacciones', []):
            total_transactions += 1
            if tx.get('tipo') == 'coinbase':
                coinbase_transactions += 1
            else:
                regular_transactions += 1
                total_fees += tx.get('fee', 0)
    
    return {
        'total_blocks': total_blocks,
        'total_transactions': total_transactions,
        'total_fees': total_fees,
        'coinbase_transactions': coinbase_transactions,
        'regular_transactions': regular_transactions,
        'current_reward': chain_data.get('current_reward', 50),
        'total_supply': chain_data.get('total_supply', 0)
    }

@app.route('/')
def index():
    chain_data = rudag_api.get_chain()
    mempool_data = rudag_api.get_mempool()
    stats = calculate_block_stats(chain_data)
    
    # Últimos bloques para el dashboard
    recent_blocks = []
    if chain_data and 'chain' in chain_data:
        recent_blocks = chain_data['chain'][-10:][::-1]  # Últimos 10 bloques, más reciente primero
    
    return render_template('index.html',
                         stats=stats,
                         recent_blocks=recent_blocks,
                         mempool_count=mempool_data['count'],
                         format_timestamp=format_timestamp)

@app.route('/blocks')
def blocks():
    chain_data = rudag_api.get_chain()
    blocks = []
    
    if chain_data and 'chain' in chain_data:
        blocks = chain_data['chain'][::-1]  # Orden inverso: más reciente primero
    
    return render_template('blocks.html',
                         blocks=blocks,
                         format_timestamp=format_timestamp)

@app.route('/block/<int:block_height>')
def block_detail(block_height):
    chain_data = rudag_api.get_chain()
    block = None
    
    if chain_data and 'chain' in chain_data:
        for blk in chain_data['chain']:
            if blk.get('indice') == block_height:
                block = blk
                break
    
    return render_template('block_detail.html',
                         block=block,
                         format_timestamp=format_timestamp)

@app.route('/transactions')
def transactions():
    chain_data = rudag_api.get_chain()
    all_transactions = []
    
    if chain_data and 'chain' in chain_data:
        for block in chain_data['chain']:
            for tx in block.get('transacciones', []):
                tx['block_height'] = block.get('indice')
                tx['block_hash'] = block.get('hash_anterior')
                tx['block_time'] = block.get('tiempo')
                all_transactions.append(tx)
        
        # Ordenar por timestamp (más reciente primero)
        all_transactions.sort(key=lambda x: x.get('timestamp', 0), reverse=True)
    
    return render_template('transactions.html',
                         transactions=all_transactions,
                         format_timestamp=format_timestamp)

@app.route('/mempool')
def mempool():
    mempool_data = rudag_api.get_mempool()
    return render_template('mempool.html',
                         mempool_data=mempool_data,
                         format_timestamp=format_timestamp)

# API endpoints para datos en tiempo real
@app.route('/api/chain')
def api_chain():
    return jsonify(rudag_api.get_chain() or {})

@app.route('/api/stats')
def api_stats():
    chain_data = rudag_api.get_chain()
    stats = calculate_block_stats(chain_data)
    mempool_data = rudag_api.get_mempool()
    stats['mempool_count'] = mempool_data['count']
    return jsonify(stats)

@app.route('/api/mempool')
def api_mempool():
    return jsonify(rudag_api.get_mempool())

@app.route('/api/recent-blocks')
def api_recent_blocks():
    chain_data = rudag_api.get_chain()
    recent_blocks = []
    
    if chain_data and 'chain' in chain_data:
        recent_blocks = chain_data['chain'][-10:][::-1]
    
    return jsonify(recent_blocks)

if __name__ == '__main__':
    app.run(host=Config.HOST, port=Config.PORT, debug=Config.DEBUG)