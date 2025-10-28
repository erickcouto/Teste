# Partiu Rota - Aplicativo React Native

Aplicativo desenvolvido com Expo e React Native para consumir conteúdos do site [partiurota.com](https://partiurota.com) e
apresentar um mapa interativo com pontos turísticos, promoções, notícias e acesso rápido ao Instagram.

## Funcionalidades

- **Mapa interativo** com Google Maps exibindo os pontos cadastrados no WordPress.
- **Feed de promoções** e **feed de notícias** carregados diretamente via API do WordPress.
- **Acesso ao Instagram** oficial da Partiu Rota.
- **Menu lateral (hambúrguer)** com atalhos para contato e informações sobre o aplicativo.

## Configuração do ambiente

1. Instale as dependências do projeto:

   ```bash
   npm install
   ```

2. Configure a chave do Google Maps no arquivo `app.json` substituindo `YOUR_GOOGLE_MAPS_API_KEY` por uma chave válida.

3. (Opcional) Ajuste os slugs de categorias em `src/config/wordpress.ts` caso o WordPress utilize identificadores diferentes
   para promoções e notícias.

4. Inicie o projeto em modo de desenvolvimento:

   ```bash
   npm run start
   ```

## Estrutura principal

- `App.tsx`: ponto de entrada que inicializa a navegação.
- `src/navigation/AppNavigator.tsx`: configuração do Drawer e das abas inferiores.
- `src/components/MapWithMarkers.tsx`: mapa com os marcadores carregados do WordPress.
- `src/services/wordpress.ts`: camada de comunicação com a API do WordPress.
- `src/screens/*`: telas principais do aplicativo.

## Observações

- As rotas da API assumem a existência de um custom post type `rotas` com campos ACF para latitude e longitude. Ajuste os
  endpoints em `src/config/wordpress.ts` se necessário.
- Substitua os assets em `assets/` pelo material oficial antes de publicar o aplicativo.

## Próximos passos sugeridos

- Configurar cache offline para os conteúdos do WordPress.
- Implementar login para liberar conteúdos exclusivos.
- Adicionar testes automatizados e monitoramento de erros.
