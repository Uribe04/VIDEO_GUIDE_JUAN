// 👉 AQUÍ SE REEMPLAZA ESTE CONTENIDO
// ESCENA 5 — Qué significa para Colombia y para ACH (fondo papel, tres momentos)
// Voz: "La regulación acompaña el crecimiento, pero no lo ordena. Los innovadores operan con incertidumbre,
// y los usuarios quedan en zonas grises. Para ACH, el reto es pasar de regular vertical por vertical a diseñar
// una arquitectura transversal: estándares, consentimiento y gobernanza de datos.
// ¿Qué pieza nos falta para que esto funcione como sistema?"
// 1) "acompaña" con palomita y "ordena" tachado; dos tarjetas: innovadores (incertidumbre) y usuarios (zonas grises).
// 2) Cuatro columnas grises (vertical por vertical); en "transversal" una viga azul las cruza y sobre ella se
//    pegan estándares, consentimiento y gobernanza de datos.
// 3) La pregunta en un papel amarillo grande; Valentina piensa.
import type { Frame, PostOverrides } from '../engine/scene';
import { C, Plate, Puppet, type PupKey, at, burst, clamp, decor, doodle, ease, float, icon, kinetic, labelPill, measureText, pop, rrect, scratchOut, spoken, tape, text, tornPaper, vis, type KWordT } from './_kit';

const COLS = [450, 790, 1130, 1470]; // las columnas "vertical por vertical"

export default class I3Colombia extends Plate {
  char = new Puppet('valentina');
  keys: PupKey[] = [];
  a1: KWordT[] = []; a2: KWordT[] = []; b1: KWordT[] = []; b2: KWordT[] = []; b3: KWordT[] = []; q1: KWordT[] = []; q2: KWordT[] = [];
  tAcomp = 0; tOrdena = 0; tInnov = 0; tIncert = 0; tUsu = 0; tGris = 0;
  tL3 = 0; tL4 = 0; tVert: number[] = []; tTrans = 0; tChips: number[] = []; tSistema = 0;
  override async load() { await this.char.load(); }

  override setup() {
    const S = this.S;
    const L1 = 'La regulación acompaña', L2 = 'Los innovadores operan', L3 = 'Para ACH, el reto', L4 = 'Qué pieza nos falta';
    this.prevBg = C.azul;
    this.a1 = spoken(S, L1, 'La', 'crecimiento,');
    this.a2 = spoken(S, L1, 'pero', 'ordena.');
    this.tAcomp = S.word(L1, 'acompaña').start;
    this.tOrdena = S.word(L1, 'ordena.').start;
    this.tInnov = S.word(L2, 'innovadores').start;
    this.tIncert = S.word(L2, 'incertidumbre,').start;
    this.tUsu = S.word(L2, 'usuarios').start;
    this.tGris = S.word(L2, 'zonas').start;
    this.tL3 = S.line(L3).start;
    this.b1 = spoken(S, L3, 'Para', 'pasar');
    this.b2 = spoken(S, L3, 'de', 'a').slice(1, -1); // "regular vertical por vertical"
    this.b3 = spoken(S, L3, 'arquitectura', 'transversal:');
    this.tVert = [S.word(L3, 'vertical', 0).start, S.word(L3, 'por').start, S.word(L3, 'vertical', 1).start];
    this.tTrans = S.word(L3, 'transversal:').start;
    this.tChips = [S.word(L3, 'estándares,').start, S.word(L3, 'consentimiento').start, S.word(L3, 'gobernanza').start];
    this.tL4 = S.line(L4).start;
    this.q1 = spoken(S, L4, 'Qué', 'falta');
    this.q2 = spoken(S, L4, 'para', 'sistema?');
    this.tSistema = S.word(L4, 'sistema?').start;
    this.keys = [
      { at: -1, pose: 'neutral', head: 'sonrisa' },
      { at: this.tL4, pose: 'piensa', head: 'duda' },
    ];
  }

  draw(c: CanvasRenderingContext2D, t: number, _f: Frame): PostOverrides {
    const t0 = this.ctx.start;
    decor(c, t, false, 35);
    const A = vis(t, t0 + 0.1, this.tL3 - 0.1), B = vis(t, this.tL3 + 0.15, this.tL4 - 0.1), D = vis(t, this.tL4 + 0.1);

    // 1) acompaña, pero no ordena · innovadores y usuarios
    at(c, 0, 0, { a: A }, () => {
      kinetic(c, t, this.a1, 960, 150, { w: 800, size: 58, col: C.azul, align: 'center' });
      kinetic(c, t, this.a2, 960, 228, { w: 800, size: 58, col: C.azul, align: 'center' });
      at(c, 720, 380 + float(t, 1, 4, 1.2), { s: pop(t, this.tAcomp - 0.05, 0.45), r: -0.02 }, () => labelPill(c, 'acompaña', 0, 0, { fill: C.azul, col: C.blanco, size: 48, w: 700 }));
      at(c, 530, 380, { s: pop(t, this.tAcomp + 0.25, 0.4) }, () => icon.check(c, 34, C.verde));
      at(c, 1200, 380 + float(t, 2, 4, 1.2), { s: pop(t, this.tOrdena - 0.05, 0.45), r: 0.02 }, () => labelPill(c, 'ordena', 0, 0, { fill: C.gris2, col: C.gris1, size: 48, w: 700 }));
      const wo = measureText(c, 'ordena', 700, 48) + 68;
      scratchOut(c, 1200 - wo / 2, 345, wo, 70, ease.inOutCubic(clamp((t - this.tOrdena - 0.2) / 0.45)), C.naranja, 10);

      const card = (x: number, ts: number, title: string, draw: () => void, sub: string, tsub: number, subFill: string, subCol: string, seed: number) => {
        const k = pop(t, ts - 0.05, 0.45);
        if (k <= 0) return;
        const fy = float(t, seed, 4, 1.1);
        at(c, x, 690 + fy, { s: k, r: seed % 2 ? 0.02 : -0.02 }, () => {
          tornPaper(c, 520, 280, C.azul, seed);
          at(c, 0, -60, {}, draw);
          text(c, title, 0, 30, { w: 800, size: 50, col: C.blanco, align: 'center' });
          at(c, 0, 95, { s: pop(t, tsub - 0.05, 0.45) }, () => labelPill(c, sub, 0, 0, { fill: subFill, col: subCol, size: 38, w: 700 }));
        });
        if (k >= 1) tape(c, x, 548 + fy, 110, -0.05, undefined, seed + 10);
      };
      card(640, this.tInnov, 'innovadores', () => icon.magnifier(c, 70, C.blanco), 'incertidumbre', this.tIncert, C.amarillo, C.azul, 41);
      card(1280, this.tUsu, 'usuarios', () => icon.group(c, 80, C.blanco), 'zonas grises', this.tGris, C.gris2, C.negro, 42);
    });

    // 2) vertical por vertical → arquitectura transversal
    at(c, 0, 0, { a: B }, () => {
      kinetic(c, t, this.b1, 960, 150, { w: 800, size: 60, col: C.azul, align: 'center' });
      // las columnas: una por vertical
      COLS.forEach((x, i) => {
        const ts = this.tVert[Math.min(2, Math.floor(i * 0.75))]! + (i === 3 ? 0.15 : 0);
        const k = ease.outBack(clamp((t - ts + 0.05) / 0.4), 1.3);
        if (k <= 0) return;
        const h = 380 * k;
        c.fillStyle = C.gris2; rrect(c, x - 55, 790 - h, 110, h, 12); c.fill();
      });
      kinetic(c, t, this.b2, 960, 880, { w: 800, size: 50, col: C.azul, align: 'center' });
      // la viga azul que cruza todo
      const vk = ease.outBack(clamp((t - this.tTrans + 0.25) / 0.45), 1.3);
      if (vk > 0) {
        const fy = float(t, 6, 3, 1.1);
        at(c, 960, 360 + fy, { s: vk, r: -0.01 }, () => tornPaper(c, 1340, 120, C.azul, 51));
        kinetic(c, t, this.b3, 960, 380 + fy, { w: 800, size: 60, col: C.blanco, align: 'center' });
        if (vk >= 1) { tape(c, 330, 310 + fy, 110, -0.5, undefined, 52); tape(c, 1590, 310 + fy, 110, 0.5, undefined, 53); }
      }
      // lo que lleva la arquitectura
      ['estándares', 'consentimiento', 'gobernanza de datos'].forEach((s, i) => {
        const x = [500, 950, 1430][i]!;
        at(c, x, 560 + float(t, i + 7, 4, 1.2), { s: pop(t, this.tChips[i]! - 0.05, 0.45), r: [-0.03, 0.02, -0.02][i] }, () => {
          const w = measureText(c, s, 700, 40) + 60;
          tornPaper(c, w, 92, C.amarillo, 55 + i);
          text(c, s, 0, 14, { w: 700, size: 40, col: C.azul, align: 'center' });
        });
      });
      burst(c, 960, 360, t, this.tTrans + 0.2, C.amarillo, 120, 10);
    });

    // 3) la pregunta
    at(c, 0, 0, { a: D }, () => {
      at(c, 1170, 520 + float(t, 4, 5, 1), { s: pop(t, this.tL4 + 0.05, 0.5), r: -0.02 }, () => tornPaper(c, 1340, 380, C.amarillo, 91));
      tape(c, 1170 - 590, 520 - 175, 130, -0.5, undefined, 92);
      kinetic(c, t, this.q1, 1170, 505, { w: 800, size: 62, col: C.azul, align: 'center' });
      kinetic(c, t, this.q2, 1170, 600, { w: 800, size: 62, col: C.azul, align: 'center' });
      doodle(c, 'spark', 1730, 300, 28, C.azul, ease.inOutCubic(clamp((t - this.tSistema) / 0.4)));
      doodle(c, 'star', 560, 300, 30, C.naranja, ease.inOutCubic(clamp((t - this.tL4 - 0.5) / 0.5)));
    });
    at(c, 290, 960, { s: pop(t, this.tL4 + 0.1, 0.5) }, () => this.char.draw(c, 0, 0, 570, t, this.keys, { seed: 7 }));
    return {};
  }
}
