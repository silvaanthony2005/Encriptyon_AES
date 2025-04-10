import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [keySize, setKeySize] = useState(128);
  const [encryptedPassword, setEncryptedPassword] = useState('');
  const [key, setKey] = useState('');
  const [decryptedPassword, setDecryptedPassword] = useState('');
  const [processingTime, setProcessingTime] = useState('-');
  const [securityLevel, setSecurityLevel] = useState('Estándar');

  useEffect(() => {
    // Create dynamic background lights
    createBackgroundLights();
    
    // Update security level based on key size
    updateSecurityLevel(keySize);
  }, [keySize]);

  const updateSecurityLevel = (size) => {
    if (size === 128) {
      setSecurityLevel('Estándar');
    } else if (size === 192) {
      setSecurityLevel('Alta');
    } else {
      setSecurityLevel('Máxima');
    }
  };

  const createBackgroundLights = () => {
    const background = document.querySelector('.background-lights');
    if (!background) return;

    // Clear existing lights
    background.innerHTML = '';
    
    // Create new lights
    for (let i = 0; i < 10; i++) {
      const light = document.createElement('div');
      light.classList.add('light');
      
      const size = Math.random() * 300 + 200;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = -Math.random() * 15;
      const duration = Math.random() * 10 + 15;
      
      light.style.width = `${size}px`;
      light.style.height = `${size}px`;
      light.style.top = `${posY}%`;
      light.style.left = `${posX}%`;
      light.style.animationDelay = `${delay}s`;
      light.style.animationDuration = `${duration}s`;
      light.style.opacity = Math.random() * 0.15 + 0.05;
      
      background.appendChild(light);
    }
  };

  const handleEncrypt = async () => {
    const startTime = performance.now();
    try {
      const response = await fetch('http://127.0.0.1:8000/encrypt/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, key_size: keySize }),
      });
      const data = await response.json();
      if (response.ok) {
        setEncryptedPassword(data.encrypted_password);
        setKey(data.key);
        setProcessingTime(`${Math.round(performance.now() - startTime)} ms`);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error al encriptar:', error);
    }
  };

  const handleDecrypt = async () => {
    const startTime = performance.now();
    try {
      const response = await fetch('http://127.0.0.1:8000/decrypt/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ encrypted_password: encryptedPassword, key }),
      });
      const data = await response.json();
      if (response.ok) {
        setDecryptedPassword(data.decrypted_password);
        setProcessingTime(`${Math.round(performance.now() - startTime)} ms`);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error al desencriptar:', error);
    }
  };

  const handleKeySizeChange = (size) => {
    setKeySize(size);
    updateSecurityLevel(size);
  };

  return (
    <>
      <div className="background-lights"></div>
      <div className="app-container">
        <div className="card-container">
          <h1>Encriptación AES</h1>

          <div className="card info-card">
            <h2>¿Qué es AES?</h2>
            <p>
              AES (Advanced Encryption Standard) es un estándar de cifrado ampliamente utilizado para proteger datos sensibles. 
              Reconocido globalmente como uno de los algoritmos más seguros para la encriptación de información.
            </p>
          </div>

          <div className="card info-card">
            <h2>Diferencias entre AES-128, AES-192 y AES-256</h2>
            <ul className="feature-list">
              <li><strong>AES-128:</strong> Utiliza una clave de 128 bits. Es rápido y seguro para la mayoría de los casos.</li>
              <li><strong>AES-192:</strong> Utiliza una clave de 192 bits. Ofrece mayor seguridad a costa de un rendimiento ligeramente menor.</li>
              <li><strong>AES-256:</strong> Utiliza una clave de 256 bits. Es el nivel más seguro, ideal para datos altamente sensibles.</li>
            </ul>
          </div>

          <div className="card input-card">
            <div className="input-group">
              <label htmlFor="password">Contraseña:</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingrese su contraseña..."
                className="input-field"
              />
            </div>

            <div className="input-group">
              <label htmlFor="keySize">Tamaño de clave:</label>
              <div className="select-wrapper">
                <select
                  id="keySize"
                  value={keySize}
                  onChange={(e) => handleKeySizeChange(Number(e.target.value))}
                  className="input-field"
                >
                  <option value={128}>AES-128</option>
                  <option value={192}>AES-192</option>
                  <option value={256}>AES-256</option>
                </select>
              </div>
              <div className="security-level">Seguridad: {securityLevel}</div>
            </div>

            <div className="buttons-container">
              <button className="btn btn-encrypt" onClick={handleEncrypt}>Encriptar</button>
              <button className="btn btn-decrypt" onClick={handleDecrypt}>Desencriptar</button>
            </div>

            <h2>Resultados:</h2>
            <div className="results-grid">
              <div className="result-item">
                <div className="result-label">Texto encriptado:</div>
                <div className="result-value">{encryptedPassword || '-'}</div>
              </div>
              <div className="result-item">
                <div className="result-label">Clave generada:</div>
                <div className="result-value">{key || '-'}</div>
              </div>
              <div className="result-item">
                <div className="result-label">Texto desencriptado:</div>
                <div className="result-value">{decryptedPassword || '-'}</div>
              </div>
              <div className="result-item">
                <div className="result-label">Tiempo de proceso:</div>
                <div className="result-value">{processingTime}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;