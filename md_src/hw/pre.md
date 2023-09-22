<style>
    .assignmentContent {
        margin-left: 0.5rem;
        display: none;
    }
    .mathSmall {
        font-size: 0.8rem;
    }
    h1 {
        cursor: pointer;
        margin: 0;
    }
    h2 {
        margin-top: 0; 
    }
    pre.sourceCode {
        padding: 0.5rem;
    }
    .sourceCode {
        background-color: #eee;
    }
    .headerArrow {
        font-size: 1.2rem;
    }
    html {
        overflow-y: scroll;
    }
    td p {
        margin: 0;
    }
    th p {
        margin: 0.2rem;
    }
    img {
        border: 1pt solid black;
        display: block;
        margin: 1rem auto 1rem auto;
    }
    a {
        color: blue;
    }
    a:visited {
        color: purple;
    }
    th.rowHead {
        border: none;
    }
</style>

<script>
    window.onload = () => {
        for (el of document.getElementsByClassName('assignmentContainer')) {
            dt = el.getAttribute('data-due');
            gradingNotesLink = el.getAttribute('data-grading-notes-link') || '';
            el.innerHTML = `
                <h1 id="assignment${el.id}Header" onclick="headerClick('${el.id}')">
                    ${el.id} (due ${parseInt(dt.slice(5, 7))}/${parseInt(dt.slice(8, 10))})
                    <span id="assignment${el.id}HeaderArrow" class="headerArrow">&#9654;</span>
                </h1>
                <div id="assignment${el.id}Content" class="assignmentContent">
                    <h2>${el.getAttribute('data-sub-name')}</h2>
                    <a href="${gradingNotesLink}">${gradingNotesLink === '' ? '' : 'Partial solutions'}</a>
            ` + el.innerHTML + '</div>'
            if (new Date() <= addDays(new Date(dt), 1)) {
                headerClick(el.id);
            }
        }
        loc_split = window.location.href.split('/')
        document.getElementById('toNotes').setAttribute('href', 
            loc_split.slice(0, loc_split.length - 1).join('/') + '/?classmode=false'
        )
    }
    const headerClick = (elId) => {
        el = document.getElementById(`assignment${elId}Content`);
        displaying = el.style.display === 'block'
        el.style.display = displaying ? 'none' : 'block';
        arrowEl = document.getElementById(`assignment${elId}HeaderArrow`);
        arrowEl.innerHTML = displaying ? '&#9654;' : '&#9660;';
    }
    const addDays = (date, days) => {
        date.setDate(date.getDate() + days);
        return date;
    }
</script>

<a id='toNotes'>Course notes</a>