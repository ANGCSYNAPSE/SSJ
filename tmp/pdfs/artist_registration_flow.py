from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4,landscape
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pypdf import PdfReader

root=Path(__file__).resolve().parents[2]
out=root/'output/pdf'
pdfmetrics.registerFont(TTFont('Arial','C:/Windows/Fonts/arial.ttf'))
pdfmetrics.registerFont(TTFont('ArialB','C:/Windows/Fonts/arialbd.ttf'))
W,H=landscape(A4)
path=out/'artist-registration-flow-a4.pdf'
c=canvas.Canvas(str(path),pagesize=(W,H))
c.setTitle('Shyam Jagat - Artist registration flow')
c.setAuthor('Shyam Jagat')
def text(x,y,s,size=10,bold=False):
    c.setFont('ArialB' if bold else 'Arial',size);c.drawString(x,H-y,s)
text(34,29,'SHYAM JAGAT',10,True)
text(34,60,'Artist registration flow',23,True)
text(34,82,'Registration sequence • Detailed form sheets follow this overview.',10)
c.setLineWidth(.65);c.setStrokeGray(.35);c.line(34,H-96,W-34,H-96)
steps=[
('Sign Up → Register as → Choose Artist','Open the Artist registration form.'),
('Personal Information','Full name, email, phone, date of birth, gender, city, state and profile photo.'),
('Your Art & Expertise','Primary and secondary art forms, experience, Guru, bio and portfolio link.'),
('Upload Your Work','Add photos, videos or audio samples using the work-upload section.'),
('Availability & Preferences','Choose event types, performance regions, honorarium range and travel willingness.'),
('Submission & Agreement','Accept the terms and privacy policy; choose consent for event-related contact.'),
('Submit Registration → Validate details','If errors appear, correct the highlighted fields and submit again.'),
('Registration confirmation','After valid submission, the current form displays a success message.'),
]
for i,(title,body) in enumerate(steps):
    y=109+i*55;x=96;w=W-192;h=43
    c.rect(x,H-y-h,w,h)
    text(x+13,y+17,title,11,True);text(x+13,y+33,body,9.5)
    assert pdfmetrics.stringWidth(body,'Arial',9.5)<w-26
    if i<len(steps)-1:
        xx=W/2;end=y+55
        c.line(xx,H-y-h,xx,H-end)
        c.line(xx,H-end,xx-3,H-end+4);c.line(xx,H-end,xx+3,H-end+4)
c.save()
r=PdfReader(path)
assert len(r.pages)==1
assert abs(float(r.pages[0].mediabox.width)-W)<.1
print(path)
