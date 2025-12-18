## Gastos Residenciais

Backend

1. Criar banco SQLite
   GastosResidenciais\Backend\src\GastosResidenciais.Api>
   dotnet ef database update -p ../GastosResidenciais.Infrastructure -s .

2. Rodar API em modo Release
   dotnet build -c Release
   dotnet run -c Release --no-build

3. Rodar API em modo Debug
   dotnet run
   Swagger disponível em: http://localhost:5144/swagger

4. Rodar testes unitários
   GastosResidenciais\Backend\tests>
   dotnet test

---

Frontend

1. Instalar dependências
   GastosResidenciais\Frontend>
   npm install

2. Rodar em modo desenvolvimento
   npm run dev

   Disponível em: http://localhost:5173/

3. Rodar em modo produção
   npm run build
   npm run preview

   Disponível em: http://localhost:4173/

---

Resumo dos comandos

Criar banco SQLite:
dotnet ef database update -p ../GastosResidenciais.Infrastructure -s .

API Release:
dotnet build -c Release
dotnet run -c Release --no-build

API Debug:
dotnet run

Testes Backend:
dotnet test

Instalar dependências:
npm install

Frontend Dev:
npm run dev

Frontend Produção:
npm run build
npm run preview

---

🚀 Endpoints principais

- Backend Swagger: http://localhost:5144/swagger
- Frontend: http://localhost:5173/ ou http://localhost:4173/
