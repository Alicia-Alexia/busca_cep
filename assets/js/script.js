const cepInput = document.getElementById('cep');
const ruaInput = document.getElementById('rua');
const bairroInput = document.getElementById('bairro');
const cidadeInput = document.getElementById('cidade');
const ufInput = document.getElementById('uf');
const message = document.getElementById('message');
const loading = document.getElementById('loading');

const preencherFormulario = (endereco) => {
    ruaInput.value = endereco.logradouro;
    bairroInput.value = endereco.bairro;
    cidadeInput.value = endereco.localidade;
    ufInput.value = endereco.uf;
}

const limparFormulario = () => {
    ruaInput.value = '';
    bairroInput.value = '';
    cidadeInput.value = '';
    ufInput.value = '';
    message.classList.add('hidden');
    cepInput.classList.remove('border-red-500');
}

const toggleLoading = (isLoading) => {
    if (isLoading) {
        loading.classList.remove('hidden');
        cepInput.disabled = true; 
        cepInput.classList.add('bg-gray-100'); 
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