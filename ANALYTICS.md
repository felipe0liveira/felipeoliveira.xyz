# Google Analytics Utility

Este utilitário fornece uma implementação simples e eficiente para integrar o Google Analytics em projetos Next.js sem a necessidade de bibliotecas externas.

## Funcionalidades

- ✅ Injeção automática do script do Google Analytics
- ✅ Tracking automático de mudanças de página
- ✅ Tracking de eventos customizados
- ✅ Verificação se o Analytics está carregado
- ✅ TypeScript support completo
- ✅ Sem dependências externas

## Configuração

### 1. ID de Tracking

O ID de tracking está configurado no arquivo `src/utils/analytics.ts`:

```typescript
export const GA_TRACKING_ID = 'G-JPZH84LFP7'
```

### 2. Inicialização Automática

O Google Analytics é inicializado automaticamente no `_app.tsx` e tracking de páginas é feito automaticamente em mudanças de rota.

## Como Usar

### Tracking de Eventos

Para rastrear eventos customizados em qualquer componente:

```typescript
import { trackEvent } from '@/utils'

// Exemplo básico
trackEvent('button_click', 'user_interaction', 'header_menu')

// Com valor numérico
trackEvent('download', 'file_interaction', 'resume_pdf', 1)

// Tracking de links externos
<a 
  href="https://example.com" 
  onClick={() => trackEvent('external_link_click', 'navigation', 'example_site')}
>
  Link Externo
</a>
```

### Verificar se Analytics está Carregado

```typescript
import { isAnalyticsReady } from '@/utils'

if (isAnalyticsReady()) {
  // Analytics está carregado e pronto para uso
  trackEvent('feature_used', 'analytics', 'ready_check')
}
```

### Tracking Manual de Páginas

```typescript
import { trackPageView } from '@/utils'

// Normalmente não é necessário, pois o tracking é automático
trackPageView('/custom-page')
```

## Funcionalidades Implementadas

### `injectGoogleAnalytics()`
- Injeta o script do Google Analytics no documento
- Verifica se já foi carregado para evitar duplicação
- Inicializa o `dataLayer` e função `gtag`
- Configura o tracking ID

### `trackPageView(url: string)`
- Registra visualizações de página
- Usado automaticamente nas mudanças de rota

### `trackEvent(action, category, label?, value?)`
- Registra eventos customizados
- Parâmetros:
  - `action`: Ação do evento (ex: 'click', 'download')
  - `category`: Categoria do evento (ex: 'button', 'link')
  - `label`: Rótulo opcional (ex: 'header_menu')
  - `value`: Valor numérico opcional

### `isAnalyticsReady()`
- Verifica se o Google Analytics está carregado
- Retorna `boolean`

## Exemplos de Eventos Implementados

1. **Detecção de Idioma**: Rastreia o idioma preferido do usuário
2. **Links Externos**: Rastreia cliques em links para LinkedIn e GitHub
3. **Navegação**: Tracking automático de mudanças de página

## Script Original do Google Analytics

O utilitário replica a funcionalidade do seguinte script:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-JPZH84LFP7"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-JPZH84LFP7');
</script>
```

## Vantagens desta Implementação

1. **Sem bibliotecas externas**: Reduz o bundle size
2. **TypeScript nativo**: Type safety completo
3. **Controle total**: Flexibilidade para customizações
4. **Performance**: Carregamento lazy do script
5. **SSR friendly**: Funciona corretamente com Next.js

## Estrutura de Arquivos

```
src/utils/
├── analytics.ts      # Utilitário principal do Google Analytics
├── index.ts         # Exports das funções
└── ...

src/pages/
├── _app.tsx         # Inicialização do Analytics
└── index.tsx        # Exemplos de tracking de eventos
```
