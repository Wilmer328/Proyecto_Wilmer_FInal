import { BASE_URL } from './api';

// Tipo para las fiestas (crea un archivo types/fiesta.d.ts si prefieres)

export const FiestaService = async (nombre: string, invitados:number, comida: string, decoracion: string, fecha:Date) => {
    try {
      const response = await fetch(`${BASE_URL}/api/Fiestas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({nombre, invitados, comida, decoracion, fecha}),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.title || 'Error al crear la fiesta');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Error de conexión');
    }
}
