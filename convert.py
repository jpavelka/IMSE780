import argparse
import re
from pathlib import Path

from py_parsers.parse import py_parse

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--dest_ftype', default='html')
    parser.add_argument('--dest_fname')
    parser.add_argument('--update_gists', default=False, action='store_true')
    parser.add_argument('--file', default=None)
    args = parser.parse_args()
    args.dest_fname = args.dest_fname or ('index' if args.dest_ftype == 'html' else 'converted')
    text = Path('md_src/src.md').read_text()
    if args.file != None:
        fpath = Path(args.file).absolute()
        fpath = fpath.relative_to(Path().absolute())
        fpath_str = re.sub('^md_src/', '', str(fpath))
        text = '\n\n'.join([
            '{insertSection:macros.md}',
            '{insertSection:' + fpath_str + '}',
            '{insertSection:sections/appendix/appendix.md}'
        ])
    py_parse(text, args.dest_ftype, args.dest_fname, args.update_gists)
