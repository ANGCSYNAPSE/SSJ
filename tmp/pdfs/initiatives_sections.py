from pathlib import Path
import ast,json,re,zipfile
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4,landscape
from reportlab.lib.utils import simpleSplit
from pypdf import PdfReader
from PIL import Image,ImageDraw

root=Path(__file__).resolve().parents[2];out=root/'output/pdf';W,H=landscape(A4)
path=out/'initiatives-section-workflows-a4.pdf'
c=canvas.Canvas(str(path),pagesize=(W,H));c.setTitle('Shyam Jagat - Our Initiatives section workflows');c.setAuthor('Shyam Jagat')
for filename,chosen in [('home_sections.py',['text','box','arrow']),('about_sections.py',['header','footer','sheet'])]:
    source=(root/'tmp/pdfs'/filename).read_text(encoding='utf-8-sig').replace('SHYAM JAGAT / ABOUT US','SHYAM JAGAT / OUR INITIATIVES')
    for node in ast.parse(source).body:
        if isinstance(node,ast.FunctionDef) and node.name in chosen:exec(compile(ast.Module(body=[node],type_ignores=[]),'<layout>','exec'))
names=[]

sheet('Our Initiatives / hero',[
('Greeting and heading','Jai Shri Shyam. Our Initiatives.'),
('Supporting statement','Serving Society Through Compassion & Seva.'),
('Purpose','Selfless service inspired by the teachings of Baba Shyam.'),
('Intended impact','Uplift individuals, strengthen families and create opportunities for a compassionate, self-reliant society.')],
[('Arrive on the page','Enter /initiatives from its navigation link or the Home Learn More action.'),
('Read the introduction','Understand the purpose of the service programmes.'),
('Continue reading','Scroll past the leaderboard advertisement to Featured Initiatives.')],
'The hero has no separate button or form. No photographs or decorative artwork are included in these charts.','Featured Initiatives')

sheet('Featured Initiatives',[
('Marriage Bureau','Community-based matrimonial support built around shared values, trust and mutual respect.'),
('Employment Portal','Placements, career guidance and skill-based opportunities connecting job seekers and employers.'),
('Education Support','Scholarships, learning resources, mentorship and financial assistance for students.'),
('Women Empowerment','Skills, entrepreneurship, financial literacy and leadership opportunities.')],
[('Read a programme card','Each card shows its title, description and two actions.'),
('Learn More','All four buttons link to /initiatives, the current page.'),
('Volunteer','All four Volunteer links open Sign Up /signup.'),
('Account path','Normal users sign up normally. Category selection appears only if Register as is chosen.')],
'Learn More and Volunteer are alternative actions. No separate programme detail or volunteer application is opened by these cards.','Community Welfare',False)

sheet('Community Welfare',[
('Old Age Home','Accommodation, healthcare, meals and companionship for elders.'),
('Annadan (Food Seva)','Food distribution drives and community kitchens.'),
('Rain Basera','Temporary shelter, bedding and essential facilities.'),
('Medical Camps','Health check-ups, blood donation and eye camps.'),
('Disaster Relief','Food, medicines and clothing during disasters.')],
[('Browse the five programmes','Read the name and description of each welfare card.'),
('Learn More','Every card links to /initiatives, the current page.'),
('Continue reading','Scroll to Spiritual & Cultural.')],
'There are no separate welfare detail pages or application forms connected to these Learn More links.','Spiritual & Cultural')

sheet('Spiritual & Cultural',[
('Temple Support','Temple renovation, digital management and volunteer coordination.'),
('Spiritual Learning','Satsangs, bhajan evenings and discourses connecting people with spiritual values and culture.'),
('Social Service','Cleanliness, tree plantation and environmental campaigns.')],
[('Read the three programme cards','Each card contains a title, explanation and Learn More link.'),
('Learn More','All three links return to /initiatives.'),
('Continue reading','Scroll past the rectangle advertisement to Our Commitment.')],
'The section describes programmes. Its links do not open a booking, registration or programme-detail flow.','Our Commitment')

sheet('Our Commitment',[
('Service principles','Faith, compassion and responsibility guide the initiatives.'),
('Community participation','Volunteers, members and supporters contribute together.'),
('Intended outcome','Create opportunities, provide hope and strengthen a community where people live with dignity.'),
('Two calls to action','Join as Volunteer and Make a Donation.')],
[('Join as Volunteer','Open Sign Up /signup; standard account creation is the default path.'),
('Make a Donation','Open /donation to choose an offering and enter donor details.'),
('Continue browsing','Scroll to Moments of Seva & Devotion.')],
'The two buttons are alternatives. Sign-up alone does not complete a volunteer application or assign a volunteer role.','Moments of Seva & Devotion',False)

sheet('Moments of Seva & Devotion',[
('Gallery and filters','12 activity cards. Filters: All, Seva, Medical, Education, Temple, Women, Community and Festivals.'),
('Seva / Medical activities','Annadan Food Distribution, Volunteer Group Activity, Old Age Home Visit; Medical Camp and Blood Donation Drive.'),
('Education / Women / Temple','Education Support, Women Training Workshop and Temple Event.'),
('Community / Festivals','Bhajan Sandhya, Tree Plantation, Community Gathering and Festival Celebration.')],
[('Choose a category','Filter the cards on the same page; the selected filter is highlighted.'),
('Read a visible card','Each displays a category tag, activity title, date and location.'),
('Choose All','Restore all 12 activity cards.'),
('View Album label','Currently display-only: no album page or viewer opens.')],
'Filtering is connected; album navigation is not. A large banner advertisement follows this section.','How You Can Contribute',False)

header('How You Can Contribute','Six independent contribution choices and their linked destinations')
text(34,121,'CONTRIBUTION OPTION',9,True);text(466,121,'BUTTON AND DESTINATION',9,True)
choices=[
('Volunteer','Contribute time and skills to seva programmes.','Join as Volunteer','Sign Up /signup'),
('Donate','Support meals, medicine, education and shelter.','Donate Now','Donation /donation'),
('Become Member','Join the Shyam Jagat community.','Become a Member','Sign Up /signup'),
('Sponsor Education','Support a child\'s education and opportunities.','Sponsor a Child','Donation /donation'),
('Sponsor Meals','Support meal distribution for families.','Sponsor Meals','Donation /donation'),
('Partner With Us','Organisations and businesses can offer support.','Partner With Us','Contact Us /contact')]
for i,(title,desc,cta,target) in enumerate(choices):
    y=132+i*63
    box(34,y,386,56,title,desc)
    box(466,y,342,56,cta,target,True)
    c.setStrokeGray(.4);c.line(420,H-y-28,466,H-y-28)
    c.line(466,H-y-28,461,H-y-25);c.line(466,H-y-28,461,H-y-31)
footer('Sponsorship buttons open the general donation page without a preselected cause. Volunteer and membership buttons open standard sign-up.','End of Our Initiatives content')

sheet('Advertisement placements',[
('After the hero','Leaderboard slot: 728 x 90.'),
('After Spiritual & Cultural','Rectangle slot: 300 x 250.'),
('After the gallery','Large banner: 970 x 250, with an Explore label.')],
[('Reserved spaces','Advertisements sit between the main content sections.'),
('Current state','The ad slots and Explore label are placeholders.'),
('Continue reading','Proceed to the next initiative section.')],
'Website top bar, main navigation and footer are excluded from this set. No ad artwork or page numbers are included.','',False)

c.save();r=PdfReader(str(path));assert len(r.pages)==8
for p in r.pages:
    assert abs(float(p.mediabox.width)-W)<.01 and abs(float(p.mediabox.height)-H)<.01
    assert not re.search(r'Page\s+\d',p.extract_text())
(root/'tmp/pdfs/initiatives-section-manifest.json').write_text(json.dumps(names))
print('8 A4 section sheets created; no page numbers or shared website header/footer sections.')
