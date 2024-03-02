function iniciaJogo(){
    var tempo_segundos=15;
    document.getElementById('cronometro').innerHTML = tempo_segundos;

    var qtde_meteoros= 10;
    document.getElementById('meteoros').innerHTML = " "+qtde_meteoros;
    document.getElementById('explosoes').innerHTML = " "+0;

    cria_meteoros(qtde_meteoros);
    iniciarCronometro(tempo_segundos);
}

function cria_meteoros(qtde_meteoros){
    for(var i=1;i <= qtde_meteoros;i++){
        var meteoro = document.createElement("img");
        meteoro.src='meteoro.png';
        meteoro.width="30";
        meteoro.id="m"+i;
        meteoro.onclick = function(){ 
            explodir(this);
        }
        meteoro.style.marginTop= (Math.random()*100)+'px';
        meteoro.style.marginBottom = (Math.random()*100)+'px';
        meteoro.style.marginLeft= (Math.random()*100)+'px';
        meteoro.style.marginRight = (Math.random()*100)+'px';

        document.getElementById('cenario').append(meteoro);
    }
}

var timeId;
function iniciarCronometro(segundos){
    segundos--;
    if (segundos== -1){
        clearTimeout(timeId);
        gameOver();
        return false;
    }
    document.getElementById('cronometro').innerHTML = segundos;
    timeId= setTimeout("iniciarCronometro("+segundos+")",1000);
    movimentaMeteoros();
}

function movimentaMeteoros(){
    var i=1;
    while (document.getElementById("m"+i)){
        var meteoro = document.getElementById("m"+i);
        var posicao = Math.floor(Math.random()*150);
        var posicaoAnterior = meteoro.style.get;
        meteoro.style.marginTop = posicao + "px";
        i++;
    }
}
function explodir(m){
    var idMeteoro = m.id;
    var explosao = document.createElement("img");
    explosao = "explosao.png";
    explosao.width = "40";
    document.getElementById(idMeteoro).src = explosao;
    document.getElementById(idMeteoro).setAttribute("onclick","");
    pontuacao(-1);
}
function pontuacao(pontos){
    var qtde_meteoros= document.getElementById("meteoros").innerHTML;
    var qtde_explosoes = document.getElementById("explosoes").innerHTML;

    qtde_meteoros = parseInt(qtde_meteoros);
    qtde_explosoes = parseInt(qtde_explosoes);

    qtde_meteoros = qtde_meteoros + pontos;
    qtde_explosoes = qtde_explosoes - pontos;

    document.getElementById("meteoros").innerHTML = qtde_meteoros;
    document.getElementById("explosoes").innerHTML = qtde_explosoes;
    
    situacaoJogo(qtde_meteoros);
}
function situacaoJogo(qtde_meteoros){
    if (qtde_meteoros == 0){
        clearTimeout(timeId);
        $("#cenario").removeClass("terra");
        $("#cenario").addClass("terrasalva");
        deletaMeteoros();
    }
}
function deletaMeteoros(){
    var i=1;
    while (document.getElementById("m"+1)){
        document.getElementById("m"+i).setAttribute("src","");
        i++;
    }
}
function gameOver(){
    clearTimeout(timeId);
    $("#cenario").removeClass("terra");
    $("#cenario").addClass("terradestruida");
    deletaMeteoros();
}

function start(){
    window.location.reload();
}
