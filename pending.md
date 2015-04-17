These layouts are waiting on deconst features to be ported over properly:

 * `_layouts/category_index.html`
 * `_layouts/monthy_index.html`
 * `_layouts/post.html`

New handlebars context fields that I'll need to add.

 * `presented_url`
 * `metadata.tags`
 * `metadata.author`
 * `metadata.publish_date`
 * `metadata.bio`
 * `metadata.disqus.include`
 * `metadata.disqus.short_name`
 * `metadata.disqus.embed`
 * `has_next_or_previous`
 * `previous.url`
 * `previous.title`
 * `next.url`
 * `next.title`
 * `included[].date`
 * `included[].title`
 * `included[].url`
 * `included[].tags`

And I'll need to reproduce these handlebars filters:

 * `{{ | date: "%b %-d %Y" }}`
 * `{{ | category_links }}`
