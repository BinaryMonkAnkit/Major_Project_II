# import os
# import ollama
# from django.conf import settings

# class DocumentChat:
#     def __init__(self, session_id, media_root):
#         """
#         Initialize the DocumentChat with session ID and media root.
#         """
#         self.session_id = session_id
#         self.text_file = os.path.join(media_root, "temp", session_id, f"{session_id}_text.txt")

#     def search_text(self, query):
#         """
#         Search the text file for relevant information and then ask Llama 3.2 directly.
#         """
#         if not os.path.exists(self.text_file):
#             return "Error: Document text not found."

#         try:
#             # Open the text file and read the content
#             with open(self.text_file, "r", encoding="utf-8") as f:
#                 text = f.read()

#             # Build a prompt using the document text and the query
#             prompt = f"Document Text: {text}\n\nUser Query: {query}\n\nAnswer:"

#             # Send the prompt to Llama 3.2 using Ollama client
#             response = self.query_llama(prompt)

#             if response:
#                 return response
#             else:
#                 return "Sorry, I couldn't find any relevant information."

#         except Exception as e:
#             return f"Error processing query: {e}"

#     def query_llama(self, prompt):
#         """
#         Query Llama 3.2 directly using Ollama client and return the response.
#         """
#         try:
#             # Query the Llama 3.2 model
#             response = ollama.chat(model="llama3.2", messages=[{"role": "user", "content": prompt}])

#             # Return the text response
#             if response and 'text' in response:
#                 return response['text']
#             else:
#                 return "No response from Llama 3.2."

#         except Exception as e:
#             print(f"Error querying Llama 3.2: {e}")
#             return "Error querying Llama 3.2."

#WORKING CODE.....

# import os
# import time
# import ollama
# from difflib import get_close_matches

# class DocumentChat:
#     def __init__(self, session_id, media_root):
#         """
#         Initialize the DocumentChat with session ID and media root.
#         """
#         self.session_id = session_id
#         self.text_file = os.path.join(media_root, "temp", session_id, f"{session_id}_text.txt")

#     def search_text(self, query):
#         """
#         Search for relevant parts of the document and then query Llama 3.2.
#         """
#         if not os.path.exists(self.text_file):
#             return {"text": "Error: Document text not found."}

#         try:
#             with open(self.text_file, "r", encoding="utf-8") as f:
#                 text_lines = f.readlines()

#             # Extract relevant lines from the document
#             relevant_text = self.extract_relevant_text(text_lines, query)

#             # Build a short prompt with only relevant text
#             prompt = f"Relevant Text: {relevant_text}\n\nUser Query: {query}\n\nAnswer:"

#             # Send the prompt to Llama 3.2
#             response = self.query_llama(prompt)

#             return {"text": response}

#         except Exception as e:
#             return {"text": f"Error processing query: {e}"}

#     def extract_relevant_text(self, text_lines, query, num_sentences=5):
#         """
#         Extracts the most relevant lines from the document text.
#         """
#         matches = get_close_matches(query, text_lines, n=num_sentences, cutoff=0.2)
#         return " ".join(matches[:num_sentences]) if matches else "No relevant text found."

#     def query_llama(self, prompt):
#         """
#         Query Llama 3.2 using Ollama client and return only the assistant's response.
#         """
#         try:
#             start_time = time.time()

#             # Query Llama 3.2 model
#             response = ollama.chat(
#                 model="llama3.2",
#                 messages=[{"role": "user", "content": prompt}]
#             )

#             print(f"Llama API Response Time: {time.time() - start_time:.2f} seconds")
#             # print(response)

#             # Extract and return only the assistant's message content
#             assistant_message = response.get("message", {}).get("content", "").strip()

#             return assistant_message if assistant_message else "No response from Llama 3.2."

#         except Exception as e:
#             print(f"Error querying Llama 3.2: {e}")
#             return "Error querying Llama 3.2."


# import os
# import time
# import ollama
# from difflib import get_close_matches

# class DocumentChat:
#     def __init__(self, session_id, media_root):
#         """
#         Initialize the DocumentChat with session ID and media root.
#         """
#         self.session_id = session_id
#         self.text_file = os.path.join(media_root, "temp", session_id, f"{session_id}_text.txt")

#     def search_text(self, query):
#         """
#         Search for relevant parts of the document and query Llama 3.2.
#         """
#         if not os.path.exists(self.text_file):
#             return {"text": "Error: Document text not found."}

#         try:
#             with open(self.text_file, "r", encoding="utf-8") as f:
#                 document_text = f.read().strip()

#             if not document_text:
#                 return {"text": "Error: Document is empty."}

#             # Use full document when user asks for a summary
#             if any(word in query.lower() for word in ["summary", "summarize", "overview"]):
#                 prompt = f"Summarize the following document:\n\n{document_text}\n\nSummary:"
#             else:
#                 # Extract relevant text if it's a specific question
#                 relevant_text = self.extract_relevant_text(document_text, query)

#                 # Ensure some context is always provided
#                 prompt = f"Document Excerpt:\n{relevant_text}\n\nUser Query: {query}\n\nAnswer:"

#             # Query Llama 3.2
#             response = self.query_llama(prompt)

#             return {"text": response}

#         except Exception as e:
#             return {"text": f"Error processing query: {e}"}

#     def extract_relevant_text(self, document_text, query, num_sentences=5):
#         """
#         Extracts the most relevant sentences from the document text.
#         """
#         text_lines = document_text.split("\n")
#         matches = get_close_matches(query, text_lines, n=num_sentences, cutoff=0.2)

#         if matches:
#             return " ".join(matches[:num_sentences])
#         else:
#             # If no close match, provide a small portion of the document
#             return " ".join(text_lines[:num_sentences])  # First few sentences as fallback

#     def query_llama(self, prompt):
#         """
#         Query Llama 3.2 using Ollama client and return only the assistant's response.
#         """
#         try:
#             start_time = time.time()

#             # Query Llama 3.2 model
#             response = ollama.chat(
#                 model="llama3.2",
#                 messages=[{"role": "user", "content": prompt}]
#             )

#             print(f"Llama API Response Time: {time.time() - start_time:.2f} seconds")

#             # Extract and return only the assistant's message content
#             assistant_message = response.get("message", {}).get("content", "").strip()

#             return assistant_message if assistant_message else "No response from Llama 3.2."

#         except Exception as e:
#             print(f"Error querying Llama 3.2: {e}")
#             return "Error querying Llama 3.2."


# Code for API request

import os
import time
import requests
from django.conf import settings



class DocumentChat:
    def __init__(self, session_id, media_root):
        """
        Initialize the DocumentChat with session ID and media root.
        """
        self.session_id = session_id
        self.text_file = os.path.join(media_root, "temp", session_id, f"{session_id}_text.txt")

    def search_text(self, query):
        """
        Search for an answer in the document using the full document text as context.
        """
        if not os.path.exists(self.text_file):
            return {"text": "Error: Document text not found."}
        try:
            # Read the full document text
            with open(self.text_file, "r", encoding="utf-8") as f:
                document_text = f.read().strip()
            if not document_text:
                return {"text": "Error: Document is empty."}

            # Construct the prompt with the full document text as context
            prompt = (
                f"Context:\n{document_text}\n\n"
                f"Question: {query}\n\n"
                f"Answer:"
            )

            # Query OpenRouter API
            response = self.query_openrouter(prompt)
            return {"text": response}
        except Exception as e:
            return {"text": f"Error processing query: {e}"}

    def query_openrouter(self, prompt):
        """
        Query OpenRouter API and return only the assistant's response.
        """
        OPENROUTER_API_KEY = settings.OPENROUTER_API_KEY 
        
        # Replace with your actual API key
        #YOUR_SITE_URL = "<YOUR_SITE_URL>"  # Optional: Replace with your site URL
        #YOUR_SITE_NAME = "<YOUR_SITE_NAME>"  # Optional: Replace with your site name

        try:
            start_time = time.time()

            # Make a POST request to the OpenRouter API
            response = requests.post(
                url="https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                    "Content-Type": "application/json",
                    #"HTTP-Referer": YOUR_SITE_URL,
                    #"X-Title": YOUR_SITE_NAME,
                },
                json={
                    "model": "qwen/qwen2.5-vl-72b-instruct:free",
                    "messages": [
                        {
                            "role": "user",
                            "content": [
                                {
                                    "type": "text",
                                    "text": prompt
                                }
                            ]
                        }
                    ],
                }
            )

            print(f"OpenRouter API Response Time: {time.time() - start_time:.2f} seconds")

            # Parse the response
            if response.status_code == 200:
                data = response.json()
                assistant_message = data.get("choices", [{}])[0].get("message", {}).get("content", "").strip()
                return assistant_message if assistant_message else "No response from OpenRouter."
            else:
                error_message = response.json().get("error", {}).get("message", "Unknown error")
                return f"Error querying OpenRouter API: {error_message}"
        except Exception as e:
            print(f"Error querying OpenRouter API: {e}")
            return "Error querying OpenRouter API."