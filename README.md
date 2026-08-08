# BlaJet

Marketplace de aviacion privada. Next.js 14 + Tailwind + Recharts.
Desplegado en Vercel (proyecto ihodei-1) en https://blajet.site

## Estado actual

El codigo que estaba desplegado en Vercel contiene solo la capa compartida:
layout, Header, Footer, DemoBar, 23 componentes, datos y traducciones es/en.

No hay ninguna pagina en app/, por eso el sitio devuelve 404 en todas las rutas.
Rutas que el codigo espera y que hay que reconstruir: / (portada), /cotizar
(cotizador de charter), /empty-legs (listado), /pools (vuelos compartidos) y
/cuenta (area de usuario).

## Desarrollo

npm install y npm run dev.

Las tipografias no estan versionadas: scripts/fetch-fonts.mjs las descarga a
public/fonts/ antes de cada build.
