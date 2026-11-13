> 👉 AQUÍ SE REEMPLAZA ESTE CONTENIDO — guion del video **general del Aprendizaje 2** (ACH). Para un video nuevo, copia `plantilla-guion.md`.

# Regulación que abre, no fragmenta

**Video:** Aprendizaje 2 · General — Regulación que abre, no fragmenta · **Cliente / informe:** ACH · Q2 2026 · Foresight a Medida
**Duración objetivo:** ~57 s de voz, 133 palabras (más las carátulas de inicio y cierre, que salen solas) · **Formato:** 16:9, 1920×1080, 30 fps

**Mensaje clave (1 frase):** abrir datos no basta: la regulación ya es arquitectura de mercado, y en Colombia la ventaja será de quien abra mejor (con estándares, consentimiento y gobernanza), no de quien abra primero.

**Qué hace este video:** es el resumen del aprendizaje. Presenta la idea central, repasa los tres insights (uno por frase) y las tres tendencias, y deja una pregunta para Colombia. Por eso no lleva un dato fuerte propio: los datos viven en los videos de cada insight.

## Guía de estilo
- Identidad Icesi: azul `#5454E9` en cada escena, texto blanco sobre azul o azul/negro sobre blanco, Plus Jakarta Sans (ver `docs/01-guion.md`).
- Estilo: `scrapbook` (papel, cinta, marcador). Fondos alternando papel y azul.
- Personas: solo con `Puppet` (Valentina, Andrés, Camila). Footer libre abajo a la izquierda: "Foresight · ACH · Tendencia 2 · General".
- Carátula: "Aprendizaje 2 · General" (`insight: 'General'` en `video.config.ts`).

## Texto para ElevenLabs
```
Abrir los datos financieros parece la meta. Pero abrir no basta.
<break time="0.7s" />
Aprendizaje 2: regulación que abre, no fragmenta. La regulación dejó de ser solo cumplimiento: ahora es arquitectura de mercado.
<break time="0.7s" />
Lo vimos en tres insights. Uno: el problema ya no es abrir datos, sino diseñar el mercado. Dos: el consentimiento es el nuevo núcleo de Open Finance. Tres: Colombia ya avanzó, pero regula por piezas.
<break time="0.7s" />
¿Qué viene? Primero, estandarización útil antes que apertura simbólica. Después, consentimiento activo y trazable como ventaja competitiva. Y en tres a cinco años, pasar de Open Banking regulado a Open Finance gobernado.
<break time="0.7s" />
Para Colombia, la ventaja no será del que abra primero, sino del que abra mejor. ¿Quién va a definir el lenguaje común de nuestro mercado?
<break time="0.8s" />
Abrir con reglas que sostengan la confianza. Futuros Vivos, por InnLab.
```

## Escenas

Tiempos aproximados contados desde que empieza la voz (provisionales; con la voz real se ajustan solos).

| # | Tiempo aprox. | Voz en off | Texto en pantalla | Sugerencia visual |
|---|---|---|---|---|
| 1 | 0:00–0:05 | Abrir los datos financieros parece la meta. Pero abrir no basta. | Abrir los datos financieros parece la meta. · Pero abrir no basta. | Fondo papel. Un candado grande se abre en "Abrir" y de él salen íconos de datos flotando; en "meta" aparece un banderín. La segunda frase llega en una tira de papel y "no basta" se encierra con marcador naranja. Andrés (cara de duda) se encoge de hombros. |
| 2 | 0:05–0:13 | Aprendizaje 2: regulación que abre, no fragmenta. La regulación dejó de ser solo cumplimiento: ahora es arquitectura de mercado. | Aprendizaje 2 · regulación que abre, no fragmenta. · cumplimiento → arquitectura de mercado | Fondo azul. "Aprendizaje 2" en papel amarillo y el título en tiras blancas con cinta. Abajo, "solo cumplimiento" (gris, se tacha) y una flecha de marcador hacia "arquitectura de mercado" (papel blanco). |
| 3 | 0:13–0:27 | Lo vimos en tres insights. Uno: el problema ya no es abrir datos, sino diseñar el mercado. Dos: el consentimiento es el nuevo núcleo de Open Finance. Tres: Colombia ya avanzó, pero regula por piezas. | Lo vimos en tres insights. · 1 diseñar el mercado · 2 el nuevo núcleo · 3 regula por piezas | Fondo papel. Tres tarjetas numeradas aparecen cuando la voz dice "Uno", "Dos" y "Tres"; la que se está nombrando se agranda un poco y las demás se apagan. |
| 4 | 0:27–0:41 | ¿Qué viene? Primero, estandarización útil antes que apertura simbólica. Después, consentimiento activo y trazable como ventaja competitiva. Y en tres a cinco años, pasar de Open Banking regulado a Open Finance gobernado. | ¿Qué viene? · Primero: estandarización útil · Después: consentimiento activo y trazable · tres a cinco años: Open Finance gobernado | Fondo azul. Una flecha de horizonte cruza la pantalla con tres paradas; en cada una cae una tarjeta de papel con la tendencia cuando la voz la nombra. |
| 5 | 0:41–0:51 | Para Colombia, la ventaja no será del que abra primero, sino del que abra mejor. ¿Quién va a definir el lenguaje común de nuestro mercado? | del que abra primero ✗ · del que abra mejor ✓ · ¿Quién va a definir el lenguaje común de nuestro mercado? | Fondo papel. "del que abra primero" (gris, se tacha) frente a "del que abra mejor" (azul, con destello). Luego la pregunta en un papel amarillo grande; Valentina piensa. |
| 6 | 0:51–0:56 | Abrir con reglas que sostengan la confianza. Futuros Vivos, por InnLab. | Abrir con reglas · que sostengan la confianza. | Fondo azul. Dos tiras de papel rasgado con cinta; "confianza" se marca con resaltador. Luego "Futuros Vivos" en papel amarillo y los logos de ACH, InnLab e Icesi. |

## Notas para quien produce el video
- **Fuente:** páginas 27–43 del informe (Aprendizaje 2: introducción, tres insights y tres tendencias).
- **Carátulas:** `CARATULA = { aprendizaje: '2', insight: 'General', ... }` en `app/src/video.config.ts`.
- **Pronunciación (`SPOKEN` en `analysis/align_vo.py`):** "2", "Open", "Banking" y "Finance" ya están. Si la voz los dice distinto, se ajusta ahí.
- **Si cambias el texto en ElevenLabs,** cambia también `guion/voz.txt` palabra por palabra antes de sincronizar.
- **Con la voz:** déjala en la carpeta `audio` y avísale a Claude, o corre `preparar_voz.py` (ver `docs/02-voz.md`). Las escenas se acomodan solas.
