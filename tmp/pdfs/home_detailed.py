from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4,landscape
from reportlab.lib.utils import simpleSplit
from pypdf import PdfReader
import math

root=Path(__file__).resolve().parents[2]
path=root/'output/pdf/home-detailed-workflow-a4.pdf'
W,H=landscape(A4)
c=canvas.Canvas(str(path),pagesize=(W,H))
c.setTitle('Shyam Jagat - Detailed Home page workflow');c.setAuthor('Shyam Jagat')

def txt(x,y,s,size=9,bold=False):
    c.setFillGray(.12);c.setFont('Helvetica-Bold' if bold else 'Helvetica',size);c.drawString(x,H-y,s)
def arrow(pts):
    c.setLineWidth(.65);c.setStrokeGray(.35)
    p=c.beginPath();p.moveTo(pts[0][0],H-pts[0][1])
    for x,y in pts[1:]:p.lineTo(x,H-y)
    c.drawPath(p)
    (px,py),(x,y)=pts[-2:];a=math.atan2(y-py,x-px)
    for da in [-.45,.45]:c.line(x,H-y,x-4*math.cos(a+da),H-(y-4*math.sin(a+da)))
def rect(x,y,w,h):
    c.setStrokeGray(.4);c.setFillGray(1);c.setLineWidth(.65);c.rect(x,H-y-h,w,h,fill=1,stroke=1)

txt(24,24,'SHYAM JAGAT',10,True)
txt(24,49,'Home / Detailed workflow',22,True)
txt(24,65,'Read down each column, then continue to the next column. Arrows show section order; action lines show connections.',8.5)
rect(24,76,W-48,27)
txt(33,87,'TOP BAR',8.5,True)
txt(100,87,'Language selection | Get the App* | Support* | Twitter, Instagram, LinkedIn*',8.5)
txt(33,98,'Languages: English, Hindi, Bengali, Tamil, Telugu, Malayalam, Gujarati, Marathi and Punjabi.',8)
rect(24,107,W-48,26)
txt(33,118,'NAVIGATION',8.5,True)
txt(100,118,'Home | Baba Shyam | About Us | Our Initiatives | Events | Team | More | Sign Up / Sign In',8.5)
txt(33,128,'More: Blog, Temples, Dharamshala, Organisations, Artists, Donation, Contact Us. Brand name returns to Home.',8)

cols=[
[
('Welcome / hero',
 'Devotion, service and community introduction.\nKhatu Shyam location; mission statement.\nHighlights: devotees, initiatives, temples, states.',
 'Become a Member > standard Sign Up', 'Leaderboard advertisement follows.'),
('About Shyam Jagat',
 'Organisation introduction and purpose.\nEducation, employment, food, shelter,\nhealthcare and women empowerment.',
 'Know More > About Us /about',''),
('About Baba Shyam',
 'Barbarik, sacrifice and the blessing of Krishna.\nShort devotional introduction connecting\nthe visitor to the dedicated Baba Shyam page.',
 'Know More > /baba-shyam',''),
('Live Aarti & Darshan',
 'Mangala 05:00 AM; Shringaar 08:30 AM.\nRajbhog 12:00 PM; Sandhya 06:30 PM.\nShayan 09:00 PM; live-stream invitation.',
 'Watch Live > connection pending*','Timings shown in the current Home page.'),
('Our Initiatives',
 'Annadan, Education Support, Swachh Vahini,\nGaushala, Marriage Bureau, Old Age Home.\nCards show a category, title and description.',
 'Learn More > /initiatives','Card Explore labels are unlinked. Banner ad follows.'),
],
[
('Success Stories',
 'Education Support, Employment Portal\nand Old Age Home testimonials.\nEach card: story, name, programme, rating.',
 'Previous / next controls > not connected*',''),
('Why Choose Shyam Jagat',
 'Faith Driven; Transparent; Community Focused.\nVerified Volunteers; Dedicated Support;\nLong-term Impact. Each value has a description.',
 'Informational section; no linked action','Rectangle advertisement follows.'),
('Register Your Temple',
 'Temple-listing introduction and benefits.\nDevotee reach, events and donation information.\nCategory registration is an optional account path.',
 'Register as > Temple > temple form','Entry: Sign Up / Sign In; revised registration flow.'),
('Share Your Art with the World',
 'Artist invitation and platform benefits.\nDiscovery, performances and payment information.\nCategory registration is an optional account path.',
 'Register as > Artist > artist form','Entry: Sign Up / Sign In; revised registration flow.'),
('Service highlights',
 'Response-time message and dedicated support.\nCommunity-size and confidentiality messages.\nFour supporting trust statements.',
 'Informational section; continue to membership',''),
],
[
('Join the Shyam Family',
 'Community membership invitation.\nNormal user > standard sign-up > account.\nRegister as > choose category > category form.',
 'Become a Member > /signup','Leaderboard advertisement follows.'),
('Frequently Asked Questions',
 'Donation, membership, volunteering, marriage.\nEmployment, scholarships, old-age admission,\norganisation registration: eight questions total.',
 'Select question > expand / collapse answer','Only donation and employment answers exist currently.'),
('Need Assistance?',
 'Helpdesk introduction and contact details.\nEmail, phone, Jaipur location and office hours.\nAssistance for enquiries, volunteering and donations.',
 'Read contact details / use adjacent query form',''),
('Send Us Your Query',
 'First name, last name, email and mobile.\nSubject and message.\nSubmit > thank-you alert > clear form.',
 'Send Message > on-screen acknowledgement','Message delivery and storage are not connected.*'),
('Footer / continue browsing',
 'Organisation summary; social links; contact details.\nQuick links: About, History, Vision, Seva, Gallery.\nSupport: Contact, Privacy, FAQ, Volunteer, Live Help.',
 'About Us > /about; Contact Us > /contact','Leaderboard ad before footer. Other footer links: pending.*'),
]
]
xs=[24,294,564];bw=253;bh=74;gap=7;top=151
for ci,col in enumerate(cols):
    for ri,(title,body,action,note) in enumerate(col):
        x=xs[ci];y=top+ri*(bh+gap);rect(x,y,bw,bh)
        txt(x+8,y+13,title,10,True)
        yy=y+26
        lines=[]
        for part in body.split('\n'):lines+=simpleSplit(part,'Helvetica',8.5,bw-16)
        assert len(lines)<=3,(title,lines)
        for line in lines:txt(x+8,yy,line,8.5);yy+=10
        acts=simpleSplit(action,'Helvetica-Bold',8.3,bw-16)
        assert len(acts)==1,(title,acts)
        txt(x+8,y+58,action,8.3,True)
        if note:
            assert len(simpleSplit(note,'Helvetica',7.3,bw-16))==1,(title,note)
            txt(x+8,y+69,note,7.3)
        if ri<4:arrow([(x+bw/2,y+bh),(x+bw/2,y+bh+gap)])
    if ci<2:
        # Return path in the gutter, away from boxes and text.
        edge=x+bw+8
        arrow([(x+bw,top+4*(bh+gap)+bh/2),(edge,top+4*(bh+gap)+bh/2),(edge,143),(xs[ci+1]+bw/2,143),(xs[ci+1]+bw/2,151)])

c.setStrokeGray(.5);c.line(24,H-560,W-24,H-560)
txt(24,573,'* Pending / placeholder in the current project. Registration links reflect the agreed normal-user and Register as paths.',8)
txt(24,585,'The diagram contains no decorative images. Shared navigation stays available while visitors browse the Home page.',8)
c.save()
r=PdfReader(str(path));assert len(r.pages)==1
assert 'Page 01' not in r.pages[0].extract_text()
print(path)
