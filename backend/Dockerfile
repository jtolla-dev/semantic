FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy project files
COPY pyproject.toml .
COPY alembic.ini .
COPY alembic/ alembic/
COPY app/ app/

# Install Python dependencies
RUN pip install --no-cache-dir .

# Expose port
EXPOSE 8000

# Run the API server
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
