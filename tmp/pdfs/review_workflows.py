from pathlib import Path
from PIL import Image,ImageOps,ImageDraw
import json,zipfile,re
root=Path(__file__).resolve().parents[2]
paths=sorted((root/'tmp/pdfs').glob('workflow-*.png'))
names=json.loads((root/'tmp/pdfs/manifest.json').read_text())
assert len(paths)==len(names)==36
for batch in range(3):
    sheet=Image.new('RGB',(1800,4*340),'#ddd')
    for j,p in enumerate(paths[batch*12:(batch+1)*12]):
        im=Image.open(p);im.thumbnail((600,315))
        x=(j%3)*600;y=(j//3)*340
        sheet.paste(im,(x,y));ImageDraw.Draw(sheet).text((x+10,y+315),names[batch*12+j],fill='black')
    sheet.save(root/f'tmp/pdfs/review-{batch}.png')
with zipfile.ZipFile(root/'output/pdf/shyam-jagat-workflow-images.zip','w',zipfile.ZIP_DEFLATED) as z:
    for p,name in zip(paths,names):
        z.write(p,re.sub(r'[^a-z0-9]+','-',name.lower()).strip('-')+'.png')
print('36 rendered charts checked and image archive created.')
