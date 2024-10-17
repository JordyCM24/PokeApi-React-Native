import React, { useEffect, useState } from 'react';
import * as Updates from 'expo-updates';
import { Alert, AppState, Platform } from 'react-native';

const UpdateChecker = () => {
  const [appState, setAppState] = useState(AppState.currentState);

  const checkForUpdates = async () => {
    try {
      if (__DEV__) {
        console.log('App running in development mode - updates disabled');
        return;
      }

      console.log('Iniciando búsqueda de actualizaciones...');
      const update = await Updates.checkForUpdateAsync();
      console.log('Resultado de búsqueda de actualizaciones:', update);
      
      if (update.isAvailable) {
        console.log('¡Actualización encontrada! Descargando...');
        await Updates.fetchUpdateAsync();
        
        // Eliminamos la verificación de result.isNew
        Alert.alert(
          "Actualización disponible",
          "Una nueva versión está lista. ¿Deseas reiniciar para aplicar la actualización?",
          [
            { 
              text: "Más tarde", 
              style: "cancel",
              onPress: () => console.log('Actualización pospuesta por el usuario')
            },
            { 
              text: "Reiniciar", 
              onPress: async () => {
                console.log('Reiniciando para aplicar actualización...');
                try {
                  await Updates.reloadAsync();
                } catch (error) {
                  console.error('Error al reiniciar la app:', error);
                  Alert.alert(
                    "Error",
                    "No se pudo aplicar la actualización. Por favor, reinicie la aplicación manualmente."
                  );
                }
              }
            }
          ]
        );
      } else {
        console.log('No hay actualizaciones disponibles');
      }
    } catch (error) {
      console.error('Error completo al verificar actualizaciones:', error);
      Alert.alert(
        "Error de actualización",
        `No se pudo verificar actualizaciones: ${error.message}`
      );
    }
  };

  useEffect(() => {
    checkForUpdates();

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App volvió a primer plano, verificando actualizaciones...');
        checkForUpdates();
      }
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [appState]);

  return null;
};

export default UpdateChecker;