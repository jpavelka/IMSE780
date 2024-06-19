import argparse
import re
from pathlib import Path


def convert(f):
    f = Path(f)
    s = '\n' + f.read_text()
    imports = set()
    # display math
    cnt = 0
    even_replace = "<MathDisp>"
    odd_replace = "</MathDisp>\n"
    while (s.find('$$\n') > 0):
        imports.add('MathDisp')
        s = s.replace('$$\n', even_replace if cnt % 2 == 0 else odd_replace, 1)
        cnt += 1
    # inline math
    cnt = 0
    even_replace = "<Math>"
    odd_replace = "</Math>"
    while (re.search('[^\\\\]\$', s)):
        imports.add('Math')
        replace_ind = re.search('[^\\\\]\$', s).span()[-1] - 1
        s = s[:replace_ind] + (even_replace if cnt % 2 == 0 else odd_replace) + s[replace_ind + 1:]
        cnt += 1
    cnt = 0
    # body text
    while re.search('\n\n[a-zA-Z]', s):
        imports.add('BodyText')
        loc1 = re.search('\n\n[a-zA-Z]', s).span()[0] + 1
        before = s[:loc1]
        remaining = s[loc1:]
        if re.search('\n\n', remaining):
            loc2 = re.search('\n\n', remaining).span()[0]
            mid = remaining[:loc2]
            after = remaining[loc2:]
        else:
            mid = remaining
            after = ''
        mid = re.sub('\n', '\n    ', mid)
        s = before + '<BodyText>' + mid + '\n</BodyText>' + after
    # italics
    while (re.search(' (\*\*|_(|_))', s)):
        s = re.sub(' (\*\*|_(|_))', " <em>", s)
    while (re.search('(\*\*|_(|_))( |,|\.)', s)):
        s = re.sub('(\*\*|_(|_))( |,|\.)', "</em> ", s)
    # section refs
    regex = '\+@sec:[a-zA-Z0-9]*'
    while re.search(regex, s):
        imports.add('SectionRef')
        m = re.search(regex, s)
        ind1, ind2 = m.span()
        s = ''.join([
            s[:ind1],
            m.group().replace('+@sec:', '<SectionRef refId=') + '/>',
            s[ind2:]
        ])
    # equation refs
    regex = '\+@eq:[a-zA-Z0-9]*'
    while re.search(regex, s):
        imports.add('EquationRef')
        m = re.search(regex, s)
        ind1, ind2 = m.span()
        s = ''.join([
            s[:ind1],
            m.group().replace('+@eq:', '<EquationRef refId=') + '/>',
            s[ind2:]
        ])
    # headings
    regex = '\n#[^\n]*'
    while re.search(regex, s):
        imports.add('Heading')
        m = re.search(regex, s)
        line = m.group()
        hashes = re.search('[^\s]*#', line)
        ind1, ind2 = hashes.span()
        level = len(hashes.group())
        line = line[ind2:].strip()
        spl = line.split('{#sec:')
        name = spl[0].strip()
        if len(spl) > 1:
            ref = spl[1].strip()[:-1]
            line = f'<Heading level={level} refId={ref}>{name}</Heading>'
        else:
            line = f'<Heading level={level}>{name}</Heading>'
        ind1, ind2 = m.span()
        s = s[:ind1] + '\n' + line + s[ind2:]
    # footnotes
    regex = '\[\^[^\]]*\]'
    while re.search(regex, s):
        imports.add('Footnote')
        m = re.search(regex, s)
        ind1, ind2 = m.span()
        pre = s[:ind1]
        post = s[ind2:]
        name = m.group()[2:-1]
        m = re.search(f'\[\^{name}\]:[^\n]*\n', post)
        note = m.group().replace(f'[^{name}]:', '').strip()
        ind1, ind2 = m.span()
        s = pre + '<Footnote>' + note + '</Footnote>' + post[:ind1] + post[ind2:]
    # citations
    regex = ' @[a-zA-Z0-9]*'
    while re.search(regex, s):
        imports.add('CitationRef')
        m = re.search(regex, s)
        ind1, ind2 = m.span()
        s = s[:ind1] + '<CitationRef refId=' + m.group()[2:] + '/>' + s[ind2:]
    # write changes
    importStr = ''
    for x in sorted(imports):
        importStr += f'    import {x} from "$lib/{x}.svelte";\n'
    if len(imports) > 0:
        s = '<script lang="ts">\n' + importStr + '</script>\n' + s
    f.write_text(s)
    

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('file')
    args = parser.parse_args()
    convert(args.file)