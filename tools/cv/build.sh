#!/bin/sh
# Regenerates the CV from js/data.js and writes assets/Pranav_Venkit_CV.pdf.
set -e
cd "$(dirname "$0")"
node gen.js
xelatex -interaction=nonstopmode -halt-on-error cv.tex >/dev/null
xelatex -interaction=nonstopmode -halt-on-error cv.tex >/dev/null
cp cv.pdf ../../assets/Pranav_Venkit_CV.pdf
rm -f cv.aux cv.log cv.out
echo "Wrote assets/Pranav_Venkit_CV.pdf ($(pdfinfo cv.pdf | awk '/Pages/{print $2}') pages)"
