// 👉 AQUÍ SE REEMPLAZA ESTE CONTENIDO
// ESCENA 2 — El aprendizaje (fondo azul)
// Voz: "Aprendizaje 2: regulación que abre, no fragmenta. La regulación dejó de ser solo cumplimiento:
// ahora es arquitectura de mercado."
// "Aprendizaje 2" en papel amarillo y el título en dos tiras blancas con cinta. Abajo, "solo cumplimiento"
// (gris, se tacha) y una flecha de marcador hacia "arquitectura de mercado" (papel blanco).
import type { Frame, PostOverrides } from '../engine/scene';
import { C, Plate, at, clamp, decor, doodle, doodleArrow, ease, float, kinetic, labelPill, measureText, pop, pt, scratchOut, spoken, tape, tornPaper, type KWordT } from './_kit';

const SIZE = 84;

export default class G2Aprendizaje extends Plate {
  ap: KWordT[] = []; w1: KWordT[] = []; w2: KWordT[] = []; arq: KWordT[] = [];
  tCumpl = 0; tAhora = 0; tArq = 0; tEnd = 0;

  override setup() {
    const S = this.S, L1 = 'Aprendizaje 2: regulación', L2 = 'La regulación dejó de ser';
    this.prevBg = C.blanco;
    this.ap = spoken(S, L1, 'Aprendizaje', '2:');
    this.w1 = spoken(S, L1, 'regulación', 'abre,');
    this.w2 = spoken(S, L1, 'no', 'fragmenta.');
    this.arq = spoken(S, L2, 'arquitectura', 'mercado.');
    this.tCumpl = S.word(L2, 'cumplimiento:').start;
    this.tAhora = S.word(L2, 'ahora').start;
    this.tArq = S.word(L2, 'arquitectura').start;
    this.tEnd = S.word(L2, 'mercado.').end;
  }

  draw(c: CanvasRenderingContext2D, t: number, _f: Frame): PostOverrides {
    const t0 = this.ctx.start;
    c.fillStyle = C.azul; c.fillRect(0, 0, 1920, 1080);
    decor(c, t, true, 42);

    /** Una tira de papel con sus palabras. */
    const strip = (words: KWordT[], y: number, seed: number, fill: string, size: number) => {
      const k = ease.outBack(clamp((t - words[0]!.at + 0.25) / 0.35), 1.4);
      if (k <= 0) return;
      const tw = words.reduce((a, w) => a + measureText(c, w.s, 800, size), 0) + measureText(c, ' ', 800, size) * (words.length - 1);
      const fy = float(t, seed, 4, 1.1);
      at(c, 960, y - size * 0.33 + fy, { s: k, r: (seed % 2 ? 1 : -1) * 0.012 }, () => tornPaper(c, tw + 80, size * 1.5, fill, seed));
      if (k >= 1) tape(c, 960 - tw / 2 - 30, y - size * 0.85 + fy, 100, -0.5, undefined, seed + 1);
      kinetic(c, t, words, 960, y + fy, { w: 800, size, col: C.azul, align: 'center' });
    };
    strip(this.ap, 200, 47, C.amarillo, 64);
    strip(this.w1, 370, 48, C.blanco, SIZE);
    strip(this.w2, 520, 49, C.blanco, SIZE);

    // cumplimiento → arquitectura de mercado
    const ck = pop(t, this.tCumpl - 0.1, 0.45);
    at(c, 520, 800 + float(t, 2, 4, 1.2), { s: ck, r: -0.02 }, () => labelPill(c, 'solo cumplimiento', 0, 0, { fill: C.gris2, col: C.gris1, size: 46, w: 700 }));
    const cw = measureText(c, 'solo cumplimiento', 700, 46) + 68;
    scratchOut(c, 520 - cw / 2, 765, cw, 70, ease.inOutCubic(clamp((t - this.tAhora) / 0.45)), C.naranja, 10);
    doodleArrow(c, pt(800, 800), pt(880, 740), pt(960, 790), ease.inOutCubic(clamp((t - this.tAhora) / 0.5)), C.amarillo, 9);
    const ak = ease.outBack(clamp((t - this.tArq + 0.2) / 0.35), 1.4);
    if (ak > 0) {
      const tw = measureText(c, 'arquitectura de mercado.', 800, 62);
      const fy = float(t, 5, 4, 1.1);
      at(c, 1380, 800 - 20 + fy, { s: ak, r: 0.015 }, () => tornPaper(c, tw + 80, 100, C.blanco, 50));
      kinetic(c, t, this.arq, 1380, 800 + fy, { w: 800, size: 62, col: C.azul, align: 'center' });
    }

    doodle(c, 'star', 1720, 220, 36, C.amarillo, ease.inOutCubic(clamp((t - this.w2[0]!.at) / 0.5)));
    doodle(c, 'spark', 220, 300, 24, C.blanco, ease.inOutCubic(clamp((t - t0 - 0.4) / 0.4)));
    doodle(c, 'heart', 1760, 960, 26, C.naranja, ease.inOutCubic(clamp((t - this.tEnd) / 0.5)));
    return {};
  }
}
