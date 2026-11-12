// 👉 AQUÍ SE REEMPLAZA ESTE CONTENIDO
// ESCENA 3 — La brecha de confianza (fondo papel)
// Voz: "La infraestructura ya está lista, pero la confianza no. En Australia, solo el 0,31 % de los clientes
// usa el CDR. En la Unión Europea, menos del 5 % de los consumidores usa Open Banking."
// Arriba, "Infraestructura lista" (con palomita) frente a "Confianza" (candado roto). Debajo, dos barras de
// adopción casi vacías (0,31 % y menos de 5 %); cada una se llena apenas un poco cuando la voz dice la cifra.
// Las barras están a escala (0,31 % y 5 % del largo de la pista); la del CDR tiene un mínimo de 7 px para que se vea.
import type { Frame, PostOverrides } from '../engine/scene';
import { C, Plate, at, clamp, decor, doodle, ease, float, hexA, icon, inn, kinetic, labelPill, pop, rrect, scribbleCircle, spoken, tape, text, type KWordT } from './_kit';

const X0 = 600, TW = 800, BH = 60;           // pista de las barras
const ROWS = [
  { y: 640, top: 'Australia', sub: 'CDR', pct: 0.0031, num: '0,31 %', col: C.naranja },
  { y: 830, top: 'Unión Europea', sub: 'Open Banking', pct: 0.05, num: '< 5 %', col: C.morado },
];

export default class I2Brecha extends Plate {
  a: KWordT[] = []; b: KWordT[] = [];
  tLista = 0; tConf = 0; tName: number[] = []; tNum: number[] = [];
  override setup() {
    const S = this.S, L1 = 'La infraestructura ya está lista', L2 = 'En Australia, solo el 0,31', L3 = 'En la Unión Europea, menos del 5';
    this.prevBg = C.azul;
    this.a = spoken(S, L1, 'La', 'lista,');
    this.b = spoken(S, L1, 'pero', 'no.');
    this.tLista = S.word(L1, 'lista,').start;
    this.tConf = S.word(L1, 'confianza').start;
    this.tName = [S.word(L2, 'Australia,').start, S.word(L3, 'Unión').start];
    this.tNum = [S.word(L2, '0,31').start, S.word(L3, '5').start];
  }

  draw(c: CanvasRenderingContext2D, t: number, _f: Frame): PostOverrides {
    const t0 = this.ctx.start;
    decor(c, t, false, 23);
    kinetic(c, t, this.a, 960, 150, { w: 800, size: 62, col: C.azul, align: 'center' });
    kinetic(c, t, this.b, 960, 228, { w: 800, size: 62, col: C.azul, align: 'center' });

    // arriba: infraestructura lista vs confianza
    const yi = 420;
    at(c, 800, yi + float(t, 1, 4, 1.2), { s: pop(t, this.tLista - 0.05, 0.45), r: -0.02 }, () => {
      labelPill(c, 'Infraestructura lista', 0, 0, { fill: C.azul, col: C.blanco, size: 38, w: 700 });
    });
    at(c, 535, yi, { s: pop(t, this.tLista + 0.2, 0.45) }, () => icon.check(c, 34, C.verde));
    at(c, 1400, yi + float(t, 3, 4, 1.2), { s: pop(t, this.tConf - 0.05, 0.45), r: 0.02 }, () => {
      labelPill(c, 'Confianza', 0, 0, { fill: C.gris2, col: C.gris1, size: 38, w: 700 });
    });
    at(c, 1640, yi - 6, { s: pop(t, this.tConf + 0.2, 0.45), r: -0.08 }, () => icon.brokenLock(c, 84, C.naranja));

    // las barras de adopción
    ROWS.forEach((r, i) => {
      const tn = this.tName[i]!, tv = this.tNum[i]!;
      const k = inn(t, tn - 0.05, 0.4);
      if (k <= 0) return;
      at(c, 0, 0, { a: k }, () => {
        text(c, r.top, 160, r.y - 4, { w: 800, size: 44, col: C.azul });
        text(c, r.sub, 160, r.y + 38, { w: 600, size: 30, col: C.gris1 });
        c.fillStyle = hexA(C.gris2, 0.8); rrect(c, X0 + (1 - k) * 40, r.y - BH / 2, TW, BH, BH / 2); c.fill();
        // relleno a escala real, que crece cuando la voz dice la cifra
        const fk = ease.outCubic(clamp((t - tv + 0.1) / 0.7));
        const fw = Math.max(7, TW * r.pct) * fk;
        if (fw > 0.5) { c.fillStyle = r.col; rrect(c, X0, r.y - BH / 2, fw, BH, Math.min(BH / 2, fw / 2)); c.fill(); }
      });
      // el número grande en un post-it
      const pk = pop(t, tv - 0.05, 0.45);
      at(c, 1640, r.y + float(t, i + 5, 4, 1.3), { s: pk, r: i ? -0.04 : 0.04 }, () => {
        c.save(); c.shadowColor = hexA('#000000', 0.22); c.shadowBlur = 18; c.shadowOffsetY = 8;
        c.fillStyle = C.amarillo; c.fillRect(-150, -62, 300, 124); c.restore();
        text(c, r.num, 0, 24, { w: 800, size: 68, col: C.azul, align: 'center' });
      });
      if (pk >= 1) tape(c, 1640, r.y - 66, 90, -0.06, undefined, 30 + i);
      // óvalo de marcador sobre la rendija casi vacía
      scribbleCircle(c, X0 + 40, r.y, 90, 54, ease.inOutCubic(clamp((t - tv - 0.5) / 0.5)), r.col, 6, i + 2);
    });

    doodle(c, 'star', 1780, 160, 30, C.naranja, ease.inOutCubic(clamp((t - this.tConf - 0.4) / 0.5)));
    doodle(c, 'spark', 360, 300, 22, C.azul, ease.inOutCubic(clamp((t - t0 - 0.5) / 0.4)));
    return {};
  }
}
