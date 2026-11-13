# Critérios de aceitação — Cadastro de produtos

O sistema representa o painel de um vendedor de uma loja de eletrônicos. Cada produto deve possuir nome, preço e quantidade em estoque. Os dados cadastrados são armazenados no navegador para permanecerem disponíveis após atualizar a página.

| # | Critério | DADO QUE… QUANDO… ENTÃO… | Teste automatizado |
|---|---|---|---|
| C1 | Cadastrar produto | Dado que o vendedor está na tela de cadastro · Quando preenche corretamente nome, preço e estoque e seleciona **Cadastrar produto** · Então uma mensagem de sucesso deve aparecer e o produto, seu preço e seu estoque devem ficar visíveis na lista. | `tests/lista-compras.spec.js` — `adiciona um produto e atualiza o resumo` |
| C2 | Impedir cadastro com campos obrigatórios vazios | Dado que o vendedor está na tela de cadastro · Quando deixa um ou mais campos obrigatórios sem preenchimento e tenta cadastrar · Então uma mensagem de validação deve aparecer e nenhum produto deve ser incluído na lista. | `tests/lista-compras.spec.js` — `recusa cadastro com campos obrigatórios vazios e mantém a lista intacta` |
| C3 | Manter produto após atualizar a página | Dado que um produto foi cadastrado corretamente · Quando o vendedor atualiza a página · Então o nome do produto, o preço e a quantidade em estoque devem continuar visíveis. | `tests/lista-compras.spec.js` — `mantém produto, preço e estoque após recarregar a página` |
