// 👉 AQUÍ SE REEMPLAZA ESTE CONTENIDO
// ESCENA 1 — Gancho (fondo papel)
// Voz: "Imagina una casa construida cuarto por cuarto, sin plano. Cada parte funciona, pero la casa no."
// Cuatro cuartos de papel caen uno por uno y quedan torcidos y desalineados. Arriba a la derecha aparece un
// plano azul que se tacha en "sin plano". En "funciona" cada cuarto recibe una palomita; en "no." un óvalo
// naranja rodea la casa. Andrés explica y luego se encoge de hombros.
import type { Frame, PostOverrides } from '../engine/scene';
import { C, Plate, Puppet, type PupKey, at, clamp, decor, doodle, ease, float, icon, kinetic, pop, scratchOut, scribbleCircle, spoken, tape, text, tornPaper, type KWordT } from './_kit';

const HX = 1150, HY = 600; // centro de la casa
/** Los cuartos: posición relativa al centro, tamaño, color, giro (torcidos a propósito). */
const ROOMS = [
  { dx: -170, dy: -95, w: 300, h: 190, col: C.amarillo, r: -0.05 },
  { dx: 175, dy: -115, w: 330, h: 170, col: '#B9A6F7', r: 0.07 },
  { dx: -150, dy: 120, w: 340, h: 200, col: '#A9DDBF', r: 0.04 },
  { dx: 200, dy: 100, w: 280, h: 230, col: '#F4B79F', r: -0.08 },
];

export default class I3Gancho extends Plate {
  char = new Puppet('andres');
  keys: PupKey[] = [];
  l1: KWordT[] = []; l2a: KWordT[] = []; l2b: KWordT[] = [];
  tRoom: number[] = []; tPlano = 0; tFunc = 0; tNo = 0; tPero = 0;
  override async load() { await this.char.load(); }

  override setup() {
    const S = this.S, L1 = 'Imagina una casa construida', L2 = 'Cada parte funciona';
    this.prevBg = C.azul; // entra con un círculo sobre la carátula
    this.l1 = spoken(S, L1);
    this.l2a = spoken(S, L2, 'Cada', 'funciona,');
    this.l2b = spoken(S, L2, 'pero', 'no.');
    this.tRoom = [S.word(L1, 'casa').start, S.word(L1, 'cuarto', 0).start, S.word(L1, 'por').start, S.word(L1, 'cuarto', 1).start];
    this.tPlano = S.word(L1, 'plano.').start;
    this.tFunc = S.word(L2, 'funciona,').start;
    this.tPero = S.word(L2, 'pero').start;
    this.tNo = S.word(L2, 'no.').start;
    this.keys = [
      { at: -1, pose: 'neutral', head: 'sonrisa' },
      { at: S.line(L1).start, pose: 'explica', head: 'habla' },
      { at: this.tPero, pose: 'encoge', head: 'duda' },
    ];
  }

  draw(c: CanvasRenderingContext2D, t: number, _f: Frame): PostOverrides {
    const t0 = this.ctx.start;
    decor(c, t, false, 31);

    // primera frase arriba
    kinetic(c, t, this.l1, 1150, 150, { w: 800, size: 48, col: C.azul, align: 'center' });

    // los cuartos caen uno por uno
    ROOMS.forEach((rm, i) => {
      const k = pop(t, this.tRoom[i]! - 0.05, 0.45);
      if (k <= 0) return;
      const fy = float(t, i + 1, 3, 1.1);
      const drop = (1 - ease.outCubic(clamp((t - this.tRoom[i]! + 0.05) / 0.4))) * -60;
      at(c, HX + rm.dx, HY + rm.dy + fy + drop, { s: k, r: rm.r }, () => {
        tornPaper(c, rm.w, rm.h, rm.col, 40 + i);
        // una ventanita en cada cuarto
        c.lineWidth = 6; c.strokeStyle = C.azul;
        c.strokeRect(-36, -36, 72, 60); c.beginPath(); c.moveTo(0, -36); c.lineTo(0, 24); c.moveTo(-36, -6); c.lineTo(36, -6); c.stroke();
        // la palomita en "funciona"
        at(c, rm.w / 2 - 40, -rm.h / 2 + 38, { s: pop(t, this.tFunc + i * 0.08, 0.4) }, () => icon.check(c, 26, C.verde));
      });
      if (k >= 1) tape(c, HX + rm.dx - rm.w / 2 + 30, HY + rm.dy - rm.h / 2 + fy, 90, -0.5, undefined, 50 + i);
    });

    // el plano que no existe
    const pk = pop(t, this.tPlano - 0.1, 0.45);
    at(c, 1700, 400 + float(t, 7, 4, 1.2), { s: pk, r: 0.06 }, () => {
      tornPaper(c, 230, 170, C.azul, 61);
      c.strokeStyle = 'rgba(255,255,255,0.35)'; c.lineWidth = 2;
      for (let x = -100; x <= 100; x += 25) { c.beginPath(); c.moveTo(x, -70); c.lineTo(x, 70); c.stroke(); }
      for (let y = -70; y <= 70; y += 25) { c.beginPath(); c.moveTo(-100, y); c.lineTo(100, y); c.stroke(); }
      c.strokeStyle = C.blanco; c.lineWidth = 5; c.strokeRect(-70, -45, 140, 90);
      c.beginPath(); c.moveTo(0, -45); c.lineTo(0, 45); c.moveTo(-70, 0); c.lineTo(70, 0); c.stroke();
      text(c, 'plano', 0, 66, { w: 700, size: 26, col: C.blanco, align: 'center' });
    });
    scratchOut(c, 1580, 320, 240, 160, ease.inOutCubic(clamp((t - this.tPlano - 0.25) / 0.45)), C.naranja, 10);

    // segunda frase abajo
    kinetic(c, t, [...this.l2a, ...this.l2b], 1150, 950, { w: 800, size: 54, col: C.azul, align: 'center' });
    scribbleCircle(c, HX + 15, HY, 440, 270, ease.inOutCubic(clamp((t - this.tNo) / 0.55)), C.naranja, 8, 4);

    // Andrés
    at(c, 300, 960, { s: pop(t, t0 + 0.15, 0.5) }, () => this.char.draw(c, 0, 0, 560, t, this.keys, { seed: 3 }));

    doodle(c, 'spark', 640, 260, 22, C.azul, ease.inOutCubic(clamp((t - t0 - 0.6) / 0.4)));
    doodle(c, 'star', 1760, 700, 30, C.naranja, ease.inOutCubic(clamp((t - this.tFunc) / 0.5)));
    return {};
  }
}
