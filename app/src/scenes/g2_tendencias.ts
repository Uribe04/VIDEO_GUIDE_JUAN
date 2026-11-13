// 👉 AQUÍ SE REEMPLAZA ESTE CONTENIDO
// ESCENA 4 — Las tres tendencias (fondo azul)
// Voz: "¿Qué viene? Primero, estandarización útil antes que apertura simbólica. Después, consentimiento
// activo y trazable como ventaja competitiva. Y en tres a cinco años, pasar de Open Banking regulado a
// Open Finance gobernado."
// Una flecha de horizonte cruza la pantalla con tres paradas; en cada una cae una tarjeta de papel con la
// tendencia cuando la voz la nombra.
import type { Frame, PostOverrides } from '../engine/scene';
import { C, Plate, at, clamp, decor, doodle, ease, float, kinetic, pop, pt, spoken, strokeTrim, tape, text, tornPaper, type KWordT } from './_kit';

const Y = 470;
const STOPS = [
  { x: 420, when: 'Primero', lines: ['estandarización útil', 'antes que apertura', 'simbólica'], q: 'Primero, estandarización', w: 'Primero,', key: 'estandarización' },
  { x: 960, when: 'Después', lines: ['consentimiento', 'activo y trazable'], q: 'Después, consentimiento', w: 'Después,', key: 'consentimiento' },
  { x: 1500, when: 'tres a cinco años', lines: ['de Open Banking regulado', 'a Open Finance', 'gobernado'], q: 'Y en tres a cinco', w: 'tres', key: 'pasar' },
];

export default class G2Tendencias extends Plate {
  h: KWordT[] = [];
  tW: number[] = []; tK: number[] = []; tGob = 0;

  override setup() {
    const S = this.S;
    this.prevBg = C.blanco;
    this.h = spoken(S, 'Qué viene');
    this.tW = STOPS.map((s) => S.word(s.q, s.w).start);
    this.tK = STOPS.map((s) => S.word(s.q, s.key).start);
    this.tGob = S.word('Y en tres a cinco', 'gobernado.').start;
  }

  draw(c: CanvasRenderingContext2D, t: number, _f: Frame): PostOverrides {
    const t0 = this.ctx.start;
    c.fillStyle = C.azul; c.fillRect(0, 0, 1920, 1080);
    decor(c, t, true, 44);
    kinetic(c, t, this.h, 960, 200, { w: 800, size: 96, col: C.blanco, align: 'center' });

    // la flecha del horizonte
    const hk = ease.inOutCubic(clamp((t - this.h[0]!.at - 0.2) / 0.8));
    c.save(); c.strokeStyle = C.blanco; c.lineWidth = 10; c.lineCap = 'round'; c.lineJoin = 'round';
    strokeTrim(c, [pt(180, Y), pt(1740, Y)], hk);
    if (hk >= 1) strokeTrim(c, [pt(1705, Y - 30), pt(1745, Y), pt(1705, Y + 30)], 1);
    c.restore();

    STOPS.forEach((s, i) => {
      const tw = this.tW[i]!, tk = this.tK[i]!;
      // la parada
      at(c, s.x, Y, { s: pop(t, tw - 0.05, 0.4) }, () => { c.fillStyle = C.amarillo; c.beginPath(); c.arc(0, 0, 22, 0, Math.PI * 2); c.fill(); });
      const lk = pop(t, tw - 0.05, 0.45);
      at(c, s.x, Y - 60 + float(t, i, 3, 1.2), { s: lk }, () => text(c, s.when, 0, 0, { w: 800, size: 40, col: C.blanco, align: 'center' }));
      // la tarjeta
      const k = pop(t, tk - 0.1, 0.5);
      if (k <= 0) return;
      const drop = (1 - ease.outCubic(clamp((t - tk + 0.1) / 0.4))) * -60;
      const fy = float(t, i + 4, 4, 1.1), h = 70 + s.lines.length * 58;
      at(c, s.x, Y + 70 + h / 2 + fy + drop, { s: k, r: [-0.025, 0.02, -0.015][i] }, () => {
        tornPaper(c, 510, h, C.blanco, 66 + i);
        s.lines.forEach((ln, j) => text(c, ln, 0, -h / 2 + 70 + j * 58, { w: j === 0 ? 800 : 700, size: 37, col: C.azul, align: 'center' }));
      });
      if (k >= 1) tape(c, s.x, Y + 72 + fy, 100, -0.04, undefined, 70 + i);
    });

    doodle(c, 'star', 1760, 170, 36, C.amarillo, ease.inOutCubic(clamp((t - this.tGob) / 0.5)));
    doodle(c, 'spark', 200, 200, 24, C.blanco, ease.inOutCubic(clamp((t - t0 - 0.4) / 0.4)));
    return {};
  }
}
