from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) #Permite requisições de qualquer origem

tarefas = [{"nome": "Tarefa 1", "anotacoes": "Descrição da Tarefa 1"}]

#LISTAR
@app.route('/tarefas', methods = ['GET'])
def listar_tarefas():
  return jsonify(tarefas), 200

#CRIAR
@app.route('/tarefas', methods = ['POST'])
def criar_tarefa():
  nova_tarefa = request.json #json do front
  tarefas.append(nova_tarefa)
  print(tarefas)
  return jsonify({'mensagem': 'Tarefa criada com sucesso!'}), 201

#EDITAR
@app.route('/tarefas/<int:indice>', methods = ['PUT'])
def editar_tarefa(indice):
  if 0 <= indice < len(tarefas):
    tarefas[indice] = request.json
    return jsonify({'mensagem' : 'Tarefa atualizada com sucesso!'}, 200)
  else:
    return jsonify({'erro': 'Tarefa não encontrada'}), 404

#EXCLUIR
@app.route('/tarefas/<int:indice>', methods = ['DELETE'])
def excluir_tarefa(indice):
  try:
    print(f"Tentendo excluir a tarefa com índice: {indice}")
    if 0 <= indice < len(tarefas):
      tarefas.pop(indice)
      print(f"Tarefa de índice {indice} excluida com sucesso")
      return jsonify({'mensagem': 'Tarefa excluída com sucesso!'}), 200
    else:
      print('Erro: Índice fora do intervalo')
      return jsonify({'erro': 'Tarefa não encontrada'}), 404
  except Exception as e:
    print(f"Erro interno no servidor: {e}")
    return jsonify({'erro':'Erro interno no servidor'}), 500

#executar o servidor
if __name__ == '__main__':
  app.run(debug=True)