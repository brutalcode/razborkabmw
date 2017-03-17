<article id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>
    <?php
    // Hide comments, tags, and links now so that we can render them later.
    hide($content['comments']);
    hide($content['links']);
    hide($content['field_tags']);
    print render($content);
    ?>

    <?php if (!empty($content['field_tags']) || !empty($content['links'])): ?>
    <footer>
        <?php print render($content['field_tags']); ?>
        <?php print render($content['links']); ?>
    </footer>
    <?php endif; ?>

    <?php print render($content['comments']); ?>

</article> <!-- /.node -->