/*
* .then ==> callback
*
*/

const API_URL = 'http://localhost:5000'

// ================== GET ==================

export async function get_all_questionnaires() {
    const rep = await fetch(API_URL + "/questionnaire/api/v1.0/questionnaires", {
        "method" : "GET",
        "headers" : {
            "Access-Control-Allow-Origin": '*',
            "Access-Control-Allow-Methods" : "*"
        },
    });
    const json = await rep.json();
    console.log(json);
    return json;
}

export async function get_all_questions() {
    const rep = await fetch(API_URL + "/questionnaire/api/v1.0/questions", {
        "method" : "GET",
        "headers" : {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods" : "*"
        }
    });
    const json = await rep.json();
    console.log(json);
    return json;
}

export async function get_questionnaire(questionnaire_id) {
    const rep = await fetch(API_URL + `/questionnaire/api/v1.0/questionnaires/${questionnaire_id}`, {
        "method" : "GET",
        "headers" : {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods" : "*"
        }
    });
    const json = await rep.json();
    console.log(json);
    return json;
}

export async function get_question(question_id) {
    const rep = await fetch(API_URL + `/questionnaire/api/v1.0/question/${question_id}`, {
        "method" : "GET",
        "headers" : {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods" : "*"
        }
    });
    const json = await rep.json();
    console.log(json);
    return json;
}

// ================== POST ==================

export async function create_questionnaire(jsonDatas) {
    const rep = await fetch(API_URL + "/questionnaire/api/v1.0/questionnaire",
        {
            "method" : "POST",
            "headers" : {
                "Content-type" : "application/json",
                "Access-Control-Allow-Origin" : "*",
            },
            "body" : JSON.stringify(jsonDatas)
        }
    );
    const json = await rep.json();
    console.log(json);
    return json;
}

export async function create_question(jsonDatas) {
    const rep = await fetch(API_URL + "/questionnaire/api/v1.0/question",
        {
            "method" : "POST",
            "headers" : {
                "Content-type" : "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods" : "*"
            },
            "body" : JSON.stringify(jsonDatas)
        }
    );
    const json = await rep.json();
    console.log(json);
    return json;
}

export async function click_create_questionnaire(name) {
    await create_questionnaire(
        {
            "name":name
        }
    );
}

export async function click_create_question(title, id){
    await create_question(
        {
            "title":title,
            "questionnaire_id":id
        }
    );
}

// ================== PUT ==================

export async function update_questionnaire(questionnaireId, newName) {
    const rep = await fetch(API_URL + `/questionnaire/api/v1.0/questionnaires/${questionnaireId}`, {
        "method": 'PUT',
        "headers": {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods" : "*"
        },
        "body": JSON.stringify({ name: newName })
    });
    const json = await rep.json();
    console.log(json);
    return json;
}

export async function update_question(questionId, newTitle, newQuestionnaireId) {
    const rep = await fetch(API_URL + `/questionnaire/api/v1.0/questions/${questionId}`, {
        "method": 'PUT',
        "headers": {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods" : "*"
        },
        "body": JSON.stringify({
            title: newTitle,
            questionnaire_id: newQuestionnaireId
        })
    });
    const json = await rep.json();
    console.log(json);
    return json;
}

// ================== DELETE ==================

export async function delete_questionnaire(questionnaireId) {
    const questionnaire = await get_questionnaire(questionnaireId)
    for (const q of questionnaire["questions"]) {
        await delete_question(q["id"]);
    }
    const rep = await fetch(API_URL + `/questionnaire/api/v1.0/questionnaires/${questionnaireId}`, {
        "method": 'DELETE',
        "headers" : {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods" : "*"
        }
    });
    const json = await rep.json();
    console.log(json);
    return json
}

export async function delete_question(questionId) {
    const rep = await fetch(API_URL + `/questionnaire/api/v1.0/questions/${questionId}`, {
        "method": 'DELETE',
        "headers" : {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods" : "*"
        }
    });
    const json = await rep.json();
    console.log(json);
    return json
}