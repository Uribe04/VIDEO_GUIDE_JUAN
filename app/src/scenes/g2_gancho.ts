// 👉 AQUÍ SE REEMPLAZA ESTE CONTENIDO
// ESCENA 1 — Gancho (fondo papel)
// Voz: "Abrir los datos financieros parece la meta. Pero abrir no basta."
// Un candado grande se abre en "Abrir" y de él salen íconos de datos flotando; en "meta" aparece un papel
// "la meta" con una estrella. La segunda frase llega en una tira de papel y "no basta" se encierra con
// marcador naranja. Andrés explica y luego se encoge de hombros.
import type { Frame, PostOverrides } from '../engine/scene';
import { C, Plate, Puppet, type PupKey, at, burst, clamp, decor, doodle, ease, float, icon, inn, kinetic, measureText, pop, rrect, scribbleCircle, spoken, tape, text, tornPaper, type KWordT } from './_kit';

const LX = 1120, LY = 520; // el candado
const SIZE = 76;

export default class G2Gancho extends Plate {
  char = new Puppet('andres');
  keys: PupKey[] = [];
  l1: KWordT[] = []; l2: KWordT[] = [];
  tAbrir = 0; tDatos = 0; tMeta = 0; tPero = 0; tNo = 0;
  override async load() { await this.char.load(); }

  override setup() {
    const S = this.S, L1 = 'Abrir los datos financieros', L2 = 'Pero abrir no basta';
    this.prevBg = C.azul;
    this.l1 = spoken(S, L1);
    this.l2 = spoken(S, L2);
    this.tAbrir = S.word(L1, 'Abrir').start;
    this.tDatos = S.word(L1, 'datos').start;
    this.tMeta = S.word(L1, 'meta.').start;
    this.tPero = S.line(L2).start;
    this.tNo = S.word(L2, 'no').start;
    this.keys = [
      { at: -1, pose: 'neutral', head: 'sonrisa' },
      { at: this.tAbrir, pose: 'explica', head: 'habla' },
      { at: this.tPero, pose: 'encoge', head: 'duda' },
    ];
  }

  draw(c: CanvasRenderingContext2D, t: number, _f: Frame): PostOverrides {
    const t0 = this.ctx.start;
    decor(c, t, false, 41);
    kinetic(c, t, this.l1, 1130, 150, { w: 800, size: 60, col: C.azul, align: 'center' });

    // el candado que se abre
    const lk = pop(t, this.tAbrir - 0.1, 0.5);
    const open = ease.outBack(clamp((t - this.tAbrir) / 0.45), 2);
    at(c, LX, LY + float(t, 1, 5, 1.1), { s: lk }, () => {
      // arco: sube y gira al abrirse
      c.save(); c.translate(48, -80 - open * 38); c.rotate(-open * 0.5); c.translate(-48, 0);
      c.strokeStyle = C.azul; c.lineWidth = 26; c.lineCap = 'round';
      c.beginPath(); c.moveTo(-48, 30); c.lineTo(-48, -10); c.arc(0, -10, 48, Math.PI, 0); c.lineTo(48, 30); c.stroke();
      c.restore();
      tornPaper(c, 210, 170, C.azul, 42);
      c.fillStyle = C.amarillo; c.beginPath(); c.arc(0, 0, 20, 0, Math.PI * 2); c.fill(); rrect(c, -8, 6, 16, 40, 6); c.fill();
    });
    burst(c, LX, LY - 60, t, this.tAbrir + 0.2, C.amarillo, 150, 10);

    // los datos que salen
    const ICONS: [number, number, (s: number) => void][] = [
      [-260, -60, (s) => icon.bill(c, s, C.azul)],
      [-200, 150, (s) => icon.wallet(c, s, C.azul)],
      [240, -110, (s) => icon.phone(c, s, C.azul)],
      [270, 110, (s) => icon.pin(c, s, C.azul)],
      [-30, -220, (s) => icon.person(c, s, C.azul)],
    ];
    ICONS.forEach(([dx, dy, f], i) => {
      const k = ease.outCubic(clamp((t - this.tDatos - i * 0.08) / 0.6));
      if (k <= 0) return;
      at(c, LX + dx * k, LY + dy * k + float(t, i + 3, 6, 1.3), { s: k, a: k }, () => {
        c.fillStyle = C.blanco; c.beginPath(); c.arc(0, 0, 50, 0, Math.PI * 2); c.fill();
        c.strokeStyle = C.azul; c.lineWidth = 4; c.stroke();
        f(56);
      });
    });

    // "la meta"
    const mk = pop(t, this.tMeta - 0.1, 0.45);
    at(c, 1640, 330 + float(t, 6, 4, 1.2), { s: mk, r: 0.05 }, () => {
      tornPaper(c, 250, 96, C.amarillo, 43);
      text(c, 'la meta', 0, 16, { w: 800, size: 48, col: C.azul, align: 'center' });
    });
    if (mk >= 1) tape(c, 1640, 280, 90, -0.06, undefined, 44);
    doodle(c, 'star', 1790, 260, 30, C.naranja, ease.inOutCubic(clamp((t - this.tMeta - 0.2) / 0.5)));

    // "Pero abrir no basta." en una tira de papel
    const sk = ease.outBack(clamp((t - this.tPero + 0.2) / 0.35), 1.4);
    if (sk > 0) {
      const tw = this.l2.reduce((a, w) => a + measureText(c, w.s, 800, SIZE), 0) + measureText(c, ' ', 800, SIZE) * 3;
      const fy = float(t, 8, 3, 1.1);
      at(c, 1130, 860 - SIZE * 0.33 + fy, { s: sk, r: -0.01 }, () => tornPaper(c, tw + 90, SIZE * 1.5, C.blanco, 45));
      if (sk >= 1) tape(c, 1130 - tw / 2 - 30, 860 - SIZE * 0.85 + fy, 100, -0.5, undefined, 46);
      kinetic(c, t, this.l2, 1130, 860 + fy, { w: 800, size: SIZE, col: C.azul, align: 'center' });
      // óvalo naranja sobre "no basta."
      const sp = measureText(c, ' ', 800, SIZE);
      const left = 1130 - tw / 2 + measureText(c, 'Pero', 800, SIZE) + sp + measureText(c, 'abrir', 800, SIZE) + sp;
      const nw = measureText(c, 'no basta.', 800, SIZE);
      scribbleCircle(c, left + nw / 2, 860 - SIZE * 0.33 + fy, nw / 2 + 18, 58, ease.inOutCubic(clamp((t - this.tNo - 0.1) / 0.5)), C.naranja, 8, 5);
    }

    // Andrés
    at(c, 300, 960, { s: pop(t, t0 + 0.15, 0.5) }, () => this.char.draw(c, 0, 0, 560, t, this.keys, { seed: 8 }));
    doodle(c, 'spark', 640, 280, 22, C.azul, inn(t, t0 + 0.5, 0.4));
    return {};
  }
}
