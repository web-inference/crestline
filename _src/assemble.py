"""Builds inner HTML pages from the shell (head, header, contact, footer) of _src/home-source.html.
Run from crestline/: python _src/assemble.py"""
import re, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
idx = (root / '_src' / 'home-source.html').read_text(encoding='utf-8')

head = idx[:idx.index('<main>') + len('<main>')]
contact = idx[idx.index('<!-- ============ CONTACT ============ -->'):idx.index('</main>')]
contact = contact[contact.index('<section'):]
tail = idx[idx.index('</main>'):]

NAV = {'#top': 'index.html', '#services': 'index.html#services', '#areas': 'service-areas.html',
       '#fees': 'index.html#fees', '#blog': 'index.html#blog', '#about': 'index.html#about'}

def shell(title, desc):
    h = head
    h = re.sub(r'<title>.*?</title>', f'<title>{title}</title>', h, flags=re.S)
    h = re.sub(r'<meta name="description" content=".*?">', f'<meta name="description" content="{desc}">', h, flags=re.S)
    for k, v in NAV.items():
        h = h.replace(f'href="{k}"', f'href="{v}"')
    h = h.replace('class="is-active"', '')
    h = h.replace('<li><a href="service-areas.html" >', '<li><a href="service-areas.html" class="is-active">')
    h = h.replace('<li><a href="service-areas.html">', '<li><a href="service-areas.html" class="is-active">')
    h = h.replace('<a href="index.html" class="cl-logo"', '<a href="index.html" class="cl-logo"')
    return h

def foot():
    t = tail
    for k, v in NAV.items():
        t = t.replace(f'href="{k}"', f'href="{v}"')
    t = t.replace('href="#contact"', 'href="#contact"')
    return t

def build(src, out, title, desc, ctitle=None, clead=None):
    body = (root / '_src' / src).read_text(encoding='utf-8')
    c = contact
    if ctitle: c = re.sub(r'(<h2 class="cl-h cl-h--light cl-h2"[^>]*>).*?(</h2>)', lambda m: m.group(1) + ctitle + m.group(2), c, count=1, flags=re.S)
    if clead: c = re.sub(r'(<p class="cl-lead"[^>]*>).*?(</p>)', lambda m: m.group(1) + clead + m.group(2), c, count=1, flags=re.S)
    body = body.replace('<!--CONTACT-->', c)
    (root / out).write_text(shell(title, desc) + '\n\n' + body + '\n' + foot(), encoding='utf-8')
    print('wrote', out)

build('service-areas.main.html', 'service-areas.html',
      'Service Areas | Crestline Property Management',
      'Property management in Palo Alto, Mountain View, Sunnyvale, San Jose, Menlo Park and Foster City. Local rents, neighborhoods and rent rules for every city we serve.')
# Location pages (template + every city) come from data/cities/*.js via render-location.js
import json
for m in json.loads((root / '_src' / 'locations.json').read_text(encoding='utf-8')):
    build(m['src'], m['out'], m['title'], m['desc'], ctitle=m['ctitle'], clead=m['clead'])
