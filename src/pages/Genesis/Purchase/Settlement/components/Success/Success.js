import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { message } from 'antd';

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();

  //   useEffect(() => {
  //     const session_id = searchParams.get('session_id');

  //     if (session_id) {
  //       // Llama al backend para confirmar el pago
  //       axios
  //         .post('/v0/market/payment', { session_id })
  //         .then(() => {
  //           message.success('Pago confirmado correctamente');
  //         })
  //         .catch((err) => {
  //           console.error('Error al confirmar el pago:', err);
  //           message.error('No se pudo confirmar el pago');
  //         });
  //     }
  //   }, []);

  return (
    <div>
      <h1>¡Gracias por tu compra!</h1>
    </div>
  );
}
