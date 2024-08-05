document.addEventListener('DOMContentLoaded', function() {
    const localClima = document.getElementById('clima');
    const inputCountry = document.getElementById('botarcidade');
    const searchButton = document.getElementById('srcbutton');

    const API_KEY = '1a1c9003f18f4bfdd5be91a30b5c8e08';

//pra obter minha localização
function ondeEstou() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(posicao) {
                const latitude = posicao.coords.latitude;
                const longitude = posicao.coords.longitude;
                obterClima(latitude, longitude);
            },
            //caso dê algum erro na localização
            function(erro) {
                localClima.innerHTML = `<p>Erro ao obter localização: ${erro.message}</p>`;
            }
        );
    } else {
        localClima.innerHTML = `<p> Seu navegador não suporta geolocalização.</p>`;
    }
}
//obter clima pela coordenada do usuário
function obterClima(latitude, longitude) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&appid=${API_KEY}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta da API: ' + response.statusText);
            }
            return response.json();
        })
        .then(dados => {
            mostrarClima(dados);
        })
        .catch(error => {
            localClima.innerHTML = `<p>Erro ao obter dados climáticos: ${error.message}</p>`;
        });
}

//mostrar o clima na página
    function mostrarClima(dados) {
        if (dados && dados.main && dados.weather) {
            localClima.innerHTML = `<h2>Clima em ${dados.name}</h2>
                                    <p>${dados.main.temp}ºC, ${dados.weather[0].description}</p>`;
        } else {
            localClima.innerHTML = `<p>Dados climáticos não disponíveis.</p>`;
        }
    }
//obter clima pela pesquisa da cidade
    function obterClimaPorCidade(cidade) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&lang=pt_br&appid=${API_KEY}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na resposta da API: ' + response.statusText);
                }
                return response.json();
            })
            .then(dados => {
                mostrarClima(dados);
            })
            .catch(error => {
                localClima.innerHTML = `<p>Erro ao obter dados climáticos: ${error.message}</p>`;
            });
    }

//obter o clima ao pesquisar a página
    searchButton.addEventListener('click', function() {
        const cidade = inputCountry.value.trim();
        if (cidade) {
            obterClimaPorCidade(cidade);
        }
    });
    
//obter o clima ao carregar a página
    ondeEstou();
});
