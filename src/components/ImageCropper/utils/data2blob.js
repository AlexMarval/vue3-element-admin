/**
 * Convierte un archivo en base64 a binario
 *
 * @param  {[String]} data El formato de dataURL es "data:image/png;base64,****", todo lo antes de la coma es descriptivo, solo necesitamos lo que está después de la coma
 * @param  {[String]} mime [descripción]
 * @return {[blob]}      [descripción]
 */
export default function(data, mime) {
  data = data.split(',')[1];
  data = window.atob(data);
  var ia = new Uint8Array(data.length);
  for (var i = 0; i < data.length; i++) {
    ia[i] = data.charCodeAt(i);
  }
  // canvas.toDataURL 返回的默认格式就是 image/png
  return new Blob([ia], {
    type: mime
  });
}
