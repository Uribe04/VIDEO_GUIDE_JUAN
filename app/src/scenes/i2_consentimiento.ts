// 👉 AQUÍ SE REEMPLAZA ESTE CONTENIDO
// ESCENA 4 — El consentimiento ya no es un checkbox (fondo azul)
// Voz: "Por eso el consentimiento dejó de ser un checkbox. Ahora hay que decidir qué se comparte, con quién,
// por cuánto tiempo y para qué propósito. Y cómo se revoca."
// A la izquierda, un checkbox marcado que se tacha con marcador al decir "checkbox". A la derecha, cinco
// tarjetas de papel con ícono (qué se comparte, con quién, por cuánto tiempo, para qué propósito, cómo se
// revoca) que entran cuando la voz nombra cada una.
import type { Frame, PostOverrides } from '../engine/scene';
import { C, Plate, at, burst, clamp, decor, doodle, ease, float, icon, inn, kinetic, pop, rrect, scratchOut, spoken, tape, text, tornPaper, type KWordT } from './_kit';

type Ic = (c: CanvasRenderingContext2D, s: number, col: string) => void;
const ITEMS: { s: string; ic: Ic }[] = [
  { s: 'Qué se comparte', ic: icon.wallet },
  { s: 'Con quién', ic: icon.person },
  { s: 'Por cuánto tiempo', ic: icon.clock },
  { s: 'Para qué propósito', ic: icon.magnifier },
  { s: 'Cómo se revoca', ic: icon.refresh },
];

export default class I2Consentimiento extends Plate {
  a: KWordT[] = []; b: KWordT[] = [];
  tBox = 0; tItem: number[] = [];
  override setup() {
    const S = this.S, L1 = 'Por eso el consentimiento dejó de ser', L2 = 'Ahora hay que decidir', L3 = 'Y cómo se revoca';
    this.prevBg = C.blanco;
    this.a = spoken(S, L1, 'Por', 'consentimiento');
    this.b = spoken(S, L1, 'dejó', 'checkbox.');
    this.tBox = S.word(L1, 'checkbox.').start;
    this.tItem = [S.word(L2, 'qué').start, S.word(L2, 'quién,').start, S.word(L2, 'cuánto').start, S.word(L2, 'propósito.').start, S.word(L3, 'revoca.').start];
  }

  draw(c: CanvasRenderingContext2D, t: number, _f: Frame): PostOverrides {
    const t0 = this.ctx.start;
    c.fillStyle = C.azul; c.fillRect(0, 0, 1920, 1080);
    decor(c, t, true, 24);
    kinetic(c, t, this.a, 960, 140, { w: 800, size: 60, col: C.blanco, align: 'center' });
    kinetic(c, t, this.b, 960, 214, { w: 800, size: 60, col: C.blanco, align: 'center' });

    // el checkbox de antes, tachado
    at(c, 430, 600 + float(t, 2, 5, 1), { s: pop(t, t0 + 0.3, 0.5), r: -0.04 }, () => {
      tornPaper(c, 380, 380, '#FFFFFF', 77);
      c.lineWidth = 12; c.strokeStyle = C.azul; c.fillStyle = C.blanco;
      rrect(c, -95, -120, 190, 190, 24); c.fill(); c.stroke();
      at(c, 0, -25, { s: pop(t, t0 + 0.7, 0.45) }, () => icon.check(c, 70, C.verde));
      text(c, 'checkbox', 0, 140, { w: 700, size: 46, col: C.azul, align: 'center' });
      scratchOut(c, -125, -140, 250, 215, ease.inOutCubic(clamp((t - this.tBox) / 0.45)), C.naranja, 13);
      tape(c, -130, -190, 120, -0.5, undefined, 8);
    });
    burst(c, 430, 575, t, this.tBox + 0.3, C.amarillo, 60, 8);

    // las cinco decisiones
    ITEMS.forEach((it, i) => {
      const ts = this.tItem[i]! - 0.05, k = inn(t, ts, 0.4);
      if (k <= 0) return;
      const y = 370 + i * 120;
      at(c, 1250 + (1 - k) * 90, y + float(t, i, 3, 1.2), { a: k, r: (i % 2 ? 1 : -1) * 0.008 }, () => {
        tornPaper(c, 660, 98, '#FFFFFF', 70 + i);
        at(c, -270, 0, { s: pop(t, ts + 0.15, 0.4) }, () => it.ic(c, 58, C.azul));
        text(c, it.s, -205, 15, { w: 700, size: 42, col: C.azul });
      });
      burst(c, 1000, y, t, ts + 0.2, C.amarillo, 40, 6, i);
    });

    doodle(c, 'star', 1760, 330, 30, C.amarillo, ease.inOutCubic(clamp((t - this.tItem[2]!) / 0.5)));
    doodle(c, 'spark', 760, 330, 24, C.blanco, ease.inOutCubic(clamp((t - t0 - 0.6) / 0.4)));
    return {};
  }
}
