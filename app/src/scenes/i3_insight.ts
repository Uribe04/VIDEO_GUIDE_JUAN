// 👉 AQUÍ SE REEMPLAZA ESTE CONTENIDO
// ESCENA 2 — El insight (fondo azul)
// Voz: "Así está Colombia: ya avanzó, pero regula por piezas, no por arquitectura."
// La frase entra palabra por palabra sobre tres tiras de papel rasgado con cinta; "piezas" se marca con
// resaltador amarillo (debajo del texto, para que se siga leyendo azul). Valentina señala el título.
import type { Frame, PostOverrides } from '../engine/scene';
import { C, Plate, Puppet, type PupKey, at, clamp, decor, doodle, ease, float, kinetic, measureText, pop, pt, spoken, strokeTrim, tape, tornPaper, type KWordT } from './_kit';

const CX = 1120, SIZE = 88;

export default class I3Insight extends Plate {
  char = new Puppet('valentina');
  keys: PupKey[] = [];
  w1: KWordT[] = []; w2: KWordT[] = []; w3: KWordT[] = [];
  tPiezas = 0; tEnd = 0;
  override async load() { await this.char.load(); }

  override setup() {
    const S = this.S, L = 'Así está Colombia';
    this.prevBg = C.blanco;
    this.w1 = spoken(S, L, 'Así', 'avanzó,');
    this.w2 = spoken(S, L, 'pero', 'piezas,');
    this.w3 = spoken(S, L, 'no', 'arquitectura.');
    this.tPiezas = S.word(L, 'piezas,').start;
    this.tEnd = S.word(L, 'arquitectura.').end;
    this.keys = [
      { at: -1, pose: 'neutral', head: 'sonrisa' },
      { at: S.line(L).start, pose: 'senala', head: 'habla' },
      { at: this.tEnd + 0.3, pose: 'explica', head: 'sonrisa' },
    ];
  }

  draw(c: CanvasRenderingContext2D, t: number, _f: Frame): PostOverrides {
    const t0 = this.ctx.start;
    c.fillStyle = C.azul; c.fillRect(0, 0, 1920, 1080);
    decor(c, t, true, 32);

    /** Una tira de papel con sus palabras; `under` dibuja algo entre el papel y el texto (el resaltador). */
    const strip = (words: KWordT[], y: number, seed: number, under?: (left: number, fy: number) => void) => {
      const k = ease.outBack(clamp((t - words[0]!.at + 0.25) / 0.35), 1.4);
      if (k <= 0) return;
      const tw = words.reduce((a, w) => a + measureText(c, w.s, 800, SIZE), 0) + measureText(c, ' ', 800, SIZE) * (words.length - 1);
      const fy = float(t, seed, 4, 1.1);
      at(c, CX, y - SIZE * 0.33 + fy, { s: k, r: (seed % 2 ? 1 : -1) * 0.01 }, () => tornPaper(c, tw + 80, SIZE * 1.5, '#FFFFFF', seed));
      if (k >= 1) tape(c, CX - tw / 2 - 30, y - SIZE * 0.85 + fy, 100, -0.5, undefined, seed + 1);
      under?.(CX - tw / 2, fy);
      kinetic(c, t, words, CX, y + fy, { w: 800, size: SIZE, col: C.azul, align: 'center' });
    };
    strip(this.w1, 350, 35);
    strip(this.w2, 510, 36, (left, fy) => {
      const hk = ease.inOutCubic(clamp((t - this.tPiezas - 0.3) / 0.45));
      if (hk <= 0) return;
      const sp = measureText(c, ' ', 800, SIZE);
      const px = left + ['pero', 'regula', 'por'].reduce((a, w) => a + measureText(c, w, 800, SIZE) + sp, 0);
      const pw = measureText(c, 'piezas,', 800, SIZE);
      const yy = 510 - SIZE * 0.34 + fy;
      c.save(); c.strokeStyle = C.amarillo; c.lineWidth = 52;
      strokeTrim(c, [pt(px - 8, yy + 2), pt(px + pw + 4, yy - 2)], hk); c.restore();
    });
    strip(this.w3, 670, 37);

    // Valentina señala el título
    at(c, 320, 960, { s: pop(t, t0 + 0.2, 0.5) }, () => this.char.draw(c, 0, 0, 420, t, this.keys, { seed: 4 }));

    doodle(c, 'star', 1760, 230, 38, C.amarillo, ease.inOutCubic(clamp((t - this.tEnd) / 0.5)));
    doodle(c, 'spark', 560, 220, 24, C.blanco, ease.inOutCubic(clamp((t - this.w1[0]!.at) / 0.4)));
    doodle(c, 'heart', 1620, 860, 30, C.naranja, ease.inOutCubic(clamp((t - this.tEnd - 0.3) / 0.5)));
    return {};
  }
}
