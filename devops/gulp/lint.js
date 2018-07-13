const gulp = require('gulp')
const run = require('gulp-run-command').default

let command = 'node_modules/.bin/tslint'
command += ' --project tsconfig.lint.json'
command += ' -t verbose'

gulp.task('lint', run(command))
