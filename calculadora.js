(function readyJS (win,doc){
    'use strict'

    const display = doc.querySelector("#display")
    const tecla = doc.querySelectorAll('[id*=tecla]')
    const operadores = doc.querySelectorAll("[id*=operador]")
   
    let novoNumero = true
    let operador = "";
    let numeroAnterior="" ;

    const operacaoPendente = ()=> operador != undefined;

    const calcular  = () => {
        if (operacaoPendente()){
            let numeroAtual = parseFloat(display.textContent)
            novoNumero = true
            switch (operador){
                case ("+"):
                    atualizarDisplay(numeroAnterior + numeroAtual)
                    break;
                case  ("-"):
                    atualizarDisplay(numeroAnterior - numeroAtual)
                    break;
                case ("*"):
                    atualizarDisplay(numeroAnterior * numeroAtual)
                    break;
                case ("/"):
                    atualizarDisplay(numeroAnterior / numeroAtual)
                    break;
            } 
        }
    }
    
   const atualizarDisplay = (texto) =>{
        if (novoNumero){
            display.textContent = texto
            novoNumero = false
        }else{
            display.textContent += texto
        }
   }

    const inserirNumero = (event) => atualizarDisplay(event.target.textContent)
    tecla.forEach(tec => tec.addEventListener("click",inserirNumero))

    const selecionarOperador = (event)=> {
        if (!novoNumero){
            calcular()
            operador = event.target.textContent
            novoNumero = true
            numeroAnterior = parseFloat(display.textContent) 
        }
  }
  operadores.forEach(op => op.addEventListener("click", selecionarOperador))

    const limparTela = () => atualizarDisplay("")
    const CE =  doc.querySelector("#operadorLimparDisplay").addEventListener("click",limparTela)

    const limparCalculo = () => {
        atualizarDisplay("")
        operadores = ""
        novoNumero = true
        numeroAnterior = undefined
    }
    const C = doc.querySelector("#operadorLimparCalculo").addEventListener("click",limparCalculo)

    const adicionarDecimal = () =>{
        if(display.textContent.indexOf("." == -1)){
            if(display.textContent == ""){
                display.textContent = "0."
                novoNumero = false
            }else{
                display.textContent += "."
                novoNumero = false
            }
        }
    }
    doc.getElementById("operadorDecimal").addEventListener("click",adicionarDecimal)
    
    const inverterSinal = () =>  display.textContent =  display.textContent * -1
    doc.getElementById("operadorInverter").addEventListener("click", inverterSinal)

    const removerCaractere = ()  => display.textContent =  display.textContent.slice(0,-1)
    doc.getElementById("operadorBackspace").addEventListener("click",removerCaractere)

})(window,document);
