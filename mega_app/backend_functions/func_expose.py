import sys
import os

# Add the parent directory of mega_app to the Python module search path
sys.path.append(os.path.dirname(os.path.abspath(__file__)).rsplit(os.sep, 2)[0])
from mega_app.mega_api import Expose 
Expose = Expose()