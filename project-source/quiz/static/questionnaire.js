/*
* .then ==> callback
*
*/

// ================== GET ==================

async function get_all_questionnaires() {
    const rep = await fetch("/questionnaire/api/v1.0/questionnaires");
    const json = await rep.json();
    console.log(json);
    show_all_questionnaire(json);
}

async function get_all_questions() {
    const rep = await fetch("/questionnaire/api/v1.0/questions");
    const json = await rep.json();
    console.log(json);
    show_all_questions(json);
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
    const name = $("#create-questionnaire-name").val();
    await create_questionnaire(
        {
            "name":name
        }
    );
}

async function click_create_question(){
    const title = $("#create-question-title").val();
    const id = +$("#create-question-questionnaire-ID").val();
    await create_question(
        {
            "title":title,
            "questionnaire_id":id
        }
    );
}

// ================== PUT ==================

async function update_questionnaire() {
    const questionnaireId = $("#update-questionnaire-id").val();
    const newName = $("#update-questionnaire-name").val();
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
    const questionId = $("#update-question-id").val();
    const newTitle = $("#update-question-title").val();
    const newQuestionnaireId = $("#update-question-questionnaire-ID").val();
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

// ================== RENDERING ==================

function show_all_questions(jsonDatas) {
    const div = $("#all-questions");
    div.empty();
    div.append($("<h1>")).text("Les questions");
    div.append($("<ul>"));
    for (const q of jsonDatas) {
        const listItem = $("<li>");
        listItem.append($("<button>")
            .text(q["title"])
            .click(() => {
                show_details_question(q);
            }));
        listItem.append($("<button>")
            .css("margin-left", "0.3em")
            .addClass("modify-button")
            .text("Modifier")
            .click(() => {
                show_update_question(q);
            }));
        listItem.append($("<button>")
            .css("margin-left", "0.3em")
            .addClass("delete-button")
            .text("Supprimer")
            .click(() => {
                delete_question(q["id"]);
            }));
        $("#all-questions ul").append(listItem);
    }
    show("tout-questionnaire");
    show("all-questions");
    hide("all-questionnaire");
    hide("create-questionnaire");
    hide("create-question");
    hide("toutes-questions");
    hide_update_question();
    hide_update_questionnaire();
    hide("questionnaire-details");
    hide("question-details");
}

function show_all_questionnaire(jsonDatas) {
    const div = $("#all-questionnaire");
    div.empty();
    div.append($("<h1>")).text("Les questionnaires");
    div.append($("<ul>"));
    for (const q of jsonDatas) {
        const listItem = $("<li>");
        listItem.append($("<button>")
            .text(q["name"])
            .click(() => {
                show_details_questionnaire(q);
            }));
        listItem.append($("<button>")
            .css("margin-left", "0.3em")
            .addClass("modify-button")
            .text("Modifier")
            .click(() => {
                show_update_questionnaire(q);
            }));
        listItem.append($("<button>")
            .css("margin-left", "0.3em")
            .addClass("delete-button")
            .text("Supprimer")
            .click(() => {
                delete_questionnaire(q["id"]);
            }));
        $("#all-questionnaire ul").append(listItem);
    }
    show("toutes-questions");
    show("all-questionnaire");
    hide("all-questions");
    hide("create-questionnaire");
    hide("create-question");
    hide("tout-questionnaire");
    hide_update_question();
    hide_update_questionnaire();
    hide("questionnaire-details");
    hide("question-details");
}

function hide_all() {
    $('#all-questionnaire').css("display", "none");
    $('#all-questions').css("display", "none");
    $('#create-questionnaire').css("display", "none");
    $('#create-question').css("display", "none");
}

function hide(id) {
    $("#" + id).css("display", "none");
}

function show(id) {
    $("#" + id).css("display", "inline");
}

async function show_creation_question() {
    make_empty("create-question-questionnaire-ID");
    const rep = await fetch("/questionnaire/api/v1.0/questionnaires");
    const json = await rep.json();
    const select = $("#create-question-questionnaire-ID");
    select.append($("<option>").val("").text("Sélectionnez un questionnaire").prop("selected", true).prop("disabled", true));
    for (const questionnaire of json) {
        select.append($("<option>").val(questionnaire.id).text(questionnaire.name));
    }
    hide('all-questions');
    hide('all-questionnaire');
    show("bouton-creer-questionnaire");
    show("create-question");
    hide("create-questionnaire");
    hide("bouton-creer-question");
    hide_update_question();
    hide_update_questionnaire();
    hide("questionnaire-details");
    hide("question-details");
}

function show_creation_questionnaire() {
    hide('all-questionnaire');
    hide('all-questions');
    show("bouton-creer-question");
    show("create-questionnaire");
    hide("create-question");
    hide("bouton-creer-questionnaire");
    hide_update_question();
    hide_update_questionnaire();
    hide("questionnaire-details");
    hide("question-details");
}

function show_update_questionnaire(questionnaire) {
    hide("update-question-form");
    show("update-questionnaire-form");
    hide("questionnaire-details");
    hide("question-details");
    $("#update-questionnaire-id").val(questionnaire["id"]);
    $("#update-questionnaire-name").val(questionnaire["name"]);
}

async function show_update_question(question) {
    make_empty("update-question-questionnaire-ID");
    const rep = await fetch("/questionnaire/api/v1.0/questionnaires");
    const json = await rep.json();
    const select = $("#update-question-questionnaire-ID");
    for (const questionnaire of json) {
        if (question["questionnaire_id"] == questionnaire.id) {
            select.append($("<option>").val(questionnaire.id).text(questionnaire.name).prop('selected', true));
        }
        else {
            select.append($("<option>").val(questionnaire.id).text(questionnaire.name));
        }
    }
    hide("update-questionnaire-form");
    show("update-question-form");
    hide("questionnaire-details");
    hide("question-details");
    $("#update-question-id").val(question["id"]);
    $("#update-question-title").val(question["title"]);
    $("#update-question-questionnaire-id").val(question["questionnaire_id"]);
}

function hide_update_question() {
    hide("update-questionnaire-form");
    hide("update-question-form");
    make_empty("update-question-id");
    make_empty("update-question-title");
    make_empty("update-question-questionnaire-id");
}

function hide_update_questionnaire() {
    hide("update-question-form");
    hide("update-questionnaire-form");
    make_empty("update-questionnaire-id");
    make_empty("update-questionnaire-name");
}

function show_accueil() {
    hide_all();
    remove_style("tout-questionnaire");
    remove_style("toutes-questions");
    remove_style("bouton-creer-question");
    remove_style("bouton-creer-questionnaire");
    hide("questionnaire-details");
    hide("question-details");
    hide_update_question();
    hide_update_questionnaire();
}

function show_details_questionnaire(questionnaire) {
    hide_update_question();
    hide_update_questionnaire();
    $("#questionnaire-id").text(questionnaire.id);
    $("#questionnaire-name").text(questionnaire.name);
    const questionsList = $("#questionnaire-questions");
    questionsList.empty();
    questionnaire.questions.forEach(question => {
        const questionItem = $("<li>");
        questionItem.append($("<button>")
            .text(question.title)
            .click(() => {
                show_details_question(question)
            }));
        questionsList.append(questionItem);
    });
    show("questionnaire-details");
}

function show_details_question(question) {
    hide_update_question();
    hide_update_questionnaire();
    $("#question-id").text(question.id);
    $("#question-questionnaire-id").text(question["questionnaire_id"]);
    $("#question-title").text(question.title);
    show("question-details");
}

function hide_questionnaire_details() {
    hide("questionnaire-details");
}

function hide_question_details() {
    hide("question-details");
}

function remove_style(id) {
    $("#" + id).removeAttr("style");
}

function make_empty(id) {
    $("#" + id).empty();
}

async function setup(){
    $("#create-questionnaire button").on("click", async () => { await click_create_questionnaire() } );
    $("#create-question button").on("click", async () => { await click_create_question() } );
    show_accueil();
}

$( async () => { await setup() } ); // permet de charger jquery une fois que la page est chargé