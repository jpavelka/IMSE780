import argparse
from pathlib import Path

from py_parsers.parse import py_parse

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--dest_ftype', default='html')
    parser.add_argument('--dest_fname')
    parser.add_argument('--update_gists', default=False, action='store_true')
    args = parser.parse_args()
    args.dest_fname = args.dest_fname or ('index' if args.dest_ftype == 'html' else 'converted')
    text = Path('md_src/src.md').read_text()
    py_parse(text, args.dest_ftype, args.dest_fname, args.update_gists)
