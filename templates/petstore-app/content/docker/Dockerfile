FROM registry.access.redhat.com/ubi9/python-39:1-117.1684741281

# By default, listen on port 8000
EXPOSE 8000/tcp
ENV UVICORN_PORT=8000

# Set the working directory in the container
WORKDIR /projects

# Install system dependencies for psycopg2 and asyncpg (PostgreSQL drivers)
USER root
RUN dnf install -y libpq-devel gcc python3-devel && dnf clean all
USER 1001

# Copy the content of the local src directory to the working directory
COPY . .

# Install any dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Specify the command to run on container start
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
