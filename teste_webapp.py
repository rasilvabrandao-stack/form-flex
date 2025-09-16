import requests # type: ignore
import json

WEBAPP_URL = "https://script.google.com/macros/s/AKfycbzoy5CkS4jbdFEVgvqfa9xziyup1Z9TrznPa_ppLgHOdn2l9TJKnsnDZDXjgsQZPKcv6g/exec"  # URL do deploy do Apps Script

pedido = {
    "emailCliente": "teste@cliente.com",
    "empresa": "Minha Empresa",
    "requisitante": "Raul",
    "projeto": "Projeto X",
    "itens": "Item 1, Item 2",
    "quantidade": "10",
    "observacoes": "Sem observações",
    "dataPrevista": "2025-09-15"
}

response = requests.post(
    WEBAPP_URL,
    headers={"Content-Type": "application/json"},
    data=json.dumps(pedido)
)

print(response.text)
