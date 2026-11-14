# Testes da API — Projeto 1 (S3)

API: Loja de Bairro · entidades: Produto e Categoria · servidor: `npm run dev` em http://localhost:3000

| # | Método | URL | Body | Status obtido | Observação |
|---|---|---|---|---|---|
| 1 | POST | /disciplinas | {"nome":"Programação Web","periodo":"2026.2","professor":"João"} | 201 | |
| 2 | POST | /atividades | {"titulo":"Projeto CRUD","tipo":"TRABALHO","dataPrazo":"2026-11-20","disciplinaId":1} | 201 | |
| 3 | GET | /atividades?disciplinaId=1 | — | 200 | filtro 1:N |
| 4 | GET | /atividades/1 | — | 200 | |
| 5 | GET | /atividades/99 | — | 404 | |
| 6 | POST | /atividades | {"titulo":"Atividade inválida","tipo":"EXERCICIO","dataPrazo":"2026-11-20","disciplinaId":1} | 400 | regra: deve ser TRABALHO, PROVA ou SEMINARIO |
| 8 | PUT | /atividades/1 | 	{"titulo":"Projeto CRUD atualizado","tipo":"TRABALHO","dataPrazo":"2026-11-25","disciplinaId":1} | 200 | |
| 9 | DELETE | /atividades/1 | - | 204 | |