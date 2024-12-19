import { message } from 'antd';
export async function verifyInvite(inviterCode) {
  try {
    // Verificar el código de invitación
    const res = await fetchInviteVerify(inviterCode);
    if (res && !res.error) {
      // Almacenar el código de invitación en el almacenamiento local
      localStorage.setItem('inviterCode', inviterCode);
      console.log(inviterCode);
    } else {
      message.warning('Invalid Code');
      setTimeout(() => {
        console.log('object');
        history.push(`/home?inviterCode=${inviterCode}`);
      }, 2000);
    }
  } catch (err) {
    console.error('Error verifying invite', err);
    message.error('Error verifying invite');
  }
}
