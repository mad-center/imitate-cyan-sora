// .vitepress/theme/index.js

// import DefaultTheme from 'vitepress/theme';
// @ts-ignore
import DefaultTheme from 'vitepress/theme-without-fonts'
import './custom.css'

// @ts-ignore
import {EnhanceAppContext, useData, useRoute} from 'vitepress';

import 'viewerjs/dist/viewer.min.css';
// Credit: modified from https://github.com/T-miracle/vitepress-plugin-image-viewer
import imageViewer from '../plugins/image-viewer/viewer';
// @ts-ignore
import vImageViewer from '../plugins/image-viewer/vImageViewer.vue';

// @ts-ignore
import giscusTalk from 'vitepress-plugin-comment-with-giscus';

// @ts-ignore
import MusicPlayer from '../plugins/music-player'

function setupImageViewer() {
  const route = useRoute();
  imageViewer(route, ".vp-doc img", {
    // for more options, see also https://fengyuanchen.github.io/viewerjs/
  });
}

function setupGiscus() {
  // Get frontmatter and route
  const route = useRoute();
  const {frontmatter} = useData();
  // Obtain configuration from: https://giscus.app/
  // use your own repo
  giscusTalk({
    repo: 'mad-center/imitate-cyan-sora',
    repoId: 'MDEwOlJlcG9zaXRvcnkzNjg1MjE3Njk=',
    category: 'General',
    categoryId: 'DIC_kwDOFfcyKc4CZLfw',
    mapping: 'pathname',
    inputPosition: 'top',
    lang: 'zh-CN',
    // ...
  }, {
    frontmatter, route
  });
}

export default {
  ...DefaultTheme,
  enhanceApp(ctx: EnhanceAppContext) {
    DefaultTheme.enhanceApp(ctx);
    // Register global components, if you don't want to use it, you don't need to add it
    // ctx.app.component('vImageViewer', vImageViewer);
    ctx.app.component('MusicPlayer', MusicPlayer);
  },
  setup() {
    setupImageViewer();
    setupGiscus();
  }
};