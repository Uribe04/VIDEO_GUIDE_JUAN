// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURACIÓN DEL VIDEO — lo único que cambias para un video nuevo (además de
// guion/voz.txt, el audio y las escenas en src/scenes/).
// ─────────────────────────────────────────────────────────────────────────────

// 👉 AQUÍ SE REEMPLAZA ESTE CONTENIDO → los números del aprendizaje y del insight, y el título.
/**
 * CARÁTULA de inicio y de cierre (salen solas en todos los videos).
 * Solo cambia los números: quedan como "Aprendizaje 3" e "Insight 2".
 * Para el video general de un aprendizaje usa insight: 'General' (la carátula dice "Aprendizaje 3 · General").
 */
export const CARATULA = {
  aprendizaje: '2',
  insight: '2',
  /** Título del video (debajo de los números). */
  titulo: 'El consentimiento es el nuevo núcleo político de Open Finance',
  /** Línea pequeña de arriba: cliente y trimestre, o el proyecto. */
  cliente: 'ACH · Q2 2026',
};

// 👉 AQUÍ SE REEMPLAZA ESTE CONTENIDO → cliente, trimestre, tendencia/aprendizaje e insight.
/** Footer de identificación (pastilla abajo a la izquierda en todas las escenas). [] para ocultarlo. */
export const FOOTER: string[] = ['Foresight', 'ACH', 'Tendencia 2', 'Insight 2'];

/** Estilo: 'scrapbook' (papel, cinta, marcador) o 'limpio' (flat, colores exactos de la marca). */
export const STYLE: 'scrapbook' | 'limpio' = 'scrapbook';

// 👉 AQUÍ SE REEMPLAZA ESTE CONTENIDO → agrega el logo del cliente (en app/public/logos/).
/** Logos del cierre (archivos en app/public/logos/, blancos para fondo azul). Agrega aquí el del cliente.
 *  ACH usa la versión blanca recortada (ach_logo_blanco.png); el original a color es Logo-ACH-Transferencias.png. */
export const LOGOS: { file: string; height: number }[] = [
  { file: 'logos/ach_logo_blanco.png', height: 100 },
  { file: 'logos/innlab_logo.svg', height: 62 },
  { file: 'logos/icesi_logo.svg', height: 115 },
];

// 👉 AQUÍ SE REEMPLAZA ESTE CONTENIDO → tus escenas y la primera frase de cada una (las i2_* son las del video de Aprendizaje 2 · Insight 2).
/**
 * Escenas en orden. `file` = archivo en src/scenes/ (sin .ts).
 * `from` = un pedazo de la primera frase de la escena tal como está en guion/voz.txt:
 * el corte se hace justo antes de que la voz la diga (la primera escena no lo necesita).
 */
export const SCENES: { file: string; from?: string }[] = [
  { file: 'i2_gancho' },
  { file: 'i2_insight', from: 'El consentimiento es el nuevo núcleo' },
  { file: 'i2_brecha', from: 'La infraestructura ya está lista' },
  { file: 'i2_consentimiento', from: 'Por eso el consentimiento dejó' },
  { file: 'i2_colombia', from: 'Para Colombia, el consentimiento' },
  { file: 'i2_cierre', from: 'Sin consentimiento claro' },
];
