// 👉 AQUÍ SE REEMPLAZA ESTE CONTENIDO
// ESCENA 3 — Los avances (fondo papel)
// Voz: "Entre 2021 y 2024 llegaron el sandbox, Open Banking y Open Finance. Y el ecosistema fintech creció con fuerza."
// Una línea de tiempo se dibuja de 2021 a 2024; tres piezas de papel (sandbox, Open Banking, Open Finance)
// caen sobre ella cuando la voz las nombra. Luego una flecha de crecimiento sube con "creció con fuerza".
import type { Frame, PostOverrides } from '../engine/scene';
import { C, Plate, at, burst, clamp, decor, doodle, doodleArrow, ease, float, kinetic, measureText, pop, pt, spoken, strokeTrim, tape, text, tornPaper, type KWordT } from './_kit';

const X0 = 330, X1 = 1590, LY = 560; // la línea de tiempo
const PIECES = [
  { s: 'sandbox', x: 560, r: -0.04 },
  { s: 'Open Banking', x: 960, r: 0.03 },
  { s: 'Open Finance', x: 1370, r: -0.02 },
];

export default class I3Avances extends Plate {
  h: KWordT[] = []; l2: KWordT[] = [];
  t21 = 0; t24 = 0; tP: number[] = []; tCrecio = 0; tFuerza = 0;

  override setup() {
    const S = this.S, L1 = 'Entre 2021 y 2024', L2 = 'Y el ecosistema fintech';
    this.prevBg = C.azul;
    this.h = spoken(S, L1, 'Entre', 'llegaron');
    this.l2 = spoken(S, L2);
    this.t21 = S.word(L1, '2021').start;
    this.t24 = S.word(L1, '2024').start;
    this.tP = [S.word(L1, 'sandbox,').start, S.word(L1, 'Banking').start, S.word(L1, 'Finance.').start];
    this.tCrecio = S.word(L2, 'creció').start;
    this.tFuerza = S.word(L2, 'fuerza.').start;
  }

  draw(c: CanvasRenderingContext2D, t: number, _f: Frame): PostOverrides {
    const t0 = this.ctx.start;
    decor(c, t, false, 33);
    kinetic(c, t, this.h, 960, 170, { w: 800, size: 64, col: C.azul, align: 'center' });

    // la línea de tiempo: se dibuja de 2021 a 2024
    const lk = ease.inOutCubic(clamp((t - this.t21) / Math.max(0.5, this.t24 - this.t21 + 0.3)));
    c.save(); c.strokeStyle = C.azul; c.lineWidth = 10; c.lineCap = 'round';
    strokeTrim(c, [pt(X0, LY), pt(X1, LY)], lk); c.restore();
    const year = (s: string, x: number, ts: number) => {
      const k = pop(t, ts - 0.05, 0.45);
      at(c, x, LY, { s: k }, () => { c.fillStyle = C.azul; c.beginPath(); c.arc(0, 0, 18, 0, Math.PI * 2); c.fill(); });
      at(c, x, LY + 80 + float(t, x, 3, 1.2), { s: k }, () => text(c, s, 0, 0, { w: 800, size: 52, col: C.azul, align: 'center' }));
    };
    year('2021', X0, this.t21);
    year('2024', X1, this.t24);

    // las piezas caen sobre la línea
    PIECES.forEach((p, i) => {
      const ts = this.tP[i]!;
      const k = pop(t, ts - 0.1, 0.45);
      if (k <= 0) return;
      const drop = (1 - ease.outCubic(clamp((t - ts + 0.1) / 0.4))) * -80;
      const fy = float(t, i + 2, 4, 1.2);
      at(c, p.x, LY - 95 + fy + drop, { s: k, r: p.r }, () => {
        tornPaper(c, measureText(c, p.s, 800, 48) + 70, 110, C.blanco, 70 + i);
        text(c, p.s, 0, 17, { w: 800, size: 48, col: C.azul, align: 'center' });
      });
      if (k >= 1) tape(c, p.x, LY - 152 + fy, 100, -0.06, undefined, 75 + i);
      // un puntito donde la pieza toca la línea
      at(c, p.x, LY, { s: pop(t, ts + 0.15, 0.4) }, () => { c.fillStyle = C.amarillo; c.beginPath(); c.arc(0, 0, 13, 0, Math.PI * 2); c.fill(); });
    });

    // "Y el ecosistema fintech creció con fuerza." + flecha que sube
    kinetic(c, t, this.l2, 860, 830, { w: 800, size: 60, col: C.azul, align: 'center' });
    doodleArrow(c, pt(1530, 900), pt(1610, 820), pt(1740, 660), ease.inOutCubic(clamp((t - this.tCrecio) / 0.6)), C.verde, 12);
    burst(c, 1740, 650, t, this.tFuerza, C.amarillo, 70, 8);

    doodle(c, 'spark', 240, 300, 22, C.azul, ease.inOutCubic(clamp((t - t0 - 0.5) / 0.4)));
    doodle(c, 'star', 1720, 300, 30, C.naranja, ease.inOutCubic(clamp((t - this.tP[2]! - 0.3) / 0.5)));
    return {};
  }
}
