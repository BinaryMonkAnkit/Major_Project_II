# import os
# import uuid
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.core.files.storage import default_storage
# from django.conf import settings
# from .document_processing_service import DocumentProcessingService
# from .chatting import DocumentChat
# from django.shortcuts import render

# MEDIA_ROOT = settings.MEDIA_ROOT

# sessions = {}  # Dictionary to track session files

# def index(request):    
#     return render(request, 'index.html')

# @csrf_exempt
# def upload_document(request):
#     if request.method == 'POST' and request.FILES.get('document'):
#         session_id = str(uuid.uuid4())  # Unique ID for each session
#         uploaded_file = request.FILES['document']
#         file_path = default_storage.save(f"temp/{session_id}/{uploaded_file.name}", uploaded_file)

#         processor = DocumentProcessingService(file_path, session_id)
#         text_file = processor.extract_text()
#         tables = processor.extract_tables()

#         sessions[session_id] = {"text_file": text_file, "tables": tables}

#         return JsonResponse({"session_id": session_id, "tables": tables})

#     return JsonResponse({"error": "No document uploaded"}, status=400)


# @csrf_exempt
# def query_document(request):
#     if request.method == 'POST':
#         session_id = request.POST.get("session_id")
#         query = request.POST.get("query")

#         if session_id not in sessions:
#             return JsonResponse({"error": "Session not found"}, status=400)

#         chat_bot = DocumentChat(session_id, MEDIA_ROOT)
#         response_text = chat_bot.search_text(query)

#         return JsonResponse({"response": response_text})

#     return JsonResponse({"error": "Invalid request"}, status=400)


# @csrf_exempt
# def cleanup_session(request):
#     if request.method == 'POST':
#         session_id = request.POST.get("session_id")

#         if session_id in sessions:
#             processor = DocumentProcessingService("", session_id)
#             processor.cleanup()
#             del sessions[session_id]

#             return JsonResponse({"message": "Session data cleaned up."})

#     return JsonResponse({"error": "Session not found"}, status=400)


import os
import uuid
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.conf import settings
from .DocumentProcessingService import DocumentProcessingService
from .chatting import DocumentChat
from django.shortcuts import render
import logging
import tempfile
from django.http import HttpResponse
import json

MEDIA_ROOT = settings.MEDIA_ROOT

sessions = {}  # Dictionary to track session files

def index(request):
    return render(request,"index.html")

@csrf_exempt
def process_document(request):
    if request.method == 'POST' and request.FILES.get('document'):
        session_id = str(uuid.uuid4())  # Unique ID for each session
        uploaded_file = request.FILES['document']
        file_path = default_storage.save(f"temp/{session_id}/{uploaded_file.name}", uploaded_file)

        # Log the file path to check if the file is saved correctly
        logging.info(f"File saved at: {file_path}")
        full_file_path = default_storage.path(file_path)
        logging.info(f"Full file path: {full_file_path}")
        
        if not os.path.exists(full_file_path):
            logging.error(f"File does not exist: {full_file_path}")
            return HttpResponse("File upload failed", status=500)

        processor = DocumentProcessingService(full_file_path, session_id)
        text_file = processor.extract_text()
        tables = processor.extract_tables()

        sessions[session_id] = {"text_file": text_file, "tables": tables}
        return JsonResponse({"session_id": session_id, "tables": tables})
    return HttpResponse("Invalid request", status=400)





@csrf_exempt
def query_document(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)  # Parse JSON data from request
            session_id = data.get("session_id")
            query = data.get("query")

            if not session_id or session_id not in sessions:
                return JsonResponse({"error": "Session not found"}, status=400)

            chat_bot = DocumentChat(session_id, MEDIA_ROOT)
            response_text = chat_bot.search_text(query)

            return JsonResponse({"response": response_text})
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)

    return JsonResponse({"error": "Invalid request"}, status=400)

