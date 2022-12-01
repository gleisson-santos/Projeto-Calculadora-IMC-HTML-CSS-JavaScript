
// IMC DATA
const data = [
    {
      min: 0,
      max: 18.4,
      classification: "Menor que 18,5",
      info: "Magreza",
      obesity: "0",
    },
    {
      min: 18.5,
      max: 24.9,
      classification: "Entre 18,5 e 24,9",
      info: "Normal",
      obesity: "0",
    },
    {
      min: 25,
      max: 29.9,
      classification: "Entre 25,0 e 29,9",
      info: "Sobrepeso",
      obesity: "I",
    },
    {
      min: 30,
      max: 39.9,
      classification: "Entre 30,0 e 39,9",
      info: "Obesidade",
      obesity: "II",
    },
    {
      min: 40,
      max: 99,
      classification: "Maior que 40,0",
      info: "Obesidade grave",
      obesity: "III",
    },
  ];

  //Seleção dos elementos

  const imcTable =  document.querySelector("#imc-table");

  const heightInput = document.querySelector("#height");
  const weightInput = document.querySelector("#weight");
  const calcBtn = document.querySelector("#calc-btn");
  const clearBtn = document.querySelector("#clear-btn");

  const calcContainer = document.querySelector("#calc-container")
  const resultContainer = document.querySelector("#result-container")

  const imcNumber = document.querySelector("#imc-number span")
  const imcinfo = document.querySelector("#imc-info span")

  const backBtn = document.querySelector("#back-btn")

  //Funções

  function createTable(data) {
    data.forEach((item) => {

        //Vai criar uma uma Div com uma calsse nomeada no Html
        const div =  document.createElement("div");
        div.classList.add("table-data");

        const classification = document.createElement("p");
        classification.innerText = item.classification;

        const info = document.createElement("p");
        info.innerText = item.info;

        const obesity = document.createElement("p");
        obesity.innerText = item.obesity;

        div.appendChild(classification);
        div.appendChild(info);
        div.appendChild(obesity);

        imcTable.appendChild(div);
    });
  }

  //Limpar inputs
  function cleanInputs() {
    heightInput.value = "";
    weightInput.value = "";
    imcNumber.classList = "";        
    imcinfo.classList = "";

  }

  //Replace
  function validDigits(text) {
    return text.replace(/[^0-9,]/g, "")
  }

  //Calculo do IMC
  function calcImc(weight, height) {
    const imc = (weight / (height * height)).toFixed(1);
    return imc;
  }
  

  function showOrdeResults() {
    calcContainer.classList.toggle("hide")
    resultContainer.classList.toggle("hide")
  }
  //Inicialização do projeto
  createTable(data);

  //Eventos
  [heightInput, weightInput].forEach((el) => {
      el.addEventListener("input", (e) => {
        const updatedValue = validDigits(e.target.value);

         e.target.value = updatedValue;

       }); 
  });

  //Conversão de numeros para interios e replace de , e .
  calcBtn.addEventListener("click", (e) => {
    e.preventDefault();
  
    const weight = +weightInput.value.replace(",", ".");
    const height = +heightInput.value.replace(",", ".");
  
    console.log(weight, height);
  
    if (!weight || !height) return;
  
    //A ordem importa!!!!!!!
    const imc = calcImc(weight, height);
   
    let info;

    data.forEach((item) => {
      if (imc >= item.min && imc <= item.max) {
        info = item.info;
      }
    });

    console.log(info);

    if (!info) return;

    imcNumber.innerText = imc
    imcinfo.innerText = info

    switch(info) {
      case "Magreza":
        imcNumber.classList.add("low");        
        imcinfo.classList.add("low");
        break;        
      case "Normal":
        imcNumber.classList.add("good");        
        imcinfo.classList.add("good");
        break;        
      case "Sobrepeso":
        imcNumber.classList.add("low");        
        imcinfo.classList.add("low");
        break;        
      case "Obesidade":
        imcNumber.classList.add("medium");        
        imcinfo.classList.add("medium");
        break;        
      case "Obesidade grave":
        imcNumber.classList.add("high");        
        imcinfo.classList.add("high");
        break;        
    }

    showOrdeResults();

  });

  clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
  
    cleanInputs();
  });



  backBtn.addEventListener("click", () => {
    cleanInputs();
    showOrdeResults();
  })