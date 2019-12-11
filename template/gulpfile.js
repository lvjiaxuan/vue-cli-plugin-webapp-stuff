const gulp = require('gulp');
const GulpSSH = require('gulp-ssh');
const fs = require('fs');
const path = require('path');
const tinify = require('tinify');
const imgmin = require('gulp-tiny-imgmin');

const resolve = dir => path.join(__dirname, dir);

// ====================================================================================
// ====================================================================================
// ====================================================================================

tinify.key = '<%= tinifyKey %>';

const prodWebConfig = {
  ssh: {
    host: '<%= prodWebConfig.ssh.host %>',
    port: '<%= prodWebConfig.ssh.port %>',
    username: '<%= prodWebConfig.ssh.username %>',
    password: '<%= prodWebConfig.ssh.password %>',
  },
  remotePath: '<%= prodWebConfig.remotePath %>'
}

const sitWebConfig = {
  ssh: {
    host: '<%= sitWebConfig.ssh.host %>',
    port: '<%= sitWebConfig.ssh.port %>',
    username: '<%= sitWebConfig.ssh.username %>',
    password: '<%= sitWebConfig.ssh.password %>',
  },
  remotePath: '<%= sitWebConfig.remotePath %>'
}

const cdnConfig = {
  ssh: {
    host: '<%= cdnConfig.ssh.host %>',
    port: '<%= cdnConfig.ssh.port %>',
    username: '<%= cdnConfig.ssh.username %>',
    passphrase: '<%= cdnConfig.ssh.passphrase %>',
    privateKey: fs.readFileSync('<%= cdnConfig.ssh.privateKey %>')
  },
  remotePath:'<%= cdnConfig.remotePath %>'
}

/**
 * # cdn资源上传
 */
const deploycdn = (mode = 'sit') => {

  const cdnSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: cdnConfig.ssh
  });

  return gulp.src([resolve('./dist/**'), '!' + resolve('./dist/index.html'), '' + resolve('./dist/img/**')])
          .pipe(cdnSSH.dest(cdnConfig.remotePath + (mode === 'sit' ? '-test' : '')))
          .on('finish', () => console.log(`【${ mode }】 deploycdn finish`));
}

/**
 * # index页面上传
 */
const deployindex = async (mode = 'sit') => {

  const webConfig = mode === 'sit' ? sitWebConfig : prodWebConfig;

  const webSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: webConfig.ssh
  });

  const isIndexHtml = <%= +isIndexHtml === 1 %>;// index html or jsp

  if(!isIndexHtml) {

    const idnexStr = await readFile(resolve('./dist/index.html'));
    let jspStr = '<<%%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"<%%>' + idnexStr.toString();
    jspStr = jspStr.replace(/\.css/g, '.css?v=${version}').replace(/\.js/g, '.js?v=${version}');// 版本控制方式
    await writeFile(resolve('./dist/index.jsp'), jspStr);
  }

  return gulp.src(resolve('./dist/index.' + (isIndexHtml ? 'html' : 'jsp')))
        .pipe(webSSH.dest(webConfig.remotePath))
        .on('finish', () => console.log(`【${ mode }】 deployindex finish`));
}

/**
 * # tiny 图片压缩
 */
const tiny = () => gulp.src('./src/assets/images/**')
                    .pipe(imgmin({
                      key: 'imagemin',
                      verbose: true,
                    })).pipe(gulp.dest('./src/assets/images/tinied'));

exports.deploysit = gulp.parallel(deployindex, () => deploycdn('sit'));
exports.deployprodcdn = () => deploycdn('prod');
exports.tiny = tiny;