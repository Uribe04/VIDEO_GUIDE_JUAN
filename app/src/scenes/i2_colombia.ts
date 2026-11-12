// 👉 AQUÍ SE REEMPLAZA ESTE CONTENIDO
// ESCENA 5 — Qué significa para Colombia (fondo papel, tres momentos)
// Voz: "Para Colombia, el consentimiento debe tratarse como un producto, no solo como un requisito legal.
// Sin trazabilidad y sin beneficio percibido, ni la infraestructura ni la norma bastan.
// ¿Nuestro consentimiento se entiende, o solo se acepta?"
// 1) Dos papeles: "Requisito legal" (gris) y "Producto" (azul, con cinta).
// 2) Dos fichas azules (trazabilidad, beneficio percibido) y dos grises que se tachan (infraestructura, norma).
// 3) La pregunta final en un papel amarillo grande; Valentina piensa.
import type { Frame, PostOverrides } from '../engine/scene';
import { C, Plate, Puppet, type PupKey, at, burst, clamp, decor, doodle, ease, float, kinetic, labelPill, measureText, pop, scratchOut, spoken, tape, text, tornPaper, vis, type KWordT } from './_kit';

export default class I2Colombia extends Plate {
  char = new Puppet('valentina');
  keys: PupKey[] = [];
  h1: KWordT[] = []; h2: KWordT[] = []; q1: KWordT[] = []; q2: KWordT[] = [];
  tProd = 0; tReq = 0; tL2 = 0; tL3 = 0;
  tTraz = 0; tBen = 0; tInfra = 0; tNorma = 0; tBastan = 0; tAcepta = 0;
  override async load() { await this.char.load(); }

  override setup() {
    const S = this.S, L1 = 'Para Colombia, el consentimiento debe', L2 = 'Sin trazabilidad y sin beneficio', L3 = 'Nuestro consentimiento se entiende';
    this.prevBg = C.azul;
    this.h1 = spoken(S, L1, 'Para', 'consentimiento');
    this.h2 = spoken(S, L2, 'Sin', 'percibido,');
    this.q1 = spoken(S, L3, 'Nuestro', 'entiende,');
    this.q2 = spoken(S, L3, 'o', 'acepta?');
    this.tProd = S.word(L1, 'producto,').start;
    this.tReq = S.word(L1, 'requisito').start;
    this.tL2 = S.line(L2).start;
    this.tL3 = S.line(L3).start;
    this.tTraz = S.word(L2, 'trazabilidad').start;
    this.tBen = S.word(L2, 'beneficio').start;
    this.tInfra = S.word(L2, 'infraestructura').start;
    this.tNorma = S.word(L2, 'norma').start;
    this.tBastan = S.word(L2, 'bastan.').start;
    this.tAcepta = S.word(L3, 'acepta?').start;
    this.keys = [
      { at: -1, pose: 'neutral', head: 'sonrisa' },
      { at: this.tL3, pose: 'piensa', head: 'duda' },
    ];
  }

  draw(c: CanvasRenderingContext2D, t: number, _f: Frame): PostOverrides {
    const t0 = this.ctx.start;
    decor(c, t, false, 25);
    const A = vis(t, t0 + 0.1, this.tL2 - 0.1), B = vis(t, this.tL2 + 0.15, this.tL3 - 0.1), D = vis(t, this.tL3 + 0.1);

    // 1) requisito legal vs producto
    at(c, 0, 0, { a: A }, () => {
      kinetic(c, t, this.h1, 1100, 170, { w: 800, size: 64, col: C.azul, align: 'center' });
      at(c, 740, 520 + float(t, 1, 4, 1.1), { s: pop(t, this.tReq - 0.05, 0.45), r: -0.03 }, () => {
        tornPaper(c, 500, 300, C.gris2, 81);
        c.fillStyle = C.gris1;
        [380, 340, 360, 280].forEach((w, i) => { c.fillRect(-190, -90 + i * 34, w, 10); });
        text(c, 'Requisito legal', 0, 105, { w: 800, size: 46, col: C.gris1, align: 'center' });
      });
      text(c, 'no solo', 1085, 535, { w: 700, size: 34, col: C.gris1, align: 'center', alpha: pop(t, this.tReq) });
      const pk = pop(t, this.tProd - 0.05, 0.45);
      at(c, 1440, 520 + float(t, 2, 4, 1.1), { s: pk, r: 0.03 }, () => {
        tornPaper(c, 520, 320, C.azul, 82);
        text(c, 'Producto', 0, 25, { w: 800, size: 80, col: C.blanco, align: 'center' });
      });
      if (pk >= 1) tape(c, 1440 - 190, 520 - 165, 130, -0.5, undefined, 83);
      burst(c, 1440, 520, t, this.tProd + 0.2, C.amarillo, 90, 10);
    });

    // 2) lo que sí falta y lo que no alcanza
    at(c, 0, 0, { a: B }, () => {
      kinetic(c, t, this.h2, 1100, 170, { w: 800, size: 62, col: C.azul, align: 'center' });
      const chip = (s: string, x: number, y: number, ts: number, fill: string, col: string) => {
        at(c, x, y + float(t, x, 4, 1.2), { s: pop(t, ts - 0.05, 0.45) }, () => labelPill(c, s, 0, 0, { fill, col, size: 56, w: 700 }));
      };
      chip('trazabilidad', 800, 430, this.tTraz, C.azul, C.blanco);
      chip('beneficio percibido', 1420, 430, this.tBen, C.azul, C.blanco);
      chip('infraestructura', 800, 670, this.tInfra, C.gris2, C.gris1);
      chip('norma', 1420, 670, this.tNorma, C.gris2, C.gris1);
      const sk = ease.inOutCubic(clamp((t - this.tBastan + 0.15) / 0.45));
      const w1 = measureText(c, 'infraestructura', 600, 56) + 68, w2 = measureText(c, 'norma', 600, 56) + 68;
      scratchOut(c, 800 - w1 / 2, 625, w1, 90, sk, C.naranja, 11);
      scratchOut(c, 1420 - w2 / 2, 625, w2, 90, sk, C.naranja, 11);
      text(c, 'no bastan', 1110, 830, { w: 800, size: 58, col: C.naranja, align: 'center', alpha: clamp((t - this.tBastan) / 0.4) });
    });

    // 3) la pregunta
    at(c, 0, 0, { a: D }, () => {
      at(c, 1170, 520 + float(t, 4, 5, 1), { s: pop(t, this.tL3 + 0.05, 0.5), r: -0.02 }, () => tornPaper(c, 1340, 380, C.amarillo, 91));
      tape(c, 1170 - 590, 520 - 175, 130, -0.5, undefined, 92);
      kinetic(c, t, this.q1, 1170, 505, { w: 800, size: 58, col: C.azul, align: 'center' });
      kinetic(c, t, this.q2, 1170, 595, { w: 800, size: 58, col: C.azul, align: 'center' });
      doodle(c, 'spark', 1730, 300, 28, C.azul, ease.inOutCubic(clamp((t - this.tAcepta) / 0.4)));
      doodle(c, 'star', 560, 300, 30, C.naranja, ease.inOutCubic(clamp((t - this.tL3 - 0.5) / 0.5)));
    });
    at(c, 290, 960, { s: pop(t, this.tL3 + 0.1, 0.5) }, () => this.char.draw(c, 0, 0, 570, t, this.keys, { seed: 6 }));
    return {};
  }
}
