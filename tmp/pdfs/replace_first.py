from pathlib import Path
from io import BytesIO
import shutil, zipfile
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4, landscape
from PIL import Image
from pypdf import PdfReader,PdfWriter

root=Path(__file__).resolve().parents[2]
out=root/'output/pdf'
source=Path('C:/Users/ANGC/.codex/generated_images/01a0f6ed-3e87-73b0-81ca-f5ef9228f8f4/exec-2375df64-b938-4a7f-a43a-2e6e3b036a4e.png')
asset=out/'navigation-overview-revised.png'
shutil.copy2(source,asset)
w,h=landscape(A4)
iw,ih=Image.open(asset).size
dw=w-32;dh=dw*ih/iw
b=BytesIO();c=canvas.Canvas(b,pagesize=(w,h))
c.drawImage(str(asset),16,(h-dh)/2,width=dw,height=dh)
c.save();b.seek(0)
old=PdfReader(str(out/'shyam-jagat-workflows-a4.pdf'))
writer=PdfWriter();writer.clone_document_from_reader(old)
replacement=PdfReader(b).pages[0]
page=writer.pages[0]
page.replace_contents(replacement.get_contents())
from pypdf.generic import NameObject
page[NameObject('/Resources')]=replacement['/Resources'].clone(writer)
target=out/'shyam-jagat-workflows-a4-revised.pdf'
with target.open('wb') as f:writer.write(f)
check=PdfReader(str(target));assert len(check.pages)==36
for original,new in zip(old.pages[1:],check.pages[1:]):
    assert original.get_contents().get_data()==new.get_contents().get_data()
for p in check.pages:
    assert abs(float(p.mediabox.width)-w)<.01 and abs(float(p.mediabox.height)-h)<.01
print('Replaced first page. Verified all remaining 35 page streams unchanged; all 36 pages A4.')
