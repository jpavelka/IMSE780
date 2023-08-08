import json
import os

import requests


def update_colab_gist(colab_id, gist_id):
    gist_url = f'https://api.github.com/gists/{gist_id}'
    headers = {
        'Accept': 'application/vnd.github+json',
        'Authorization': 'Bearer ' + os.getenv('GH_GIST_TOKEN', '')
    }
    gist_get = requests.get(gist_url, headers=headers)
    gist_fname = list(gist_get.json()['files'].keys())[0]
    colab_url = f'https://docs.google.com/uc?export=download&id={colab_id}'
    colab_name = 'temp_colab.json'
    os.system(f"wget -O {colab_name} '{colab_url}'")
    try:
        try:
            colab_raw = json.load(open(colab_name, 'r'))
        except json.decoder.JSONDecodeError as e:
            raise Exception(
                f'There was an error loading the notebook (id {colab_id}).\n'
                "Please check the id is correct and the notebook is publicly viewable."
            )
        for cell in colab_raw['cells']:
            if cell['cell_type'] == 'code':
                cell['outputs'] = []
                cell['execution_count'] = None
                md_keys = [k for k in cell['metadata'].keys() if k != 'id']
                for k in md_keys:
                    cell['metadata'].pop(k)
        colab_raw['cells'].insert(0, {
            "cell_type": "markdown",
            "metadata": {
                "id": "view-in-github",
                "colab_type": "text"
            },
            "source": [
                f"<a href=\"https://colab.research.google.com/gist/jpavelka/{gist_id}\" target=\"_parent\"><img src=\"https://colab.research.google.com/assets/colab-badge.svg\" alt=\"Open In Colab\"/></a>"
            ]
        })
        api_data = {
            'files': {gist_fname: {'content': json.dumps(colab_raw)}}
        }
        patch = requests.patch(gist_url, headers=headers, json=api_data)
    finally:
        os.remove(colab_name)
