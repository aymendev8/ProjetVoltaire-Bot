let lesmots = {
    // "mot": "definition",
  };

function getDefinition() {
    // recuperer le mot
    let motElement = document.getElementsByClassName("qccv-question")[0];
    if (!motElement) {
      console.error("'qccv-question' introuvable");
      return;
    }
    let mot = motElement.innerText;
  
    // verifie si le mot est dans le dictionnaire
    if (lesmots[mot] !== undefined) {
      // Le mot est dans le dictionnaire donc on cherche  la bonne définition
      let proposition = document.getElementsByClassName("qc-proposal-button");
      if (!proposition || proposition.length === 0) {
        console.error("'qc-proposal-button' introuvable");
        return;
      }
      for (let i = 0; i < proposition.length; i++) {
        let def = proposition[i].innerText;
        if (def === lesmots[mot][0]) {
          proposition[i].click();
          setTimeout(() => {
            document.getElementById("btn_question_suivante").click();
          }, 1000);
          break;
        }
      }
    } else {
      // Le mot n'est pas dans le dictionnaire donc on le rajoute
      lesmots[mot] = [];
      document.getElementsByClassName("qc-proposal")[0].getElementsByClassName("qc-proposal-button")[0].click();
      let defElement = document.getElementsByClassName("qc-proposal correct locked")[0];
      if (!defElement) {
        console.error("'qc-proposal correct locked' introuvable");
        return;
      }
      let def = defElement.innerText;
      lesmots[mot].push(def);
      setTimeout(() => {
        document.getElementById("btn_question_suivante").click();
      }, 1000);
    }
  }
  let interval = setInterval(function() {
    if (document.getElementsByClassName("trainingEndViewDiv").length === 0) {
      getDefinition();
    } else {
      clearInterval(interval);
      console.log(lesmots);
      document.getElementsByClassName("trainingEndViewDiv")[0].getElementsByID("btn_apprentissage_autres_niveaux").click();
    }
  }, 3000); // 3 secondes