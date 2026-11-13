// 👉 AQUÍ SE REEMPLAZA ESTE CONTENIDO
// ESCENA 5 — Qué significa para Colombia (fondo papel)
// Voz: "Para Colombia, la ventaja no será del que abra primero, sino del que abra mejor.
// ¿Quién va a definir el lenguaje común de nuestro mercado?"
// "del que abra primero" (gris, se tacha) frente a "del que abra mejor" (azul, con destello). Luego la
// pregunta en un papel amarillo grande; Valentina piensa.
import type { Frame, PostOverrides } from '../engine/scene';
import { C, Plate, Puppet, type PupKey, at, burst, clamp, decor, doodle, ease, float, icon, kinetic, labelPill, measureText, pop, scratchOut, spoken, tape, tornPaper, type KWordT } from './_kit';

export default class G2Colombia extends Plate {
  char = new Puppet('valentina');
  keys: PupKey[] = [];
  h: KWordT[] = []; q1: KWordT[] = []; q2: KWordT[] = [];
  tPrim = 0; tSino = 0; tMejor = 0; tQ = 0; tEnd = 0;
  override async load() { await this.char.load(); }

  override setup() {
    const S = this.S, L1 = 'Para Colombia, la ventaja', L2 = 'Quién va a definir';
    this.prevBg = C.azul;
    this.h = spoken(S, L1, 'Para', 'será');
    this.q1 = spoken(S, L2, 'Quién', 'lenguaje');
    this.q2 = spoken(S, L2, 'común', 'mercado?');
    this.tPrim = S.word(L1, 'primero,').start;
    this.tSino = S.word(L1, 'sino').start;
    this.tMejor = S.word(L1, 'mejor.').start;
    this.tQ = S.line(L2).start;
    this.tEnd = S.word(L2, 'mercado?').start;
    this.keys = [
      { at: -1, pose: 'neutral', head: 'sonrisa' },
      { at: this.tMejor, pose: 'celebra', head: 'feliz' },
      { at: this.tQ, pose: 'piensa', head: 'duda' },
    ];
  }

  draw(c: CanvasRenderingContext2D, t: number, _f: Frame): PostOverrides {
    const t0 = this.ctx.start;
    decor(c, t, false, 45);
    kinetic(c, t, this.h, 1100, 160, { w: 800, size: 64, col: C.azul, align: 'center' });

    // primero vs mejor
    const pk = pop(t, this.tPrim - 0.35, 0.45);
    at(c, 820, 360 + float(t, 1, 4, 1.2), { s: pk, r: -0.02 }, () => labelPill(c, 'del que abra primero', 0, 0, { fill: C.gris2, col: C.gris1, size: 46, w: 700 }));
    const pw = measureText(c, 'del que abra primero', 700, 46) + 68;
    scratchOut(c, 820 - pw / 2, 325, pw, 70, ease.inOutCubic(clamp((t - this.tSino) / 0.45)), C.naranja, 10);
    const mk = pop(t, this.tMejor - 0.35, 0.45);
    at(c, 1440, 360 + float(t, 2, 4, 1.2), { s: mk, r: 0.02 }, () => labelPill(c, 'del que abra mejor', 0, 0, { fill: C.azul, col: C.blanco, size: 50, w: 800 }));
    at(c, 1700, 300, { s: pop(t, this.tMejor + 0.2, 0.4) }, () => icon.check(c, 32, C.verde));
    burst(c, 1440, 360, t, this.tMejor + 0.15, C.amarillo, 110, 10);

    // la pregunta
    const qk = pop(t, this.tQ - 0.05, 0.5);
    at(c, 1170, 700 + float(t, 4, 5, 1), { s: qk, r: -0.015 }, () => tornPaper(c, 1240, 300, C.amarillo, 71));
    if (qk >= 1) tape(c, 1170 - 560, 700 - 135, 130, -0.5, undefined, 72);
    kinetic(c, t, this.q1, 1170, 690, { w: 800, size: 58, col: C.azul, align: 'center' });
    kinetic(c, t, this.q2, 1170, 775, { w: 800, size: 58, col: C.azul, align: 'center' });

    at(c, 290, 980, { s: pop(t, t0 + 0.2, 0.5) }, () => this.char.draw(c, 0, 0, 540, t, this.keys, { seed: 9 }));
    doodle(c, 'star', 1780, 540, 30, C.naranja, ease.inOutCubic(clamp((t - this.tEnd) / 0.5)));
    doodle(c, 'spark', 560, 520, 22, C.azul, ease.inOutCubic(clamp((t - this.tQ - 0.3) / 0.4)));
    return {};
  }
}
