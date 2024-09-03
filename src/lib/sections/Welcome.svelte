<script>
    import BodyText from "$lib/BodyText.svelte";
    import CitationRef from "$lib/CitationRef.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import Key from "$lib/Key.svelte";
</script>

<Heading level="1" refId="welcome">Welcome!</Heading>

<BodyText>
    You're reading the class notes for <em>IMSE 780: Methods of Operations Research</em>
    taught at Kansas State University during the Fall 2023 semester. This course
    is intended to give an <Key>overview of Operations Research (OR) at the graduate level</Key>.
    After this course, students will have a <Key>basic familiarity with various OR methodologies</Key>
    and be able to <Key>recognize when the methods can be applied in real-life scenarios</Key>.
    Students should also be able to <Key>apply the chosen methodology via Python code</Key>.
</BodyText>

<Heading level="2" refId="courseMaterials">Course materials</Heading>

<!-- todo: assignments link -->
<BodyText>
    The core of this course will be taught from these notes. Additionally, <Key>I
    encourage students to use the textbook <em
        >Introduction to Operations Research</em
    >
    <CitationRef refId="classText" /> as a reference<Footnote
        >The most recent version of this textbook is the 11th edition, which
        came out in 2021. But much of the content quoted here comes from the
        10th edition from 2015. Nothing about the course will require you to
        have a certain edition, or any book at all. But I think it's a very
        useful reference.</Footnote
    ></Key>. The syllabus, assignments, and other <Key>course materials may be found via
    the <a href="https://k-state.instructure.com/">class Canvas site</a></Key>. Course
    <Key>homeworks/assignments may be found <a id="toAssignments">here</a></Key>.
</BodyText>

<Heading level="2" refId="noteNotes">Notes on these notes</Heading>

<BodyText>
    I wrote the notes in this format in an attempt to alleviate all my past
    frustrations from reading academic material in all formats. Things like
    unlinked references, or links requiring context switches and without back
    navigation. Or static elements that could be more effective if animated or
    interactive. So I tried to fix some of those issues with this format.
</BodyText>

<BodyText>
    That means these notes were necessarily made with my desires in mind, and
    not yours, the reader trying to learn from them. So I'd love any feedback
    you have on how the notes are presented, or anything you think I could add
    to help your learning. I can't guarantee I'll be able to change much
    substantial at this point, but at the very least future iterations of these
    notes could incorporate your changes and help future learners.
</BodyText>

<BodyText>
    Also, errors. I'm trying my best to keep these notes free of typos and
    factual errors, but inevitably several will slip through. I'd be grateful if
    you can point these out as you see them. I'll even keep a leaderboard of who
    has pointed out the most errors, and will have a prize at the end of the
    semester for the largest contributors.
</BodyText>

<BodyText>
    I made these notes mostly for consumption on your web browser on a
    laptop/desktop computer, or a tablet in landscape orientation. You can still
    access them on your phone, of course, and I've tried to style things such
    that the content is as usable as possible on a narrow screen, but your best
    experience will be on a larger screen. If you'd like hard copies of these
    notes, your only option for now is to print from your browser. With some
    extra work, I could make pdf versions available as well, although you will
    necessarily lose some functionality in that format. If this is something
    you'd be interested in, please let me know.
</BodyText>

<BodyText>
    These notes were created for educational use. With proper attribution,
    readers may freely copy, distribute, or produce derivative work from this
    content, in whole or in part, for any non-commercial use.
</BodyText>
