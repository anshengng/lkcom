import { ImageUpload } from '@/apis/upload';
import Editor from '@toast-ui/editor';

export default class {
  editor: toastui.Editor;
  isFullScreen: boolean = false;
  constructor(el: string, initialValue: string, public height: string) {
    this.editor = new Editor({
      el: document.querySelector(el),
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      height: height,
      initialValue: initialValue,
      toolbarItems: [
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
        ['ul', 'ol', 'task', 'indent', 'outdent'],
        ['table','image', 'link'],//删除image,功能未修复
        ['code', 'codeblock'],
        // Using Option: Customize the last button
        [{
          el: this.createFullScreenButton(),
          command: 'FullScreenButton',
          tooltip: '全屏'
        }]
      ]
    }); // 配置toasui_editor_markdown

    this.ImageHook();
  }

  //添加全屏按钮
  private createFullScreenButton() {
    const button = document.createElement('button') as HTMLButtonElement;
    button.style.margin = '0'
    button.innerHTML = '<i class="fab fa-delicious text-lg"></i>'
    //点击全屏
    const ui = document.querySelector('#editor') as HTMLDivElement
    button.addEventListener('click', () => {
      if (this.isFullScreen) {
        this.editor.setHeight(this.height)
        ui?.classList.remove('fullscreen')
      } else {
        this.editor.setHeight('100vh')
        ui?.classList.add('fullscreen')
      }
      this.isFullScreen = !this.isFullScreen
    })
    //监听esc退出全屏
    document.documentElement.addEventListener('keyup', (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.isFullScreen) {
        ui.classList.remove('fullscreen')
        this.isFullScreen = false
        this.editor.focus()
      }
    })
    return button;
  }

  //左边不使用base64
  private ImageHook() {
    this.editor.removeHook('addImageBlobHook')
    //移除后重新自定义
    this.editor.addHook('addImageBlobHook', async (blob: any, callback: Function) => {
      // console.log(blob);
      const form = new FormData();
      form.append('file', blob, blob.name);

      const res = await ImageUpload(form)
      const fixedUrl = res.data.url.replace(/\\/g, '/');

      callback(fixedUrl, blob.name)
    })
  }

}