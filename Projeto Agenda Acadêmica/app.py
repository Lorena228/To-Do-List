from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) #Permite requisições de qualquer origem

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tarefas.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Tarefa(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    frequencia = db.Column(db.String(15), nullable=True)
    anotacoes = db.Column(db.String(200), default=False)

tarefas = []

@app.route('/')
def home():
  return render_template('index.html')

@app.route('/mainpage')
def main_page():
  return render_template('main_page.html')

#LISTAR
@app.route('/tarefas', methods = ['GET'])
def listar_tarefas():
  #return jsonify(tarefas), 200
    tarefas = Tarefa.query.all()
    return jsonify([{
        'id': t.id,
        'nome': t.nome,
        'frequencia': t.frequencia,
        'anotacoes': t.anotacoes
    } for t in tarefas])

#CRIAR
@app.route('/tarefas', methods = ['POST'])
def criar_tarefa():
  dados = request.get_json() #dados do JSON
  if not dados:
    return {'erro': 'Dados ausentes ou inválidos'}, 400

  nova_tarefa = Tarefa(
      nome=dados.get('nome'),
      frequencia=dados.get('frequencia'),
      anotacoes=dados.get('anotacoes')
    )
  db.session.add(nova_tarefa)
  db.session.commit()
  return 'Tarefa adicionada com sucesso!', 201
  # nova_tarefa = request.json #json do front
  # tarefas.append(nova_tarefa)
  # print(tarefas)
  # return jsonify({'mensagem': 'Tarefa criada com sucesso!'}), 201

#EDITAR
@app.route('/tarefas/<int:id_tarefa>', methods=['PUT'])
def editar_tarefa(id_tarefa):
    tarefa = Tarefa.query.get(id_tarefa)
    if not tarefa:
        return jsonify({'erro': 'Tarefa não encontrada!'}), 404

    dados = request.get_json()
    tarefa.nome = dados.get('nome', tarefa.nome)
    tarefa.frequencia = dados.get('frequencia', tarefa.frequencia)
    tarefa.anotacoes = dados.get('anotacoes', tarefa.anotacoes)

    db.session.commit()
    return jsonify({'mensagem': 'Tarefa atualizada com sucesso!'}), 200

#EXCLUIR
@app.route('/tarefas/<int:idTarefa>', methods = ['DELETE'])
def excluir_tarefa(idTarefa):
    tarefa = Tarefa.query.get(idTarefa)
    if tarefa:
        db.session.delete(tarefa)
        db.session.commit()
        return 'Tarefa excluída com sucesso!'
    return 'Tarefa não encontrada!'

#executar o servidor
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
