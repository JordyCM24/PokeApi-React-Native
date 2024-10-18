import React, { useEffect, useState } from 'react';
import * as Updates from 'expo-updates';
import { Alert, AppState, Platform } from 'react-native';

const UpdateChecker = () => {
  const [appState, setAppState] = useState(AppState.currentState);

  const checkForUpdates = async () => {
    try {
      console.log('Iniciando verificación de actualizaciones...');
      const update = await Updates.checkForUpdateAsync();
      console.log('Resultado de la verificación:', update);

      if (update.isAvailable) {
        console.log('¡Actualización encontrada!');
        Alert.alert(
          "Actualización disponible",
          "Una nueva versión está disponible. ¿Deseas descargarla e instalarla ahora?",
          [
            {
              text: "Más tarde",
              style: "cancel",
              onPress: () => console.log('Actualización pospuesta por el usuario')
            },
            {
              text: "Descargar e instalar",
              onPress: async () => {
                console.log('Descargando actualización...');
                try {
                  await Updates.fetchUpdateAsync();
                  Alert.alert(
                    "Actualización descargada",
                    "La actualización se ha descargado. ¿Deseas reiniciar para aplicarla?",
                    [
                      {
                        text: "Más tarde",
                        style: "cancel"
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
                } catch (error) {
                  console.error('Error al descargar la actualización:', error);
                  Alert.alert(
                    "Error",
                    "No se pudo descargar la actualización. Por favor, inténtelo de nuevo más tarde."
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