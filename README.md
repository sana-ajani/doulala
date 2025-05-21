# Doulala - Medical Assistant API

A specialized medical assistant API focusing on pregnancy support and guidance, built with FastAPI and modern web technologies.

## Project Overview

Doulala is a comprehensive medical assistant platform that provides pregnancy-related guidance and support. The project combines a FastAPI backend with a modern TypeScript/React frontend, utilizing OpenAI's language models for intelligent responses.

## Project Structure

```
.
├── mega_app/                    # Main application directory
│   ├── src/                    # Frontend source code
│   ├── backend_functions/      # Backend API functions
│   ├── doulala/               # Core application logic
│   ├── Doulala_VectorStore/   # Vector store for embeddings
│   └── Doulala_Docs/          # Documentation and knowledge base
├── main.py                     # Main application entry point
├── requirements.txt            # Python dependencies
└── config.py                   # Configuration settings
```

## Key Components

### Backend Components
- **FastAPI Application**: Main API server handling requests and responses
- **Vector Store**: Stores and manages embeddings for efficient information retrieval
- **Knowledge Base**: Contains medical information and pregnancy-related content
- **Backend Functions**: Specialized functions for handling medical queries and responses

### Frontend Components
- **React/TypeScript Application**: Modern web interface
- **Tailwind CSS**: Styling and UI components
- **Vite**: Build tool and development server

## Current Objectives
1. Implement robust medical query handling
2. Enhance response accuracy for pregnancy-related questions
3. Improve vector store efficiency
4. Expand knowledge base coverage
5. Optimize API response times

## Setup Instructions

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <your-repo-name>
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows, use: venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Install Node.js dependencies:
```bash
cd mega_app
npm install
```

5. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```
     OPENAI_API_KEY=your-api-key-here
     MODEL_NAME=gpt-3.5-turbo
     TEMPERATURE=0.3
     ```

6. Run the development server:
```bash
# Terminal 1 - Backend
python main.py

# Terminal 2 - Frontend
cd mega_app
npm run dev
```

## Environment Variables

Required environment variables:
- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `MODEL_NAME`: The model to use (default: "gpt-3.5-turbo")
- `TEMPERATURE`: Model temperature (default: 0.3)

## Dependencies

### Python Dependencies
- FastAPI (0.115.12)
- Uvicorn (0.34.2)
- LangChain (0.3.25)
- OpenAI (1.79.0)
- Pydantic (2.11.4)
- And more (see requirements.txt)

### Node.js Dependencies
- React
- TypeScript
- Tailwind CSS
- Vite
- And more (see package.json)

## Security Notes

- Never commit `.env` files or API keys to version control
- Keep API keys secure and rotate them regularly
- Use environment variables for all sensitive information
- Follow security best practices for medical data handling

## Known Issues and Error Messages

### Local Development Issues
- Vector store initialization errors may occur if the store directory is not properly set up
- API rate limiting may affect response times during high traffic
- Memory usage may spike during large knowledge base operations

### Google Cloud Deployment Issues
The application is currently experiencing deployment issues on Google Cloud Run. We have attempted deployment through both the command line and the Google Cloud Console interface.

#### Deployment Attempts

1. **Command Line Deployment**
   ```bash
   gcloud functions deploy doulala-api \
     --gen2 \
     --runtime=python312 \
     --trigger-http \
     --allow-unauthenticated \
     --source=. \
     --region=us-central1 \
     --entry-point=doulala
   ```

2. **Google Cloud Console Deployment**
   - Attempted deployment through the Google Cloud Console web interface
   - Used the same configuration parameters as the command line deployment

#### Error Message
```
Creating service douala--version1--us--central1--doulala--api in europe-west1
Revision 'douala--version1--us--central1--doulala--api-00001-nfk' is not ready and cannot serve traffic. 
The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout.
```

The error indicates that the container is failing to start and listen on the required port (8080) within the allocated timeout period. This is a critical issue that prevents the service from becoming operational.

For more detailed troubleshooting, refer to the [Google Cloud Run Troubleshooting Guide](https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start).

## GitHub Deployment

To push your updates to a branch on GitHub, use the following commands:

```bash
# Create and switch to a new branch (if you haven't already)
git checkout -b feature/your-branch-name

# Add all changes to staging
git add .

# Commit your changes with a descriptive message
git commit -m "Update README with deployment issues and troubleshooting"

# Push the branch to GitHub
git push origin feature/your-branch-name
```

If you're updating an existing branch:

```bash
# Switch to your existing branch
git checkout your-branch-name

# Add all changes to staging
git add .

# Commit your changes
git commit -m "Update README with deployment issues and troubleshooting"

# Push updates to the branch
git push origin your-branch-name
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

[Your License Here]

## Contact

[Your Contact Information]

## API Usage

The API provides endpoints for interacting with the Doulala medical assistant. See the API documentation for details. 