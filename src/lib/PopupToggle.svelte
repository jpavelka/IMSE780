<script>
    export let show
    export let divId = ''
    const handleClose = () => {
        show = false;
    }
</script>

<div style={`display:${show ? 'block' : 'none'}`} class="popup" id={divId}>
    <div class="closeX" on:click={handleClose}>×</div>
    <slot/>
</div>

<style>
    .popup {
        border: 1pt solid black;
        border-radius: 10pt;
        position: absolute;
        background-color: #f4f4f4;
        padding: 1rem;
        left: 50%;
        transform: translateX(-50%);
        box-shadow: 2px 3px 5px #999;
        z-index: 1;
    }
    .closeX {
        color: #222;
        font-size: 30pt;
        font-weight: bold;
        float: right;
        margin-top: -1.2rem;
        margin-right: -0.2rem;
        cursor: pointer;
    }
</style>