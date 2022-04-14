<template>
  <div>
    <div style="border: 1px solid #ccc;">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden;"
        v-model="editorData"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="onCreated"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { upload } from '@/services/course'
import '@wangeditor/editor/dist/css/style.css'

type InsertFn = (url: string, alt: string, href: string) => void

export default Vue.extend({
  name: 'TextEditor',
  components: { Editor, Toolbar },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    const MENU_CONF = {
      uploadImage: {
        server: '/',
        async customUpload (file: File, insertFn: InsertFn) {
          // 1. 上传图片
          const fd = new FormData()
          fd.append('file', file)
          const { data } = await upload(fd)
          const serverAddr = data.data.name
          // 2. 插入富文本
          insertFn(serverAddr, file.name, serverAddr)
        }
      }
    }
    return {
      editor: null,
      toolbarConfig: {},
      editorConfig: {
        placeholder: '请输入内容...',
        MENU_CONF
      },
      mode: 'default', // or 'simple'
      editorData: ''
    }
  },
  methods: {
    onCreated (editor: any) {
      this.editor = Object.seal(editor)
    }
  },
  watch: {
    editorData (newValue) {
      this.$emit('input', newValue)
    }
  },
  beforeDestroy () {
    const editor = this.editor
    if (editor == null) return
    (editor as any).destroy()
  }
})
</script>

<style scoped>

</style>
