import { fetchInviteVerify } from '@/services/genesis';
import { message } from 'antd';
import { history } from 'umi';
export async function verifyInvite(inviterCode) {
  try {
    // Verificar el código de invitación
    const res = await fetchInviteVerify(inviterCode);
    if (res && !res.error) {
      // Almacenar el código de invitación en el almacenamiento local
      localStorage.setItem('inviterCode', inviterCode);
      console.log(inviterCode);
    } else {
      throw Error(res?.error);
    }
  } catch (err) {
    console.log(err);
    message.warning('Invalid Code', 2);
    setTimeout(() => {
      history.push(`/genesis/404`);
    }, 1500);
  }
}
