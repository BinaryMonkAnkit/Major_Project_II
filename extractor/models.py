from django.db import models

class UploadedDocument(models.Model):
    file = models.FileField(upload_to="documents/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Document {self.id}"

class ExtractionResult(models.Model):
    document = models.ForeignKey(UploadedDocument, on_delete=models.CASCADE)
    extracted_text = models.TextField()
    extracted_entities = models.JSONField()  # To store dynamic data

    def __str__(self):
        return f"Extraction Result for {self.document.id}"
