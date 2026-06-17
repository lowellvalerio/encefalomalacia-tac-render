const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

const opcionesEncefaloTAC = {
  tipo_encefalomalacia: [
    "Área de encefalomalacia",
    "Múltiples áreas de encefalomalacia",
    "Probable área de encefalomalacia"
  ],

  localizacion: [
    "Amígdala cerebral",
    "Brazo anterior de la cápsula interna",
    "Brazo posterior de la cápsula interna",
    "Bulbo raquídeo",
    "Cabeza del núcleo caudado",
    "Cápsula externa",
    "Cápsula extrema",
    "Cápsula interna",
    "Centro semiovale",
    "Claustro",
    "Cola del núcleo caudado",
    "Corona radiata",
    "Corteza cerebral",
    "Corteza frontal",
    "Corteza occipital",
    "Corteza parietal",
    "Corteza temporal",
    "Cuerpo calloso",
    "Cuerpo del núcleo caudado",
    "Esplenio del cuerpo calloso",
    "Fórnix",
    "Ganglios basales",
    "Giro cingulado",
    "Globo pálido",
    "Hemisferio cerebeloso",
    "Hipocampo",
    "Ínsula",
    "Lóbulo frontal",
    "Lóbulo occipital",
    "Lóbulo parietal",
    "Lóbulo temporal",
    "Mesencéfalo",
    "Núcleo caudado",
    "Núcleo estriado",
    "Núcleo lenticular",
    "Núcleo subtalámico",
    "Pedúnculo cerebeloso inferior",
    "Pedúnculo cerebeloso medio",
    "Pedúnculo cerebeloso superior",
    "Pedúnculo cerebral",
    "Protuberancia",
    "Putamen",
    "Radiaciones ópticas",
    "Región capsuloganglionar",
    "Región cerebelosa",
    "Región frontobasal",
    "Región frontoparietal",
    "Región frontoparietooccipital",
    "Región frontotemporal",
    "Región frontotemporoparietal",
    "Región gangliocapsular",
    "Región insular",
    "Región occipitotemporal",
    "Región parietooccipital",
    "Región periventricular",
    "Región temporooccipital",
    "Región temporoparietal",
    "Rodilla de la cápsula interna",
    "Rostro del cuerpo calloso",
    "Segmento retrolenticular de la cápsula interna",
    "Segmento sublenticular de la cápsula interna",
    "Sustancia blanca profunda",
    "Sustancia blanca subcortical",
    "Sustancia blanca yuxtacortical",
    "Sustancia gris cortical",
    "Tálamo",
    "Tronco encefálico",
    "Vermis cerebeloso"
  ],

  lado: [
    "Derecho",
    "Izquierdo",
    "Bilateral",
    "Línea media",
    "Ipsilateral"
  ],

  traccion_ventricular: [
    "Sin tracción ventricular significativa",
    "Asta anterior del ventrículo lateral",
    "Asta posterior del ventrículo lateral",
    "Ventrículo lateral",
    "Asta temporal del ventrículo lateral",
    "3er ventrículo",
    "4to ventrículo"
  ],

  lado_traccion_ventricular: [
    "No especificar",
    "Derecha",
    "Izquierda",
    "Bilateral",
    "Ipsilateral"
  ],

  gliosis: [
    "Sin cambios glióticos evidentes",
    "Asociada a cambios glióticos perilesionales",
    "Asociada a cambios glióticos periféricos",
    "Con gliosis perilesional",
    "Con gliosis periférica",
    "Acompañada de cambios glióticos perilesionales",
    "Acompañada de cambios glióticos periféricos"
  ],

};

const reglasLocalizacionEncefaloTAC = {
  "amígdala cerebral": {
    der: "en la amígdala cerebral derecha",
    izq: "en la amígdala cerebral izquierda",
    ipsi: "en la amígdala cerebral ipsilateral",
    bilateral: ["en ambas amígdalas cerebrales", "a nivel amigdalino bilateral"]
  },
  "brazo anterior de la cápsula interna": {
    der: "en el brazo anterior de la cápsula interna derecha",
    izq: "en el brazo anterior de la cápsula interna izquierda",
    ipsi: "en el brazo anterior de la cápsula interna ipsilateral",
    bilateral: ["en los brazos anteriores de ambas cápsulas internas", "a nivel de los brazos anteriores de las cápsulas internas de manera bilateral"]
  },
  "brazo posterior de la cápsula interna": {
    der: "en el brazo posterior de la cápsula interna derecha",
    izq: "en el brazo posterior de la cápsula interna izquierda",
    ipsi: "en el brazo posterior de la cápsula interna ipsilateral",
    bilateral: ["en los brazos posteriores de ambas cápsulas internas", "a nivel de los brazos posteriores de las cápsulas internas de manera bilateral"]
  },
  "bulbo raquídeo": {
    der: "a nivel del bulbo raquídeo derecho",
    izq: "a nivel del bulbo raquídeo izquierdo",
    ipsi: "a nivel del bulbo raquídeo ipsilateral",
    bilateral: ["a nivel del bulbo raquídeo", "con compromiso bulbar bilateral"]
  },
  "cabeza del núcleo caudado": {
    der: "en la cabeza del núcleo caudado derecho",
    izq: "en la cabeza del núcleo caudado izquierdo",
    ipsi: "en la cabeza del núcleo caudado ipsilateral",
    bilateral: ["en las cabezas de ambos núcleos caudados", "a nivel de las cabezas de los núcleos caudados de manera bilateral"]
  },
  "cápsula externa": {
    der: "en la cápsula externa derecha",
    izq: "en la cápsula externa izquierda",
    ipsi: "en la cápsula externa ipsilateral",
    bilateral: ["en ambas cápsulas externas", "a nivel de las cápsulas externas de manera bilateral"]
  },
  "cápsula extrema": {
    der: "en la cápsula extrema derecha",
    izq: "en la cápsula extrema izquierda",
    ipsi: "en la cápsula extrema ipsilateral",
    bilateral: ["en ambas cápsulas extremas", "a nivel de las cápsulas extremas de manera bilateral"]
  },
  "cápsula interna": {
    der: "en la cápsula interna derecha",
    izq: "en la cápsula interna izquierda",
    ipsi: "en la cápsula interna ipsilateral",
    bilateral: ["en ambas cápsulas internas", "a nivel de las cápsulas internas de manera bilateral"]
  },
  "centro semiovale": {
    der: "en el centro semiovale derecho",
    izq: "en el centro semiovale izquierdo",
    ipsi: "en el centro semiovale ipsilateral",
    bilateral: ["en ambos centros semiovales", "a nivel de los centros semiovales de manera bilateral"]
  },
  "claustro": {
    der: "en el claustro derecho",
    izq: "en el claustro izquierdo",
    ipsi: "en el claustro ipsilateral",
    bilateral: ["en ambos claustros", "a nivel de los claustros de manera bilateral"]
  },
  "cola del núcleo caudado": {
    der: "en la cola del núcleo caudado derecho",
    izq: "en la cola del núcleo caudado izquierdo",
    ipsi: "en la cola del núcleo caudado ipsilateral",
    bilateral: ["en las colas de ambos núcleos caudados", "a nivel de las colas de los núcleos caudados de manera bilateral"]
  },
  "corteza cerebral": {
    der: "a nivel cortical cerebral derecho",
    izq: "a nivel cortical cerebral izquierdo",
    ipsi: "a nivel cortical cerebral ipsilateral",
    bilateral: ["a nivel cortical bilateral", "comprometiendo la corteza cerebral de ambos hemisferios"]
  },
  "corteza frontal": {
    der: "a nivel de la corteza frontal derecha",
    izq: "a nivel de la corteza frontal izquierda",
    ipsi: "a nivel de la corteza frontal ipsilateral",
    bilateral: ["a nivel de la corteza frontal bilateral", "comprometiendo la corteza frontal de ambos hemisferios"]
  },
  "corteza occipital": {
    der: "a nivel de la corteza occipital derecha",
    izq: "a nivel de la corteza occipital izquierda",
    ipsi: "a nivel de la corteza occipital ipsilateral",
    bilateral: ["a nivel de la corteza occipital bilateral", "comprometiendo la corteza occipital de ambos hemisferios"]
  },
  "corteza parietal": {
    der: "a nivel de la corteza parietal derecha",
    izq: "a nivel de la corteza parietal izquierda",
    ipsi: "a nivel de la corteza parietal ipsilateral",
    bilateral: ["a nivel de la corteza parietal bilateral", "comprometiendo la corteza parietal de ambos hemisferios"]
  },
  "corteza temporal": {
    der: "a nivel de la corteza temporal derecha",
    izq: "a nivel de la corteza temporal izquierda",
    ipsi: "a nivel de la corteza temporal ipsilateral",
    bilateral: ["a nivel de la corteza temporal bilateral", "comprometiendo la corteza temporal de ambos hemisferios"]
  },
  "corona radiata": {
    der: "en la corona radiata derecha",
    izq: "en la corona radiata izquierda",
    ipsi: "en la corona radiata ipsilateral",
    bilateral: ["en ambas coronas radiatas", "a nivel de las coronas radiatas de manera bilateral"]
  },
  "cuerpo calloso": {
    der: "en el cuerpo calloso",
    izq: "en el cuerpo calloso",
    ipsi: "en el cuerpo calloso",
    bilateral: ["en el cuerpo calloso", "comprometiendo el cuerpo calloso"]
  },
  "cuerpo del núcleo caudado": {
    der: "en el cuerpo del núcleo caudado derecho",
    izq: "en el cuerpo del núcleo caudado izquierdo",
    ipsi: "en el cuerpo del núcleo caudado ipsilateral",
    bilateral: ["en los cuerpos de ambos núcleos caudados", "a nivel de los cuerpos de los núcleos caudados de manera bilateral"]
  },
  "esplenio del cuerpo calloso": {
    der: "en el esplenio del cuerpo calloso",
    izq: "en el esplenio del cuerpo calloso",
    ipsi: "en el esplenio del cuerpo calloso",
    bilateral: ["en el esplenio del cuerpo calloso", "comprometiendo el esplenio del cuerpo calloso"]
  },
  "fórnix": {
    der: "en el fórnix derecho",
    izq: "en el fórnix izquierdo",
    ipsi: "en el fórnix ipsilateral",
    bilateral: ["en ambos fórnices", "a nivel de los fórnices de manera bilateral"]
  },
  "ganglios basales": {
    der: "en los ganglios basales derechos",
    izq: "en los ganglios basales izquierdos",
    ipsi: "en los ganglios basales ipsilaterales",
    bilateral: ["en ambos ganglios basales", "a nivel de los ganglios basales de manera bilateral"]
  },
  "giro cingulado": {
    der: "en el giro cingulado derecho",
    izq: "en el giro cingulado izquierdo",
    ipsi: "en el giro cingulado ipsilateral",
    bilateral: ["en ambos giros cingulados", "a nivel de los giros cingulados de manera bilateral"]
  },
  "globo pálido": {
    der: "en el globo pálido derecho",
    izq: "en el globo pálido izquierdo",
    ipsi: "en el globo pálido ipsilateral",
    bilateral: ["en ambos globos pálidos", "a nivel palidal bilateral"]
  },
  "hemisferio cerebeloso": {
    der: "en el hemisferio cerebeloso derecho",
    izq: "en el hemisferio cerebeloso izquierdo",
    ipsi: "en el hemisferio cerebeloso ipsilateral",
    bilateral: ["en ambos hemisferios cerebelosos", "a nivel de los hemisferios cerebelosos de manera bilateral"]
  },
  "hipocampo": {
    der: "en el hipocampo derecho",
    izq: "en el hipocampo izquierdo",
    ipsi: "en el hipocampo ipsilateral",
    bilateral: ["en ambos hipocampos", "a nivel hipocampal bilateral"]
  },
  "ínsula": {
    der: "en la ínsula derecha",
    izq: "en la ínsula izquierda",
    ipsi: "en la ínsula ipsilateral",
    bilateral: ["en ambas ínsulas", "a nivel insular bilateral", "comprometiendo ambas regiones insulares"]
  },
  "lóbulo frontal": {
    der: "en el lóbulo frontal derecho",
    izq: "en el lóbulo frontal izquierdo",
    ipsi: "en el lóbulo frontal ipsilateral",
    bilateral: ["en ambos lóbulos frontales", "a nivel de los lóbulos frontales de manera bilateral"]
  },
  "lóbulo occipital": {
    der: "en el lóbulo occipital derecho",
    izq: "en el lóbulo occipital izquierdo",
    ipsi: "en el lóbulo occipital ipsilateral",
    bilateral: ["en ambos lóbulos occipitales", "a nivel de los lóbulos occipitales de manera bilateral"]
  },
  "lóbulo parietal": {
    der: "en el lóbulo parietal derecho",
    izq: "en el lóbulo parietal izquierdo",
    ipsi: "en el lóbulo parietal ipsilateral",
    bilateral: ["en ambos lóbulos parietales", "a nivel de los lóbulos parietales de manera bilateral"]
  },
  "lóbulo temporal": {
    der: "en el lóbulo temporal derecho",
    izq: "en el lóbulo temporal izquierdo",
    ipsi: "en el lóbulo temporal ipsilateral",
    bilateral: ["en ambos lóbulos temporales", "a nivel de los lóbulos temporales de manera bilateral"]
  },
  "mesencéfalo": {
    der: "a nivel del hemimesencéfalo derecho",
    izq: "a nivel del hemimesencéfalo izquierdo",
    ipsi: "a nivel del hemimesencéfalo ipsilateral",
    bilateral: ["a nivel del mesencéfalo", "con compromiso mesencefálico bilateral"]
  },
  "núcleo caudado": {
    der: "en el núcleo caudado derecho",
    izq: "en el núcleo caudado izquierdo",
    ipsi: "en el núcleo caudado ipsilateral",
    bilateral: ["en ambos núcleos caudados", "a nivel de los núcleos caudados de manera bilateral"]
  },
  "núcleo estriado": {
    der: "en el núcleo estriado derecho",
    izq: "en el núcleo estriado izquierdo",
    ipsi: "en el núcleo estriado ipsilateral",
    bilateral: ["en ambos núcleos estriados", "a nivel estriatal bilateral"]
  },
  "núcleo lenticular": {
    der: "en el núcleo lenticular derecho",
    izq: "en el núcleo lenticular izquierdo",
    ipsi: "en el núcleo lenticular ipsilateral",
    bilateral: ["en ambos núcleos lenticulares", "a nivel lenticular bilateral"]
  },
  "núcleo subtalámico": {
    der: "en el núcleo subtalámico derecho",
    izq: "en el núcleo subtalámico izquierdo",
    ipsi: "en el núcleo subtalámico ipsilateral",
    bilateral: ["en ambos núcleos subtalámicos", "a nivel subtalámico bilateral"]
  },
  "pedúnculo cerebral": {
    der: "en el pedúnculo cerebral derecho",
    izq: "en el pedúnculo cerebral izquierdo",
    ipsi: "en el pedúnculo cerebral ipsilateral",
    bilateral: ["en ambos pedúnculos cerebrales", "a nivel de los pedúnculos cerebrales de manera bilateral"]
  },
  "pedúnculo cerebeloso inferior": {
    der: "en el pedúnculo cerebeloso inferior derecho",
    izq: "en el pedúnculo cerebeloso inferior izquierdo",
    ipsi: "en el pedúnculo cerebeloso inferior ipsilateral",
    bilateral: ["en ambos pedúnculos cerebelosos inferiores", "a nivel de los pedúnculos cerebelosos inferiores de manera bilateral"]
  },
  "pedúnculo cerebeloso medio": {
    der: "en el pedúnculo cerebeloso medio derecho",
    izq: "en el pedúnculo cerebeloso medio izquierdo",
    ipsi: "en el pedúnculo cerebeloso medio ipsilateral",
    bilateral: ["en ambos pedúnculos cerebelosos medios", "a nivel de los pedúnculos cerebelosos medios de manera bilateral"]
  },
  "pedúnculo cerebeloso superior": {
    der: "en el pedúnculo cerebeloso superior derecho",
    izq: "en el pedúnculo cerebeloso superior izquierdo",
    ipsi: "en el pedúnculo cerebeloso superior ipsilateral",
    bilateral: ["en ambos pedúnculos cerebelosos superiores", "a nivel de los pedúnculos cerebelosos superiores de manera bilateral"]
  },
  "protuberancia": {
    der: "a nivel de la hemiprotuberancia derecha",
    izq: "a nivel de la hemiprotuberancia izquierda",
    ipsi: "a nivel de la hemiprotuberancia ipsilateral",
    bilateral: ["a nivel de la protuberancia", "con compromiso pontino bilateral"]
  },
  "putamen": {
    der: "en el putamen derecho",
    izq: "en el putamen izquierdo",
    ipsi: "en el putamen ipsilateral",
    bilateral: ["en ambos putámenes", "a nivel putaminal bilateral"]
  },
  "radiaciones ópticas": {
    der: "en las radiaciones ópticas derechas",
    izq: "en las radiaciones ópticas izquierdas",
    ipsi: "en las radiaciones ópticas ipsilaterales",
    bilateral: ["en ambas radiaciones ópticas", "a nivel de las radiaciones ópticas de manera bilateral"]
  },
  "región capsuloganglionar": {
    der: "en la región capsuloganglionar derecha",
    izq: "en la región capsuloganglionar izquierda",
    ipsi: "en la región capsuloganglionar ipsilateral",
    bilateral: ["en ambas regiones capsuloganglionares", "a nivel capsuloganglionar bilateral"]
  },
  "región cerebelosa": {
    der: "en la región cerebelosa derecha",
    izq: "en la región cerebelosa izquierda",
    ipsi: "en la región cerebelosa ipsilateral",
    bilateral: ["en ambas regiones cerebelosas", "a nivel cerebeloso bilateral"]
  },
  "región frontobasal": {
    der: "en la región frontobasal derecha",
    izq: "en la región frontobasal izquierda",
    ipsi: "en la región frontobasal ipsilateral",
    bilateral: ["en ambas regiones frontobasales", "a nivel frontobasal bilateral"]
  },
  "región frontoparietal": {
    der: "en la región frontoparietal derecha",
    izq: "en la región frontoparietal izquierda",
    ipsi: "en la región frontoparietal ipsilateral",
    bilateral: ["en ambas regiones frontoparietales", "a nivel frontoparietal bilateral"]
  },
  "región frontoparietooccipital": {
    der: "en la región frontoparietooccipital derecha",
    izq: "en la región frontoparietooccipital izquierda",
    ipsi: "en la región frontoparietooccipital ipsilateral",
    bilateral: ["en ambas regiones frontoparietooccipitales", "a nivel frontoparietooccipital bilateral"]
  },
  "región frontotemporal": {
    der: "en la región frontotemporal derecha",
    izq: "en la región frontotemporal izquierda",
    ipsi: "en la región frontotemporal ipsilateral",
    bilateral: ["en ambas regiones frontotemporales", "a nivel frontotemporal bilateral"]
  },
  "región frontotemporoparietal": {
    der: "en la región frontotemporoparietal derecha",
    izq: "en la región frontotemporoparietal izquierda",
    ipsi: "en la región frontotemporoparietal ipsilateral",
    bilateral: ["en ambas regiones frontotemporoparietales", "a nivel frontotemporoparietal bilateral"]
  },
  "región gangliocapsular": {
    der: "en la región gangliocapsular derecha",
    izq: "en la región gangliocapsular izquierda",
    ipsi: "en la región gangliocapsular ipsilateral",
    bilateral: ["en ambas regiones gangliocapsulares", "a nivel gangliocapsular bilateral"]
  },
  "región insular": {
    der: "en la región insular derecha",
    izq: "en la región insular izquierda",
    ipsi: "en la región insular ipsilateral",
    bilateral: ["en ambas regiones insulares", "a nivel insular bilateral"]
  },
  "región occipitotemporal": {
    der: "en la región occipitotemporal derecha",
    izq: "en la región occipitotemporal izquierda",
    ipsi: "en la región occipitotemporal ipsilateral",
    bilateral: ["en ambas regiones occipitotemporales", "a nivel occipitotemporal bilateral"]
  },
  "región parietooccipital": {
    der: "en la región parietooccipital derecha",
    izq: "en la región parietooccipital izquierda",
    ipsi: "en la región parietooccipital ipsilateral",
    bilateral: ["en ambas regiones parietooccipitales", "a nivel parietooccipital bilateral"]
  },
  "región periventricular": {
    der: "en la región periventricular derecha",
    izq: "en la región periventricular izquierda",
    ipsi: "en la región periventricular ipsilateral",
    bilateral: ["en ambas regiones periventriculares", "a nivel periventricular bilateral"]
  },
  "región temporooccipital": {
    der: "en la región temporooccipital derecha",
    izq: "en la región temporooccipital izquierda",
    ipsi: "en la región temporooccipital ipsilateral",
    bilateral: ["en ambas regiones temporooccipitales", "a nivel temporooccipital bilateral"]
  },
  "región temporoparietal": {
    der: "en la región temporoparietal derecha",
    izq: "en la región temporoparietal izquierda",
    ipsi: "en la región temporoparietal ipsilateral",
    bilateral: ["en ambas regiones temporoparietales", "a nivel temporoparietal bilateral"]
  },
  "rodilla de la cápsula interna": {
    der: "en la rodilla de la cápsula interna derecha",
    izq: "en la rodilla de la cápsula interna izquierda",
    ipsi: "en la rodilla de la cápsula interna ipsilateral",
    bilateral: ["en las rodillas de ambas cápsulas internas", "a nivel de las rodillas de las cápsulas internas de manera bilateral"]
  },
  "rostro del cuerpo calloso": {
    der: "en el rostro del cuerpo calloso",
    izq: "en el rostro del cuerpo calloso",
    ipsi: "en el rostro del cuerpo calloso",
    bilateral: ["en el rostro del cuerpo calloso", "comprometiendo el rostro del cuerpo calloso"]
  },
  "segmento retrolenticular de la cápsula interna": {
    der: "en el segmento retrolenticular de la cápsula interna derecha",
    izq: "en el segmento retrolenticular de la cápsula interna izquierda",
    ipsi: "en el segmento retrolenticular de la cápsula interna ipsilateral",
    bilateral: ["en los segmentos retrolenticulares de ambas cápsulas internas", "a nivel de los segmentos retrolenticulares de las cápsulas internas de manera bilateral"]
  },
  "segmento sublenticular de la cápsula interna": {
    der: "en el segmento sublenticular de la cápsula interna derecha",
    izq: "en el segmento sublenticular de la cápsula interna izquierda",
    ipsi: "en el segmento sublenticular de la cápsula interna ipsilateral",
    bilateral: ["en los segmentos sublenticulares de ambas cápsulas internas", "a nivel de los segmentos sublenticulares de las cápsulas internas de manera bilateral"]
  },
  "sustancia blanca profunda": {
    der: "en la sustancia blanca profunda derecha",
    izq: "en la sustancia blanca profunda izquierda",
    ipsi: "en la sustancia blanca profunda ipsilateral",
    bilateral: ["en la sustancia blanca profunda bilateral", "a nivel de la sustancia blanca profunda de ambos hemisferios"]
  },
  "sustancia blanca subcortical": {
    der: "en la sustancia blanca subcortical derecha",
    izq: "en la sustancia blanca subcortical izquierda",
    ipsi: "en la sustancia blanca subcortical ipsilateral",
    bilateral: ["en la sustancia blanca subcortical bilateral", "a nivel de la sustancia blanca subcortical de ambos hemisferios"]
  },
  "sustancia blanca yuxtacortical": {
    der: "en la sustancia blanca yuxtacortical derecha",
    izq: "en la sustancia blanca yuxtacortical izquierda",
    ipsi: "en la sustancia blanca yuxtacortical ipsilateral",
    bilateral: ["en la sustancia blanca yuxtacortical bilateral", "a nivel de la sustancia blanca yuxtacortical de ambos hemisferios"]
  },
  "sustancia gris cortical": {
    der: "en la sustancia gris cortical derecha",
    izq: "en la sustancia gris cortical izquierda",
    ipsi: "en la sustancia gris cortical ipsilateral",
    bilateral: ["en la sustancia gris cortical bilateral", "a nivel de la sustancia gris cortical de ambos hemisferios"]
  },
  "tálamo": {
    der: "en el tálamo derecho",
    izq: "en el tálamo izquierdo",
    ipsi: "en el tálamo ipsilateral",
    bilateral: ["en ambos tálamos", "a nivel talámico bilateral"]
  },
  "tronco encefálico": {
    der: "en el hemistronco encefálico derecho",
    izq: "en el hemistronco encefálico izquierdo",
    ipsi: "en el hemistronco encefálico ipsilateral",
    bilateral: ["a nivel del tronco encefálico", "con compromiso del tronco encefálico de manera bilateral"]
  },
  "vermis cerebeloso": {
    der: "en el vermis cerebeloso",
    izq: "en el vermis cerebeloso",
    ipsi: "en el vermis cerebeloso",
    bilateral: ["en el vermis cerebeloso", "a nivel del vermis cerebeloso"]
  }
};

function randomEncefaloTAC(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}
function normalizarLocEncefaloTAC(txt) { return (txt || "").toLowerCase().trim(); }
function unirListaEncefaloTAC(lista) {
  if (!lista.length) return "";
  if (lista.length === 1) return lista[0];
  return lista.slice(0, -1).join(", ") + " y " + lista[lista.length - 1];
}
function textoLocalizacionIndividualEncefaloTAC(item) {
  const loc = normalizarLocEncefaloTAC(item.localizacion);
  const lado = item.lado;
  const regla = reglasLocalizacionEncefaloTAC[loc];
  if (regla) {
    if (lado === "Derecho") return regla.der;
    if (lado === "Izquierdo") return regla.izq;
    if (lado === "Bilateral") return randomEncefaloTAC(regla.bilateral);
    if (lado === "Línea media") return `en ${loc}, en topografía de línea media`;
    if (lado === "Ipsilateral") return regla.ipsi || `en ${loc} ipsilateral`;
  }
  if (lado === "Derecho") return `en ${loc} derecho`;
  if (lado === "Izquierdo") return `en ${loc} izquierdo`;
  if (lado === "Bilateral") return `en ${loc}, de manera bilateral`;
  if (lado === "Línea media") return `en ${loc}, en topografía de línea media`;
  if (lado === "Ipsilateral") return `en ${loc} ipsilateral`;
  return `en ${loc}`;
}
function agruparLocalizacionesEncefaloTAC(locs) {
  const grupos = {};
  locs.forEach(item => {
    const key = normalizarLocEncefaloTAC(item.localizacion);
    if (!grupos[key]) grupos[key] = [];
    grupos[key].push(item.lado);
  });
  const resultado = [];
  Object.keys(grupos).forEach(loc => {
    const lados = grupos[loc];
    if (lados.includes("Bilateral") || (lados.includes("Derecho") && lados.includes("Izquierdo"))) {
      resultado.push({ localizacion: loc, lado: "Bilateral" });
    } else {
      lados.forEach(lado => resultado.push({ localizacion: loc, lado }));
    }
  });
  return resultado;
}
function esComponenteCapsulaInternaEncefaloTAC(loc) {
  return ["brazo anterior de la cápsula interna", "rodilla de la cápsula interna", "brazo posterior de la cápsula interna", "segmento retrolenticular de la cápsula interna", "segmento sublenticular de la cápsula interna"].includes(normalizarLocEncefaloTAC(loc));
}
function nombreComponenteCapsulaInternaEncefaloTAC(loc) {
  const mapa = {
    "brazo anterior de la cápsula interna": "el brazo anterior",
    "rodilla de la cápsula interna": "la rodilla",
    "brazo posterior de la cápsula interna": "el brazo posterior",
    "segmento retrolenticular de la cápsula interna": "el segmento retrolenticular",
    "segmento sublenticular de la cápsula interna": "el segmento sublenticular"
  };
  return mapa[normalizarLocEncefaloTAC(loc)] || normalizarLocEncefaloTAC(loc);
}
function compactarCapsulaInternaEncefaloTAC(items, lado) {
  const lista = unirListaEncefaloTAC(items.map(item => nombreComponenteCapsulaInternaEncefaloTAC(item.localizacion)));
  if (lado === "Derecho") return `en ${lista} de la cápsula interna derecha`;
  if (lado === "Izquierdo") return `en ${lista} de la cápsula interna izquierda`;
  if (lado === "Ipsilateral") return `en ${lista} de la cápsula interna ipsilateral`;
  return "";
}
function compactarGrupoLateralEncefaloTAC(items, lado) {
  if (!items.length) return "";
  if (items.length > 1 && items.every(item => esComponenteCapsulaInternaEncefaloTAC(item.localizacion))) {
    return compactarCapsulaInternaEncefaloTAC(items, lado);
  }
  return unirListaEncefaloTAC(items.map(textoLocalizacionIndividualEncefaloTAC));
}
function textoLocalizacionesEncefaloTAC(locs) {
  if (!locs.length) return "";
  const agrupadas = agruparLocalizacionesEncefaloTAC(locs);
  const derechos = agrupadas.filter(item => item.lado === "Derecho");
  const izquierdos = agrupadas.filter(item => item.lado === "Izquierdo");
  const ipsilaterales = agrupadas.filter(item => item.lado === "Ipsilateral");
  const resto = agrupadas.filter(item => !["Derecho", "Izquierdo", "Ipsilateral"].includes(item.lado));
  const textos = [];
  if (derechos.length > 1) textos.push(compactarGrupoLateralEncefaloTAC(derechos, "Derecho")); else if (derechos.length === 1) textos.push(textoLocalizacionIndividualEncefaloTAC(derechos[0]));
  if (izquierdos.length > 1) textos.push(compactarGrupoLateralEncefaloTAC(izquierdos, "Izquierdo")); else if (izquierdos.length === 1) textos.push(textoLocalizacionIndividualEncefaloTAC(izquierdos[0]));
  if (ipsilaterales.length > 1) textos.push(compactarGrupoLateralEncefaloTAC(ipsilaterales, "Ipsilateral")); else if (ipsilaterales.length === 1) textos.push(textoLocalizacionIndividualEncefaloTAC(ipsilaterales[0]));
  textos.push(...resto.map(textoLocalizacionIndividualEncefaloTAC));
  return unirListaEncefaloTAC(textos.filter(Boolean));
}
function esMultipleEncefaloTAC(payload) { return (payload.localizaciones || []).length > 1 || payload.tipo_encefalomalacia === "Múltiples áreas de encefalomalacia"; }
function construirObjetoEncefaloTAC(tipo, multiple) {
  if (tipo === "Probable área de encefalomalacia") return "probable área de encefalomalacia";
  if (tipo === "Múltiples áreas de encefalomalacia" || multiple) return "áreas de encefalomalacia";
  return "área de encefalomalacia";
}
const articuloObjetoEncefaloTAC = construirObjetoEncefaloTAC;
function textoUHEencefaloTAC(uh) {
  if (!uh) return "";
  const limpio = uh.toLowerCase().includes("uh") ? uh : `${uh} UH`;
  return randomEncefaloTAC([`con coeficiente de atenuación aproximado de ${limpio}`, `con valores aproximados de atenuación de ${limpio}`, `con densidad aproximada de ${limpio}`]);
}
function textoMorfologiaBaseEncefaloTAC(multiple) {
  return multiple ? randomEncefaloTAC(["de densidad hídrica", "con densidad similar a la del líquido cefalorraquídeo", "de baja atenuación, con características similares al LCR", "de contenido hídrico bien delimitadas", "equivalentes al líquido cefalorraquídeo", "secundarias a pérdida de tejido encefálico"])
                  : randomEncefaloTAC(["de densidad hídrica", "con densidad similar a la del líquido cefalorraquídeo", "de baja atenuación, con características similares al LCR", "de contenido hídrico bien delimitada", "equivalente al líquido cefalorraquídeo", "secundaria a pérdida de tejido encefálico"]);
}
function textoCampoAsociadoEncefaloTAC(valor, excluir) { if (!valor || valor === excluir) return ""; return valor.charAt(0).toLowerCase() + valor.slice(1); }
function textoTraccionVentricularEncefaloTAC(estructura, lado) {
  if (!estructura || estructura === "Sin tracción ventricular significativa") return "";
  const mapas = {
    "Asta anterior del ventrículo lateral": { derecha: "condicionando tracción del asta anterior del ventrículo lateral derecho", izquierda: "condicionando tracción del asta anterior del ventrículo lateral izquierdo", bilateral: "condicionando tracción de las astas anteriores de los ventrículos laterales", ipsilateral: "condicionando tracción del asta anterior del ventrículo lateral ipsilateral" },
    "Asta posterior del ventrículo lateral": { derecha: "condicionando tracción del asta posterior del ventrículo lateral derecho", izquierda: "condicionando tracción del asta posterior del ventrículo lateral izquierdo", bilateral: "condicionando tracción de las astas posteriores de los ventrículos laterales", ipsilateral: "condicionando tracción del asta posterior del ventrículo lateral ipsilateral" },
    "Ventrículo lateral": { derecha: "condicionando tracción del ventrículo lateral derecho", izquierda: "condicionando tracción del ventrículo lateral izquierdo", bilateral: "condicionando tracción de ambos ventrículos laterales", ipsilateral: "condicionando tracción del ventrículo lateral ipsilateral" },
    "Asta temporal del ventrículo lateral": { derecha: "condicionando tracción del asta temporal del ventrículo lateral derecho", izquierda: "condicionando tracción del asta temporal del ventrículo lateral izquierdo", bilateral: "condicionando tracción de las astas temporales de los ventrículos laterales", ipsilateral: "condicionando tracción del asta temporal del ventrículo lateral ipsilateral" }
  };
  if (estructura === "3er ventrículo") return "condicionando tracción del 3er ventrículo";
  if (estructura === "4to ventrículo") return "condicionando tracción del 4to ventrículo";
  const mapa = mapas[estructura]; if (!mapa) return "";
  if (lado === "Derecha") return mapa.derecha;
  if (lado === "Izquierda") return mapa.izquierda;
  if (lado === "Bilateral") return mapa.bilateral;
  return mapa.ipsilateral;
}
function unirExtrasEncefaloTAC(extras) { const limpios = extras.filter(Boolean); if (!limpios.length) return ""; if (limpios.length === 1) return limpios[0]; return limpios.slice(0, -1).join(", ") + " y " + limpios[limpios.length - 1]; }
function limpiarPuntuacionEncefaloTAC(texto) { return texto.replace(/\s+/g, " ").replace(/\s+,/g, ",").replace(/,\s*\./g, ".").replace(/\.\s*\./g, ".").replace(/\s+\./g, ".").trim(); }
function validarPayload(p) {
  const errores = [];
  if (!p.tipo_encefalomalacia) errores.push("tipo_encefalomalacia");
  if (!Array.isArray(p.localizaciones) || !p.localizaciones.length) errores.push("localizaciones");
  (p.localizaciones || []).forEach((x,i)=>{ if(!x.localizacion) errores.push(`localizacion_${i+1}`); if(!x.lado) errores.push(`lado_${i+1}`); });
  const hayTraccion = p.traccion_ventricular && p.traccion_ventricular !== "Sin tracción ventricular significativa";
  if (hayTraccion && (!p.lado_traccion_ventricular || p.lado_traccion_ventricular === "No especificar")) errores.push("lado_traccion_ventricular");
  return errores;
}
function valorLimpioEncefaloTAC(valor) {
  if (valor === null || valor === undefined) return "";
  const txt = String(valor).trim();
  if (!txt) return "";
  if (txt.toLowerCase() === "null") return "";
  if (txt.toLowerCase() === "undefined") return "";
  return txt;
}

function generarDescripcionEncefaloTAC(p) {
  const multiple = esMultipleEncefaloTAC(p);
  const loc = textoLocalizacionesEncefaloTAC(p.localizaciones || []);
  const objeto = construirObjetoEncefaloTAC(p.tipo_encefalomalacia, multiple);
  const morfologia = textoMorfologiaBaseEncefaloTAC(multiple);

  const uh = valorLimpioEncefaloTAC(p.uh);
  const medidas = valorLimpioEncefaloTAC(p.medidas);
  const observaciones = valorLimpioEncefaloTAC(p.observaciones);

  const uhTexto = textoUHEencefaloTAC(uh);

  const inicio = multiple
    ? randomEncefaloTAC(["Se identifican", "Se observan", "Se evidencian", "Se documentan", "Se aprecian", "Se advierten", "Se reconocen", "Se detectan", "Se constatan", "Se distinguen", "Se ponen de manifiesto"])
    : randomEncefaloTAC(["Se identifica", "Se observa", "Se evidencia", "Se documenta", "Se aprecia", "Se advierte", "Se reconoce", "Se detecta", "Se constata", "Se distingue", "Se pone de manifiesto"]);

  let texto = `${inicio} ${objeto}`;

  if (loc) texto += ` ${loc}`;
  texto += `, ${morfologia}`;

  const datos = [];
  if (uhTexto) datos.push(uhTexto);
  if (medidas) datos.push(`con medidas aproximadas de ${medidas}`);

  if (datos.length) texto += `, ${unirExtrasEncefaloTAC(datos)}`;

  const extras = [];
  const traccionTexto = textoTraccionVentricularEncefaloTAC(
    p.traccion_ventricular,
    p.lado_traccion_ventricular
  );
  const gliosisTexto = textoCampoAsociadoEncefaloTAC(
    p.gliosis,
    "Sin cambios glióticos evidentes"
  );

  if (traccionTexto) extras.push(traccionTexto);
  if (gliosisTexto) extras.push(gliosisTexto);

  if (extras.length) texto += `, ${unirExtrasEncefaloTAC(extras)}`;

  texto += ".";

  if (observaciones) texto += ` ${observaciones}`;

  return limpiarPuntuacionEncefaloTAC(texto);
}
function generarConclusionEncefaloTAC(p) {
  const multiple = esMultipleEncefaloTAC(p);
  const loc = textoLocalizacionesEncefaloTAC(p.localizaciones || []);
  const objeto = articuloObjetoEncefaloTAC(p.tipo_encefalomalacia, multiple);
  let texto = `${objeto.charAt(0).toUpperCase() + objeto.slice(1)}`;
  if (loc) texto += ` ${loc}`;
  const extras = [];
  const traccionTexto = textoTraccionVentricularEncefaloTAC(p.traccion_ventricular, p.lado_traccion_ventricular);
  const gliosisTexto = textoCampoAsociadoEncefaloTAC(p.gliosis, "Sin cambios glióticos evidentes");
  if (traccionTexto) extras.push(traccionTexto); if (gliosisTexto) extras.push(gliosisTexto);
  if (extras.length) texto += `, ${unirExtrasEncefaloTAC(extras)}`;
  texto += ".";
  return limpiarPuntuacionEncefaloTAC(texto);
}

app.get("/health", (req, res) => res.json({ ok: true, service: "encefalomalacia-tac" }));
app.get("/opciones/encefalomalacia-tac", (req, res) => res.json(opcionesEncefaloTAC));
app.post("/generar/encefalomalacia-tac", (req, res) => {
  const errores = validarPayload(req.body || {});
  if (errores.length) return res.status(400).json({ ok: false, errores });
  const descripcion = generarDescripcionEncefaloTAC(req.body);
  const conclusion = generarConclusionEncefaloTAC(req.body);
  res.json({ ok: true, descripcion, conclusion, textoFinal: `${descripcion}

${conclusion}` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));
