// Seleção dos elementos do DOM
const cepInput = document.getElementById('cep');
const ruaInput = document.getElementById('rua');
const bairroInput = document.getElementById('bairro');
const cidadeInput = document.getElementById('cidade');
const ufInput = document.getElementById('uf');
const message = document.getElementById('message');
const loading = document.getElementById('loading'); // Novo seletor

// Função para preencher os campos
const preencherFormulario = (endereco) => {
    ruaInput.value = endereco.logradouro;
    bairroInput.value = endereco.bairro;
    cidadeInput.value = endereco.localidade;
    ufInput.value = endereco.uf;
}

// Função para limpar o formulário
const limparFormulario = () => {
    ruaInput.value = '';
    bairroInput.value = '';
    cidadeInput.value = '';
    ufInput.value = '';
    message.classList.add('hidden');
    cepInput.classList.remove('border-red-500');
}

// Função para alternar o estado de carregamento
const toggleLoading = (isLoading) => {
    if (isLoading) {
        loading.classList.remove('hidden');
        cepInput.disabled = true; // Desabilita o input enquanto carrega
        cepInput.classList.add('bg-gray-100'); // Feedback visual de desabilitado
    } else {
        loading.classList.add('hidden');
        cepInput.disabled = false;
        cepInput.classList.remove('bg-gray-100');
    }
}

const pesquisarCep = () => {
    limparFormulario();
    const cep = cepInput.value.replace(/\D/g, '');

    if (cep.length !== 8) {
        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    // 1. Inicia o Loading
    toggleLoading(true);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                mostrarErro();
            } else {
                preencherFormulario(data);
            }
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
            mostrarErro();
        })
        .finally(() => {
            toggleLoading(false);
        });
}

const mostrarErro = () => {
    message.classList.remove('hidden');
    cepInput.classList.add('border-red-500');
}

cepInput.addEventListener('blur', pesquisarCep);