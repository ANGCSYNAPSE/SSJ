from pathlib import Path
from PIL import Image,ImageDraw
import json,re,zipfile
root=Path(__file__).resolve().parents[2];tmp=root/'tmp/pdfs';out=root/'output/pdf'
names=json.loads((tmp/'account-all-forms-manifest.json').read_text())
files=sorted(tmp.glob('final-forms-*.png'))
assert len(files)==len(names)
for start in range(0,len(files),8):
    sheet=Image.new('RGB',(1200,920),'#dedede');d=ImageDraw.Draw(sheet)
    for n,p in enumerate(files[start:start+8]):
        im=Image.open(p);im.thumbnail((580,205));x=(n%2)*600+10;y=(n//2)*230+20
        sheet.paste(im,(x,y));d.text((x,y-15),names[start+n],fill='black')
    sheet.save(tmp/f'forms-contact-{start//8+1}.png')
with zipfile.ZipFile(out/'signup-signin-all-category-form-images.zip','w',zipfile.ZIP_DEFLATED) as z:
    for p,name in zip(files,names):z.write(p,re.sub(r'[^a-z0-9]+','-',name.lower()).strip('-')+'.png')
    z.write(out/'account-forms-notes.txt','account-forms-notes.txt')
print('Rendered pages, contact sheets and ZIP:',len(files))
