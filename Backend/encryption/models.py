# filepath: c:\Users\Anthony\Desktop\Encryption_system\Backend\encryption\models.py
from django.db import models

class Password(models.Model):
    # Campo para la contraseña original (opcional)
    original_password = models.CharField(max_length=255, blank=True, null=True)

    # Campo para la contraseña encriptada
    encrypted_password = models.TextField()

    # Campo para la fecha de creación
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Password {self.id} - Created at {self.created_at}"