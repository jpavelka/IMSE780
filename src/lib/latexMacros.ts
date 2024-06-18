// todo: change \\I to \\Z
const macros = {
    '\\max': '\\text{max}',
    '\\min': '\\text{min}',
    '\\st': '\\text{s.t.}',
    '\\R': '\\mathbb{R}',
    '\\I': '\\mathbb{Z}',
    '\\T': '^\\intercal',
    '\\inv': '^{-1}',
    '\\mat': '\\mathbf{#1}',
    '\\A': '\\mat{A}',
    '\\B': '\\mat{B}',
    '\\b': '\\mat{b}',
    '\\c': '\\mat{c}',
    '\\x': '\\mat{x}',
    '\\y': '\\mat{y}',
    '\\zeros': '\\mat{0}',
    '\\ones': '\\mat{1}',
    '\\identity': '\\mat{I}',
    '\\P': '\\mathcal{P}',
    '\\NP': '\\mathcal{NP}',
    '\\floor': '\\lfloor #1 \\rfloor',
    '\\ceil': '\\lceil #1 \\rceil',
    '\\bpi': '\\mathbb{\pi}',
    '\\Q': '\\mathbf{Q}',
    '\\indicator': '\\boldsymbol{1}',
    '\\prob': 'P!\\left( #1 \\right)',
    '\\E': 'E!\\left( #1 \\right)',
    '\\Var': '\\text{Var}!\\left( #1 \\right)'
}

export { macros }