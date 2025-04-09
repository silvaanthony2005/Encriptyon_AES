from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Password
from .utils import generate_key, encrypt_data, decrypt_data
import json
import base64

@csrf_exempt
def encrypt_view(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        password = body.get('password')
        key_size = body.get('key_size')  # 128, 192 o 256

        if key_size not in [128, 192, 256]:
            return JsonResponse({'error': 'Invalid key size. Choose 128, 192, or 256.'}, status=400)

        # Genera la clave y encripta la contraseña
        key = generate_key(key_size)
        encrypted_password = encrypt_data(password, key)

        # Guarda en la base de datos
        Password.objects.create(
            original_password=password,
            encrypted_password=encrypted_password
        )

        return JsonResponse({
            'encrypted_password': encrypted_password,
            'key': base64.b64encode(key).decode()  # Devuelve la clave en base64
        })

@csrf_exempt
def decrypt_view(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        encrypted_password = body.get('encrypted_password')
        key = base64.b64decode(body.get('key'))  # Decodifica la clave en base64

        # Desencripta la contraseña
        try:
            decrypted_password = decrypt_data(encrypted_password, key)
            return JsonResponse({'decrypted_password': decrypted_password})
        except Exception as e:
            return JsonResponse({'error': 'Invalid decryption key or data.'}, status=400)