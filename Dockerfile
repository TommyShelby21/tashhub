# Vybereme oficiální Python image (např. verze 3.11)
FROM python:3.11-slim

# Nastavíme pracovní adresář v kontejneru
WORKDIR /app

# Zkopírujeme soubor requirements.txt do kontejneru
COPY requirements.txt .

# Nainstalujeme python závislosti
RUN pip install --no-cache-dir -r requirements.txt

# Zkopírujeme celý projekt do kontejneru
COPY . .

# Otevřeme port (ten, na kterém běží Django - většinou 8000)
EXPOSE 1000

# Nastavíme proměnné prostředí, aby Django používalo správné nastavení
ENV DJANGO_SETTINGS_MODULE=backend.production

# Spustíme Django server pomocí Gunicorn (produkční server)
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:1000"]
