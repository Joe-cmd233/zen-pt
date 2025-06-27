const fases = [
    { nome: "Inspire", escala: 1.0, duracao: 4000 },
    { nome: "Segure", escala: 1.0, duracao: 4000 },
    { nome: "Expire", escala: 0.7, duracao: 6000 },
    { nome: "Aguarde", escala: 0.7, duracao: 2000 }
  ];
  
  let cicloAtual = 0;
  const totalCiclos = 5;
  
  function comecar() {
    cicloAtual = 0;
    executarCiclo();
  }
  
  function executarCiclo() {
    if (cicloAtual >= totalCiclos) {
      document.getElementById("fase").innerText = "Todos os ciclos concluídos.";
      return;
    }
  
    let faseIndex = 0;
    function proximaFase() {
      if (faseIndex >= fases.length) {
        cicloAtual++;
        setTimeout(executarCiclo, 500);
        return;
      }
  
      const fase = fases[faseIndex];
      document.getElementById("fase").innerText = `Ciclo ${cicloAtual + 1} – ${fase.nome}`;
  
      const clover = document.getElementById("clover");
      clover.style.transitionDuration = `${fase.duracao}ms`;
      clover.style.transform = `scale(${fase.escala})`;
  
      setTimeout(proximaFase, fase.duracao);
      faseIndex++;
    }
  
    proximaFase();
  }
  