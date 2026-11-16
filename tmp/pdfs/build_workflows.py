from pathlib import Path
import re, json, math, zipfile
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.utils import simpleSplit
from pypdf import PdfReader

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'output/pdf'; OUT.mkdir(parents=True,exist_ok=True)
W,H=landscape(A4)
pdf=OUT/'shyam-jagat-workflows-a4.pdf'
c=canvas.Canvas(str(pdf),pagesize=(W,H))
c.setTitle('Shyam Jagat - Website workflows'); c.setAuthor('Shyam Jagat')
pages=[]

def text(x,y,s,size=10,bold=False):
    c.setFont('Helvetica-Bold' if bold else 'Helvetica',size); c.setFillGray(.12); c.drawString(x,H-y,s)

def box(x,y,w,h,title,body='',shade=False):
    c.setStrokeGray(.35); c.setLineWidth(.7); c.setFillGray(.95 if shade else 1)
    c.rect(x,H-y-h,w,h,fill=1,stroke=1)
    ts=10; bs=8.5
    lines=simpleSplit(title,'Helvetica-Bold',ts,w-20)
    bodylines=[]
    for part in body.split('\n') if body else []: bodylines+=simpleSplit(part,'Helvetica',bs,w-20)
    total=len(lines)*11+len(bodylines)*10+(3 if bodylines else 0)
    assert total<=h-10,(title,total,h)
    cy=y+(h-total)/2+9
    for line in lines: text(x+10,cy,line,ts,True); cy+=11
    if bodylines: cy+=3
    for line in bodylines: text(x+10,cy,line,bs); cy+=10

def arrow(points,dashed=False):
    c.setStrokeGray(.4);c.setLineWidth(.7)
    c.setDash(3,3) if dashed else c.setDash()
    p=c.beginPath();p.moveTo(points[0][0],H-points[0][1])
    for x,y in points[1:]:p.lineTo(x,H-y)
    c.drawPath(p);c.setDash()
    (x0,y0),(x,y)=points[-2:]; a=math.atan2(y-y0,x-x0)
    p=c.beginPath();p.moveTo(x,H-y)
    p.lineTo(x-5*math.cos(a-.45),H-(y-5*math.sin(a-.45)))
    p.moveTo(x,H-y);p.lineTo(x-5*math.cos(a+.45),H-(y-5*math.sin(a+.45)));c.drawPath(p)

def start(title,subtitle):
    text(34,29,'SHYAM JAGAT / WEBSITE WORKFLOW',9,True)
    text(34,59,title,23,True); text(34,79,subtitle,9)
    c.setStrokeGray(.3);c.line(34,H-91,W-34,H-91)
    c.bookmarkPage('sheet'+str(len(pages)));c.addOutlineEntry(title,'sheet'+str(len(pages)),0,False)
    pages.append(title)

def finish(note=''):
    c.setStrokeGray(.65);c.line(34,43,W-34,43)
    for i,line in enumerate(simpleSplit(note,'Helvetica',8,W-68)):
        text(34,H-29+i*10,line,8)
    c.showPage()

def flow(title,route,rows,note='',entry=None):
    start(title,entry or ('Entry: '+route+'  |  Shared top bar and navigation above; footer below.'))
    text(45,112,'PAGE SECTIONS / TOP TO BOTTOM',8,True)
    text(486,112,'ACTIONS / LINKED DESTINATIONS',8,True)
    n=len(rows)
    def needed(t,b,w):
        tl=len(simpleSplit(t,'Helvetica-Bold',10,w-20))
        bl=sum(len(simpleSplit(s,'Helvetica',8.5,w-20)) for s in b.split('\n')) if b else 0
        return tl*11+bl*10+(3 if bl else 0)+12
    heights=[max(needed(t,b,375),needed(a[0],a[1],315) if a else 0,36) for t,b,a in rows]
    assert sum(heights)+7*(n-1)<=423,(title,heights)
    extra=min(12,(423-sum(heights)-7*(n-1))/n)
    heights=[h+extra for h in heights]
    y=124
    for i,row in enumerate(rows):
        name,body,action=row; bh=heights[i]
        box(44,y,375,bh,name,body)
        if i<n-1:arrow([(231,y+bh),(231,y+bh+7)])
        if action:
            at,ab=action
            box(482,y,315,bh,at,ab,True)
            arrow([(419,y+bh/2),(482,y+bh/2)])
        y+=bh+7
    finish(note)

def R(t,b='',a=None):return(t,b,a)

start('Navigation overview','Proposed navigation with the agreed normal-user and category registration paths.')
box(260,109,322,32,'Visitor enters the website')
arrow([(421,141),(421,156)])
box(34,156,774,49,'Top bar','Language selection | Get the App* | Support* | Social links*',True)
text(44,220,'English, Hindi, Bengali, Tamil, Telugu, Malayalam, Gujarati, Marathi and Punjabi',9)
arrow([(421,225),(421,242)])
box(34,242,774,33,'Main navigation','',True)
items=[('Home / Baba Shyam / About Us','Home overview\nDevotional information\nOrganisation and purpose'),('Our Initiatives / Events / Team','Service programmes\nEvent listing > event details\nLeadership > state teams'),('More','Blog > article; Temples\nDharamshala; Organisations\nArtists; Donation; Contact Us'),('Sign Up / Sign In','Normal user > standard sign-up\nRegister as > category > form\nExisting user > sign in')]
for i,(t,b) in enumerate(items):
    x=34+i*197;arrow([(x+91,275),(x+91,299)]);box(x,299,183,102,t,b)
box(34,427,374,72,'Shared navigation behaviour','Brand name > Home. Current section is highlighted.\nMobile menu reveals the same destinations.\nLanguage selection changes the current page language.')
box(434,427,374,72,'Registration is inside Sign Up / Sign In','Normal users do not choose a category.\nCategory options appear only after selecting Register as.\nExisting users can sign in without registering again.')
finish('* App, support and social links are placeholders. Temples should link to /temple-directory; the current menu uses /temples.')

flow('Home','/',[
R('Welcome / introduction','Mission, location and community highlights',('Join the community','Sign Up / Sign In > normal user')),
R('About Shyam Jagat','Organisation introduction',('Read more','About Us /about')),
R('About Baba Shyam','Devotional introduction',('Explore Baba Shyam','/baba-shyam')),
R('Live aarti & darshan','Live viewing area and devotional content',('Viewing controls','Current section; streaming connection to confirm')),
R('Our initiatives','Featured community and service programmes',('View initiatives','/initiatives')),
R('Success stories / why choose us','Stories, values and service commitments'),
R('Temple and artist registration','Two category-specific invitations',('Register as','Sign Up / Sign In > Register as > category form')),
R('Service highlights / membership','Support highlights and Join the Shyam Family',('Become a member','Sign Up > standard sign-up')),
R('Frequently asked questions','Question list with expandable answers',('Select a question','Expand or collapse its answer')),
R('Contact / query form','Contact details; name, email, mobile, subject, message',('Send message','Current form acknowledgement; delivery to confirm')),
], 'Advertising slots sit between content blocks. Registration links show the revised flow; the website code has not been changed.')

flow('Baba Shyam','/baba-shyam',[
R('Introduction','The Divine Legacy of Baba Shyam',('Explore / visit','Journey anchor on this page / Temple Directory')),
R('Divine story / sacred history','Origin and historical narrative'),
R('Divine journey timeline','Life events and devotional milestones'),
R('Teachings / divine abode','Values and temple introduction'),
R('Miracles / divine blessings','Devotee stories and faith highlights'),
R('Festivals / daily temple rituals','Festival list and daily ritual schedule'),
R('Bhajans / spiritual wisdom','Devotional tracks',('Audio controls','Playback connection to confirm')),
R('Divine moments gallery','Temple, devotees, aarti, festivals and other categories',('Select a gallery filter','Update visible items on the same page')),
R('Plan your visit / wisdom quotes','Location, timings, travel, stay and quotations',('Browse quotations','Previous / next quote on the same page')),
], 'Gallery and media are represented as labelled boxes only. Advertising slots are omitted from the main reading path.')

flow('About Us','/about',[
R('Introduction','Faith, service and community'),R('Who we are','Organisation background'),
R('Vision and mission','Purpose, direction and intended impact'),R('Our belief','Principles guiding the organisation',('Join the community','Sign Up > normal user')),
R('Platform ecosystem','Devotees, temples, artists, organisers and administrators'),
R('Platform feature overview','Registration, darshan, bookings, events, donations and content'),
R('Join Shyam Jagat','Closing invitation',('Create an account','Sign Up / Sign In')),
], 'Features described in the page copy do not necessarily have complete working destinations yet.')

flow('Our Initiatives','/initiatives',[
R('Introduction','Community service and contribution'),
R('Featured initiatives','Marriage bureau, employment, education and women empowerment',('Explore / participate','Current initiatives page / Sign Up')),
R('Community welfare','Old age home, annadan, shelter, medical camps, disaster relief'),
R('Spiritual and cultural work','Temple support, spiritual learning and social service'),
R('Commitment to service','Invitation to join and support',('Join / donate','Sign Up / Donation')),
R('Activity gallery','Service and cultural activity categories',('Gallery controls','Filter or browse within the page')),
R('How you can contribute','Volunteer, donate, membership, sponsorship and partnership',('Contribution destinations','Follow the selected action; unresolved links need wiring')),
], 'Initiative cards currently return to /initiatives; separate initiative detail pages are not present.')

flow('Events','/events',[
R('Introduction','Discover spiritual and community events'),R('Upcoming events','Event cards with date and location',('Select an event','Event details /events/[slug]')),
R('Weekly calendar','Events arranged by day',('Calendar selection','Browse available event information')),
R('Browse by category','Event-type choices'),R('Past events gallery','Previous gatherings and activities'),
R('Host an event','Organiser invitation',('Host / get help','Host action is a placeholder; Contact Us /contact')),
], 'Event registration is attendance registration; it is separate from account and category registration.')

flow('Event details','/events/[slug]',[
R('Event introduction','Selected event title and summary'),R('Quick information','Dates, venue and event essentials'),
R('Event details','Description, schedule and programme'),R('Attendance form','Name, mobile number and number of people',('Submit attendance','Missing details > complete fields; valid details > acknowledgement')),
R('Attendance acknowledgement','Confirmation displayed on the page'),R('Related events','Suggested events',('Choose another event','/events/[slug] for the selected event')),
], 'The current attendance form changes local screen state; persistent event registration is not connected. Unknown events lead to Not Found.')

flow('Team','/team',[
R('Team navigation','Overview, leadership, boards and State Team',('Choose a team section','Open the corresponding team page')),
R('Team introduction','Organisation leadership overview'),
R('Leadership board','Chairman, Mukhya Trustee and Trustees',('View leadership','/team/chairman | /team/mukhya-trustee | /team/trustees')),
R('Management team','Operational leadership introduction',('Explore management','/team/management-team')),
R('Advisory board / state committee','Guidance and regional organisation',('Explore teams','/team/advisory-board | /team/state-team')),
], 'All team pages share the same secondary menu and breadcrumbs back to Team and Home.')

for title,route,rows,note in [
('Chairman','chairman',[R('Profile header','Name, role and introductory information'),R('Profile actions','Contact and social links',('Contact / social destinations','Currently placeholder links')),R('Message and quote','Leadership perspective'),R('Career timeline','Milestones and responsibilities'),R('Key credentials','Role, location, term and background')],'Profile and contact information is presented as existing page content.'),
('Mukhya Trustee','mukhya-trustee',[R('Profile header','Name, role and introductory information'),R('Profile actions','Contact and social links',('Contact / social destinations','Confirm the linked destinations')),R('Message and vision','Trustee perspective and organisation direction'),R('Profile details','Credentials and responsibilities')],'Use team navigation to move to other leadership pages.'),
('Trustees','trustees',[R('Trustees introduction','Board overview'),R('Trustee grid','Member names, roles and descriptions'),R('Profile actions','Actions attached to each member',('Member destination','No separate trustee detail route is present')),R('Pagination','Browse additional listed members')],'Do not assume member profiles are connected beyond the current listed routes.'),
('Management Team','management-team',[R('Management introduction','Operational team overview'),R('Management grid','Names, roles and descriptions'),R('Member action','Select a member action',('Member destination','Currently a placeholder link'))],'Shared team menu provides the connected navigation.'),
('Advisory Board','advisory-board',[R('Advisory introduction','Board purpose and guidance'),R('Advisory member grid','Names, roles and expertise'),R('Member actions','Read displayed profile information',('Further profile navigation','Confirm individual action destinations'))],'No separate adviser detail route is present.'),
('State Team','state-team',[R('State team introduction','Regional chapters overview'),R('Regional chapters','State cards and chapter information',('Select a state','/team/state-team/[state]')),R('Supporting sidebar','Regional team context and information')],'Each state uses the shared state-detail template.'),
('State team details','state-team/[state]',[R('State introduction','Selected state name and team summary'),R('State statistics','Members, districts covered and establishment'),R('State leadership','Regional leadership cards'),R('District teams','District groups and member cards'),R('Member contact action','Contact a listed member',('Contact destination','Currently a placeholder link')),R('Return to state list','State Team breadcrumb',('Browse another state','/team/state-team'))],'This chart covers every state using the same route template.'),
]:flow(title,'/team/'+route,[R('Team menu / breadcrumb','Move between team sections or return to Home')]+rows,note)

flow('Blog','/blog',[
R('Introduction / search','Discover devotional articles'),R('Categories','Spiritual journeys, news, stories, culture and other themes'),
R('Featured article','Highlighted article with author and summary',('Read article','/blog/[slug]')),
R('Recent posts','Latest articles and list navigation',('Select an article','/blog/[slug]')),
R('Write a blog','Contributor invitation',('Contribution actions','Currently placeholder links')),
R('Newsletter','Email subscription invitation',('Subscribe','Connection and confirmation to verify')),
], 'The blog reads article data from the backend. Empty or unavailable content should retain a clear browse-back path.')

flow('Blog article','/blog/[slug]',[
R('Article introduction','Title, author and publication information'),R('Social sharing','Share the current article',('Share link','Selected external sharing destination')),
R('Article body','Headings, paragraphs and article content'),R('Author biography','Author information'),
R('Related articles','Suggested reading',('Read another article','/blog/[slug]')),
R('Newsletter / return link','Subscribe or continue browsing',('Back to Blog','/blog')),
], 'This chart covers the article template. Newsletter submission is not assumed to be connected.')

flow('Temples','/temple-directory',[
R('Introduction','Temple directory and discovery'),R('Featured temples','Temple cards and information',('View temple','Current detail links are placeholders')),
R('Temple services','Register temple, puja / seva, darshan, artists',('Service actions','Current service-card links need wiring')),
R('How it works','Create profile, add services, go live',('Register your temple','Sign Up / Sign In > Register as > Temple')),
R('Blog highlights','Temple and community stories',('Read more','Current article links are placeholders')),
R('Testimonials / FAQs','Community experiences and expandable answers'),
R('Final invitation','Register or request help',('Register / contact','Temple registration flow / Contact Us')),
], 'Menu correction required: Temples currently uses /temples. The existing directory route is /temple-directory.')

flow('Dharamshala','/dharamshala',[
R('Introduction','Pilgrim accommodation directory'),R('Search and filters','Search accommodation and refine the listing',('Change criteria','Update the visible listing')),
R('City selection','Choose a city',('Select a city','Filter accommodation by city')),
R('Accommodation grid','Property information and amenities',('View property','Current detail action is a placeholder')),
R('Pagination','Browse listing pages'),
], 'No property detail or booking page is present. Category registration is available through Sign Up / Sign In > Register as.')

flow('Organisations','/organisations',[
R('Introduction','Mandal and organisation directory',('Register an organisation','Sign Up / Sign In > Register as > Organisation')),
R('Filter overview / search','Search and refine organisations'),R('Organisation grid','Organisation cards and summary information',('View organisation','Current detail links are placeholders')),
R('Pagination','Browse listing pages'),R('Join the platform','Organisation registration invitation',('Register as Organisation','Organisation (Mandal) form')),
], 'Category registration follows the revised account entry. No dedicated organisation detail route is present.')

flow('Artists','/artists',[
R('Introduction','Discover devotional artists'),R('Filters','Refine the artist listing',('Change filters','Update visible artist cards')),
R('Artist grid','Names, specialities and profile information',('View artist','Current profile links are placeholders')),
R('Pagination','Browse additional artists'),R('Become an artist','Registration invitation',('Register as Artist','Sign Up / Sign In > Register as > Artist')),
], 'No artist detail or booking route is present; do not treat the placeholder profile action as a completed booking flow.')

flow('Donation','/donation',[
R('Introduction','Donate or explore impact',('Donate now / impact','Jump to donation / impact section')),
R('Choose your offering','Cause and preset or custom amount'),R('Donor information','Name, phone, email; anonymity and receipt preferences'),
R('Payment selection / submit','Validate the amount and required donor details',('Validation error','Correct the highlighted details and submit again')),
R('Payment checkout','Create payment order and open checkout',('Checkout closed / error','Return to the form; show error when applicable')),
R('Payment verification','Verify payment response',('Verified / verification error','Success message / support or retry information')),
R('Donors / service stories / transparency','Recent donors, impact stories and fund allocation'),
R('Membership / FAQs / final invitation','Membership options, answers and closing actions',('Join / donate','Sign Up / donation form')),
], 'The source contains payment-order and verification connections. This document does not claim a live payment test.')

flow('Contact Us','/contact',[
R('Introduction','Contact and assistance'),R('Contact information','Email, phone, address and office hours'),
R('Query form','First / last name, email, phone, subject and message'),
R('Submit query','Send the completed message',('Acknowledgement','Current page displays a thank-you alert')),
R('Location','Office location and embedded map'),
], 'The contact handler currently shows an alert. Message delivery and enquiry storage need connecting.')

start('Sign Up / Sign In','Account entry with two registration paths. Category selection is optional and belongs only to Register as.')
box(273,113,295,37,'Sign Up / Sign In','',True)
arrow([(420,150),(420,169),(289,169),(289,187)])
arrow([(420,150),(420,169),(674,169),(674,187)])
box(44,187,492,38,'New user - Sign Up')
box(567,187,230,38,'Existing user - Sign In')
arrow([(180,225),(180,250)]);arrow([(420,225),(420,250)])
box(44,250,230,43,'Normal user','Default registration')
box(306,250,230,43,'Register as','Optional category registration')
box(567,250,230,43,'Enter credentials','Email and password')
arrow([(682,225),(682,250)])
box(44,320,230,63,'Standard sign-up form','Name, mobile, email, password,\nconfirm password and terms')
box(306,320,230,63,'Choose category','Artist, Dancer, Musician, Temple,\nDharamshala, Organisation (Mandal)')
box(567,320,230,63,'Sign in','Valid credentials > access account\nError > correct details and retry')
for x in [159,421,682]:arrow([(x,293),(x,320)])
box(44,412,230,58,'Create normal user account','Valid details > Home\nErrors > correct details and retry')
box(306,412,230,58,'Category registration form','Complete the form for the\nselected category')
for x in [159,421]:arrow([(x,383),(x,412)])
finish('Agreed workflow change: remove standalone Registration from the navbar. Existing sign-in must not force category selection.')

flow('Normal user sign-up','/signup',[
R('Choose normal registration','Use standard Sign Up; no category selection',('Optional alternative','Register as > choose category')),
R('Personal and account details','Full name, mobile number and email'),R('Password','Enter and confirm password'),
R('Terms agreement','Accept the required terms'),R('Create account','Validate required fields and send sign-up request',('Invalid details / request error','Show errors > correct details > submit again')),
R('Successful sign-up','Account created and signed in',('Continue','Home /')),
R('Already have an account?','Use the Sign In link',('Sign In','/login')),
], 'The category-registration choice is the agreed addition to the existing standard sign-up screen.')

flow('Sign In','/login',[
R('Account access','Sign in to an existing account'),R('Credentials','Email and password'),
R('Submit sign-in','Validate credentials and send request',('Invalid details / request error','Show error > correct details > retry')),
R('Successful sign-in','Access the account',('Continue','Home /')),
R('New user?','Open account creation',('Sign Up','Normal user or Register as')),
R('Forgot password','Password recovery link',('Recovery destination','/forgot-password is referenced; no page is present')),
], 'Existing users are not sent through registration again. Recovery is a missing destination in the current project.')

flow('Register as / choose category','/register',[
R('Entry from account screen','Sign Up / Sign In > Register as',('Normal user alternative','Return to standard sign-up; no category required')),
R('Choose a category','Select the type of profile to register'),
R('Creative categories','Artist, Dancer or Musician',('Open selected form','/artist-registration | /dancer-registration | /musician-registration')),
R('Place / organisation categories','Temple, Dharamshala or Organisation (Mandal)',('Open selected form','/temple-registration | /dharamshala-registration | /mandal-registration')),
R('How it works / benefits','Registration guidance and platform benefits'),
R('Testimonials / FAQs / invitation','Supporting information and common questions'),
], 'Other displayed categories are placeholders: Community, Pandit, Kathavachak, Event Organiser, Volunteer and Products.')

for kind,expertise in [('Artist','Art types, expertise and experience'),('Dancer','Dance styles, expertise and experience'),('Musician','Music specialities, instruments and experience')]:
    flow(kind+' registration','/'+kind.lower()+'-registration',[
    R('Category entry','Sign Up / Sign In > Register as > '+kind),R('Personal information','Identity, contact and location details'),
    R('Your '+('art' if kind=='Artist' else 'dance' if kind=='Dancer' else 'music')+' and expertise',expertise),
    R('Upload your work','Portfolio and supporting material'),R('Availability and preferences','Performance availability and preferences'),
    R('Submission and agreement','Accept terms and submit',('Missing / invalid fields','Correct the marked fields and submit again')),
    R('Submission feedback','Current form displays a success alert'),R('Why join','Benefits of joining the platform'),
    ], 'Current submission logs form values and displays an alert. Saved applications and review status require a backend connection.')

flow('Temple registration','/temple-registration',[
R('Category entry','Sign Up / Sign In > Register as > Temple'),R('Temple information','Temple identity and basic information'),
R('Location and contact','Address and contact details'),R('Temple details and services','Temple facilities and services'),
R('Gallery upload','Supporting temple material'),R('Terms and submit','Accept terms and send the form',('Validation / submission feedback','Complete required fields; show the form response')),
R('Why choose Shyam Jagat','Benefits and supporting information'),
], 'Current submission behaviour must be connected to saved applications before approval or listing can be treated as complete.')

flow('Dharamshala registration','/dharamshala-registration',[
R('Category entry','Sign Up / Sign In > Register as > Dharamshala'),R('Property and trust information','Name, governing trust, licence and temple distance'),
R('Address and manager','Location, contact person and mobile'),R('Rooms and pricing','Rooms, dormitory beds, pricing mode and nightly amount'),
R('Facilities and documents','Amenities, trust certificate, property material and manager ID'),
R('Agreement and submission','Accept terms and submit',('Validation / feedback','Complete required fields; show the form response')),
R('Onboarding explanation','Verification, approval and hosting process'),R('Listed properties / testimonials','Existing property examples and manager experiences'),
], 'Verification and approval are described in page copy; a persistent review workflow is not assumed to be implemented.')

flow('Organisation registration','/mandal-registration',[
R('Category entry','Sign Up / Sign In > Register as > Organisation (Mandal)'),R('Organisation details','Name, type, founding year and registration number'),
R('Address and contact','State, city, address, phone and email'),R('Leadership and members','President, phone, member count and spokesperson'),
R('Activities and events','Services and recurring events / festivals'),R('Supporting documents','Logo or banner and registration certificate / ID'),
R('Agreement and submission','Accept terms and submit',('Validation / feedback','Complete required fields; show the form response')),
R('Onboarding / testimonials','Submission, verification call and listing explanation'),
], 'The onboarding sequence is described in page copy; saved applications and verification status need implementation checks.')

flow('Services','/services',[
R('Open Services','Existing standalone route'),R('Placeholder content','Services heading and placeholder message'),
R('Continue browsing','Use the shared navigation',('Choose a destination','Home, initiatives, directories or Contact Us')),
], 'This route exists but is not a main or More menu destination. Its detailed content has not been implemented.')

flow('Footer / shared links','Shared across site pages',[
R('Organisation information','Brand description and community context'),R('About links','About Us and supporting information',('Connected destination','About Us /about')),
R('Help links','Contact, policy, donation FAQ, volunteering and live help',('Connected destination','Contact Us /contact')),
R('Social links','Facebook, Instagram, YouTube and Twitter',('External destinations','Current links are placeholders')),
], 'History, vision, seva list, gallery, privacy policy, donation FAQ, volunteer and live help links currently use placeholders.')

flow('Page not found','Unknown or unavailable route',[
R('Unavailable page','The requested destination cannot be found'),R('Recovery options','Return to the site or request help',('Home / support','Home / | Contact Us /contact')),
R('Suggested destinations','Temples, Artist Registration, Donation and Events',('Continue browsing','Selected destination; artist registration uses the account flow')),
], 'No new page numbers or decorative images are included anywhere in this workflow set.')

c.save()
r=PdfReader(str(pdf))
assert len(r.pages)==len(pages)
for p in r.pages:
    assert abs(float(p.mediabox.width)-W)<.01 and abs(float(p.mediabox.height)-H)<.01
    assert not re.search(r'Page\s+\d',p.extract_text())
(ROOT/'tmp/pdfs/manifest.json').write_text(json.dumps(pages,indent=2))
print(json.dumps({'pdf':str(pdf),'sheets':len(pages),'size':'A4 landscape','page_numbers':False}))

