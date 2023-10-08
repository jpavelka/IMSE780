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
    .bbTreeDraw {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
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
        drawBBTrees();
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
    const drawBBTrees = () => {
        for (svg of document.getElementsByClassName('bbTreeDraw')) {
            graphInfo = JSON.parse(JSON.stringify(BBGraphData[svg.getAttribute('base')]));
            rootPlacement = graphInfo.rootPlacement || 0.5;
            childSep = graphInfo.childSep || 5;
            siblingSep = graphInfo.siblingSep || 2;
            includeLb = graphInfo.includeLb;
            includeLb = includeLb === undefined ? true : includeLb;
            textsToAdd = [];
            for (n of Object.keys(graphInfo['nodes'])) {
                graphInfo['nodes'][n]['level'] = 0;
                graphInfo['nodes'][n]['children'] = [];
            }
            for (e of graphInfo['edges']) {
                graphInfo['nodes'][e[1]]['level'] = graphInfo['nodes'][e[0]]['level'] + 1;
                graphInfo['nodes'][e[1]]['parent'] = e[0];
            }
            r = 25
            const drawNode = (x, y, attrs) => {
                circ = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circ.setAttribute('cx', x);
                circ.setAttribute('cy', y);
                circ.setAttribute('r', r);
                circ.setAttribute('fill', 'lightgray');
                circ.setAttribute('stroke-width', '2pt');
                circ.setAttribute('stroke', 'gray');
                for (const [k, v] of Object.entries(attrs || {})) {
                    circ.setAttribute(k, v);
                }
                svg.appendChild(circ);
            }
            const addMathText = (math, x, y, attrs) => {
                attrs = attrs || {};
                forObj = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
                mathEl = document.createElement('span');
                katex.render(math, mathEl, {
                    throwOnError: false
                });
                if (attrs['coordToPix'] || false) {
                    [x, y] = coordToPix(x, y)
                }
                forObj.setAttribute('x', x);
                forObj.setAttribute('y', y);
                attrs['height'] = attrs['height'] || '1.2rem';
                attrs['width'] = attrs['width'] || '15rem';
                attrs['font-size'] = attrs['font-size'] || '12pt';
                attrs['font-family'] = attrs['font-family'] || 'KaTeX_Main,Times New Roman,serif';
                for (const [k, v] of Object.entries(attrs || {})) {
                    forObj.setAttribute(k, v);
                }
                forObj.appendChild(mathEl);
                textsToAdd.push(forObj);
            }
            const drawLine = (x1, y1, x2, y2, attrs) => {
                el = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                el.setAttribute('x1', x1);
                el.setAttribute('y1', y1);
                el.setAttribute('x2', x2);
                el.setAttribute('y2', y2);
                attrs = attrs || {}
                attrs['style'] = attrs['style'] || 'stroke:gray';
                for (const [k, v] of Object.entries(attrs)) {
                    el.setAttribute(k, v);
                }
                svg.appendChild(el);
            }
            incumbentVal = undefined;
            maxLevel = Math.max(...Object.values(graphInfo.nodes).map(n => n.level));
            for ([n, d] of Object.entries(graphInfo.nodes)) {
                x = parseFloat(svg.getAttribute('width')) * rootPlacement;
                if (d.parent) {
                    parentInfo = graphInfo.nodes[d['parent']];
                    d.childNum = parentInfo.children.length;
                    side = d.childNum === 0 ? -1 : 1;
                    dist = siblingSep * (Math.max(3, maxLevel + 1) - d.level) * r;
                    if (d['level'] == 1) {
                        dist += 1.5 * r;
                    }
                    x = parentInfo.x + side * dist;
                    parentInfo.children.push(n);
                }
                y = (2 + childSep * d.level) * r - 0.5 * r;
                graphInfo['nodes'][n]['level'] = d.level;
                graphInfo['nodes'][n]['x'] = x;
                graphInfo['nodes'][n]['y'] = y;
                addMathText(n, x - 8, y - 10);
                if (d.state === 'integer') {
                    incumbentVal = incumbentVal === undefined ? d.lp : Math.max(incumbentVal, d.lp);
                    d.lp += '^*';
                }
                if (!!d.lp) {
                    addMathText(d.lp, x + 25, y - 30);
                }
            }
            for (e of graphInfo.edges) {
                coords = []
                for (i of [0, 1]) {
                    for (j of ['x', 'y']) {
                        coords.push(graphInfo.nodes[e[i]][j]);
                    }
                }
                drawLine(...coords);
                textX = (coords[0] + coords[2]) / 2;
                textY = (coords[1] + coords[3]) / 2 - 20;
                if (graphInfo.nodes[e[1]].childNum === 0) {
                    textX -= 55;
                } else {
                    textX += 0;
                }
                addMathText(e[2], textX, textY);
            }
            for (d of Object.values(graphInfo.nodes)) {
                if (d.level === 0 && includeLb) {
                    incumbentText = incumbentVal === undefined ? '-\\infty' : `${incumbentVal}`
                    addMathText(incumbentText, d.x + 28, d.y + 5);
                }
                attrs = {}
                if (d.state === 'branched') {
                    attrs.stroke = 'blue';
                    attrs.fill = 'lightblue';
                }
                if (d.state === 'infeasible') {
                    attrs.stroke = 'red';
                    attrs.fill = 'lightpink';
                }
                if (d.state === 'integer') {
                    attrs.stroke = 'purple';
                    attrs.fill = 'plum';
                }
                if (d.state === 'bounded') {
                    attrs.stroke = 'darkorange';
                    attrs.fill = 'peachpuff';
                }
                drawNode(d.x, d.y, attrs);
            }
            for (textObj of textsToAdd) {
                svg.appendChild(textObj);
            }
        }
    }
    BBGraphData = {
        bbTree1: {
            'edges': [
                ['P', 'P^1', 'x_1 \\leq 3'],
                ['P', 'P^2', 'x_1 \\geq 4'],
                ['P^1', 'P^3', 'x_2 \\leq 3'],
                ['P^1', 'P^4', 'x_2 \\geq 4']
            ],
            'nodes': {
                'P': {lp: '30', state: 'branched'},
                'P^1': {lp: '29', state: 'branched'},
                'P^2': {},
                'P^3': {},
                'P^4': {}
            }
        },
        bbTree2: {
            'edges': [
                ['P', 'P^1', 'x_1 \\leq 2'],
                ['P', 'P^2', 'x_1 \\geq 3'],
                ['P^1', 'P^3', 'x_2 \\leq 2'],
                ['P^1', 'P^4', 'x_2 \\geq 3'],
                ['P^2', 'P^5', 'x_1 \\leq 3'],
                ['P^2', 'P^6', 'x_1 \\geq 4']
            ],
            'nodes': {
                'P': {lp: '11', state: 'branched'},
                'P^1': {lp: '11', state: 'branched'},
                'P^2': {lp: '11', state: 'branched'},
                'P^3': {},
                'P^4': {},
                'P^5': {},
                'P^6': {}
            }
        },
        bbTree3: {
            'edges': [
                ['P', 'P^1', 'x_2 \\leq 1'],
                ['P', 'P^2', 'x_2 \\geq 2']
            ],
            'nodes': {
                'P': {lp: '16.2', state: 'branched'},
                'P^1': {lp: '16', state: 'integer'},
                'P^2': {}
            }
        },
        bbTree4: {
            'edges': [
                ['P', 'P^1', 'x_3 \\leq 2'],
                ['P', 'P^2', 'x_3 \\geq 3'],
                ['P^1', 'P^3', 'x_1 \\leq 0'],
                ['P^1', 'P^4', 'x_1 \\geq 1'],
                ['P^3', 'P^5', 'x_2 \\leq 0'],
                ['P^3', 'P^6', 'x_2 \\geq 1']
            ],
            'nodes': {
                'P': {lp: '7.2', state: 'branched'},
                'P^1': {lp: '7', state: 'branched'},
                'P^2': {lp: '-\\infty', state: 'infeasible'},
                'P^3': {lp: '6.5', state: 'branched'},
                'P^4': {},
                'P^5': {},
                'P^6': {}
            }
        }
    }
</script>

<a id='toNotes'>Course notes</a>
