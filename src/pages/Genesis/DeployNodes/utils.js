export async function verifyInvite(inviterCode, data) {
  try {
    // Verificar el código de invitación
    const res = await fetchInviteVerify(inviterCode);
    if (res && !res.error) {
      // Almacenar el código de invitación en el almacenamiento local
      localStorage.setItem('inviterCode', inviterCode);

      try {
        // Aceptar la invitación
        const acceptRes = await fetchInviteAccept(data);
        console.log(acceptRes);
      } catch (acceptErr) {
        console.log(acceptErr);
        message.error('Error accepting invite');
      }
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
