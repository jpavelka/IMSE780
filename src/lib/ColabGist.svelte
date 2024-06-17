<script lang='ts'>
    import { refNumbering } from "$lib";
    import { notebooks } from "./stores";

    export let colabId
    export let gistId
    export let refId
    export let desc

    const toHex = (s: string) => {
        s = decodeURIComponent(encodeURIComponent(s));
        let h = ''
        for (let i = 0; i < s.length; i++) {
            h += s.charCodeAt(i).toString(16)
        }
        return h
    }
    const encUrl = toHex(`https://raw.githubusercontent.com/gist/jpavelka/${gistId}/raw`);

    refId = refNumbering(notebooks, refId, 'nb');
    const nbNum = $notebooks.numbers[refId];

    // todo: some method to update gist from colab
</script>

<div class=nbTitle><b>Notebook {nbNum}:</b> {desc}</div>
<iframe
    id={gistId}
    src={`https://notebooks.githubusercontent.com/view/ipynb?enc_url=${encUrl}`}
    title={'Notebook Embed ' + gistId}
>Viewer requires iframe</iframe>

<style>
    iframe {
        width: 95%;
        height: 500px;
    }
    .nbTitle {
        font-size:1.2rem;
        margin-top:1rem;
        margin-bottom:0.25rem;
    }
</style>