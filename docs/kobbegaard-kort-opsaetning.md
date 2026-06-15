# Kobbegaard — opsætning af kort (ruter.html)

## Side
- **Fil:** `ruter.html`
- **H1:** Stier mod skov, å, kyst og Melsted/Gudhjem
- **Sektion-label:** Ruter fra gården
- **H2:** Kort
- **Container:** `div.map-gallery`
- **Tegnforklaring:** `ul.route-legend` under kortene (ingen overskrift «Tegnforklaring»)

## Layout — `.map-gallery`

CSS grid med **2 kolonner** i forholdet **548fr : 1024fr**.

- **Gap:** 3px
- **Ydre ramme:** 1px solid, border-radius, let skygge
- **Baggrund mellem kort:** `#e8e8e8` (border-soft)

### Placering

| Kort | Fil | Position |
|------|-----|----------|
| 1 | `billeder/ruter-alle-bred.png` | Venstre kolonne, `grid-row: 1 / span 2` (højt kort) |
| 2 | `billeder/ruter-alle-tæt.png` | Øverst til højre |
| 3 | `billeder/ruter-gaard.png` | Nederst til højre |

```
+------------------+------------------+
|                  |     Kort 2       |
|     Kort 1       +------------------+
|   (2 rækker)     |     Kort 3       |
+------------------+------------------+
```

- Billeder: `width: 100%`, `height: auto`, **ingen beskæring**
- Mobil (`max-width: 768px`): 1 kolonne, alle tre stablet

## HTML

```html
<div class="map-gallery">
  <figure class="map-figure">
    <img src="billeder/ruter-alle-bred.png" alt="Oversigtskort med alle fire vandreruter fra Kobbegaard"/>
  </figure>
  <figure class="map-figure">
    <img src="billeder/ruter-alle-tæt.png" alt="Oversigtskort med alle ruter — tættere udsnit"/>
  </figure>
  <figure class="map-figure">
    <img src="billeder/ruter-gaard.png" alt="Oversigtskort zoomet ind på gården"/>
  </figure>
</div>

<ul class="route-legend">
  <li class="route-legend-item">
    <span class="route-swatch route-swatch--blue">Blå</span>
    Ad Kobbeå til Kobbe strand.
  </li>
  <li class="route-legend-item">
    <span class="route-swatch route-swatch--lightblue">Lyseblå</span>
    Fra Kobbe strand ad klipperne og Melsted til Gudhjem.
  </li>
  <li class="route-legend-item">
    <span class="route-swatch route-swatch--green">Grøn</span>
    Skovrute på den anden side af Kobbeå.
  </li>
  <li class="route-legend-item">
    <span class="route-swatch route-swatch--purple">Lilla</span>
    Til Stavehøl vandfaldet ad Kobbeå.
  </li>
  <li class="route-legend-item">
    <span class="route-swatch route-swatch--black">Sort</span>
    Til Kobbeå.
  </li>
  <li class="route-legend-item">
    <span class="route-swatch route-swatch--orange">Orange</span>
    Til Meldsted ad landeveje.
  </li>
  <li class="route-legend-item">
    <span class="route-swatch route-swatch--yellow">Gul</span>
    Til Stavehøj vandfaldet via Kobbevej.
  </li>
  <li class="route-legend-item">
    <span class="route-swatch route-swatch--red">Rød</span>
    Over Kobbeå — på eget ansvar :)
  </li>
</ul>
```

## Tegnforklaring — farver (CSS)

| Pille | Klasse | Baggrund | Tekst |
|-------|--------|----------|-------|
| Blå | `.route-swatch--blue` | `#1565c0` | `#ffffff` |
| Lyseblå | `.route-swatch--lightblue` | `#4fc3f7` | `#1a3a4a` |
| Grøn | `.route-swatch--green` | `#388e3c` | `#ffffff` |
| Lilla | `.route-swatch--purple` | `#7b1fa2` | `#ffffff` |
| Sort | `.route-swatch--black` | `#212121` | `#ffffff` |
| Orange | `.route-swatch--orange` | `#ef6c00` | `#ffffff` |
| Gul | `.route-swatch--yellow` | `#fdd835` | `#4a4000` |
| Rød | `.route-swatch--red` | `#c62828` | `#ffffff` |

Pille-styling: `min-width: 72px`, `padding: 4px 10px`, `border-radius: 999px`, hvid/farvet tekst centreret.
