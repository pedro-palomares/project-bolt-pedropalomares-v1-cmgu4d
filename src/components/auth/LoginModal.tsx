} catch (error: unknown) {
  if (error instanceof Error) {
    console.error("Error al iniciar sesión:", error.message);
  } else {
    console.error("Error al iniciar sesión:", error);
  }
} 