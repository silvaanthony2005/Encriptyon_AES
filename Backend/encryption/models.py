# filepath: c:\Users\Anthony\Desktop\Encryption_system\Backend\encryption\models.py
from django.db import models

class Password(models.Model):
    original_password = models.CharField(max_length=255, blank=True, null=True)
    encrypted_password = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Password {self.id} - Created at {self.created_at}"