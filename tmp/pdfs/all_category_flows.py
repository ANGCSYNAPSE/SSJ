from pathlib import Path
import ast,json
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4,landscape
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pypdf import PdfReader

root=Path(__file__).resolve().parents[2];out=root/'output/pdf'
pdfmetrics.registerFont(TTFont('Arial','C:/Windows/Fonts/arial.ttf'))
pdfmetrics.registerFont(TTFont('ArialB','C:/Windows/Fonts/arialbd.ttf'))
W,H=landscape(A4)
tree=ast.parse((root/'tmp/pdfs/artist_registration_flow.py').read_text(encoding='utf-8'))
artist=next(ast.literal_eval(n.value) for n in tree.body if isinstance(n,ast.Assign) and any(isinstance(t,ast.Name) and t.id=='steps' for t in n.targets))
data=[('Artist',artist)]
for name,section,detail in [
    ('Dancer','Your Dance & Expertise','Primary and secondary dance styles, experience, Guru or dance academy, bio and portfolio link.'),
    ('Musician','Your Music & Expertise','Primary and secondary instruments / genres, experience, Guru or music academy, bio and portfolio link.')]:
    steps=list(artist)
    steps[0]=(f'Sign Up → Register as → Choose {name}',f'Open the {name} registration form.')
    steps[2]=(section,detail)
    data.append((name,steps))
data.append(('Temple',[
    ('Sign Up → Register as → Choose Temple','Open the Temple registration form.'),
    ('Temple Information','Temple name, deity, establishment year, type, trust, registration number and primary photo.'),
    ('Location & Contact Details','Address, city, state, PIN code, map link and contact person’s name, phone and email.'),
    ('Temple Details & Services','Opening and closing times, Aarti timings, services offered and a brief temple description.'),
    ('Temple Photo Gallery','Add photos of the deity, exterior, interior and temple premises.'),
    ('Submission & Agreement','Confirm accuracy and authority, agree to terms and privacy policy, and choose communication consent.'),
    ('Submit Temple Registration','Submit the completed temple registration form.'),
]))
data.append(('Dharamshala',[
    ('Sign Up → Register as → Choose Dharamshala','Open the Dharamshala registration form.'),
    ('Trust & Property Information','Guesthouse name, governing trust, registration / license number and distance from Khatu Shyam Temple.'),
    ('Contact & Address Details','Full address, state, manager / contact person name and mobile / WhatsApp number.'),
    ('Accommodation & Pricing Details','Room count, dormitory beds, pricing mode and suggested price / donation per night.'),
    ('Amenities Provided','Select the room facilities, food, accessibility, parking, security and water amenities available.'),
    ('Verification & Photos','Provide trust documents, property / room photos and the manager’s government ID proof.'),
    ('Declaration & Consent','Confirm accurate details and accommodation standards; authorize verification by Shyam Jagat.'),
    ('Submit Registration Details','Submit the completed Dharamshala registration form.'),
]))
data.append(('Organisation (Mandal)',[
    ('Sign Up → Register as → Choose Organisation (Mandal)','Open the Organisation registration form.'),
    ('Organisation & Mandal Identity','Mandal name, category, founding year and government registration number, if registered.'),
    ('Location & Main Headquarters','State, city / region, complete office address, official phone number and email address.'),
    ('Lead Office Bearer (President / Pradhan)','President’s name and phone number, active member count and key spokesperson’s name.'),
    ('Spiritual Seva & Community Activities','Choose the Seva / cultural programs organised and enter recurring events or festivals.'),
    ('Official Logo & Document Upload','Provide the official logo / banner and registration certificate / ID proof.'),
    ('Declaration & Consent','Confirm the details are true and agree to the organisation’s spiritual ethos, discipline and Seva guidelines.'),
    ('Register & Book Consultation','Submit the form. Use Reset Form if you need to clear the entered details.'),
]))
path=out/'all-category-registration-flows-a4.pdf'
c=canvas.Canvas(str(path),pagesize=(W,H));c.setTitle('Shyam Jagat - All category registration flows');c.setAuthor('Shyam Jagat')
def text(x,y,s,size=10,bold=False):
    c.setFont('ArialB' if bold else 'Arial',size);c.drawString(x,H-y,s)
for name,steps in data:
    c.bookmarkPage(name);c.addOutlineEntry(name+' registration',name)
    text(34,29,'SHYAM JAGAT',10,True)
    text(34,60,name+' registration flow',23,True)
    text(34,82,'Registration sequence • Detailed form sheets follow this overview.',10)
    c.setLineWidth(.65);c.setStrokeGray(.35);c.line(34,H-96,W-34,H-96)
    for i,(title,body) in enumerate(steps):
        y=109+i*55;x=96;w=W-192;h=43
        c.rect(x,H-y-h,w,h)
        text(x+13,y+17,title,11,True);text(x+13,y+33,body,9.5)
        assert pdfmetrics.stringWidth(body,'Arial',9.5)<w-26,(name,body)
        if i<len(steps)-1:
            xx=W/2;end=y+55;c.line(xx,H-y-h,xx,H-end)
            c.line(xx,H-end,xx-3,H-end+4);c.line(xx,H-end,xx+3,H-end+4)
    c.showPage()
c.save()
r=PdfReader(path);assert len(r.pages)==6
for p in r.pages:assert abs(float(p.mediabox.width)-W)<.1 and abs(float(p.mediabox.height)-H)<.1
(root/'tmp/pdfs/category-flow-names.json').write_text(json.dumps([n for n,_ in data]))
print('Verified 6 separate A4 flow pages.')
