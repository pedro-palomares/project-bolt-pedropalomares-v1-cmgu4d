import { schedule } from 'node-cron';
import { createBackup, restoreBackup } from '../src/lib/db/backup';

// Ejecutar backup diario a las 3 AM
schedule('0 3 * * *', async () => {
  console.log('Iniciando backup programado...');
  const result = await createBackup();
  
  if (result.success) {
    console.log('Backup completado:', result.filename);
    
    // Validar el backup restaurándolo en la base de datos de prueba
    const restoreResult = await restoreBackup(result.filename!);
    
    if (restoreResult.success) {
      console.log('Validación de backup exitosa');
    } else {
      console.error('Error en la validación del backup:', restoreResult.error);
    }
  } else {
    console.error('Error en el backup:', result.error);
  }
});

// Mantener el proceso vivo
process.stdin.resume();