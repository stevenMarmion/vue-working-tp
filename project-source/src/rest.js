const url = ""

/*
* .then ==> callback
*
*/

// ================== GET ==================

async function get_all_questionnaires() {
    const rep = await fetch("/questionnaire/api/v1.0/questionnaires");
    const json = await rep.json();
    console.log(json);
}

async function get_all_questions() {
    const rep = await fetch("/questionnaire/api/v1.0/questions");
    const json = await rep.json();
    console.log(json);
}

async function get_questionnaire(questionnaire_id) {
    const rep = await fetch(`/questionnaire/api/v1.0/questionnaires/${questionnaire_id}`);
    const json = await rep.json();
    console.log(json);
    return json;
}

async function get_question(question_id) {
    const rep = await fetch(`/questionnaire/api/v1.0/question/${question_id}`);
    const json = await rep.json();
    console.log(json);
    return json;
}

// ================== POST ==================

async function create_questionnaire(jsonDatas) {
    const rep = await fetch("/questionnaire/api/v1.0/questionnaire",
        {
            "method" : "POST",
            "headers" : {
                "Content-type" : "application/json"
            },
            "body" : JSON.stringify(jsonDatas)
        }
    );
    const json = await rep.json();
    console.log(json);
}

async function create_question(jsonDatas) {
    const rep = await fetch("/questionnaire/api/v1.0/question",
        {
            "method" : "POST",
            "headers" : {
                "Content-type" : "application/json"
            },
            "body" : JSON.stringify(jsonDatas)
        }
    );
    const json = await rep.json();
    console.log(json);
}

async function click_create_questionnaire(){
    await create_questionnaire(
        {
            "name":name
        }
    );
}

async function click_create_question(){
    await create_question(
        {
            "title":title,
            "questionnaire_id":id
        }
    );
}

// ================== PUT ==================

async function update_questionnaire() {
    const rep = await fetch(`/questionnaire/api/v1.0/questionnaires/${questionnaireId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newName })
    });
    const json = await rep.json();
    console.log(json);
}

async function update_question() {
    const rep = await fetch(`/questionnaire/api/v1.0/questions/${questionId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: newTitle,
            questionnaire_id: newQuestionnaireId
        })
    });
    const json = await rep.json();
    console.log(json);
}

// ================== DELETE ==================

async function delete_questionnaire(questionnaireId) {
    const questionnaire = await get_questionnaire(questionnaireId)
    for (const q of questionnaire["questions"]) {
        await delete_question(q["id"]);
    }
    const rep = await fetch(`/questionnaire/api/v1.0/questionnaires/${questionnaireId}`, {
        method: 'DELETE'
    });
    const json = await rep.json();
    console.log(json);
}

async function delete_question(questionId) {
    const rep = await fetch(`/questionnaire/api/v1.0/questions/${questionId}`, {
        method: 'DELETE'
    });
    const json = await rep.json();
    console.log(json);
}