// 👉 AQUÍ SE REEMPLAZA ESTE CONTENIDO
// ESCENA 1 — Gancho (fondo papel)
// Voz: "Aceptar términos y condiciones. ¿Cuántas veces lo hiciste sin leer nada?"
// Una ventana de "Términos y condiciones" con líneas de texto gris; un checkbox se marca solo al decir
// "condiciones". La pregunta entra palabra por palabra sobre dos tiras de papel y "leer" se marca con un
// óvalo de marcador. Valentina se encoge de hombros cuando llega la pregunta.
import type { Frame, PostOverrides } from '../engine/scene';
import { C, Plate, Puppet, type PupKey, at, burst, clamp, decor, doodle, ease, icon, kinetic, pop, rrect, scribbleCircle, spoken, tape, text, tornPaper, float, type KWordT } from './_kit';

export default class I2Gancho extends Plate {
  char = new Puppet('valentina');
  keys: PupKey[] = [];
  l1: KWordT[] = []; q1: KWordT[] = []; q2: KWordT[] = [];
  tCheck = 0; tQ = 0; tLeer = 0;
  override async load() { await this.char.load(); }

  override setup() {
    const S = this.S, L1 = 'Aceptar términos y condiciones', L2 = 'Cuántas veces lo hiciste';
    this.prevBg = C.azul; // entra con un círculo sobre la carátula
    this.l1 = spoken(S, L1);
    this.q1 = spoken(S, L2, 'Cuántas', 'hiciste');
    this.q2 = spoken(S, L2, 'sin', 'nada?');
    this.tCheck = S.word(L1, 'condiciones.').start;
    this.tQ = S.line(L2).start;
    this.tLeer = S.word(L2, 'leer').start;
    this.keys = [
      { at: -1, pose: 'neutral', head: 'sonrisa' },
      { at: S.line(L1).start, pose: 'senala', head: 'habla' },
      { at: this.tQ, pose: 'encoge', head: 'duda' },
    ];
  }

  draw(c: CanvasRenderingContext2D, t: number, _f: Frame): PostOverrides {
    const t0 = this.ctx.start;
    decor(c, t, false, 21);

    // la presentadora
    at(c, 290, 960, { s: pop(t, t0 + 0.15, 0.5) }, () => this.char.draw(c, 0, 0, 570, t, this.keys, { seed: 5 }));

    // primera frase
    kinetic(c, t, this.l1, 1180, 170, { w: 800, size: 64, col: C.azul, align: 'center' });

    // la pregunta, en dos tiras de papel
    const strip = (words: KWordT[], y: number, size: number, seed: number) => {
      const k = ease.outBack(clamp((t - words[0]!.at + 0.25) / 0.35), 1.4);
      if (k <= 0) return;
      at(c, 1180, y - size * 0.33 + float(t, seed, 3, 1.1), { s: k, r: (seed % 2 ? 1 : -1) * 0.01 }, () => tornPaper(c, 1100, size * 1.55, '#FFFFFF', seed));
      kinetic(c, t, words, 1180, y + float(t, seed, 3, 1.1), { w: 800, size, col: C.azul, align: 'center', cap: seed === 7 });
    };
    strip(this.q1, 330, 74, 7);
    strip(this.q2, 450, 74, 8);

    // la ventana de términos y condiciones
    const wk = pop(t, t0 + 0.5, 0.5);
    at(c, 1230, 790 + float(t, 2, 4, 1), { s: wk, r: 0.012 }, () => {
      tornPaper(c, 760, 340, '#FFFFFF', 61);
      c.fillStyle = C.azul; rrect(c, -350, -150, 700, 54, 14); c.fill();
      text(c, 'Términos y condiciones', -325, -112, { w: 700, size: 28, col: C.blanco });
      const widths = [620, 560, 600, 520, 300];
      widths.forEach((w, i) => {
        const k = clamp((t - t0 - 0.9 - i * 0.07) / 0.3);
        c.fillStyle = C.gris2; rrect(c, -340, -70 + i * 34, w * k + 0.01, 12, 6); c.fill();
      });
      // checkbox + "Acepto" + botón
      c.lineWidth = 5; c.strokeStyle = C.azul; c.fillStyle = C.blanco;
      rrect(c, -340, 85, 52, 52, 10); c.fill(); c.stroke();
      at(c, -314, 111, { s: pop(t, this.tCheck, 0.4) }, () => icon.check(c, 26, C.verde));
      text(c, 'Acepto', -270, 123, { w: 700, size: 34, col: C.negro });
      c.fillStyle = C.azul; rrect(c, 90, 82, 250, 58, 29); c.fill();
      text(c, 'Continuar', 215, 121, { w: 700, size: 30, col: C.blanco, align: 'center' });
    });
    burst(c, 916, 901, t, this.tCheck, C.amarillo, 52, 8);
    // "sin leer": se marca el texto que nadie lee
    scribbleCircle(c, 1230, 790, 350, 82, ease.inOutCubic(clamp((t - this.tLeer) / 0.55)), C.naranja, 7, 3);

    doodle(c, 'star', 1700, 230, 34, C.naranja, ease.inOutCubic(clamp((t - this.tQ - 0.4) / 0.5)));
    doodle(c, 'spark', 640, 230, 22, C.azul, ease.inOutCubic(clamp((t - t0 - 0.6) / 0.4)));
    if (wk >= 1) tape(c, 1230, 616, 130, -0.08, undefined, 4);
    return {};
  }
}
