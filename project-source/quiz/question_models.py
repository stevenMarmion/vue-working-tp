from .app import db, relationship, url_for, abort

class Questionnaire(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100))

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return "<Questionnaire (%d) %s>" % (self.id, self.name)

    def to_json(self):
        json = {
            'id':self.id,
            'name':self.name,
            'url_questionnaire':url_for('get_questionnaire', questionnaire_id=self.id, _external=True),
            'questions':[q.to_json() for q in self.questions.all()]
        }
        return json

class Question(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(120))
    # questionType = db.Column(db.String(120))
    questionnaire_id = db.Column(db.Integer, db.ForeignKey('questionnaire.id'))
    questionnaire = db.relationship("Questionnaire", backref = db.backref("questions", lazy="dynamic"))

    def __repr__(self) -> str:
        return f"<Question {self.id} : {self.title}>"
    
    def to_json(self) :
        json = {
            'id': self.id,
            'questionnaire_id':self.questionnaire_id,
            'url_question':url_for('get_question', question_id=self.id, _external=True),
            'url_questionnaire':url_for('get_questionnaire', questionnaire_id=self.id, _external=True),
            'title':self.title
        }
        return json
    
# ================== GET ==================

def db_get_all_questionnaire():
    return Questionnaire.query.all()

def db_get_questionnaire(questionnaire_id):
    return Questionnaire.query.get_or_404(questionnaire_id) # fait une requete sur la table Questionnaire de l'id et retourne 404 si rien est trouvé.

def db_get_question(question_id):
    return Question.query.get_or_404(question_id)

def db_get_all_questions():
    return Question.query.all()

# ================== POST ==================

def db_create_questionnaire(json_datas):
    if json_datas['name'] == "" :
        abort(400)
    questionnaire = Questionnaire(name=json_datas['name'])
    db.session.add(questionnaire)
    db.session.commit()
    return questionnaire

def db_create_question(json_datas):
    if json_datas['title'] == "" or json_datas['questionnaire_id'] == "": 
        abort(400)
    question = Question(title=json_datas['title'], questionnaire_id=json_datas['questionnaire_id'])
    db.session.add(question)
    db.session.commit()
    return question

# ================== PUT ==================

def db_update_questionnaire(questionnaire_id, json_datas):
    questionnaire = Questionnaire.query.get(questionnaire_id)
    if not questionnaire:
        abort(404)
    if 'name' in json_datas and json_datas['name'] != "":
        questionnaire.name = json_datas['name']
    else:
        abort(400)
    db.session.commit()
    return questionnaire

def db_update_question(question_id, json_datas):
    question = Question.query.get(question_id)
    if not question:
        abort(404)
    if 'title' in json_datas and 'questionnaire_id' in json_datas and json_datas['title'] != "" and json_datas['questionnaire_id'] != "":
        question.title = json_datas['title']
        question.questionnaire_id = json_datas['questionnaire_id']
    else:
        abort(400)
    db.session.commit()
    return question

# ================== DELETE ==================

def db_delete_questionnaire(questionnaire_id):
    questionnaire = Questionnaire.query.get(questionnaire_id)
    if not questionnaire:
        abort(404)
    db.session.delete(questionnaire)
    db.session.commit()
    return "Questionnaire supprimé avec succès"

def db_delete_question(question_id):
    question = Question.query.get(question_id)
    if not question:
        abort(404)
    db.session.delete(question)
    db.session.commit()
    return "Question supprimée avec succès"
