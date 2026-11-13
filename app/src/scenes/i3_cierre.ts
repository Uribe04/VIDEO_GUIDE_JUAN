// 👉 AQUÍ SE REEMPLAZA ESTE CONTENIDO
// ESCENA 6 — Cierre (fondo azul)
// Voz: "Colombia ya tiene las piezas; falta la arquitectura que las vuelva sistema. Futuros Vivos, por InnLab."
// La frase final llega palabra por palabra sobre tres tiras de papel rasgado pegadas con cinta;
// "sistema" se marca con resaltador. Luego "Futuros Vivos" en papel amarillo y los logos de video.config.ts.
import type { Frame, PostOverrides } from '../engine/scene';
import { C, Plate, at, clamp, decor, doodle, drawLogos, ease, float, inn, kinetic, loadLogos, measureText, pop, pt, spoken, strokeTrim, tape, text, tornPaper, type KWordT } from './_kit';

const SIZE = 74;

export default class I3Cierre extends Plate {
  logos: (HTMLImageElement | null)[] = [];
  s1: KWordT[] = []; s2: KWordT[] = []; s3: KWordT[] = [];
  tFV = 0; tLogos = 0; tSis = 0;
  override async load() { this.logos = await loadLogos(); }

  override setup() {
    const S = this.S, L1 = 'Colombia ya tiene las piezas', L2 = 'Futuros Vivos, por';
    this.prevBg = C.blanco;
    this.s1 = spoken(S, L1, 'Colombia', 'piezas;');
    this.s2 = spoken(S, L1, 'falta', 'arquitectura');
    this.s3 = spoken(S, L1, 'que', 'sistema.');
    this.tSis = S.word(L1, 'sistema.').start;
    this.tFV = S.word(L2, 'Futuros').start;
    this.tLogos = S.word(L2, 'InnLab.').start;
  }

  draw(c: CanvasRenderingContext2D, t: number, _f: Frame): PostOverrides {
    c.fillStyle = C.azul; c.fillRect(0, 0, 1920, 1080);
    decor(c, t, true, 36);
    /** Una tira de papel con sus palabras; `under` dibuja algo entre el papel y el texto (el resaltador). */
    const strip = (words: KWordT[], y: number, seed: number, under?: (left: number, fy: number) => void) => {
      const k = ease.outBack(clamp((t - words[0]!.at + 0.2) / 0.35), 1.4);
      if (k <= 0) return;
      const tw = words.reduce((a, w) => a + measureText(c, w.s, 800, SIZE), 0) + measureText(c, ' ', 800, SIZE) * (words.length - 1);
      const fy = float(t, seed, 3, 1.1);
      at(c, 960, y - SIZE * 0.33 + fy, { s: k, r: (seed % 2 ? 1 : -1) * 0.01 }, () => tornPaper(c, tw + 80, SIZE * 1.5, '#FFFFFF', seed));
      if (k >= 1) tape(c, 960 - tw / 2 - 30, y - SIZE * 0.85 + fy, 100, -0.5, undefined, seed + 1);
      under?.(960 - tw / 2, fy);
      kinetic(c, t, words, 960, y + fy, { w: 800, size: SIZE, col: C.azul, align: 'center' });
    };
    strip(this.s1, 250, 95);
    strip(this.s2, 385, 96);
    strip(this.s3, 520, 97, (left, fy) => {
      // resaltador sobre "sistema" (debajo del texto)
      const hk = ease.inOutCubic(clamp((t - this.tSis - 0.3) / 0.45));
      if (hk <= 0) return;
      const sp = measureText(c, ' ', 800, SIZE);
      const px = left + ['que', 'las', 'vuelva'].reduce((a, w) => a + measureText(c, w, 800, SIZE) + sp, 0);
      const pw = measureText(c, 'sistema', 800, SIZE);
      const yy = 520 - SIZE * 0.34 + fy;
      c.save(); c.strokeStyle = C.amarillo; c.lineWidth = 46;
      strokeTrim(c, [pt(px - 6, yy + 2), pt(px + pw + 6, yy - 2)], hk); c.restore();
    });
    doodle(c, 'star', 1640, 190, 38, C.amarillo, ease.inOutCubic(clamp((t - this.tSis - 0.4) / 0.5)));
    doodle(c, 'heart', 220, 700, 28, C.naranja, ease.inOutCubic(clamp((t - this.tSis - 0.7) / 0.5)));

    // Futuros Vivos
    const fk = pop(t, this.tFV - 0.05, 0.45);
    at(c, 960, 710, { s: fk, r: -0.02 }, () => {
      tornPaper(c, 560, 100, C.amarillo, 98);
      text(c, 'Futuros Vivos', 0, 20, { w: 800, size: 58, col: C.azul, align: 'center' });
    });
    // logos
    drawLogos(c, this.logos, 960, 895, inn(t, this.tLogos - 0.1, 0.5));
    return {};
  }
}
