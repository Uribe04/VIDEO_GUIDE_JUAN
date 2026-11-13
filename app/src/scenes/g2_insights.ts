// 👉 AQUÍ SE REEMPLAZA ESTE CONTENIDO
// ESCENA 3 — Los tres insights (fondo papel)
// Voz: "Lo vimos en tres insights. Uno: el problema ya no es abrir datos, sino diseñar el mercado.
// Dos: el consentimiento es el nuevo núcleo de Open Finance. Tres: Colombia ya avanzó, pero regula por piezas."
// Tres tarjetas numeradas aparecen cuando la voz dice "Uno", "Dos" y "Tres"; la que se está nombrando se
// agranda un poco y las demás se apagan.
import type { Frame, PostOverrides } from '../engine/scene';
import { C, Plate, at, clamp, decor, doodle, ease, float, kinetic, lerp, pop, spoken, tape, text, tornPaper, type KWordT } from './_kit';

const CARDS = [
  { x: 420, r: -0.03, lines: ['diseñar', 'el mercado'], q: 'Uno: el problema', w: 'Uno:' },
  { x: 960, r: 0.02, lines: ['el consentimiento', 'nuevo núcleo'], q: 'Dos: el consentimiento', w: 'Dos:' },
  { x: 1500, r: -0.02, lines: ['regula', 'por piezas'], q: 'Tres: Colombia', w: 'Tres:' },
];

export default class G2Insights extends Plate {
  h: KWordT[] = [];
  tC: number[] = []; tKey: number[] = []; tEnd = 0;

  override setup() {
    const S = this.S;
    this.prevBg = C.azul;
    this.h = spoken(S, 'Lo vimos en tres insights');
    this.tC = CARDS.map((cd) => S.line(cd.q).start);
    // la palabra clave de cada tarjeta (cuando se resalta)
    this.tKey = [S.word('Uno: el problema', 'diseñar').start, S.word('Dos: el consentimiento', 'núcleo').start, S.word('Tres: Colombia', 'piezas.').start];
    this.tEnd = S.line('Tres: Colombia').end;
  }

  draw(c: CanvasRenderingContext2D, t: number, _f: Frame): PostOverrides {
    const t0 = this.ctx.start;
    decor(c, t, false, 43);
    kinetic(c, t, this.h, 960, 180, { w: 800, size: 68, col: C.azul, align: 'center' });

    CARDS.forEach((cd, i) => {
      const ts = this.tC[i]!, next = this.tC[i + 1] ?? this.tEnd + 0.3;
      const k = pop(t, ts - 0.05, 0.5);
      if (k <= 0) return;
      // la que se nombra se agranda; las otras se apagan un poco
      const on = clamp((t - ts) / 0.3) * (1 - clamp((t - next) / 0.3));
      const dim = t > next ? lerp(1, 0.72, clamp((t - next) / 0.3)) : 1;
      const fy = float(t, i + 1, 5, 1.1);
      at(c, cd.x, 590 + fy, { s: k * (1 + 0.06 * on), r: cd.r, a: t > this.tEnd + 0.2 ? 1 : dim }, () => {
        tornPaper(c, 480, 440, i === 1 ? C.azul : C.blanco, 60 + i);
        const ink = i === 1 ? C.blanco : C.azul;
        // el número en un círculo amarillo
        c.fillStyle = C.amarillo; c.beginPath(); c.arc(0, -120, 70, 0, Math.PI * 2); c.fill();
        text(c, String(i + 1), 0, -95, { w: 800, size: 84, col: C.azul, align: 'center' });
        text(c, `Insight ${i + 1}`, 0, -20, { w: 600, size: 30, col: ink, align: 'center', alpha: 0.75 });
        const kk = clamp((t - this.tKey[i]! + 0.1) / 0.35);
        cd.lines.forEach((ln, j) => text(c, ln, 0, 60 + j * 62, { w: 800, size: 44, col: ink, align: 'center', alpha: 0.35 + 0.65 * ease.outCubic(kk) }));
      });
      if (k >= 1) tape(c, cd.x, 368 + fy, 110, -0.05 + i * 0.04, undefined, 65 + i);
    });

    doodle(c, 'star', 1760, 200, 32, C.naranja, ease.inOutCubic(clamp((t - this.tEnd) / 0.5)));
    doodle(c, 'spark', 180, 230, 22, C.azul, ease.inOutCubic(clamp((t - t0 - 0.4) / 0.4)));
    return {};
  }
}
