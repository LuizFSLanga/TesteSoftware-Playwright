## Critérios de aceitação

| # | Critério | DADO QUE… QUANDO… ENTÃO… | Teste |
|---|---|---|---|
| C1 | Cadastrar produto | Dado que irei cadastrar um produto · Quando insiro corretamente os campos do item · Então uma mensagem de sucesso deve aparecer e produto visível na lista. | `tests/lista-compras.spec.js` — teste "adiciona um item e atualiza o resumo" |
| C2 | Impedir cadastro com campos obrigatórios vazios | Dado que irei cadastrar um produto · Quando deixo de inserir campos obrigatorios do item · Então uma mensagem de validação e o produto não deve ser visível na lista. | `tests/lista-compras.spec.js` — teste "recusa item vazio e mantém a lista intacta" |
| C3 | Manter produto após atualizar a página | Dado que o produto foi adicionado corretamente · Quando atualizo a pagina listando os produtos · Então o produto, preço e estoque devem estar visíveis após o reload. | `tests/lista-compras.spec.js` — teste "conclui um item e mantém o estado após recarregar" |