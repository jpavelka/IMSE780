import json
import os


def update_colab_gist(colab_id, gist_id, gist_fname):
    colab_url = f'https://docs.google.com/uc?export=download&id={colab_id}'
    colab_name = 'temp_colab.json'
    os.system(f"wget -O {colab_name} '{colab_url}'")
    try:
        colab_raw = json.load(open(colab_name, 'r'))
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
                f"<a href=\"https://colab.research.google.com/gist/jpavelka/{gist_id}/python-basics.ipynb\" target=\"_parent\"><img src=\"https://colab.research.google.com/assets/colab-badge.svg\" alt=\"Open In Colab\"/></a>"
            ]
        })
        api_data = {
            'files': {gist_fname: {'content': json.dumps(colab_raw)}}
        }
        json.dump(api_data, open(colab_name, 'w'))
        curl_cmd = (
            f'curl -L -X PATCH https://api.github.com/gists/{gist_id} '
            '-H "Accept: application/vnd.github+json" '
            '-H "Authorization: Bearer ${GH_GIST_TOKEN}" '
            f'-d @{colab_name} '
        )
        os.system(curl_cmd)
    finally:
        os.remove(colab_name)
