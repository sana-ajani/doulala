# Dockerfile
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all app code
COPY . .

# Expose port 8080 for Firebase App Hosting
EXPOSE 8080

# Command to run FastAPI server
CMD ["uvicorn", "main:Lala_API", "--host", "0.0.0.0", "--port", "8080"]
