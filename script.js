document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('pedidoForm');
  const mensagem = document.getElementById('mensagem');
  const btnEnviar = document.getElementById('btnEnviar');

  const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzoy5CkS4jbdFEVgvqfa9xziyup1Z9TrznPa_ppLgHOdn2l9TJKnsnDZDXjgsQZPKcv6g/exec'; // Troque pela sua URL real

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Desabilita botão e muda texto para feedback
    btnEnviar.disabled = true;
    btnEnviar.textContent = 'Enviando...';
    mensagem.textContent = '';
    mensagem.style.color = '';

    // Captura e valida dados
    const dados = {
      emailCliente: form.emailCliente.value.trim(),
      empresa: form.empresa.value.trim(),
      requisitante: form.requisitante.value.trim(),
      projeto: form.projeto.value.trim(),
      itens: form.itens.value.trim(),
      quantidade: form.quantidade.value.trim(),
      observacoes: form.observacoes.value.trim(),
      dataPrevista: form.dataPrevista.value
    };

    if (
      !dados.emailCliente ||
      !dados.empresa ||
      !dados.requisitante ||
      !dados.projeto ||
      !dados.itens ||
      !dados.quantidade ||
      !dados.dataPrevista
    ) {
      mensagem.textContent = '⚠️ Por favor, preencha todos os campos obrigatórios!';
      mensagem.style.color = 'orange';
      btnEnviar.disabled = false;
      btnEnviar.textContent = 'Enviar Pedido';
      return;
    }

    try {
      const response = await fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'cors', // o correto para permitir CORS no Apps Script
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
      });

      const result = await response.json();

      if (result.status === 'success') {
        mensagem.textContent = '✅ Pedido enviado com sucesso!';
        mensagem.style.color = 'green';
        form.reset();
      } else {
        mensagem.textContent = `❌ Erro ao enviar pedido: ${result.message}`;
        mensagem.style.color = 'red';
        console.error('Erro do servidor:', result.message);
      }
    } catch (error) {
      mensagem.textContent = '❌ Falha na conexão. Tente novamente mais tarde.';
      mensagem.style.color = 'red';
      console.error('Erro:', error);
    }

    btnEnviar.disabled = false;
    btnEnviar.textContent = 'Enviar Pedido';
  });
});
