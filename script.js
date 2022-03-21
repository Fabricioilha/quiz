// Initial data
let currentQuestion = 0;
let correctAnswers = 0;

// Events
showQuestion();
document.querySelector(".scoreArea button").addEventListener("click", reset)
// Functions

function showQuestion(){
   if(questions[currentQuestion]){
       let pct = Math.floor((currentQuestion / questions.length) * 100);
       document.querySelector(".progress--bar").style.width = `${pct}%`;

       let q = questions[currentQuestion];
       document.querySelector(".scoreArea").style.display = "none";
       document.querySelector(".questionArea").style.display = "block";
       document.querySelector(".question").innerHTML = q.question;

       let optionsHTML = '';
       for(let i in q.options){
           optionsHTML += `
           <div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>
           `;
       }
       document.querySelector(".options").innerHTML = optionsHTML;

       document.querySelectorAll(".options").forEach(item =>{
           item.addEventListener("click", optionClickEvent);
       })
   }else{
       finishQuiz();
   }
}

function optionClickEvent(e){
    let clickedOption = parseInt(e.target.getAttribute("data-op"));
    if(questions[currentQuestion].answer === clickedOption){
        correctAnswers++;
    }
    currentQuestion++
    showQuestion();
}

function finishQuiz(){
    let pts = Math.floor((correctAnswers / questions.length) * 100);

    if(pts < 30){
        document.querySelector(".scoreText1").innerHTML = "Tá ruim em";
        document.querySelector(".scorePct").style.color = "#f00";
    }else if(pts >= 30 && pts < 70){
        document.querySelector(".scoreText1").innerHTML = "Ruim não tá.. mas também não tá bom!";
        document.querySelector(".scorePct").style.color = "#ffff00";
    }else if(pts >= 70){
        document.querySelector(".scoreText1").innerHTML = "Excelente!";
        document.querySelector(".scorePct").style.color = "#0d630d";
    }

    document.querySelector(".scoreText2").innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`;
    document.querySelector(".scorePct").innerHTML = `Acertou ${pts}%`;

    document.querySelector(".progress--bar").style.width = `100%`;
    document.querySelector(".scoreArea").style.display = "block";
    document.querySelector(".questionArea").style.display = "none";
}

function reset(){
    correctAnswers = 0;
    currentQuestion = 0 ;
    showQuestion();
}