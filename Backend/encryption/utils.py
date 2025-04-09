from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import padding
from cryptography.hazmat.backends import default_backend
import os
import base64

def generate_key(key_size):
    """Genera una clave de tamaño especificado (128, 192 o 256 bits)."""
    return os.urandom(key_size // 8)

def encrypt_data(data, key):
    """Encripta los datos usando AES en modo CBC."""
    # Genera un vector de inicialización (IV)
    iv = os.urandom(16)

    # Crea el cifrador AES
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())

    # Rellena los datos para que sean múltiplos del tamaño del bloque
    padder = padding.PKCS7(algorithms.AES.block_size).padder()
    padded_data = padder.update(data.encode()) + padder.finalize()

    # Encripta los datos
    encryptor = cipher.encryptor()
    encrypted_data = encryptor.update(padded_data) + encryptor.finalize()

    # Devuelve los datos encriptados junto con el IV, codificados en base64
    return base64.b64encode(iv + encrypted_data).decode()

def decrypt_data(encrypted_data, key):
    """Desencripta los datos encriptados usando AES en modo CBC."""
    # Decodifica los datos en base64
    encrypted_data = base64.b64decode(encrypted_data)

    # Extrae el IV y los datos encriptados
    iv = encrypted_data[:16]
    encrypted_data = encrypted_data[16:]

    # Crea el cifrador AES
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())

    # Desencripta los datos
    decryptor = cipher.decryptor()
    padded_data = decryptor.update(encrypted_data) + decryptor.finalize()

    # Elimina el relleno de los datos
    unpadder = padding.PKCS7(algorithms.AES.block_size).unpadder()
    data = unpadder.update(padded_data) + unpadder.finalize()

    return data.decode()