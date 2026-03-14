
# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file first to leverage Docker cache
COPY requirements.txt requirements.txt

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend application code into the container
# This includes your main.py, solvers/, etc.
COPY . .

# Make port 8080 available to the world outside this container
# The PORT environment variable will be automatically set by Cloud Run.
EXPOSE 8080

# Define environment variables. Use a default for local runs.
ENV PORT 8080

# Run the application. Gunicorn is a production-ready WSGI server.
# The command must listen on 0.0.0.0 to be reachable.
# The `main:app` refers to the `app` object in the `main.py` file.
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 main:app

