import React from 'react';

export default function WebSocketOpener() {
  const openTerminalWindow = () => {
    // Abre una nueva ventana y pasa la URL del WebSocket como un parámetro en la URL
    const wsUrl =
      'ws://18.181.196.49:8080/v0/resource/shell?resource_id=2178f72b-9d53-4f9a-99bd-07f29a795cef';
    const newWindow = window.open(
      `/terminal.html?wsUrl=${encodeURIComponent(wsUrl)}`,
      '_blank',
      'width=800,height=600',
    );

    if (newWindow) {
      newWindow.focus();
    } else {
      alert('Permita las ventanas emergentes para abrir la terminal.');
    }
  };

  return (
    <div>
      <button onClick={openTerminalWindow}>
        Abrir Terminal en Nueva Ventana
      </button>
    </div>
  );
}
