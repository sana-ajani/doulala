import functions_framework
from mega_app.mega_api import handler

@functions_framework.http
def doulala(request):
    """HTTP Cloud Function that handles requests to your Doulala API."""
    return handler(request) 