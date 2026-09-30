const Usuario = JSON.parse(localStorage.getItem("usuarios_cadastrados")) || [];;
const JogosFavoritos = [];

const app = document.querySelector("#app");
const botoesMenu = document.querySelectorAll("nav button");

const jogosIniciais = [
  { nome: "Elden Ring", genero: "RPG / Ação", desc: "Explore as Terras Intermédias, enfrente chefes desafiadores e descubra os segredos do Anel Prístino neste aclamado RPG de mundo aberto.", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmlI0IT2abm740DPt_3jYdTundCetiT-0UPQ4Wx2FfFLzVg8NoWdrBHgWx&s=10" },
  { nome: "Cyberpunk 2077", genero: "Ficção Científica", desc: "Um RPG de ação e aventura em mundo aberto ambientado na megalópole de Night City, onde você joga como um mercenário cibernético.", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6rqWc1WwhLnl_Sq2GP1A5WFgilKCofRE8y8seiwwt-g&s=10" },
  { nome: "Hollow Knight", genero: "Metroidvania", desc: "Explore um reino vasto e arruinado de insectos e heróis em uma jornada épica sob a cidade decadente de Dirtmouth.", imagem: "https://images.launchbox-app.com/a3c8f8f4-4147-4f84-a5af-620557c1ea98.jpg" },
  { nome: "Hades", genero: "Rogue-like", desc: "Desafie o deus dos mortos enquanto batalha para sair do Submundo do mito grego neste jogo de ação estilo hack and slash.", imagem: "https://store-images.s-microsoft.com/image/apps.48496.14093828725404571.e8c4fd85-da7e-4c33-9a85-c97c9f3eeb38.fde6f3ed-4a08-4bb8-8240-9cd19e049803" },
  { nome: "The Witcher 3 Wild Hunt", genero: "RPG / Aventura", desc: "Assuma o papel de Geralt de Rívia, um caçador de monstros mercenário, em busca da Criança da Profecia em um vasto mundo aberto.", imagem: "https://store-images.s-microsoft.com/image/apps.53717.65858607118306853.39ed2a08-df0d-4ae1-aee0-c66ffb783a34.80ba72da-abfb-4af6-81f2-a443d12fb870" },
  { nome: "Red Dead Redemption 2", genero: "Ação / Faroeste", desc: "Viva a saga de Arthur Morgan e a gangue Van der Linde em uma história épica sobre o fim da era dos fora da lei nos EUA.", imagem: "https://store-images.s-microsoft.com/image/apps.34695.68182501197884443.ac728a87-7bc1-4a0d-8bc6-0712072da93c.25816f86-f27c-4ade-ae29-222661145f1f" },
  { nome: "God of War Ragnarök", genero: "Ação / Aventura", desc: "Junte-se a Kratos e Atreus em uma jornada emocionante pelos Nove Reinos em busca de respostas antes que o Ragnarök aconteça.", imagem: "https://image.api.playstation.com/vulcan/ap/rnd/202207/1117/8YdK4x6G4L9EGpgWPkiPVj8y.png" },
  { nome: "Celeste", genero: "Plataforma", desc: "Ajude Madeline a enfrentar seus demônios internos em sua jornada até o topo da Montanha Celeste neste desafiador jogo de plataforma.", imagem: "https://upload.wikimedia.org/wikipedia/commons/6/68/Celeste_box_art_cropped.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original" },
  { nome: "Stardew Valley", genero: "Simulação / RPG", desc: "Herde a antiga fazenda do seu avô e aprenda a viver da terra, cultivar plantações e construir uma comunidade próspera.", imagem: "https://w0.peakpx.com/wallpaper/891/516/HD-wallpaper-stardew-valley-colors-game-games-jogos-pixel-prybz.jpg" },
  { nome: "Resident Evil 4 Remake", genero: "Survival Horror / Ação", desc: "Acompanhe Leon S. Kennedy em uma missão de resgate na Europa rural contra uma misteriosa seita e criaturas aterrorizantes.", imagem: "https://store-images.s-microsoft.com/image/apps.1223.13709611797065761.45da49f2-e654-4714-a48f-988ff72d9a19.694708c4-34ae-43c7-bc74-cd6d260dbee0" }
];

function marcarMenuAtivo(rota) {
  botoesMenu.forEach(botao => {
    botao.classList.toggle("ativo", botao.dataset.rota === rota);
  });
}

function irPara(rota) {
  marcarMenuAtivo(rota);

  if (rota === "inicio") mostrarInicio();
  if (rota === "cadastro") mostrarCadastro();
  if (rota === "lista") mostrarLista();
  if (rota === "jogos") mostrarJogos();
}

function mostrarInicio() {

  let jogos = '<main class="container-jogos">';

  jogosIniciais.forEach(jogo => {

    const Favorito = JogosFavoritos.includes(jogo.nome) ? "favorito" : "";

    jogos += `
        <div class="card-jogo">
            <div class="imagem-jogo">
                <img src="${jogo.imagem}" alt="${jogo.nome}" class="img-capa">
            </div>
            <div class="info-jogo">
                <div class="cabecalho-card">
                    <h3>${jogo.nome}</h3>
                    <button class="btn-favorito ${Favorito}" onclick="alternarFavorito(this, '${jogo.nome}')">♥</button>
                </div>
                <span class="genero">${jogo.genero}</span>
                <p class="descricao">${jogo.desc}</p>
            </div>
        </div>
    `;
  });

  jogos += '</main>';

  app.innerHTML = jogos;
}

function mostrarCadastro() {
  app.innerHTML = `
    <h1>Cadastrar Usuário</h1>

    <form id="formUsuario">
      <div class="campo">
        <label for="nome">Nome</label>
        <input id="nome" type="text" placeholder="Digite o nome do usuário" required />
      </div>

      <div class="campo">
        <label for="email">Email</label>
        <input id="email" type="email" placeholder="Digite o email" required />
      </div>

      <div class="campo">
        <label for="senha">Senha</label>
        <input id="senha" type="password" placeholder="Digite a senha" required />
      </div>

          <button class="botao" type="submit">Cadastrar</button>
      <div id="mensagem"></div>
    </form>
  `;

  document.querySelector("#formUsuario").addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nome = document.querySelector("#nome").value.trim();
    const email = document.querySelector("#email").value.trim();
    const senha = document.querySelector("#senha").value.trim();

    Usuario.push({
      nome,
      email,
      senha,
    });

    localStorage.setItem("usuarios_cadastrados", JSON.stringify(Usuario));

    document.querySelector("#mensagem").innerHTML =
      `<div class="mensagem">Usuário cadastrado com sucesso.</div>`;

    document.querySelector("#btnCadastrar")
      .addEventListener("click", () => irPara("cadastro"));

    document.querySelector("#btnVerUsuarios")
      .addEventListener("click", () => irPara("lista"));

    evento.target.reset();
  });
}

function mostrarLista() {
  app.innerHTML = `
    <h1>Usuários Cadastrados</h1>
    <div id="conteudoLista"></div>
  `;

  renderizarTabela();
}

function renderizarTabela() {
  const conteudo = document.querySelector("#conteudoLista");

  if (Usuario.length === 0) {
    conteudo.innerHTML = `
      <div class="vazio">
        Nenhum usuário cadastrado ainda.
      </div>
    `;
    return;
  }

  let linhas = "";

  Usuario.forEach((usuario, indice) => {
    linhas += `
      <tr>
        <td>${usuario.nome}</td>
        <td>${usuario.email}</td>
        <td>
          <button class="excluir" data-indice="${indice}">Excluir</button>
        </td>
      </tr>
    `;
  });

  conteudo.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        ${linhas}
      </tbody>
    </table>
  `;

  document.querySelectorAll(".excluir").forEach(botao => {
    botao.addEventListener("click", function () {
      const indice = Number(this.dataset.indice);
      Usuario.splice(indice, 1);

      localStorage.setItem("usuarios_cadastrados", JSON.stringify(Usuario))

      renderizarTabela();
    });
  });
}

function mostrarJogos() {
  if (JogosFavoritos.length === 0) {
    app.innerHTML = `
      <h1>Meus Favoritos</h1>
      <p class="vazio">Nenhum jogo favoritado ainda. Volte ao início e clique no coração!</p>
    `;

    return;
  }

  let itensLista = "";
  JogosFavoritos.forEach(jogo => {
    itensLista += `
    <li> Imagens do jogo <strong>${jogo}</strong></li>`;
  });

  app.innerHTML = `
    <h1>Meus Favoritos</h1>
    <main class="card-jogos">
      ${jogosIniciais.filter(jogo => JogosFavoritos.includes(jogo.nome)).map(jogo => `
        <div class="painel-jogo">
                  <img src="${jogo.imagem}" alt="${jogo.nome}">
                  <div class="info-jogo">
                  <h1>${jogo.nome}</h1>
                  <p>${jogo.desc}</p>
                 </div>
        </div>
      `).join('')}
    </main>
  `;
}

function alternarFavorito(botao, nomeJogo) {
  botao.classList.toggle('favorito');

  if (botao.classList.contains('favorito')) {

    if (!JogosFavoritos.includes(nomeJogo)) {
      JogosFavoritos.push(nomeJogo);
    }
    console.log(`${nomeJogo} adicionado aos favoritos!`);
  } else {

    const indice = JogosFavoritos.indexOf(nomeJogo);
    if (indice !== -1) {
      JogosFavoritos.splice(indice, 1);
    }
    console.log(`${nomeJogo} removido dos favoritos!`);
  }

  irPara("jogos");
}

botoesMenu.forEach(botao => {
  botao.addEventListener("click", () => {
    irPara(botao.dataset.rota);
  });
});

mostrarInicio();