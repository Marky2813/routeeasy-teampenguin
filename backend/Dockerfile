FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn

COPY . .

EXPOSE 8080

# 1 worker + threads: each SSE connection holds a thread without blocking others
CMD ["gunicorn", "--bind", "0.0.0.0:8080", \
     "--workers=1", "--worker-class=gthread", "--threads=8", \
     "--timeout=3600", "app:app"]