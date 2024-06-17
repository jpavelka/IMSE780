import argparse
import re
from pathlib import Path


def convert(f):
    f = Path(f)
    s = f.read_text()
    # display math
    cnt = 0
    even_replace = "<MathDisp>"
    odd_replace = "</MathDisp>"
    while (s.find('$$\n') > 0):
        s = s.replace('$$\n', even_replace if cnt % 2 == 0 else odd_replace, 1)
        cnt += 1
    # inline math
    cnt = 0
    even_replace = "<Math>"
    odd_replace = "</Math>"
    while (re.search('[^\\\\]\$', s)):
        replace_ind = re.search('[^\\\\]\$', s).span()[-1] - 1
        s = s[:replace_ind] + (even_replace if cnt % 2 == 0 else odd_replace) + s[replace_ind + 1:]
        cnt += 1
    cnt = 0
    # body text
    while re.search('\n\n[a-zA-Z]', s):
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
    while (re.search(' (\*\*|_)', s)):
        s = re.sub(' (\*\*|_)', " <em>", s)
    while (re.search('(\*\*|_)( |,|\.)', s)):
        s = re.sub('(\*\*|_)( |,|\.)', "</em> ", s)
    # section refs
    regex = '\+@sec:[a-zA-Z0-9]*'
    while re.search(regex, s):
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
        m = re.search(regex, s)
        ind1, ind2 = m.span()
        s = ''.join([
            s[:ind1],
            m.group().replace('+@eq:', '<EquationRef refId=') + '/>',
            s[ind2:]
        ])
    # headers
    regex = '\n#[^\n]*'
    while re.search(regex, s):
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
    # write changes
    f.write_text(s)
    

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('file')
    args = parser.parse_args()
    convert(args.file)