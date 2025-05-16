const stickers = document.querySelectorAll('.sticker');
const zonaPegar = document.getElementById('zona-pegar');

stickers.forEach(sticker => {
  sticker.addEventListener('dragstart', e => {
    e.dataTransfer.setData('src', sticker.src);
  });
});

zonaPegar.addEventListener('dragover', e => {
  e.preventDefault(); // permitir el drop
});

zonaPegar.addEventListener('drop', e => {
  e.preventDefault();
  const src = e.dataTransfer.getData('src');

  // Buscar el sticker original para copiar su título
  const original = Array.from(stickers).find(s => s.src === src);
  const titulo = original ? original.title : "";

  // Crear nuevo sticker
  const nuevoSticker = document.createElement('img');
  nuevoSticker.src = src;
  nuevoSticker.className = 'sticker';
  nuevoSticker.title = titulo;
  nuevoSticker.style.position = 'absolute';
  nuevoSticker.style.left = e.offsetX + 'px';
  nuevoSticker.style.top = e.offsetY + 'px';
  nuevoSticker.style.width = '80px';

  zonaPegar.appendChild(nuevoSticker);
});

// Descargar collage en PNG
document.getElementById("descargar").addEventListener("click", () => {
  html2canvas(zonaPegar).then(canvas => {
    const link = document.createElement("a");
    link.download = "collage.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
});

document.getElementById('regresar').addEventListener('click', () => {
  window.location.href = 'loby.html';
});