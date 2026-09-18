"""Generates the small image variants the pages actually display.

  -md.webp  max 1000px wide  (hero, About, category cards, "Why" photo)
  -sq.webp  400x400 centre crop  (Contact page 7-column photo grid)

Originals are untouched and still used by the lightboxes. Re-run after adding
or renaming photos:  python scripts/make-web-sizes.py
Requires: pip install pillow
"""
import os
import re
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB = os.path.join(ROOT, "public")


def read(rel):
    with open(os.path.join(ROOT, rel), encoding="utf-8") as f:
        return f.read()


home = read("components/HomeClient.jsx")
contact = read("components/ContactClient.jsx")
galleries = read("lib/galleries.js")

md = set(re.findall(r'"(/assets/images/hero-carousel-[^"]+\.webp)"', home))
md |= set(re.findall(r'"(/uploads/[^"]+\.webp)"', contact.split("ABOUT_SLIDES = [")[1].split("];")[0]))
md |= set(re.findall(r'^\s*\["[^"]+", "(/[^"]+\.webp)"', galleries, re.M))
md.add("/uploads/omar-decor-owner-slat-wall-socket-detail.webp")

names = re.findall(r'^\s+"([a-z0-9-]+)",\s*$', contact.split("MIXED_GALLERY_NAMES = [")[1].split("];")[0], re.M)
sq = {"/uploads/" + n + ".webp" for n in names}


def out_path(src, suffix):
    return os.path.join(PUB, src.lstrip("/")[: -len(".webp")] + suffix + ".webp")


def save_md(src):
    im = Image.open(os.path.join(PUB, src.lstrip("/")))
    if im.width > 1000:
        im = im.resize((1000, round(im.height * 1000 / im.width)), Image.LANCZOS)
    im.save(out_path(src, "-md"), "WEBP", quality=78, method=6)


def save_sq(src):
    im = Image.open(os.path.join(PUB, src.lstrip("/")))
    side = min(im.size)
    left, top = (im.width - side) // 2, (im.height - side) // 2
    im = im.crop((left, top, left + side, top + side)).resize((400, 400), Image.LANCZOS)
    im.save(out_path(src, "-sq"), "WEBP", quality=72, method=6)


for s in sorted(md):
    save_md(s)
for s in sorted(sq):
    save_sq(s)
print("md:", len(md), " sq:", len(sq))
