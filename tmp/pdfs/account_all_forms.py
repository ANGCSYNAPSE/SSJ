from pathlib import Path
import re,json,html,zipfile
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4,landscape
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import simpleSplit
from pypdf import PdfReader

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'output/pdf'; TMP=ROOT/'tmp/pdfs'; W,H=landscape(A4)
pdfmetrics.registerFont(TTFont('Arial','C:/Windows/Fonts/arial.ttf'))
pdfmetrics.registerFont(TTFont('ArialB','C:/Windows/Fonts/arialbd.ttf'))
c=canvas.Canvas(str(OUT/'signup-signin-all-category-forms-a4.pdf'),pagesize=(W,H))
c.setTitle('Shyam Jagat | Sign Up, Sign In and all category forms')
c.setAuthor('Shyam Jagat')
pages=[]; coverage={}
def txt(x,y,s,size=11,bold=False):
    c.setFillGray(0);c.setFont('ArialB' if bold else 'Arial',size);c.drawString(x,H-y,s)
def lines(s,w,size=10,bold=False):
    return simpleSplit(s,'ArialB' if bold else 'Arial',size,w)
def para(x,y,s,w,size=10,bold=False):
    ls=lines(s,w,size,bold)
    for a in ls:txt(x,y,a,size,bold);y+=size+4
    return y
def rect(x,y,w,h):
    c.setStrokeGray(.25);c.setLineWidth(.65);c.rect(x,H-y-h,w,h)
def start(category,title,sub=''):
    pages.append(category+' - '+title)
    c.bookmarkPage(str(len(pages)));c.addOutlineEntry(pages[-1],str(len(pages)))
    txt(34,29,'SHYAM JAGAT / '+category.upper(),10,True)
    txt(34,61,title,22,True)
    if sub:txt(34,84,sub,10)
    c.setStrokeGray(.6);c.line(34,H-98,W-34,H-98)
def finish(next_title=''):
    if next_title:txt(34,554,'Continue → '+next_title,10)
    c.showPage()
def f(label,ph='',kind='text',options=None,default=None,hint=''):
    return dict(label=label,ph=ph,kind=kind,options=options or [],default=default,hint=hint)
def draw_field(item,x,y,w):
    kind=item['kind'];label=item['label'];opts=item['options']
    if label:y=para(x,y+11,label,w,11,True)+3
    if kind in ('checks','radios'):
        for opt in opts:
            if kind=='radios':
                c.circle(x+5,H-y-5,4.5)
                if opt==item['default']:c.circle(x+5,H-y-5,2,stroke=0,fill=1)
            else:rect(x,y,10,10)
            y=para(x+18,y+9,opt,w-18,10)+6
    elif kind=='check':
        rect(x,y,11,11)
        if item['default']:
            c.line(x+2,H-y-6,x+5,H-y-9);c.line(x+5,H-y-9,x+10,H-y-2)
        y=para(x+21,y+10,item['ph'],w-21,10)+9
        if item['hint']:y=para(x+21,y,item['hint'],w-21,9)+3
    elif kind=='button':
        rect(x,y,w,32);para(x+10,y+21,item['ph'] or label,w-20,11,True);y+=40
    elif kind=='upload':
        c.setDash(3,3);rect(x,y,w,72);c.setDash()
        yy=para(x+12,y+22,item['ph'],w-24,10,True)
        para(x+12,yy+3,item['hint'],w-24,9);y+=82
    elif kind=='note':y=para(x,y+9,item['ph'],w,10)+10
    else:
        value=item['default'] if kind=='select' else item['ph']
        entry_lines=lines(value or '',w-24,10)
        bh=max(31,len(entry_lines)*14+12,66 if kind=='textarea' else 0)
        rect(x,y,w,bh);para(x+10,y+19,value or '',w-24,10)
        if kind=='select':
            c.line(x+w-18,H-y-13,x+w-14,H-y-17)
            c.line(x+w-14,H-y-17,x+w-10,H-y-13)
        y+=bh+9
        if kind=='select':y=para(x,y+2,'Options: '+' • '.join(opts),w,9)+5
        if item['hint']:y=para(x,y,item['hint'],w,9)+3
    return y
def measure(item,w):
    # Keep rendering and measurement identical by using a throwaway canvas.
    global c
    from io import BytesIO
    old=c;c=canvas.Canvas(BytesIO(),pagesize=(W,H))
    h=draw_field(item,0,0,w);c=old;return h
def form_sheet(category,title,items,next_title='',intro='Register as → '+ 'Choose category → Complete form',single=False):
    start(category,title,intro);y=119;w=(W-94)/2
    i=0
    while i<len(items):
        row=items[i:i+(1 if single else 2)];ww=W-68 if single else w
        height=max(measure(v,ww) for v in row)
        if y+height>526:
            finish(title+' (continued)');start(category,title+' (continued)',intro);y=119
        for j,v in enumerate(row):draw_field(v,34+j*(w+26),y,ww)
        y+=height+14;i+=len(row)
    finish(next_title)
def source(cat):return (ROOT/f'src/app/(site)/(registrations)/{cat}-registration/page.tsx').read_text(encoding='utf-8-sig')
def array(src,name):
    m=re.search(r'const '+re.escape(name)+r'\s*=\s*\[(.*?)\];',src,re.S)
    assert m,name
    return re.findall(r'"([^"\n]*)"',m[1])
def attrs(s,key):
    m=re.search(key+r'=\{?"([^"]*)"\}?',s)
    return html.unescape(m[1]) if m else ''
def extract_fields(src,part,cat):
    matches=list(re.finditer(r'<FieldLabel\s+label=\{?"([^"]+)"\}?([^>]*?)/>',part,re.S));items=[]
    for i,m in enumerate(matches):
        chunk=part[m.end():matches[i+1].start() if i+1<len(matches) else len(part)]
        label=html.unescape(m[1])+(' *' if re.search(r'\brequired\b',m[2]) else '')
        coverage.setdefault(cat,[]).append(m[1])
        ph=attrs(chunk,'placeholder');kind='textarea' if re.search(r'<(?:textarea|TextArea)\b',chunk) else 'text'
        opt=re.search(r'options=\{(.*?)\}',chunk,re.S)
        if opt:
            expr=opt[1].strip()
            if expr.startswith('['):
                opts=re.findall(r'"([^"]+)"',expr)+array(src,re.search(r'\.\.\.(\w+)',expr)[1])
            else:opts=array(src,expr)
            items.append(f(label,kind='select',options=opts,default=opts[0]));continue
        if m[1]=='Profile Photo':items.append(f(label,'Upload Photo','upload',hint='JPG, PNG format (Max 2MB)'));continue
        if m[1]=='Phone Number':ph='+91  |  '+ph
        items.append(f(label,ph,kind))
    return items
def cardparts(src,tag):
    return [(html.unescape(m[1]),m[2]) for m in re.finditer(r'<'+tag+r'\b[^>]*title=\{?"([^"]+)"\}?[^>]*>(.*?)</'+tag+r'>',src,re.S)]
def node(x,y,w,h,label):
    rect(x,y,w,h);para(x+12,y+22,label,w-24,11,True)
def arrow(x,y,end):
    c.line(x,H-y,x,H-end);c.line(x,H-end,x-4,H-end+6);c.line(x,H-end,x+4,H-end+6)

start('Account workflow','Sign Up / Sign In','Normal user registration and category registration are separate choices.')
node(284,116,274,39,'Sign Up / Sign In')
c.line(421,H-155,421,H-174);c.line(281,H-174,691,H-174)
arrow(281,174,195);arrow(691,174,195)
node(34,195,495,39,'New user → Sign Up');node(566,195,242,39,'Existing user → Sign In')
c.line(281,H-234,281,H-254);c.line(155,H-254,407,H-254)
arrow(155,254,272);arrow(407,254,272)
node(34,272,241,39,'Normal user');node(300,272,229,39,'Register as')
arrow(155,311,334);node(34,334,241,61,'Sign-up form\nIncludes Become a Member checkbox')
arrow(155,395,416);node(34,416,241,52,'Optional membership choice → Submit form')
arrow(155,468,493);node(34,493,241,39,'User account created')
arrow(415,311,334);node(300,334,229,103,'Choose category: Artist, Dancer, Musician, Temple, Dharamshala, Organisation (Mandal)')
arrow(415,437,462);node(300,462,229,63,'Complete the selected category registration form')
arrow(687,234,272);node(566,272,242,59,'Email Address + Password → Sign In')
arrow(687,331,355);node(566,355,242,55,'Successful sign-in → Access account')
finish()

# Exact auth fields; membership is the one requested addition.
auth=(ROOT/'src/app/(auth)/signup/SignupForm.tsx').read_text(encoding='utf-8-sig')
login=(ROOT/'src/app/(auth)/login/LoginForm.tsx').read_text(encoding='utf-8-sig')
def authfields(src):
    out=[]
    for m in re.finditer(r'<AuthField\b(.*?)>(.*?)</AuthField>',src,re.S):
        label=attrs(m[1],'label');ph=attrs(m[2],'placeholder')
        if label=='Mobile Number':ph='+91  |  '+ph
        out.append(f(label,ph,hint='Show / hide password' if 'PasswordField' in m[2] else ''))
    return out
form_sheet('Normal user / Sign Up','Join Our Sacred Family',authfields(auth)+[
    f('','Become a Member','check',hint='Optional. Leave unchecked for a regular user account.'),
    f('','I agree to the Terms of Service and Privacy Policy','check',default=True),
    f('','Create My Account →','button'),f('— or continue with —','Continue with Google','button'),
    f('Already have an account?','Sign In → /login','note')],
    intro='Create your account and begin your journey of seva.')
start('Normal user / Sign Up','Membership choice','Become a Member is asked inside the signup form before account creation.')
node(254,120,334,60,'Complete sign-up form and choose Become a Member (optional)')
c.line(421,H-180,421,H-208);c.line(223,H-208,621,H-208);arrow(223,208,233);arrow(621,208,233)
node(74,233,298,68,'Unchecked → Regular user account');node(472,233,298,68,'Checked → Membership choice selected')
c.line(223,H-301,223,H-330);c.line(621,H-301,621,H-330);c.line(223,H-330,621,H-330);arrow(421,330,355)
node(254,355,334,58,'Submit valid form and accept terms');arrow(421,413,441)
node(254,441,334,58,'Create account with membership choice')
txt(34,535,'Requested addition: the membership checkbox is not yet present in the website code.',10)
finish()
start('Existing user / Sign In','Sign In','Existing users sign in to access their account.')
txt(34,121,'SIGN-IN FORM',9,True)
txt(459,121,'SIGN-IN FLOW',9,True)
rect(34,138,384,385)
txt(50,165,'Welcome Back',17,True)
txt(50,184,'Sign in to continue your journey of seva.',10)
txt(50,215,'Email Address',10,True)
rect(50,224,352,30);txt(60,244,'your@email.com',10)
txt(50,276,'Password',10,True)
rect(50,285,352,30);txt(60,305,'Enter your password',10)
# Small outline eye represents the existing password visibility control.
c.ellipse(377,H-303,391,H-295);c.circle(384,H-299,2)
rect(50,336,11,11)
c.line(52,H-342,55,H-345);c.line(55,H-345,60,H-338)
txt(69,345,'Remember me',10)
txt(312,345,'Forgot password?',10)
c.line(312,H-347,397,H-347)
rect(50,365,352,34);txt(63,387,'Sign In →',11,True)
txt(174,422,'or continue with',9)
c.line(50,H-418,160,H-418);c.line(259,H-418,402,H-418)
rect(50,439,352,33);txt(164,460,'Continue with Google',10,True)
txt(91,499,'New to Shyam Jagat?',10)
txt(193,499,'Create an account',10,True)
c.line(193,H-502,280,H-502)
def flowcard(y,title,body):
    rect(459,y,349,73)
    txt(473,y+23,title,11,True)
    para(473,y+44,body,321,10)
flowcard(138,'Enter account details','Enter the registered email address and password.')
arrow(633.5,211,236)
flowcard(236,'Sign In','Submit the form to check the account details.')
arrow(633.5,309,334)
flowcard(334,'Validate credentials','Show an error if details are incorrect. Correct the form and retry.')
arrow(633.5,407,432)
flowcard(432,'Access account','On successful sign-in, continue to the requested page or Home.')
finish()

for cat in ['artist','dancer','musician']:
    src=source(cat);parts=cardparts(src,'Card');category=cat.title()+' registration'
    for idx in [0,1]:
        form_sheet(category,parts[idx][0],extract_fields(src,parts[idx][1],cat),parts[idx+1][0])
    form_sheet(category,'Upload Your Work',[
        f('Work samples','Drag & drop your photos, videos, or audio files here or Browse Files','upload',hint='Accepted formats: JPG, PNG, MP4, MP3. Max 10MB per file. Upload up to 5 files.')],
        'Availability & Preferences',single=True)
    # Preserve source labels and all choices including selected initial values.
    availability=extract_fields(src,parts[3][1],cat)
    availability[0]=f(availability[0]['label'],kind='checks',options=array(src,'eventOptions'))
    availability[1]=f(availability[1]['label'],kind='checks',options=array(src,'regionOptions'))
    availability[3]=f(availability[3]['label'],kind='radios',options=array(src,'travelOptions'),default='Across India')
    form_sheet(category,'Availability & Preferences',availability,'Submission & Agreement')
    agreements=re.findall(r'\{"(I [^"]+)"\}',parts[4][1])
    form_sheet(category,'Submission & Agreement',[
        *[f('',a,'check') for a in agreements],f('','Submit Registration →','button'),
        f('Already registered?','Login here → /login','note')],single=True)

src=source('temple');parts=cardparts(src,'FormCard');category='Temple registration'
items=extract_fields(src,parts[0][1],'temple')
items.append(f('Upload Primary Temple Photo','Upload Temple Photo','upload',hint='This will be featured as the primary image of your temple profile (Max 5MB)'))
form_sheet(category,parts[0][0],items,parts[1][0])
items=extract_fields(src,parts[1][1],'temple')
items.insert(4,f('Google Maps Link (Optional)','Paste the share link or coordinates URL from Google Maps'))
form_sheet(category,parts[1][0],items,parts[2][0])
items=extract_fields(src,parts[2][1],'temple')
form_sheet(category,parts[2][0],items[:3], 'Services Offered')
services=re.search(r'const services = \[(.*?)\];',src,re.S)[1]
services=[a+' — '+b for a,b in re.findall(r'title: "([^"]+)", desc: "([^"]+)"',services)]
form_sheet(category,'Services Offered',[f('Services Offered',kind='checks',options=services[:5]),f('Services Offered (continued)',kind='checks',options=services[5:]),items[-1]],'Temple Photo Gallery')
form_sheet(category,'Temple Photo Gallery',[f('','Drag & drop photos of your temple here or Browse Files','upload',hint='Upload up to 10 photos. Accepted formats: JPG, PNG. Max 5MB per photo. Include photos of the main deity, temple exterior, interior, and premises.')],'Submission & Agreement',single=True)
agreements=re.findall(r'\{"(I (?:certify|agree|consent)[^"]+)"\}',src)
form_sheet(category,'Submission & Agreement',[*[f('',a,'check') for a in agreements],f('','Submit Temple Registration','button'),f('Already registered?','Login here → /login','note')],single=True)

src=source('dharamshala');parts=cardparts(src,'FormSection');category='Dharamshala registration'
for i in range(3):form_sheet(category,parts[i][0],extract_fields(src,parts[i][1],'dharamshala'),parts[i+1][0])
form_sheet(category,'Amenities Provided',[f('Amenities',kind='checks',options=array(src,'amenitiesList'))],'Verification & Photos')
uploads=[f(m[0]+' *','Upload Document','upload',hint=m[1]) for m in re.findall(r'<UploadBox\s+label="([^"]+)"\s+hint="([^"]+)"',parts[4][1])]
form_sheet(category,'Verification & Photos',uploads,'Declaration & Submit')
form_sheet(category,'Declaration & Submit',[
    f('','We declare that the information provided is correct and the accommodation is clean, secure, and maintained according to pilgrim comfort standards. We authorize Shyam Jagat to verify the details.','check'),
    f('','Submit Registration Details','button')],single=True)

src=source('mandal');category='Organisation (Mandal) registration'
matches=list(re.finditer(r'<BlockTitle>(.*?)</BlockTitle>',src,re.S));parts=[]
for i,m in enumerate(matches):parts.append((html.unescape(re.sub(r'^\d+\. ','',m[1])),src[m.end():matches[i+1].start() if i+1<len(matches) else src.index('</form>',m.end())]))
for i in range(3):
    form_sheet(category,parts[i][0],extract_fields(src,parts[i][1],'mandal'),parts[i+1][0],intro='Mandal Identity → Office Bearers → Seva Details → Media & Verification' if i==0 else 'Register as → Choose category → Complete form')
items=extract_fields(src,parts[3][1],'mandal')
form_sheet(category,parts[3][0],[f('Select the types of Seva & Cultural Programs your Mandal actively organises:',kind='checks',options=array(src,'sevaOptions')),*items],parts[4][0],single=True)
uploads=[f(m[0],m[0],'upload',hint=m[1]) for m in re.findall(r'<UploadBox\s+icon=\{\w+\}\s+label="([^"]+)"\s+hint="([^"]+)"',parts[4][1])]
form_sheet(category,parts[4][0],uploads,'Declaration & Submit')
form_sheet(category,'Declaration & Submit',[
    f('','We solemnly declare that all details provided above are true to our knowledge. We promise to abide by the spiritual ethos, discipline, and Seva guidelines of Shree Shyam Jagat Organization.','check'),
    f('','Register & Book Consultation','button'),f('','Reset Form','button')],single=True)
c.save()

# Every literal FieldLabel in each form must be represented, with exact source text.
for cat in ['artist','dancer','musician','temple','dharamshala','mandal']:
    expected=re.findall(r'<FieldLabel\s+label=\{?"([^"]+)"',source(cat))
    assert sorted(expected)==sorted(coverage[cat]),(cat,expected,coverage[cat])
reader=PdfReader(OUT/'signup-signin-all-category-forms-a4.pdf')
assert len(reader.pages)==len(pages)
for p in reader.pages:
    assert abs(float(p.mediabox.width)-W)<.1 and abs(float(p.mediabox.height)-H)<.1
(TMP/'account-all-forms-manifest.json').write_text(json.dumps(pages,indent=2),encoding='utf-8')
(OUT/'account-forms-notes.txt').write_text('SHYAM JAGAT — FORM WORKFLOW NOTES\n\nThe PDF reproduces the current source form labels, placeholders, options and required markers in a low-fidelity layout. Long forms are split by section for A4 printing; these are not additional website steps. No page numbers, website navigation, footer or decorative images are included.\n\nBecome a Member is the requested addition to normal signup, proposed unchecked by default. It is not implemented in the website code. Terms and Remember me retain their checked defaults from the code.\n\nThe overview represents the requested account flow. Current implementation limits: category forms do not save registrations to a backend. Artist/Dancer/Musician submit handlers log values and display an alert; some supplementary controls are separate local state. Temple/Dharamshala/Mandal submit handlers only prevent default. Work sample and most property/document upload areas are visual placeholders; profile-photo file inputs are present for performers. Continue with Google is currently a button without an authentication handler. The Mandal progress tracker is static, with Office Bearers active. These diagrams do not imply those unfinished behaviors are implemented.\n\nSource: src/app/(auth)/login/LoginForm.tsx; src/app/(auth)/signup/SignupForm.tsx; src/app/(site)/(registrations)/{artist,dancer,musician,temple,dharamshala,mandal}-registration/page.tsx.\n',encoding='utf-8')
print(json.dumps({'pages':len(pages),'field_labels_checked':sum(map(len,coverage.values())),'pdf':str(OUT/'signup-signin-all-category-forms-a4.pdf')},indent=2))
