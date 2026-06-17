# Encefalomalacia TAC - Motor en Render

## Archivos
- `server.js`: backend Node/Express con el motor lingüístico.
- `package.json`: dependencias para Render.
- `render.yaml`: configuración opcional de despliegue.
- `bubble_frontend_snippet.html`: snippet para Bubble que llama al backend.

## Endpoints
- GET `/health`
- GET `/opciones/encefalomalacia-tac`
- POST `/generar/encefalomalacia-tac`

## Payload ejemplo
```json
{
  "tipo_encefalomalacia": "Área de encefalomalacia",
  "uh": "10 UH",
  "medidas": "3.2 x 2.8 cm",
  "localizaciones": [{"localizacion":"Lóbulo frontal", "lado":"Derecho"}],
  "traccion_ventricular": "Asta anterior del ventrículo lateral",
  "lado_traccion_ventricular": "Derecha",
  "gliosis": "Con gliosis perilesional",
  "observaciones": ""
}
```
