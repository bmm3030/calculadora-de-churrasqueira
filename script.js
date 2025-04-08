// Captura o formulário e a área de resultado
const form = document.getElementById('churrascoForm');
const resultadoDiv = document.getElementById('resultado');

// Evento de submissão do formulário
form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Captura os valores dos inputs
    const adultos = parseInt(document.getElementById('adultos').value);
    const criancas = parseInt(document.getElementById('criancas').value);
    const bebedores = parseInt(document.getElementById('bebedores').value);

    // Validação simples
    if (adultos < 0 || criancas < 0 || bebedores < 0 || bebedores > adultos) {
        alert('Por favor, insira valores válidos. O número de bebedores não pode exceder o número de adultos.');
        return;
    }

    // Cálculos
    const carne = (adultos * 400) + (criancas * 200); // 400g por adulto, 200g por criança
    const acompanhamentos = (adultos * 150) + (criancas * 100); // 150g por adulto, 100g por criança
    const bebidaNaoAlcoolica = (adultos + criancas) * 600; // 600ml por pessoa
    const bebidaAlcoolica = bebedores * 2000; // 2L por adulto que bebe

    // Exibe os resultados
    document.getElementById('carne').textContent = `Carne: ${carne / 1000} kg`;
    document.getElementById('acompanhamentos').textContent = `Acompanhamentos: ${acompanhamentos / 1000} kg`;
    document.getElementById('bebidaNaoAlcoolica').textContent = `Bebidas não alcoólicas: ${bebidaNaoAlcoolica / 1000} L`;
    document.getElementById('bebidaAlcoolica').textContent = `Bebidas alcoólicas: ${bebidaAlcoolica / 1000} L`;

    // Mostra a área de resultado
    resultadoDiv.style.display = 'block';
});

// Reseta o formulário ao carregar a página
form.reset();
