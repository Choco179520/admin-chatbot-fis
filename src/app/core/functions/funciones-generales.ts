export function removeEmptyValues(obj: any) {
  // Iteramos sobre las claves del objeto
  for (const key in obj) {
    // Si el valor de la clave es una cadena vacía, la eliminamos
    if (obj[key] === "") {
      delete obj[key];
    }
  }
  return obj;
}
