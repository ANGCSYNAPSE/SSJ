from pathlib import Path
from PIL import Image,ImageDraw
import json,re,zipfile
root=Path(__file__).resolve().parents[2]
files=sorted((root/'tmp/pdfs').glob('about-section-*.png'))
titles=json.loads((root/'tmp/pdfs/about-section-manifest.json').read_text())
assert len(files)==len(titles)==11
for batch in range(2):
    im=Image.new('RGB',(1800,1320),'#ddd')
    for k,p in enumerate(files[batch*9:(batch+1)*9]):
        one=Image.open(p);one.thumbnail((590,415))
        x=k%3*600;y=k//3*440
        im.paste(one,(x,y));ImageDraw.Draw(im).text((x+8,y+418),titles[batch*9+k],fill='black')
    im.save(root/f'tmp/pdfs/about-review-{batch}.png')
with zipfile.ZipFile(root/'output/pdf/about-section-chart-images.zip','w',zipfile.ZIP_DEFLATED) as z:
    for p,t in zip(files,titles):z.write(p,re.sub('[^a-z0-9]+','-',t.lower()).strip('-')+'.png')
print('Rendered 18 charts and packaged images.')

