import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const FingerprintRegisterPage = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [lastFingerprintId, setLastFingerprintId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const registerFingerprint = async () => {
      try {
        await axios.post('http://localhost:8800/fingerprint/mode', {
          is_register_mode: true,
          is_attendance_mode: false,
        });
        setIsRegisterMode(true);
      } catch (error) {
        console.error(error);
      }
    };

    registerFingerprint();
  }, []);

  useEffect(() => {
    if (!isRegisterMode) return;
  
    const intervalId = setInterval(async () => {
      try {
        const response = await axios.get('http://localhost:8800/fingerprint/mode');
        setLastFingerprintId(response.data.last_fingerprint_id);

        console.log('mode response: ', response.data);

        if (!response.data.is_register_mode && response.data.is_attendance_mode) {
          clearInterval(intervalId);
          navigate('/');
        }
  
        // mock fingerprint registration
        // do a post request to http://localhost:8800/api/auth/register-fingerprint with json body '{"fingerprint_id": <lastFingerprintId>, "success": true}'
        
        console.log('trying to verify fingerprint id: ', lastFingerprintId);
  
        if (lastFingerprintId !== null && lastFingerprintId !== undefined) {
          const registerFingerprintResponse = await axios.post('http://localhost:8800/api/auth/register-fingerprint', {
            fingerprint_id: lastFingerprintId,
            success: true,
          });
        
          console.log(registerFingerprintResponse.data);
        } else {
          console.error('lastFingerprintId is not initialized');
        }
      } catch (error) {
        console.error(error);
      }
    }, 8000);
  
    return () => clearInterval(intervalId);
  }, [isRegisterMode, navigate, lastFingerprintId]); 

  return (
    <div>
      {isRegisterMode ? 'Place fingerprint on the sensor<br>' : ''}
      {lastFingerprintId ? `Fingerprint registration successful for UID ${lastFingerprintId}` : ''}
    </div>
  );
};
