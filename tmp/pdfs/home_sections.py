from pathlib import Path
import math,json,re
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4,landscape
from reportlab.lib.utils import simpleSplit
from pypdf import PdfReader

root=Path(__file__).resolve().parents[2];out=root/'output/pdf'
W,H=landscape(A4)
data=[]
def add(title,content,actions,note='',next_section=''):
    data.append(dict(title=title,content=content,actions=actions,note=note,next=next_section))

add('Top bar',[
('Language selection','English, Hindi, Bengali, Tamil, Telugu, Malayalam, Gujarati, Marathi and Punjabi.'),
('Get the App','App-download invitation in the utility bar.'),
('Support','Support label and telephone contact.'),
('Social links','Twitter, Instagram and LinkedIn.')],
[('Select a language','Translate the current page.'),('Mobile view','Use the language dropdown instead of the desktop language row.')],
'App, support number and social destinations are placeholders in the current project.','Main navigation')

add('Main navigation',[
('Brand / Home','Selecting the brand returns to Home (/).'),
('Primary sections','Home, Baba Shyam, About Us, Our Initiatives, Events and Team.'),
('More menu','Blog, Temples, Dharamshala, Organisations, Artists, Donation and Contact Us.'),
('Account entry','Sign Up / Sign In. Registration sits inside this flow.')],
[('Browse a section','Select a navigation item to open its page.'),('New account','Normal user > standard sign-up; Register as > choose category > form.'),('Returning user','Sign In > access the account.'),('Mobile menu','Open the menu to reveal the same destinations.')],
'Proposed account navigation follows your two registration paths. Temples should link to /temple-directory.','Welcome / hero')

add('Welcome / hero',[
('Welcome message','Jai Shri Shyam; cooperation, service and dedication. Introduction to devotion and service to humanity.'),
('Location','Khatu Shyam Temple, Rajasthan.'),
('Community highlights','50K+ devotees; 250+ seva initiatives; 1,200+ temples; 15+ states, as displayed in the current page.'),
('Our mission','A global community of devotees united by faith, service and compassion.')],
[('Become a Member','Open Sign Up /signup.'),('Normal user','Complete standard sign-up without selecting a category.'),('Account created','Continue to Home after successful sign-up.')],
'Community figures are existing page copy. A leaderboard advertisement follows this section.','About Shyam Jagat')

add('About Shyam Jagat',[
('Organisation introduction','A spiritual and social organisation inspired by Baba Shyam.'),
('Education and employment','Education support, skill training and employment opportunities.'),
('Essential community support','Food security, shelter and healthcare camps.'),
('Women empowerment','Programmes supporting a compassionate and self-reliant society.')],
[('Know More','Open About Us /about.'),('About Us page','Read the organisation background, vision, mission and platform overview.')],
'The Home section is a short introduction; the About Us page holds the broader description.','About Baba Shyam')

add('About Baba Shyam',[
('Introduction to Barbarik','A short devotional account introducing Baba Shyam.'),
('Sacrifice','The narrative describes his sacrifice for dharma.'),
('Blessing of Krishna','The introduction connects the story to devotion to Shyam.')],
[('Know More','Open /baba-shyam.'),('Baba Shyam page','Explore history, journey, teachings, festivals, rituals and visit information.')],
'This section previews the devotional content; it does not open a separate story within Home.','Live Aarti & Darshan')

add('Live Aarti & Darshan',[
('Morning schedule','05:00 AM - Mangala Aarti; 08:30 AM - Shringaar Aarti.'),
('Midday schedule','12:00 PM - Rajbhog Aarti.'),
('Evening schedule','06:30 PM - Sandhya Aarti; 09:00 PM - Shayan Aarti.'),
('Streaming invitation','Currently Streaming message and Watch Live button.')],
[('Read the schedule','View the aarti timings on Home.'),('Watch Live','Intended action: open the live stream.'),('Current state','The button has no connected playback action.')],
'Timings are transcribed from the current Home page, not independently verified temple timings.','Our Initiatives')

add('Our Initiatives',[
('Annadan / Education Support','Food seva, scholarships, mentorship and educational resources.'),
('Swachh Vahini / Gaushala','Cleanliness and environmental care; shelter and care for cows.'),
('Marriage Bureau / Old Age Home','Community matrimonial support; care and shelter for elders.'),
('Card content','Each initiative displays its category, title and short description.')],
[('Learn More','Open Our Initiatives /initiatives.'),('Explore the programmes','Read featured, welfare, spiritual and cultural initiatives.'),('Card Explore labels','Currently display-only; individual card destinations are not connected.')],
'A large banner advertisement follows this section.','Success Stories')

add('Success Stories',[
('Education Support','Rahul Sharma - scholarship and education story.'),
('Employment Portal','Priya Verma - employment and career story.'),
('Old Age Home','Rameshwar Ji - care and community story.'),
('Testimonial details','Programme label, quoted story, name and five-star rating.')],
[('Read testimonials','View the three displayed stories.'),('Previous / next','Carousel-style controls appear below the stories.'),('Current state','The controls have no connected slide-changing action.')],
'Names and stories are existing site content. No story detail page is linked.','Why Choose Shyam Jagat')

add('Why Choose Shyam Jagat',[
('Faith Driven / Transparent','Service as devotion; transparency and accountability.'),
('Community Focused / Verified Volunteers','Community participation and volunteer standards.'),
('Dedicated Support / Long-term Impact','Support and sustainable change.')],
[('Read the six values','Each value has a short explanatory description.'),('Continue browsing','Scroll to the temple registration invitation.')],
'This is an informational section with no linked action. A rectangle advertisement follows.','Register Your Temple')

add('Register Your Temple',[
('Invitation for temples','List a temple and help devotees discover its location, darshan timings and events.'),
('Reach','The page promotes wider visibility among devotees.'),
('Management features','The page describes digital events and donations.'),
('Listing offer','The page describes free listing with premium options.')],
[('Register as Temple','Enter the Sign Up / Sign In flow.'),('Register as','Choose the category registration option.'),('Choose Temple','Open the Temple category form.'),('Complete temple details','Temple information, location, services, gallery and terms.')],
'This is the agreed registration flow. The existing Home button currently links directly to /temple-registration.','Share Your Art with the World')

add('Share Your Art with the World',[
('Invitation for artists','Join as a devotional artist and showcase work at spiritual and cultural gatherings.'),
('Discovery','Get discovered by event organisers.'),
('Performances','Participate in temple and festival programmes.'),
('Compensation','The page promotes fair compensation and timely payments.')],
[('Register as Artist','Enter the Sign Up / Sign In flow.'),('Register as','Choose the category registration option.'),('Choose Artist','Open the Artist category form.'),('Complete artist details','Personal information, expertise, portfolio, availability and terms.')],
'This is the agreed registration flow. The existing Home button currently links directly to /artist-registration.','Service highlights')

add('Service highlights',[
('Fast response','Requests within 24 hours.'),
('Human help','Dedicated Support.'),
('Community','Community 1000+.'),
('Privacy statement','100% Confidential.')],
[('Read the highlights','Four short service and trust messages.'),('Continue browsing','Scroll to Join the Shyam Family.')],
'These are statements displayed in the current page, not independently verified service guarantees.','Join the Shyam Family')

add('Join the Shyam Family',[
('Membership invitation','Become part of the mission and community.'),
('Primary button','Become a Member.'),
('Normal user registration','The default path does not require a category.'),
('Optional category registration','Category selection appears only after Register as is selected.')],
[('Become a Member','Open Sign Up /signup.'),('Normal user path','Standard form > successful sign-up > account created.'),('Register as path','Choose category > complete the category form.'),('Existing user','Sign In > access the account.')],
'The two registration paths are alternatives, not consecutive steps. A leaderboard advertisement follows.','Frequently Asked Questions')

add('Frequently Asked Questions',[
('Donation / membership','How can I donate? How do I become a member?'),
('Volunteering / marriage','How can I volunteer? Is the Marriage Bureau service free?'),
('Employment / education','How does the Employment Portal work? Who qualifies for scholarships?'),
('Care / organisation','How can a senior citizen apply for the Old Age Home? Is Shyam Jagat registered?')],
[('Select a question','Expand its answer within the same column.'),('Select it again','Collapse the answer.'),('Select another question','Switch the open item in that column.'),('Current answer coverage','Only donation and employment have answer text; six answers are missing.')],
'Two FAQ columns keep their own open state. Questions do not link to other pages.','Need Assistance?')

add('Need Assistance?',[
('Helpdesk introduction','Support for enquiries, volunteering, donations and general assistance.'),
('Email and phone','contact@shyamjagat.org; +91 12345 67890 as displayed.'),
('Location','Jaipur, Rajasthan, India.'),
('Office hours','Monday to Saturday, 9 AM to 6 PM.')],
[('Read contact information','Contact rows are displayed as text.'),('Send a query','Use the adjacent Send Us Your Query form.')],
'The assistance information and query form share one contact section on the website; each has its own sheet here.','Send Us Your Query')

add('Send Us Your Query',[
('Name','First name and last name.'),
('Contact details','Email address and mobile number.'),
('Enquiry','Subject and message.'),
('Submission button','Send Message.')],
[('Enter enquiry','Fill in the form fields.'),('Send Message','Submit the form.'),('Acknowledgement','A thank-you alert is displayed.'),('Reset form','All fields are cleared.')],
'The current handler does not send or store the enquiry. Required-field validation is not implemented.','Footer / continue browsing')

add('Footer / continue browsing',[
('Organisation summary','Short brand description and community purpose.'),
('Quick links','About Us, History, Our Vision, Seva List and Gallery.'),
('Support links','Contact Us, Privacy Policy, Donation FAQ, Volunteer and Live Help.'),
('Contact / social / legal','Email, phone, address; Facebook, Instagram, YouTube, Twitter; copyright and design credit.')],
[('About Us','Open /about.'),('Contact Us','Open /contact.'),('Other links','Quick links, support links and social links otherwise use placeholders.')],
'A leaderboard advertisement appears before the footer. Footer contact details differ from the Home helpdesk and need reconciliation.','Use the shared navigation to continue')

add('Advertisement placements',[
('After Welcome / hero','Leaderboard slot: 728 x 90.'),
('After Our Initiatives','Large banner slot: 970 x 250; Explore label.'),
('After Why Choose Shyam Jagat','Rectangle slot: 300 x 250.'),
('After membership / before footer','Leaderboard after Join the Shyam Family, and another before the footer.')],
[('View ad placement','Reserved space appears between Home content sections.'),('Current state','Ad spaces and Explore / Learn More labels are placeholders.'),('Continue reading','Proceed to the next Home section.')],
'This sheet documents repeated ad placements together. No advertisement images are included.','')

c=canvas.Canvas(str(out/'home-section-workflows-a4.pdf'),pagesize=(W,H));c.setTitle('Shyam Jagat - Home sections');c.setAuthor('Shyam Jagat')
def text(x,y,s,size=10,bold=False):
    c.setFont('Helvetica-Bold' if bold else 'Helvetica',size);c.setFillGray(.12);c.drawString(x,H-y,s)
def box(x,y,w,h,title,body,fill=False):
    c.setStrokeGray(.35);c.setLineWidth(.7);c.setFillGray(.96 if fill else 1);c.rect(x,H-y-h,w,h,fill=1,stroke=1)
    tls=simpleSplit(title,'Helvetica-Bold',11,w-24);bls=simpleSplit(body,'Helvetica',10,w-24)
    used=len(tls)*14+len(bls)*13+5
    assert used<=h-16,(title,used,h)
    cy=y+(h-used)/2+10
    for s in tls:text(x+12,cy,s,11,True);cy+=14
    cy+=5
    for s in bls:text(x+12,cy,s,10);cy+=13
def arrow(x,y1,y2):
    c.setStrokeGray(.4);c.setLineWidth(.7);c.line(x,H-y1,x,H-y2)
    c.line(x,H-y2,x-3,H-y2+5);c.line(x,H-y2,x+3,H-y2+5)

for i,d in enumerate(data):
    c.bookmarkPage('s'+str(i));c.addOutlineEntry(d['title'],'s'+str(i))
    text(34,30,'SHYAM JAGAT / HOME PAGE',10,True)
    text(34,62,d['title'],25,True)
    text(34,84,'Section content and visitor flow',11)
    c.setStrokeGray(.4);c.line(34,H-99,W-34,H-99)
    text(34,123,'WITHIN THIS SECTION',9,True);text(466,123,'ACTIONS AND CONNECTIONS',9,True)
    for x,w,items,fill in [(34,386,d['content'],False),(466,342,d['actions'],True)]:
        for j,(title,body) in enumerate(items):
            yy=137+j*88
            box(x,yy,w,76,title,body,fill)
            alternatives=d['title'] in ['Top bar','Main navigation','Join the Shyam Family','Footer / continue browsing']
            if j<len(items)-1 and not (fill and alternatives):arrow(x+w/2,yy+76,yy+88)
    # Only one section per sheet; continuation names are navigation context.
    if d['next']:text(34,521,'Continue to: '+d['next'],10,True)
    c.setStrokeGray(.6);c.line(34,H-541,W-34,H-541)
    lines=simpleSplit(d['note'],'Helvetica',9,W-68)
    assert len(lines)<=3
    for j,line in enumerate(lines):text(34,558+j*12,line,9)
    c.showPage()
c.save()
p=out/'home-section-workflows-a4.pdf';r=PdfReader(str(p));assert len(r.pages)==18
for page in r.pages:
    assert abs(float(page.mediabox.width)-W)<.01
    assert abs(float(page.mediabox.height)-H)<.01
    assert not re.search(r'Page\s+\d',page.extract_text())
(root/'tmp/pdfs/home-section-manifest.json').write_text(json.dumps([d['title'] for d in data]))
print('18 A4 sheets created; one Home section per sheet; no page numbers.')
