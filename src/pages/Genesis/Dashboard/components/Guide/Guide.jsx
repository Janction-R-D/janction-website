import React from 'react';
import Joyride from 'react-joyride';
import { steps } from './constants';
import { history } from 'umi';
import { changeUserConfig } from '@/services/genesis';
export default function Guide({ run, setRun, setIsModalOpen, isModalOpen }) {
  const routes = {
    2: '/genesis/dashboard',
    3: '/genesis/purchase',
    4: '/genesis/instance',
    5: '/genesis/orders',
    6: '/genesis/dashboard',
  };
  const updateConfig = async () => {
    const data = {
      pass_newbie_guide: true,
    };
    changeUserConfig(data);
  };
  const handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;
    // if (index === 7 && action == 'next') {
    //   // Si el usuario está en el paso 1 y avanza, abrimos el menú
    //   setIsModalOpen(true);
    //   setRun(true);
    //   console.log(status);
    // }
    if (action === 'next' && routes[index]) {
      history.push(routes[index]);
    }
    if (status === 'finished' || status === 'skipped') {
      setRun(false);
      updateConfig();
    }
  };
  const customStyles = {
    options: {
      backgroundColor: '#2c3e50', // Fondo de la ventana emergente
      overlayColor: 'rgba(0, 0, 0, 0.7)', // Color de la superposición de fondo
      primaryColor: '#3498db', // Color del botón primario
      textColor: '#ecf0f1', // Color del texto
      width: 400, // Ancho de la ventana emergente
      zIndex: 99999, // Asegurarse de que la guía se muestre por encima
    },
    beacon: {
      inner: {
        backgroundColor: '#ff4081', // Color del círculo que resalta los elementos
      },
      outer: {
        backgroundColor: 'rgba(255, 64, 129, 0.3)', // Color del borde del círculo
      },
    },
    buttonClose: {
      display: 'none',
      backgroundColor: '#e74c3c', // Color del botón de cerrar
      color: '#ecf0f1', // Color del texto del botón de cerrar
    },
    buttonBack: {
      backgroundColor: 'transparent', // Color del botón de retroceso
      color: '#fff', // Color del texto del botón de retroceso
    },
    buttonNext: {
      backgroundColor:
        'linear-gradient(275.81deg,rgb(36, 193, 241) 18.68%,rgb(74, 118, 250) 100%);', // Color del botón de siguiente
      color: '#000', // Color del texto del botón de siguiente
    },
  };
  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      styles={customStyles}
    />
  );
}
