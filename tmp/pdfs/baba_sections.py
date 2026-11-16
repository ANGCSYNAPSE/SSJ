from pathlib import Path
import ast,json,re
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4,landscape
from reportlab.lib.utils import simpleSplit
from pypdf import PdfReader

root=Path(__file__).resolve().parents[2];out=root/'output/pdf';W,H=landscape(A4)
path=out/'baba-shyam-section-workflows-a4.pdf'
c=canvas.Canvas(str(path),pagesize=(W,H));c.setTitle('Shyam Jagat - Baba Shyam section workflows');c.setAuthor('Shyam Jagat')
for filename,chosen in [('home_sections.py',['text','box','arrow']),('about_sections.py',['header','footer','sheet'])]:
    source=(root/'tmp/pdfs'/filename).read_text(encoding='utf-8-sig').replace('SHYAM JAGAT / ABOUT US','SHYAM JAGAT / BABA SHYAM')
    for node in ast.parse(source).body:
        if isinstance(node,ast.FunctionDef) and node.name in chosen:exec(compile(ast.Module(body=[node],type_ignores=[]),'<layout>','exec'))
names=[]

sheet('The Divine Legacy / hero',[
('Page heading','The Divine Legacy of Baba Shyam.'),
('Devotional introduction','A short quotation about sincere remembrance and devotion.'),
('Explore His Journey','A button linking to the journey section on this same page.'),
('Visit Khatu Temple','A button linking to the Temple Directory.')],
[('Explore His Journey','Jump to /baba-shyam#journey.'),('Visit Khatu Temple','Open /temple-directory.')],
'These two buttons are alternative actions. A leaderboard advertisement follows the hero.','The Divine Story',False)

sheet('The Divine Story',[
('Introduction to Khatu Shyam Ji','Introduce Baba Shyam through the devotional account of Barbarika and Krishna\'s blessing.'),
('Devotion and pilgrimage','Describe the temple in Khatu, Rajasthan, and the faith of visiting devotees.'),
('Central themes','Sacrifice, unwavering faith and compassion.'),
('Displayed highlights','10M+ Annual Devotees; 800+ Years of Faith; 1 Sacred Temple.')],
[('Read the introduction','Understand the devotional context and displayed highlights.'),('Continue reading','Scroll to The Sacred History.')],
'The figures and devotional narrative are existing page content. This section has no separate linked action.','The Sacred History')

sheet('The Sacred History',[
('Barbarika\'s background','The page describes his family, courage and training.'),
('Three arrows and vow','The narrative describes three invincible arrows and a vow to support the weaker side.'),
('Krishna\'s test','Krishna tests Barbarika before the Mahabharata war and asks for his head.'),
('Sacrifice and blessing','Barbarika offers his head and is blessed to be worshipped as Shyam; a quotation closes the section.')],
[('Read the narrative','Follow the story from background through sacrifice and blessing.'),('Continue to the timeline','Scroll past the rectangle advertisement to The Divine Journey.')],
'This sheet maps the devotional account in the project; there are no history-card links or user inputs.','The Divine Journey of Barbarika')

header('The Divine Journey of Barbarika','Seven milestones in the page timeline; entry anchor: /baba-shyam#journey')
journey=[
('Birth','Family background and the beginning of Barbarika\'s story.'),
('Training from Lord Shiva','Warrior training and skills, as described in the page narrative.'),
('Three Divine Arrows','The blessing of three invincible arrows.'),
('Meeting Lord Krishna','Krishna tests his resolve and devotion.'),
('The Supreme Sacrifice','Barbarika offers his head.'),
('Witness of Mahabharata','His head witnesses the war.'),
('Blessed as Baba Shyam','Krishna blesses him to be worshipped as Shyam.')]
for i,(t,b) in enumerate(journey):
    y=118+i*55;box(34,y,490,48,t,b)
    if i<6:arrow(279,y+48,y+55)
box(556,118,252,76,'Entry connection','Explore His Journey in the hero jumps directly to this section.',True)
box(556,225,252,89,'Read the milestones','Each milestone has a title and description. The workflow represents them as text boxes.')
box(556,345,252,89,'Closing message','Faith. Devotion. Sacrifice. Blessings. Jai Shree Shyam!')
footer('The milestones are informational; selecting one does not open a separate detail page.','Teachings of Baba Shyam')

sheet('Teachings of Baba Shyam',[
('Faith / Humility','Belief in the divine; surrender and humbleness.'),
('Sacrifice / Compassion','Selfless sacrifice and kindness to all beings.'),
('Truth / Equality','Stand for what is right; treat people without distinction.'),
('Seva','Selfless service as an expression of devotion.')],
[('Read the seven teachings','Each teaching is presented as a title with a short explanation.'),('Continue reading','Scroll to The Divine Abode.')],
'The teaching cards are informational and have no linked detail pages.','The Divine Abode')

sheet('The Divine Abode',[
('Sacred pilgrimage introduction','Introduce Khatu Shyam Ji temple in Khatu, Sikar district, Rajasthan.'),
('Temple description','Architecture, atmosphere, blessings, vows and pilgrimage.'),
('Falgun Mela','Describe the annual gathering and devotees\' experiences of faith.'),
('Location and timing labels','Sikar, Rajasthan; Open 4 AM - 10 PM; Falgun Mela (Annual).')],
[('Read temple information','View the temple introduction and practical labels.'),('Continue reading','Scroll past the large banner advertisement to Miracles & Divine Blessings.')],
'Opening hours are transcribed from the project, not verified travel advice. Temple artwork is represented by text only.','Miracles & Divine Blessings')

sheet('Miracles & Divine Blessings',[
('Meera Devi, Jaipur','A testimonial about hope, prayers and blessings.'),
('Rajesh Sharma, Delhi','A testimonial about faith and devotion.'),
('Anita Singh, Mumbai','A testimonial about support through family difficulties.'),
('Displayed highlights','Devotees annually, years of worship, daily prayers and miracles of faith.')],
[('Read the testimonials','View each quotation and the devotee\'s name.'),('Read the highlights','View the supporting faith and community figures.'),('Continue browsing','Scroll to Festivals & Celebrations.')],
'Testimonials and figures are existing page content, not independently verified claims. No testimonial detail links are present.','Festivals & Celebrations')

sheet('Festivals & Celebrations',[
('Falgun Mela','March (Annual): a large gathering of devotees.'),
('Janmashtami','August: celebrations of Lord Krishna\'s birth.'),
('Ekadashi','Twice monthly: special prayers and fasting.'),
('Bhajan Sandhya','Every evening: devotional music gatherings.'),
('Shyam Katha','Weekly: devotional storytelling and teachings.')],
[('Browse the festival cards','Each card displays a festival name, frequency and description.'),('Continue reading','Scroll to Daily Temple Rituals.')],
'Frequencies are from the current page. Festival cards do not link to event details or registration.','Daily Temple Rituals')

sheet('Daily Temple Rituals',[
('Morning rituals','4:30 AM - Mangla Aarti; 7:00 AM - Shringar Darshan.'),
('Midday and afternoon','12:00 PM - Rajbhog; 3:00 PM - Afternoon Darshan.'),
('Evening rituals','7:00 PM - Sandhya Aarti; 9:00 PM - Shayan Darshan.'),
('Ritual information','Each of the six entries includes a time, title and short description.')],
[('Read the daily sequence','Follow the schedule from morning to night.'),('Continue reading','Scroll past the rectangle advertisement to Bhajans & Spiritual Wisdom.')],
'These timings match this page\'s source and differ from some Home page timings. The schedules need reconciliation before publication.','Bhajans & Spiritual Wisdom')

sheet('Bhajans & Spiritual Wisdom',[
('Shyam Teri Bansi','Track title with a Popular Devotional Artist label.'),
('Hey Shyam Sunder','Track title with a Popular Devotional Artist label.'),
('Khatu Wale Shyam','Track title with a Popular Devotional Artist label.'),
('Wisdom quotations','Two devotional quotations displayed below the track cards.')],
[('Browse the track cards','Each card shows a title, artist label, play symbol and waveform.'),('Playback state','The play symbols and waveforms are decorative; no audio player is connected.'),('Read the quotations','Continue to the two wisdom cards and then the gallery.')],
'The diagram contains no audio artwork or images. Track cards do not currently trigger playback.','Divine Moments Gallery')

sheet('Divine Moments Gallery',[
('Initial gallery','All is selected initially; show all six existing gallery items.'),
('Available filters','All, Temple, Devotees, Aarti, Decorations, Festivals and Annadan.'),
('Filtered collection','Only items matching the selected category remain visible.'),
('Item behaviour','Items are displayed within the gallery; there is no linked detail view.')],
[('Select a filter','Set the active category on the current page.'),('Update gallery','Show matching items and highlight the selected filter.'),('Choose All','Restore the full gallery collection.'),('Change category again','Switch to another category; the current six categories each have one item.')],
'The categories are choices, not a required sequence. No lightbox or image-detail interaction is connected.','Plan Your Visit',False)

sheet('Plan Your Visit',[
('Location','Khatu, Sikar District, Rajasthan.'),
('Opening hours','4:00 AM - 10:00 PM daily, as stated in the page.'),
('Parking and accommodation','Parking near the temple; dharamshalas and hotels nearby.'),
('Travel and map','Road, rail and air access summary; an illustrated location map.')],
[('Read the visit information','Review location, hours, parking, stay and travel information.'),('Map behaviour','The map is a static image; it does not launch navigation.'),('Continue reading','Scroll to Words of Divine Wisdom.')],
'No directions, hotel booking or accommodation link is connected in this section. Practical information needs current verification.','Words of Divine Wisdom')

sheet('Words of Divine Wisdom',[
('Displayed quotation','Where devotion resides, blessings follow.'),
('Attribution','Divine Proverb.'),
('Previous / next controls','Buttons change the quote index.'),
('Position indicators','Three dots are displayed under the quotation.')],
[('Select previous or next','The index cycles over a two-item quotation array.'),('Indicator changes','The index updates the active dot.'),('Current limitation','The displayed quotation is hard-coded and does not change.'),('Required correction','Bind the displayed text and dot count to the same quotation list.')],
'There are three indicators but only two index states. A final banner advertisement follows this section.','End of Baba Shyam content')

sheet('Advertisement placements',[
('After the hero','Leaderboard slot: 728 x 90.'),
('After The Sacred History','Rectangle slot: 300 x 250.'),
('After The Divine Abode','Large banner: 970 x 250, with an Explore label.'),
('After rituals / final wisdom section','Rectangle after Daily Temple Rituals; large banner after Words of Divine Wisdom.')],
[('Reserved spaces','Ad slots separate the devotional content sections.'),('Current state','Ad spaces and Explore labels are placeholders.'),('Continue reading','Proceed to the next content section where available.')],
'This set excludes the website footer, top bar and main navigation. No advertisement artwork is included.','',False)

c.save();r=PdfReader(str(path));assert len(r.pages)==14
for p in r.pages:
    assert abs(float(p.mediabox.width)-W)<.01 and abs(float(p.mediabox.height)-H)<.01
    assert not re.search(r'Page\s+\d',p.extract_text())
assert all(n not in names for n in ['Top bar','Main navigation','Footer / continue browsing'])
(root/'tmp/pdfs/baba-section-manifest.json').write_text(json.dumps(names))
print('14 A4 Baba Shyam section sheets; no website header/footer sections or page numbers.')

