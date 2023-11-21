import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const FingerprintRegisterPage = () => {
    console.log("FingerprintRegisterPage");
    
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
        if (!response.data.is_register_mode && response.data.is_attendance_mode) {
          clearInterval(intervalId);
          setLastFingerprintId(response.data.last_fingerprint_id);
          navigate('/');
        }
      } catch (error) {
        console.error(error);
      }
    }, 8000);

    return () => clearInterval(intervalId);
  }, [isRegisterMode, navigate]);

  return (
    <div>
      {isRegisterMode ? 'Place fingerprint on the sensor' : ''}
      {lastFingerprintId ? `Fingerprint registration successful for UID ${lastFingerprintId}` : ''}
    </div>
  );
};
