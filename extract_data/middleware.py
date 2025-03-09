# import os
# import tempfile
# from django.utils.deprecation import MiddlewareMixin

# class CleanupSessionFilesMiddleware(MiddlewareMixin):
#     def process_response(self, request, response):
#         session_id = request.session.session_key
#         if session_id:
#             session_dir = os.path.join(tempfile.gettempdir(), f'session_{session_id}')
#             if os.path.exists(session_dir):
#                 for root, dirs, files in os.walk(session_dir, topdown=False):
#                     for file in files:
#                         os.remove(os.path.join(root, file))
#                     for dir in dirs:
#                         os.rmdir(os.path.join(root, dir))
#                 os.rmdir(session_dir)
#         return response
