# BlaJet · aplicación de demostración

Marketplace de aviación privada con tres formas de volar: **charter a medida**, **empty legs** y **pooling**.
Aplicación completa en Next.js (App Router) + TypeScript + Tailwind, con datos simulados realistas y todos los
flujos funcionando de principio a fin. Pensada para presentarse en directo ante un inversor.

---

## 1. Estructura del proyecto

```
app/
  page.tsx                  Home editorial: hero, buscador, banda de precios, modalidades, mapa, calculadora, confianza
  cotizar/                  Flujo de cotización: solicitud → 3 ofertas escalonadas → detalle → checkout
  empty-legs/               Listado con filtros + alerta de ruta
  empty-legs/[id]/          Detalle del vuelo: compra por plaza o completo, sistema de ofertas al operador
  pools/                    Listado de pools + creación de un pool nuevo
  pools/[id]/               Detalle del pool: quién va, chat, y precio por plaza que baja en directo
  cuenta/                   Panel de usuario: reservas, pools, alertas, wallet, verificación KYC
  investors/                Dashboard de métricas de negocio (no indexado)
  como-funciona/ faq/ black/ operadores/ nosotros/ contacto/ legal/
  opengraph-image.tsx       Imagen para redes, generada en el propio despliegue
  not-found.tsx             404 con voz de marca
  globals.css               Tokens de color, animaciones y utilidades

components/                 Header, Footer, Logo, ui (botones, tarjetas, precios, estados vacíos),
                            SearchPanel, AirportPicker, EmptyLegCard, PoolCard, Checkout, Countdown,
                            Counter, NetworkMap, RouteArc, SavingsBar, SavingsCalculator, Silhouette, Stepper

data/                       ← AQUÍ SE EDITAN LOS DATOS DE LA DEMO
  airports.ts               16 aeropuertos con coordenadas; calcula distancias reales (haversine)
  aircraft.ts               6 categorías (€/km, CO₂/km, alcance, plazas) y 9 aeronaves con matrícula
  operators.ts              3 operadores con AOC, flota, políticas de cancelación y de venta por asiento
  emptyLegs.ts              9 vuelos vacíos. `hoursFromNow` es la salida relativa a "ahora"
  pools.ts                  4 pools (sobre charter y de plazas cedidas) con pasajeros, reglas y chat
  quotes.ts                 Motor determinista que genera las 3 cotizaciones y los extras
  demoUser.ts               Carlos M., BlaJet Black: wallet, miles, historial y alertas
  metrics.ts                Cifras del dashboard de inversores
  faq.ts                    Preguntas frecuentes por categorías

lib/                        format.ts (euros, fechas, cuentas atrás), store.tsx (estado de la demo), useMounted.ts
i18n/                       config.ts + es.ts — estructura lista para añadir inglés
public/fonts/               Fraunces e Inter autoalojadas: el despliegue no depende de servicios externos
```

**Para retocar la demo antes de la presentación, todo está en `/data`.** Los precios, las rutas, los nombres de los
operadores y las cifras del dashboard son coherentes entre sí: si cambias un precio en `emptyLegs.ts`, revisa la banda
de la home en `app/page.tsx` (constante `ladder`) y las cifras de `metrics.ts`.

Las salidas de vuelos se expresan en **horas desde ahora** (`hoursFromNow`), así que las cuentas atrás siempre están
vivas, se enseñe la demo hoy o dentro de tres meses.

---

## 2. Modo demo

Precarga un usuario logueado (**Carlos M., miembro BlaJet Black**) con historial: 2 reservas pasadas, 1 pool activo,
4.820 € en el wallet, 18.400 Miles, 2 alertas y verificación KYC completada.

Dos formas de activarlo:

1. **Añadiendo `?demo=1` a cualquier URL** — por ejemplo `https://…/?demo=1`. Este parámetro **siempre gana** sobre lo
   que hubiera guardado en el navegador, así que garantiza un arranque limpio en directo. Es la forma recomendada.
2. Desde **`/cuenta` → pestaña Verificación → "Cargar cuenta demo"**. Ahí mismo está **"Reiniciar todo"**, que borra el
   estado y deja la aplicación como recién visitada.

El estado (reservas, pools a los que te has unido, alertas, wallet) se guarda en el navegador. Si has ensayado la demo,
abre la URL con `?demo=1` antes de empezar y estará todo en su sitio.

---

## 3. Sistema de diseño

**Color** — tokens en variables CSS (`app/globals.css`), mapeados a Tailwind en `tailwind.config.ts`:

| Token | Oscuro (por defecto) | Uso |
|---|---|---|
| `ink` | `#0A0B0F` | Fondo general |
| `surface` | `#101219` | Secciones y tarjetas |
| `raised` | `#171A22` | Campos de formulario y superficies elevadas |
| `line` | `#262A33` | Bordes y separadores de 1 px |
| `primary` | `#F2F1ED` | Texto principal (blanco roto cálido) |
| `muted` / `faint` | `#9A9DA6` / `#63666E` | Texto secundario y terciario |
| `champagne` | `#C9A961` | Acento: solo CTAs primarios y cifras clave |
| `good` / `warn` | `#7FA98B` / `#C4623F` | Confirmaciones y avisos |

Modo claro con `data-theme="light"` en `<html>` (blanco roto `#F5F2EC`); lo alterna el interruptor del header.

**Tipografía** — **Fraunces** para titulares, con los ejes ópticos activados (`SOFT`, `WONK`, `opsz`), e **Inter** para
interfaz y cuerpo. Ambas autoalojadas en `public/fonts` y cargadas con `next/font/local`. Escala propia:
`display1` / `display2` / `display3` con `clamp()`, y `eyebrow` en versalitas con tracking amplio.

**Reglas** — radios sutiles (3–10 px, nunca "pill" en tarjetas); espaciado en escala de 4/8; sombras de una sola
dirección; todos los números con `font-variant-numeric: tabular-nums` (clase `.num`); cifra grande y unidad pequeña en
color secundario; gráficos monocromos con un único acento champán.

**Movimiento con propósito** — las 3 cotizaciones entran escalonadas (1,6 / 2,1 / 2,6 s); el precio del pool baja con
contador animado y pulso en la tarjeta; la cuenta atrás cambia de color al acercarse la salida (neutro → champán →
alerta a menos de 6 h); contadores animados al entrar en pantalla; skeletons con shimmer. Todo se desactiva con
`prefers-reduced-motion`, y el foco de teclado es visible en champán.

**Sin fotografía de stock**: las aeronaves son ilustraciones de línea propias (`components/Silhouette.tsx`) y el mapa
es un SVG animado sin dependencias externas.

---

## 4. Añadir inglés

`i18n/config.ts` declara los idiomas y el diccionario. Para añadir inglés: duplica `i18n/es.ts` como `i18n/en.ts`
manteniendo las claves, regístralo en `dictionaries` y añade `en` a `locales`. El header ya consume el diccionario;
el resto de páginas se migran clave a clave sin tocar la estructura.

---

## 5. Puesta en marcha

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # compilación de producción
```

---

## 6. Guion de demo · 5 minutos

Abre siempre con **`/?demo=1`** y el navegador a pantalla completa.

### Minuto 0 – 1 · La tesis
**Pantalla:** `/?demo=1`

- Deja el hero unos segundos. **Frase:** «BlaJet es un marketplace de aviación privada. Tres formas de volar, la misma
  red de operadores certificados.»
- Baja a la banda **Madrid → Ibiza, el mismo jueves**. Señala las tres cifras: **12.400 € / 6.900 € / 1.850 € por plaza**.
  **Frase clave:** «El mismo trayecto, el mismo jueves, tres precios. Ahí está el negocio: no vendemos aviones, vendemos
  acceso.»
- Sigue bajando hasta el mapa de red. **Frase:** «Esto es lo que hay volando ahora mismo: las líneas doradas son pools
  llenándose.»

### Minuto 1 – 2 · Charter: tres ofertas en directo
**Pantalla:** clic en **Cotizar** (arriba)

- Ruta ya precargada Madrid → Ibiza. Sube pasajeros a **6**, elige **Midsize**, marca el extra **Catering**.
- Pulsa **Pedir cotización** y **no hables durante tres segundos**: las tres ofertas entran escalonadas sobre sus
  skeletons. **Frase:** «La solicitud sale a la vez a todos los operadores con flota disponible. Esto es tiempo real.»
- Señala los distintivos *Mejor precio* y *Avión más reciente*, y el tiempo de respuesta de cada operador.
- Abre **Ver detalle** de la primera. **Frase:** «Avión concreto, matrícula, año y la política de cancelación del
  operador antes de pagar. Nada de "consulte disponibilidad".»

### Minuto 2 – 3 · Empty legs y la puja
**Pantalla:** **Empty legs** → abre **Madrid → Ibiza**

- Antes de entrar, señala en el listado la **cuenta atrás en rojo** del vuelo Palma → Barcelona. **Frase:** «Un empty
  leg bueno dura horas. Por eso la membresía Black da 24 h de ventaja.»
- Dentro del vuelo: cambia a **Avión entero**, mira la barra de ahorro (**−44 % frente al charter**).
- En **haz tu oferta**, escribe **5.200** y envía. Espera el rechazo. **Frase clave:** «El operador dice que no, y te
  dice por qué: por debajo de 5.900 € no le sale a cuenta volar. Un marketplace honesto también sabe decir que no.»
- Pulsa **Ofrecer 5.900 €** y vuelve a enviar: aceptada. Cierra sin pagar.

### Minuto 3 – 4 · Pooling: el precio baja mientras hablas
**Pantalla:** **Pooling** → abre **Madrid → Ibiza**

- Entra y **quédate en la página**: a los nueve segundos entra Nadia B., el precio por plaza baja con el contador y la
  tarjeta hace un pulso. **Frase clave:** «Acaba de entrar alguien. El precio no baja para ella: baja para todos. Ese
  es el efecto red que hace que el pooling crezca solo.»
- Sube tus plazas a **2** y muestra cómo cambia la simulación. Pulsa **Unirme al pool** y confirma el pago.

### Minuto 4 – 5 · Cuenta y números
**Pantalla:** **Mi cuenta**

- Pestaña **Reservas**: ahí está el vuelo que acabas de pagar, junto al historial. Pasa por **Wallet**. **Frase:** «Si
  cancela el operador, el dinero vuelve como crédito inmediato, no como una promesa a 30 días.»

**Pantalla:** `/investors` (cierre)

- Cifras de cabecera: GMV del último mes, revenue, crecimiento y LTV/CAC.
- Señala el gráfico de GMV. **Frase de cierre:** «El charter paga las facturas, pero el pooling es lo que crece:
  ticket más bajo, take rate más alto —15 % frente al 8 %— y un CAC de 94 € porque los usuarios se traen a sus propios
  acompañantes. Ese es el motor.»

**Preguntas que van a caer y dónde responderlas**
- *¿Es legal vender asientos sueltos?* → distintivo y aviso en el detalle de cualquier empty leg; detalle en `/faq`.
- *¿Y el pooling?* → compartición de gastos, avisado en `/pools` y en `/legal`.
- *¿Quién asume el vuelo?* → `/legal` y ficha de operador: BlaJet no explota aeronaves.
- *¿Cómo captáis operadores?* → `/operadores`, panel B2B con solicitudes entrantes.
