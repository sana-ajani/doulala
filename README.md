# Doulala API

A medical assistant API specializing in pregnancy support and guidance.

## Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <your-repo-name>
```

2. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows, use: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` and add your OpenAI API key:
     ```
     OPENAI_API_KEY=your-api-key-here
     ```

5. Run the API:
```bash
python main.py
```

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `MODEL_NAME`: The model to use (default: "gpt-3.5-turbo")
- `TEMPERATURE`: Model temperature (default: 0.3)

## API Usage

The API provides endpoints for interacting with the Doulala medical assistant. See the API documentation for details.

## Security Notes

- Never commit your `.env` file to version control
- Keep your API keys secure and rotate them regularly
- Use environment variables for all sensitive information 