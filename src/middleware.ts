import { NextResponse, type NextRequest } from "next/server";

// Link de proposta com prazo — desativa-se sozinho, sem intervenção manual.
// Padrão reutilizável: copiar este ficheiro para outros protótipos "-siklab"
// e só ajustar EXPIRES_AT.
const EXPIRES_AT = new Date("2026-09-24T23:59:59+01:00");

const EXPIRED_HTML = `<!doctype html>
<html lang="pt">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Proposta expirada — Sik-Lab</title>
<style>
  html, body { height: 100%; margin: 0; }
  body {
    display: flex; align-items: center; justify-content: center;
    background: #0a0808; color: #f2ece7;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
    text-align: center; padding: 24px;
  }
  main { max-width: 440px; }
  h1 { font-size: 1.4rem; margin-bottom: 12px; }
  p { color: #a89f98; line-height: 1.6; margin-bottom: 8px; }
  a { color: #e5484d; text-decoration: none; }
  a:hover { text-decoration: underline; }
</style>
</head>
<body>
  <main>
    <h1>Esta pré-visualização já não está disponível</h1>
    <p>Este era um protótipo de proposta com acesso temporário e o prazo já terminou.</p>
    <p>Se quiseres voltar a ver ou continuar a conversa, escreve para
      <a href="mailto:contacto@siklab.me">contacto@siklab.me</a>.</p>
  </main>
</body>
</html>`;

export function middleware(_req: NextRequest) {
  if (Date.now() > EXPIRES_AT.getTime()) {
    return new NextResponse(EXPIRED_HTML, {
      status: 200,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png).*)"],
};
