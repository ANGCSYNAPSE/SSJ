from pathlib import Path
import ast,json,re,zipfile
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4,landscape
from reportlab.lib.utils import simpleSplit
from pypdf import PdfReader
from PIL import Image,ImageDraw

root=Path(__file__).resolve().parents[2];out=root/'output/pdf'
W,H=landscape(A4)
path=out/'about-section-workflows-a4.pdf'
c=canvas.Canvas(str(path),pagesize=(W,H));c.setTitle('Shyam Jagat - About Us section workflows');c.setAuthor('Shyam Jagat')
# Reuse the established visual style without running the Home document builder.
tree=ast.parse((root/'tmp/pdfs/home_sections.py').read_text(encoding='utf-8-sig'))
for node in tree.body:
    if isinstance(node,ast.FunctionDef) and node.name in ['text','box','arrow']:
        exec(compile(ast.Module(body=[node],type_ignores=[]),'<layout>','exec'))
names=[]
def header(title,subtitle='Section content and visitor flow'):
    c.bookmarkPage('about'+str(len(names)));c.addOutlineEntry(title,'about'+str(len(names)));names.append(title)
    text(34,30,'SHYAM JAGAT / ABOUT US',10,True)
    text(34,62,title,25,True);text(34,84,subtitle,11)
    c.setStrokeGray(.4);c.line(34,H-99,W-34,H-99)
def footer(note,next_section):
    if next_section:text(34,521,'Continue to: '+next_section,10,True)
    c.setStrokeGray(.6);c.line(34,H-541,W-34,H-541)
    lines=simpleSplit(note,'Helvetica',9,W-68);assert len(lines)<=3
    for j,s in enumerate(lines):text(34,558+j*12,s,9)
    c.showPage()
def sheet(title,content,actions,note,next_section,sequence=True):
    header(title);text(34,123,'WITHIN THIS SECTION',9,True);text(466,123,'ACTIONS AND CONNECTIONS',9,True)
    for x,w,items,fill in [(34,386,content,False),(466,342,actions,True)]:
        count=len(items);step=88 if count<=4 else 70;bh=76 if count<=4 else 61
        for j,(t,b) in enumerate(items):
            y=137+j*step;box(x,y,w,bh,t,b,fill)
            if fill and sequence and j<count-1:arrow(x+w/2,y+bh,y+step)
    footer(note,next_section)

sheet('Top bar',[
('Language selection','English, Hindi, Bengali, Tamil, Telugu, Malayalam, Gujarati, Marathi and Punjabi.'),
('App invitation','Get the App prompt.'),('Support','Support label and telephone number.'),('Social destinations','Twitter, Instagram and LinkedIn.')],
[('Select a language','Translate the current About Us page.'),('Mobile language selection','Use the compact language dropdown.')],
'The top bar is shared across the website. App, support number and social destinations are placeholders.','Main navigation',False)

sheet('Main navigation',[
('Brand / Home','Brand name links to Home (/).'),('Primary destinations','Home, Baba Shyam, About Us, Our Initiatives, Events and Team.'),
('More menu','Blog, Temples, Dharamshala, Organisations, Artists, Donation and Contact Us.'),('Account entry','Sign Up / Sign In contains normal registration and the optional Register as path.')],
[('Open About Us','Select About Us to open /about.'),('Browse another section','Choose a main link or a More destination.'),('Account options','Normal user > standard sign-up; Register as > category form; existing user > Sign In.'),('Mobile menu','Open the menu to reveal the same navigation items.')],
'The account entry reflects the agreed workflow. About Us is the active main section.','About Shyam Jagat / hero',False)

sheet('About Shyam Jagat / hero',[
('Greeting','Jai Shri Shyam.'),('Page heading','About Shyam Jagat.'),('Supporting statement','Serving Humanity with Faith, Compassion, and Purpose.')],
[('Arrive on About Us','Enter from the navbar, Home Know More link or footer About Us link.'),('Read the introduction','Understand the page subject and organisation purpose.'),('Scroll to the next section','Continue past the leaderboard advertisement to Who We Are.')],
'The hero contains no standalone button or form. The workflow uses text boxes only.','Who We Are')

sheet('Who We Are',[
('Organisation identity','A spiritual and social organisation inspired by the teachings and blessings of Baba Shyam.'),
('Purpose','Combine devotion with meaningful social service to transform lives.'),('Community outcome','Compassion, dignity and opportunity for individuals and families.'),
('Guiding values','Selfless service, kindness, equality and humanity.')],
[('Read the organisation introduction','Two paragraphs explain its identity, purpose and values.'),('Continue reading','Scroll to the paired Vision & Mission section.')],
'This is an informational section. There are no direct links or expandable elements within it.','Vision & Mission')

sheet('Vision & Mission',[
('Our Vision','A compassionate, empowered and self-reliant society under the blessings of Baba Shyam.'),
('Access and dignity','Education, healthcare, food, shelter, employment opportunities and a life of dignity.'),
('Our Mission','Sustainable initiatives that uplift lives, strengthen communities and encourage contribution.'),
('Lasting impact','Empower individuals through resources, support and opportunities.')],
[('Read the two statements','Vision and Mission appear as two parallel information cards.'),('Continue reading','Scroll past the large banner advertisement to Our Belief.')],
'Vision and Mission are parallel statements, not separate user steps. Neither card links to another page.','Our Belief')

sheet('Our Belief',[
('Small acts of kindness','Even small acts can make a lasting difference.'),('Service and compassion','Encourage everyone to join a shared journey of positive change.'),
('Collective purpose','Build hope, create opportunities and support a stronger, kinder society.'),('Call to action','Join the Shyam Family.')],
[('Join the Shyam Family','Open Sign Up /signup.'),('Normal user option','Complete standard sign-up without selecting a category.'),('Register as option','Choose a category only if this optional path is selected.'),('Existing user option','Use Sign In to access an existing account.')],
'The account paths are alternatives. Choosing a category is not required for a normal user.','Platform Ecosystem Overview',False)

sheet('Platform Ecosystem Overview',[
('Section introduction','One Platform. Every Role. Infinite Devotion.'),('Devotees and temples','People participating in devotion and temples represented on the platform.'),
('Artists and organisers','Devotional artists and event organisers.'),('Administrators','Administration is described as part of the platform ecosystem.')],
[('Read the platform introduction','Understand how the five named roles are presented together.'),('View the role labels','Devotees, Temples, Artists, Organizers and Administrators.'),('Explore the feature overview','Continue to the nine informational feature cards in this section.')],
'Role labels are informational, not registration buttons. The page does not offer public administrator registration.','Platform features')

header('Platform features','Nine informational cards within the Platform Ecosystem Overview')
features=[
('Temple Registration & Management','Temple profiles, schedules and offerings.'),
('Artist Registration & Slot Booking','Artist registration, availability and event booking.'),
('Live Darshan & Aarti Feed','Remote viewing of aarti and darshan.'),
('Puja / Seva / Darshan Booking','Personalised puja, seva and darshan slots.'),
('Center Dashboard','Content, users, bookings and operational management.'),
('Events & Activities','Spiritual events, satsangs, bhajans and gatherings.'),
('Donations & Fundraising','Donations, causes, relief initiatives and campaign tracking.'),
('Spiritual Content','Bhajans, kathas, articles and devotional videos.'),
('Analytics & Reports','Impact and engagement reporting for administrators and organisers.')]
for i,(t,b) in enumerate(features):
    x=34+(i%3)*261;y=133+(i//3)*107
    box(x,y,252,96,t,b)
box(34,463,774,48,'Read feature descriptions','These cards are not clickable. Continue to the Get Started invitation.',True)
footer('These are capabilities described in the About Us copy. Their description does not establish that every booking or dashboard flow is implemented.','Get Started')

header('Get Started','Closing invitation within the Platform Ecosystem Overview')
box(34,132,774,57,'Join the platform','Join thousands of devotees, temples and artists already on the platform.')
arrow(421,189,213);box(267,213,308,49,'Get Started','Open Sign Up /signup.',True)
# Parallel normal-user and category paths; no sequential link between alternatives.
c.setStrokeGray(.4);c.line(421,H-262,421,H-284);c.line(207,H-284,635,H-284)
arrow(207,284,307);arrow(635,284,307)
box(34,307,347,66,'Normal user','Use standard registration. No category selection.')
box(461,307,347,66,'Register as','Choose the optional category-registration path.')
arrow(207,373,402);arrow(635,373,402)
box(34,402,347,76,'Create an account','Enter account details, accept terms and submit. Correct errors if needed; continue after success.',True)
box(461,402,347,76,'Choose category / category form','Artist, Dancer, Musician, Temple, Dharamshala or Organisation (Mandal).',True)
footer('Existing users use Sign In. Organiser and administrator labels in the ecosystem do not create additional available registration categories.','Footer / continue browsing')

sheet('Footer / continue browsing',[
('Organisation summary','Shared description of the organisation and community.'),('Quick links','About Us, History, Our Vision, Seva List and Gallery.'),
('Support links','Contact Us, Privacy Policy, Donation FAQ, Volunteer and Live Help.'),('Contact and social information','Shared contact details, social links, copyright and design credit.')],
[('About Us','Open /about or remain on the current page.'),('Contact Us','Open /contact.'),('Other footer destinations','The remaining quick, support and social links are placeholders.')],
'A shared leaderboard advertisement appears before the footer. Shared navigation remains available for further browsing.','Another destination from the main navigation',False)

sheet('Advertisement placements',[
('After the hero','Leaderboard advertisement: 728 x 90.'),('After Vision & Mission','Large banner advertisement: 970 x 250, with an Explore label.'),
('Before the footer','Shared leaderboard advertisement: 728 x 90.')],
[('Reserved advertisement space','Displayed between the About Us content sections.'),('Current state','The slots and Explore label are placeholders; there is no connected advertiser destination.'),('Continue browsing','Proceed to the next About Us section or footer.')],
'Repeated advertisement placements are documented together on this sheet. No advertising artwork is included.','',False)

c.save();r=PdfReader(str(path));assert len(r.pages)==11
for p in r.pages:
    assert abs(float(p.mediabox.width)-W)<.01 and abs(float(p.mediabox.height)-H)<.01
    assert not re.search(r'Page\s+\d',p.extract_text())
(root/'tmp/pdfs/about-section-manifest.json').write_text(json.dumps(names))
print('11 A4 About Us sheets created, without page numbers.')
