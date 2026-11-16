from pathlib import Path
import json,zipfile,re
from PIL import Image,ImageDraw
from pypdf import PdfReader,PdfWriter
root=Path(__file__).resolve().parents[2];tmp=root/'tmp/pdfs';out=root/'output/pdf'
names=json.loads((tmp/'category-flow-names.json').read_text())
files=sorted(tmp.glob('category-flow-*.png'));assert len(files)==6
sheet=Image.new('RGB',(1400,1545),'#dddddd')
r=PdfReader(out/'all-category-registration-flows-a4.pdf')
with zipfile.ZipFile(out/'category-registration-flow-pages.zip','w',zipfile.ZIP_DEFLATED) as z:
    for i,(name,file) in enumerate(zip(names,files)):
        slug=re.sub(r'[^a-z]+','-',name.lower()).strip('-')+'-registration-flow-a4'
        z.write(file,slug+'.png')
        w=PdfWriter();w.add_page(r.pages[i]);p=tmp/(slug+'.pdf');w.write(p);z.write(p,slug+'.pdf')
        im=Image.open(file);im.thumbnail((680,480));sheet.paste(im,((i%2)*700+10,(i//2)*515+20))
sheet.save(tmp/'category-flow-review.png')
print('Packaged six individual PDFs and six PNG images.')
