from flask import jsonify, request
from .app import app

# =========================== CHECK API REST AVEC SGBD ===========================

from .question_models import (
    db_get_all_questionnaire,
    db_get_questionnaire,
    db_create_questionnaire,
    db_create_question,
    db_get_question, 
    db_get_all_questions,
    db_delete_question,
    db_delete_questionnaire, 
    db_update_question, 
    db_update_questionnaire
)

@app.route('/questionnaire/api/v1.0/questionnaires', methods = ['GET'])
def get_all_questionnaire(): 
    return jsonify(
        [q.to_json() for q in db_get_all_questionnaire()]
    )

@app.route('/questionnaire/api/v1.0/questionnaires/<int:questionnaire_id>', methods = ['GET'])
def get_questionnaire(questionnaire_id):
    return jsonify(
        db_get_questionnaire(questionnaire_id=questionnaire_id).to_json()
    )

@app.route('/questionnaire/api/v1.0/questions', methods = ['GET'])
def get_all_questions():
    return jsonify(
        [q.to_json() for q in db_get_all_questions()]
    )

@app.route('/questionnaire/api/v1.0/question/<int:question_id>', methods = ['GET'])
def get_question(question_id):
    return jsonify(
        db_get_question(question_id=question_id).to_json()
    )

@app.route('/questionnaire/api/v1.0/questionnaire', methods = ['POST'])
def create_questionnaire():
    json = request.json
    questionnaire = db_create_questionnaire(json)
    return jsonify(
        questionnaire.to_json()
    )

@app.route('/questionnaire/api/v1.0/question', methods = ['POST'])
def create_question():
    json = request.json
    question = db_create_question(json)
    return jsonify(
        question.to_json()
    )

@app.route('/questionnaire/api/v1.0/questionnaires/<int:questionnaire_id>', methods=['PUT'])
def update_questionnaire(questionnaire_id):
    json = request.json
    updated_questionnaire = db_update_questionnaire(questionnaire_id, json)
    return jsonify(updated_questionnaire.to_json())

@app.route('/questionnaire/api/v1.0/questions/<int:question_id>', methods=['PUT'])
def update_question(question_id):
    json = request.json
    updated_question = db_update_question(question_id, json)
    return jsonify(updated_question.to_json())

@app.route('/questionnaire/api/v1.0/questionnaires/<int:questionnaire_id>', methods=['DELETE'])
def delete_questionnaire(questionnaire_id):
    response = db_delete_questionnaire(questionnaire_id)
    return jsonify({"message": response})

@app.route('/questionnaire/api/v1.0/questions/<int:question_id>', methods=['DELETE'])
def delete_question(question_id):
    response = db_delete_question(question_id)
    return jsonify({"message": response})