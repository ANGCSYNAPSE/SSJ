from pathlib import Path
import ast,json,re
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4,landscape
from reportlab.lib.utils import simpleSplit
from pypdf import PdfReader
root=Path(__file__).resolve().parents[2];out=root/'output/pdf';W,H=landscape(A4)
path=out/'signup-signin-membership-workflows-a4.pdf'
c=canvas.Canvas(str(path),pagesize=(W,H));c.setTitle('Shyam Jagat - Sign Up, Sign In and membership');c.setAuthor('Shyam Jagat')
for filename,chosen in [('home_sections.py',['text','box','arrow']),('about_sections.py',['header','footer','sheet'])]:
    source=(root/'tmp/pdfs'/filename).read_text(encoding='utf-8-sig').replace('SHYAM JAGAT / ABOUT US','SHYAM JAGAT / ACCOUNT WORKFLOW')
    for node in ast.parse(source).body:
        if isinstance(node,ast.FunctionDef) and node.name in chosen:exec(compile(ast.Module(body=[node],type_ignores=[]),'<layout>','exec'))
names=[]
def line(x1,y1,x2,y2):
    c.setStrokeGray(.4);c.setLineWidth(.7);c.line(x1,H-y1,x2,H-y2)
def fork(x,y,ends,target_y):
    line(x,y,x,y+10);line(min(ends),y+10,max(ends),y+10)
    for xx in ends:arrow(xx,y+10,target_y)

header('Sign Up / Sign In','Two sign-up paths, with an optional membership checkbox inside normal user registration.')
box(267,108,308,40,'Sign Up / Sign In','',True)
fork(421,148,[296,699],172)
box(34,172,524,40,'New user - Sign Up','')
box(590,172,218,40,'Existing user - Sign In','')
fork(296,212,[177,453],240)
box(34,240,286,40,'Normal user','')
box(348,240,210,40,'Register as','')
arrow(699,212,240);box(590,240,218,63,'Enter credentials','Email and password.')
arrow(699,303,331);box(590,331,218,63,'Access account','Successful sign-in. No repeat registration.',True)
arrow(177,280,302);box(34,302,286,48,'Standard sign-up form','Name, mobile, email and passwords.')
arrow(453,280,302);box(348,302,210,48,'Choose category','Select the profile type.')
arrow(177,350,371);box(34,371,286,48,'Become a Member checkbox','Optional choice within the sign-up form.',True)
arrow(453,350,371);box(348,371,210,110,'Category choices','Artist, Dancer, Musician, Temple, Dharamshala or Organisation (Mandal).')
fork(177,419,[102,252],442)
box(34,442,136,48,'Unchecked','Regular user')
box(184,442,136,48,'Checked','Membership selected')
line(102,490,102,494);line(252,490,252,494);line(102,494,252,494);arrow(177,494,500)
box(34,500,286,35,'User account created','',True)
arrow(453,481,488);box(348,488,210,48,'Category registration form','Complete the selected form.')
footer('Account creation follows valid submission. The checkbox saves the membership choice; category selection is not required for a normal user.','')

header('Normal user sign-up','The Become a Member checkbox is part of the form and is answered before the account is created.')
text(34,122,'SIGN-UP FORM',9,True);text(466,122,'MEMBERSHIP CHOICE AND SUBMISSION',9,True)
c.setStrokeGray(.4);c.rect(34,H-504,386,365,fill=0,stroke=1)
fields=['Full name','Mobile number','Email address','Password','Confirm password']
for i,label in enumerate(fields):
    yy=157+i*45;text(48,yy,label,10,True)
    c.rect(48,H-yy-26,358,19,fill=0,stroke=1)
# Empty checkbox = suggested optional default, visibly separate from required terms.
c.rect(48,H-411,11,11,fill=0,stroke=1)
text(67,410,'Become a Member (optional)',11,True)
text(48,429,'Leave unchecked to create a regular user account.',9)
c.rect(48,H-454,11,11,fill=0,stroke=1)
text(67,453,'I accept the Terms of Service (required)',10)
box(48,462,358,35,'Create Account','',True)
box(466,139,342,58,'Choose membership','Optional and unchecked by default.')
fork(637,197,[548,729],221)
box(466,221,164,62,'Unchecked','Regular user; no membership selected.')
box(644,221,164,62,'Checked','Membership choice saved with the account.')
line(548,283,548,296);line(729,283,729,296);line(548,296,729,296);arrow(637,296,317)
box(466,317,342,64,'Submit and validate','Check required details, matching passwords and terms. Correct errors and retry.')
arrow(637,381,404)
box(466,404,342,64,'Create user account','On success, save the membership selection and continue to Home.',True)
footer('The membership choice is separate from required terms and from Register as. This diagram proposes the checkbox; it does not change the website code.','')

sheet('Register as / category registration',[
('Entry','Sign Up > Register as. This is separate from normal user sign-up.'),
('Creative categories','Artist, Dancer and Musician.'),
('Place and organisation categories','Temple, Dharamshala and Organisation (Mandal).'),
('Category form','Details and supporting information specific to the selected category.')],
[('Select Register as','Reveal category choices.'),('Choose a category','Select one of the six available categories.'),
('Open the matching form','Continue to the selected category registration form.'),
('Complete the form','Enter the required category information and follow its submission flow.')],
'The new Become a Member checkbox applies to normal user sign-up only. This category path remains as shown in your reference.','')

sheet('Sign In / existing user',[
('Email address','Use the email linked to the existing account.'),('Password','Enter the existing account password.'),
('Remember me','Optional sign-in preference.'),('Account access','Existing regular users and members use the same Sign In flow.')],
[('Enter credentials','Complete the sign-in fields.'),('Submit Sign In','Validate the fields and authenticate the user.'),
('If details are invalid','Show an error, keep the user on Sign In and allow correction.'),
('On successful sign-in','Access the account; return to the intended site page or Home.')],
'Error and success are alternative outcomes. Existing users are not asked to register again or choose membership during sign-in.','',False)

c.save();r=PdfReader(str(path));assert len(r.pages)==4
for p in r.pages:
    assert abs(float(p.mediabox.width)-W)<.01 and abs(float(p.mediabox.height)-H)<.01
    assert not re.search(r'Page\s+\d',p.extract_text())
(root/'tmp/pdfs/account-section-manifest.json').write_text(json.dumps(names))
print('4 A4 account workflow sheets created, including the pre-creation membership checkbox.')
