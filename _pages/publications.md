---
layout: page
permalink: /publications/
title: Publications
description: Organized by category in reversed chronological order.
nav: true
nav_order: 2
---

{% include bib_search.liquid %}

<!-- Quick-nav pills -->
<div class="pub-quicknav">
  <a href="#preprints"  class="pub-pill pill-a">
    <span class="pill-letter">A</span><span class="pill-label">Preprints</span>
  </a>
  <a href="#journals"  class="pub-pill pill-b">
    <span class="pill-letter">B</span><span class="pill-label">Journal Publications</span>
  </a>
  <a href="#conferences" class="pub-pill pill-c">
    <span class="pill-letter">C</span><span class="pill-label">Abstracts &amp; Conferences</span>
  </a>
</div>

<div class="publications">

<!-- ── A. PREPRINTS ─────────────────────────────────────────────────────── -->
<section class="pub-section" id="preprints">
  <div class="pub-section-header">
    <div class="pub-cat-badge badge-a">A</div>
    <div class="pub-section-meta">
      <h2 class="pub-section-title">Preprints</h2>
      <p class="pub-section-desc">Submitted / under review manuscripts (arXiv, medRxiv, SSRN, Research Square).</p>
    </div>
  </div>
  {% bibliography --query @*[category=preprint] %}
</section>

<!-- ── B. JOURNAL PUBLICATIONS ─────────────────────────────────────────── -->
<section class="pub-section" id="journals">
  <div class="pub-section-header">
    <div class="pub-cat-badge badge-b">B</div>
    <div class="pub-section-meta">
      <h2 class="pub-section-title">Journal Publications</h2>
      <p class="pub-section-desc">Peer-reviewed articles in international journals and PhD thesis.</p>
    </div>
  </div>
  {% bibliography --query @*[category=journal] %}
</section>

<!-- ── C. ABSTRACTS & CONFERENCE PUBLICATIONS ──────────────────────────── -->
<section class="pub-section" id="conferences">
  <div class="pub-section-header">
    <div class="pub-cat-badge badge-c">C</div>
    <div class="pub-section-meta">
      <h2 class="pub-section-title">Abstracts &amp; Conference Publications</h2>
      <p class="pub-section-desc">Conference proceedings, symposium abstracts, and patents.</p>
    </div>
  </div>
  {% bibliography --query @*[category=conference] %}
</section>

</div>
