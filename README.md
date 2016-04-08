This is a **very stupid** gulp plugin use to add a space between English word and Chinese character in your documents.


Adding a such a space will increase readability. So, don't use this plugin, you should add that space while you are writing your docs in the first place.

But if you already have many docs have such a issue you may try this plugin.

With this plugin, you will expect transform like below:

```
'中Chinese文'            => '中 Chinese 文'

'中Chinese文\n世world界' => '中 Chinese 文\n世 world 界'

'Chinese文\n英English'   => 'Chinese 文\n英 English'

'Chinese，\n《hello》'   => 'Chinese，\n《hello》'  # Stay unchanged
```

You may achieve this by using [`gulp-replace`](https://github.com/lazd/gulp-replace). But you still have to write your own *replacer* function. This plugin is as lightweight as such a *replacer* function.


## Usage

```
npm install --save gulp-spacingWord
```

in your `gulpfile.js`

```javascript
const gulp = require('gulp');
const spacing = require('gulp-spacingWord');

gulp.task('spacing', () => {
  gulp.src('draft/**/*.md')
    .pipe(spacing())
    .pipe(gulp.dest('docs'));
});

gulp.task('default', ['spacing'])
```

## License

MIT (c) haishanh