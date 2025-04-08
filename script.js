// script.js
 
// Espera o DOM estar completamente carregado para executar o script
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona os elementos do DOM necessários
    const form = document.getElementById('bbq-form');
    const adultsInput = document.getElementById('adults');
    const childrenInput = document.getElementById('children');
    const drinkingAdultsInput = document.getElementById('drinkingAdults');
    const resultsDiv = document.getElementById('results');
    const resultsContainer = document.getElementById('results-container'); // Para scroll suave
    const adultsError = document.getElementById('adults-error');
    const childrenError = document.getElementById('children-error');
    const drinkingAdultsError = document.getElementById('drinkingAdults-error');
    const generalError = document.getElementById('general-error'); // Para erros gerais

    // Constantes para os cálculos (em gramas e mililitros)
    const MEAT_PER_ADULT = 400; // g
    const MEAT_PER_CHILD = 200; // g
    const SIDES_PER_ADULT = 150; // g
    const SIDES_PER_CHILD = 100; // g
    const NON_ALCOHOLIC_DRINKS_PER_PERSON = 600; // ml
    const ALCOHOLIC_DRINKS_PER_DRINKING_ADULT = 2000; // ml (2 Litros)

    // Função para limpar todas as mensagens de erro e esconder resultados anteriores
    function clearErrors() {
        adultsError.textContent = '';
        adultsError.classList.add('hidden');
        childrenError.textContent = '';
        childrenError.classList.add('hidden');
        drinkingAdultsError.textContent = '';
        drinkingAdultsError.classList.add('hidden');
        generalError.textContent = '';
        generalError.classList.add('hidden');
        resultsDiv.classList.add('hidden'); // Esconde resultados
        resultsDiv.classList.remove('visible'); // Remove classe de visibilidade para animação
        resultsDiv.innerHTML = ''; // Limpa conteúdo anterior dos resultados
    }

    // Função para exibir uma mensagem de erro específica para um campo
    function showError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }

    // Adiciona o listener para o evento de 'submit' do formulário
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o comportamento padrão de envio do formulário
        clearErrors(); // Limpa quaisquer erros ou resultados anteriores

        // --- Validação dos Inputs ---
        let isValid = true; // Flag para controlar a validade geral dos dados

        // Obtém os valores dos inputs e converte para números inteiros
        // Usa || 0 para tratar campos vazios como 0, mas a validação abaixo pegará isso se for inválido
        const adults = parseInt(adultsInput.value || '0');
        const children = parseInt(childrenInput.value || '0');
        const drinkingAdults = parseInt(drinkingAdultsInput.value || '0');

        // Valida o número de adultos
        if (isNaN(adults) || adults < 0 || adultsInput.value.trim() === '') {
            showError(adultsError, 'Por favor, insira um número válido de adultos (0 ou mais).');
            isValid = false;
        }

        // Valida o número de crianças
        if (isNaN(children) || children < 0 || childrenInput.value.trim() === '') {
            showError(childrenError, 'Por favor, insira um número válido de crianças (0 ou mais).');
            isValid = false;
        }

        // Valida o número de adultos que bebem
        if (isNaN(drinkingAdults) || drinkingAdults < 0 || drinkingAdultsInput.value.trim() === '') {
            showError(drinkingAdultsError, 'Por favor, insira um número válido de adultos que bebem (0 ou mais).');
            isValid = false;
        }

        // Validação adicional: adultos que bebem não podem ser mais que o total de adultos
        if (isValid && drinkingAdults > adults) {
             showError(drinkingAdultsError, 'O número de adultos que bebem não pode ser maior que o total de adultos.');
             isValid = false;
        }

        // Validação adicional: precisa ter pelo menos 1 pessoa
        if (isValid && adults <= 0 && children <= 0) {
            showError(generalError, 'É necessário ter pelo menos 1 adulto ou 1 criança para calcular.');
            isValid = false;
        }

        // Se qualquer validação falhou, interrompe a função aqui
        if (!isValid) {
            return;
        }

        // --- Cálculos das Quantidades ---
        const totalPeople = adults + children;

        // Cálculo da carne total em gramas e conversão para kg
        const totalMeatGrams = (adults * MEAT_PER_ADULT) + (children * MEAT_PER_CHILD);
        const totalMeatKg = (totalMeatGrams / 1000).toFixed(2); // .toFixed(2) para formatar com 2 casas decimais

        // Cálculo dos acompanhamentos totais em gramas e conversão para kg
        const totalSidesGrams = (adults * SIDES_PER_ADULT) + (children * SIDES_PER_CHILD);
        const totalSidesKg = (totalSidesGrams / 1000).toFixed(2);

        // Cálculo das bebidas não alcoólicas totais em ml e conversão para litros
        const totalNonAlcoholicMl = totalPeople * NON_ALCOHOLIC_DRINKS_PER_PERSON;
        const totalNonAlcoholicLiters = (totalNonAlcoholicMl / 1000).toFixed(2);

        // Cálculo das bebidas alcoólicas totais em ml e conversão para litros
        const totalAlcoholicMl = drinkingAdults * ALCOHOLIC_DRINKS_PER_DRINKING_ADULT;
        const totalAlcoholicLiters = (totalAlcoholicMl / 1000).toFixed(2);

        // --- Exibição dos Resultados ---
        // Monta o HTML que será inserido na div de resultados
        resultsDiv.innerHTML = `
            <p class="flex justify-between items-center">
                <span class="font-medium text-gray-700">
                    <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/beef.svg" alt="Ícone Carne" class="inline-block w-4 h-4 mr-1 align-text-bottom"/>
                    Carne:
                </span>
                <span class="text-lg font-semibold text-bbq-secondary">${totalMeatKg} kg</span>
            </p>
            <p class="flex justify-between items-center">
                <span class="font-medium text-gray-700">
                    <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/salad.svg" alt="Ícone Acompanhamentos" class="inline-block w-4 h-4 mr-1 align-text-bottom"/>
                    Acompanhamentos:
                </span>
                <span class="text-lg font-semibold text-bbq-secondary">${totalSidesKg} kg</span>
            </p>
            <p class="flex justify-between items-center">
                <span class="font-medium text-gray-700">
                    <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/cup-soda.svg" alt="Ícone Refrigerante" class="inline-block w-4 h-4 mr-1 align-text-bottom"/>
                    Bebidas não alcoólicas:
                </span>
                <span class="text-lg font-semibold text-bbq-secondary">${totalNonAlcoholicLiters} L</span>
            </p>
            ${drinkingAdults > 0 ? `
            <p class="flex justify-between items-center">
                <span class="font-medium text-gray-700">
                    <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/beer.svg" alt="Ícone Cerveja" class="inline-block w-4 h-4 mr-1 align-text-bottom"/>
                    Bebidas alcoólicas:
                </span>
                <span class="text-lg font-semibold text-bbq-secondary">${totalAlcoholicLiters} L</span>
            </p>
            ` : ''}
             <p class="text-xs text-gray-500 pt-3 text-center">*Estimativas baseadas em consumo médio. Ajuste conforme necessário.</p>
        `;

        // Torna a div de resultados visível com animação
        resultsDiv.classList.remove('hidden');
        // Força um reflow para garantir que a animação CSS funcione corretamente ao readicionar a classe
        void resultsDiv.offsetWidth;
        resultsDiv.classList.add('visible');

        // Rola a página suavemente para que a seção de resultados fique visível
        // Útil especialmente em telas menores onde o formulário ocupa mais espaço
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Nota: A inicialização dos ícones Lucide (`lucide.createIcons()`) geralmente não é
    // necessária quando se usa a versão estática carregada via <script src="..."> no HTML.
});
