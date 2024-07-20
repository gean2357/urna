// script.js
const candidatos = {
    "12": { nome: "Candidato Bob esponja", partido: "Partido A", foto: "candidatoA.jpg", cargo: "Presidente" },
    "34": { nome: "Candidato Batman", partido: "Partido Marvel", foto: "candidatoB.jpg", cargo: "Deputado" }
  };
  
  let votos = {
    "12": 0,
    "34": 0,
    "nulo": 0
  };
  
  document.getElementById('numeroCandidato').addEventListener('input', function() {
    const numero = this.value;
    const info = document.getElementById('candidatoInfo');
  
    if (candidatos[numero]) {
      info.innerHTML = `
        <p>Nome: ${candidatos[numero].nome}</p>
        <p>Partido: ${candidatos[numero].partido}</p>
        <p>Cargo: ${candidatos[numero].cargo}</p>
        <img id="candidatoFoto" src="${candidatos[numero].foto}" alt="${candidatos[numero].nome}">
      `;
    } else {
      info.innerHTML = '<p>Número inválido</p>';
    }
  });
  
  function confirmarVoto() {
    const numero = document.getElementById('numeroCandidato').value;
    if (candidatos[numero]) {
      votos[numero]++;
      tocarSomUrna();
      alert('Voto confirmado para ' + candidatos[numero].nome);
      limparVoto();
    } else {
      alert('Número inválido. Corrija ou selecione Voto Nulo.');
    }
  }
  
  function corrigirVoto() {
    limparVoto();
  }
  
  function votoNulo() {
    votos.nulo++;
    alert('Voto nulo confirmado.');
    limparVoto();
  }
  
  function limparVoto() {
    document.getElementById('numeroCandidato').value = '';
    document.getElementById('candidatoInfo').innerHTML = '';
  }
  
  function finalizarVotacao() {
    const totalVotos = votos["12"] + votos["34"] + votos["nulo"];
    const porcentagens = {
      "12": (votos["12"] / totalVotos * 100).toFixed(2),
      "34": (votos["34"] / totalVotos * 100).toFixed(2),
      "nulo": (votos["nulo"] / totalVotos * 100).toFixed(2)
    };
  
    const margemErro = calcularMargemErro(totalVotos);
  
    const resultado = `
      Resultado da Votação:
      ${candidatos["12"].nome}: ${porcentagens["12"]}% (${votos["12"]} votos)
      ${candidatos["34"].nome}: ${porcentagens["34"]}% (${votos["34"]} votos)
      Votos Nulos: ${porcentagens["nulo"]}% (${votos["nulo"]} votos)
      Margem de Erro: ±${margemErro}%
    `;
  
    document.getElementById('resultadoTexto').innerText = resultado;
  
    const ctx = document.getElementById('resultadoGrafico').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [candidatos["12"].nome, candidatos["34"].nome, 'Votos Nulos'],
        datasets: [{
          data: [porcentagens["12"], porcentagens["34"], porcentagens["nulo"]],
          backgroundColor: ['#007bff', '#dc3545', '#6c757d']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    });
  
    const modal = new bootstrap.Modal(document.getElementById('resultadoModal'));
    modal.show();
  }
  
  function calcularMargemErro(totalVotos) {
    // Fórmula simplificada para margem de erro
    return (1 / Math.sqrt(totalVotos) * 100).toFixed(2);
  }
  
  function tocarSomUrna() {
    const audio = document.getElementById('urnaSound');
    audio.play();
  }
  