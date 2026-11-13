// 👉 AQUÍ SE REEMPLAZA ESTE CONTENIDO
// ESCENA 4 — El dato fuerte: la concentración (fondo azul)
// Voz: "Pero ese crecimiento se concentra. Crédito virtual, con el 35,6 %, y pagos digitales, con el 28,8 %,
// suman casi dos tercios del ecosistema."
// Una barra del 100 % del ecosistema fintech: el tramo de crédito virtual (naranja) y el de pagos digitales
// (amarillo) se llenan a escala cuando la voz dice cada cifra; el resto queda apagado. Una llave de marcador
// junta los dos tramos y un papel dice "casi dos tercios". Fuente: Giraldo & López, 2024 (REC-0220).
import type { Frame, PostOverrides } from '../engine/scene';
import { C, Plate, at, clamp, decor, doodle, ease, float, hexA, inn, kinetic, pop, pt, rrect, spoken, strokeTrim, tape, text, tornPaper, type KWordT } from './_kit';

const X0 = 260, W = 1400, BY = 520, BH = 110;  // la barra del ecosistema (100 %)
const SEG = [
  { pct: 0.356, col: C.naranja, label: 'Crédito virtual', num: '35,6 %' },
  { pct: 0.288, col: C.amarillo, label: 'Pagos digitales', num: '28,8 %' },
];

export default class I3Concentracion extends Plate {
  h: KWordT[] = []; tercios: KWordT[] = [];
  tLab: number[] = []; tNum: number[] = []; tDos = 0; tTercios = 0; tConc = 0;

  override setup() {
    const S = this.S, L1 = 'Pero ese crecimiento se concentra', L2 = 'Crédito virtual, con el 35,6';
    this.prevBg = C.blanco;
    this.h = spoken(S, L1);
    this.tercios = spoken(S, L2, 'casi', 'tercios');
    this.tConc = S.word(L1, 'concentra.').start;
    this.tLab = [S.word(L2, 'Crédito').start, S.word(L2, 'pagos').start];
    this.tNum = [S.word(L2, '35,6').start, S.word(L2, '28,8').start];
    this.tDos = S.word(L2, 'casi').start;
    this.tTercios = S.word(L2, 'tercios').start;
  }

  draw(c: CanvasRenderingContext2D, t: number, _f: Frame): PostOverrides {
    const t0 = this.ctx.start;
    c.fillStyle = C.azul; c.fillRect(0, 0, 1920, 1080);
    decor(c, t, true, 34);
    kinetic(c, t, this.h, 960, 180, { w: 800, size: 68, col: C.blanco, align: 'center' });

    // la barra entera (100 % del ecosistema fintech)
    const bk = inn(t, this.tConc - 0.1, 0.5);
    if (bk > 0) {
      at(c, 0, 0, { a: bk }, () => {
        c.fillStyle = hexA(C.blanco, 0.22); rrect(c, X0, BY - BH / 2, W * ease.outCubic(bk), BH, 18); c.fill();
        text(c, 'ecosistema fintech', X0 + W - 210, BY + 14, { w: 600, size: 32, col: C.blanco, align: 'center', alpha: 0.75 });
      });
    }

    // los dos tramos, a escala
    let x = X0;
    SEG.forEach((s, i) => {
      const fk = ease.outCubic(clamp((t - this.tNum[i]! + 0.1) / 0.7));
      const sw = W * s.pct;
      if (fk > 0) { c.fillStyle = s.col; rrect(c, x, BY - BH / 2, sw * fk, BH, i === 0 ? [18, 0, 0, 18] : 0); c.fill(); }
      // etiqueta arriba
      const lk = inn(t, this.tLab[i]! - 0.05, 0.4);
      if (lk > 0) text(c, s.label, x + sw / 2, BY - 90 + (1 - lk) * 20, { w: 700, size: 42, col: C.blanco, align: 'center', alpha: lk });
      // la cifra en un papel debajo
      const pk = pop(t, this.tNum[i]! - 0.05, 0.45);
      const cx = x + sw / 2, fy = float(t, i + 3, 4, 1.2);
      at(c, cx, BY + 140 + fy, { s: pk, r: i ? -0.03 : 0.03 }, () => {
        tornPaper(c, 270, 110, C.blanco, 80 + i);
        text(c, s.num, 0, 24, { w: 800, size: 64, col: C.azul, align: 'center' });
      });
      if (pk >= 1) tape(c, cx, BY + 85 + fy, 90, -0.05, undefined, 85 + i);
      x += sw;
    });

    // la llave que junta los dos tramos + "casi dos tercios"
    const xb1 = X0 + W * (SEG[0]!.pct + SEG[1]!.pct), yb = BY + 245, mid = (X0 + xb1) / 2;
    const kk = ease.inOutCubic(clamp((t - this.tDos) / 0.5));
    c.save(); c.strokeStyle = C.amarillo; c.lineWidth = 8; c.lineCap = 'round'; c.lineJoin = 'round';
    strokeTrim(c, [pt(X0 + 10, yb - 25), pt(X0 + 10, yb), pt(mid - 22, yb), pt(mid, yb + 26), pt(mid + 22, yb), pt(xb1 - 10, yb), pt(xb1 - 10, yb - 25)], kk);
    c.restore();
    const tk = pop(t, this.tTercios - 0.15, 0.45);
    at(c, mid, yb + 115 + float(t, 9, 4, 1.1), { s: tk, r: -0.02 }, () => tornPaper(c, 560, 100, C.amarillo, 88));
    kinetic(c, t, this.tercios, mid, yb + 135 + float(t, 9, 4, 1.1), { w: 800, size: 56, col: C.azul, align: 'center' });

    // fuente
    text(c, 'Giraldo & López, 2024 · REC-0220', 1500, 1010, { w: 500, size: 24, col: C.blanco, align: 'center', alpha: inn(t, this.tNum[0]!, 0.5) * 0.8 });

    doodle(c, 'star', 1740, 200, 36, C.amarillo, ease.inOutCubic(clamp((t - this.tConc) / 0.5)));
    doodle(c, 'spark', 180, 260, 24, C.blanco, ease.inOutCubic(clamp((t - t0 - 0.4) / 0.4)));
    return {};
  }
}
