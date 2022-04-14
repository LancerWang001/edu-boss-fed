<template>
  <div class="course-video">
    <el-card>
      <div slot="header">
        <span>课程 XXX</span>
        <br />
        <span>阶段 XXX</span>
        <br />
        <span>课时 XXX</span>
      </div>
      <el-form label-width="70px">
        <el-form-item label="视频上传">
          <input ref="video-file" type="file">
        </el-form-item>
        <el-form-item label="封面上传">
          <input ref="image-file" type="file">
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleUpload">开始上传</el-button>
          <el-button @click="$router.back()">返回</el-button>
        </el-form-item>
        <el-form-item>
          <p>视频上传中：{{ uploadPercent }}%</p>
          <p v-if="isUploadSuccess">视频转码中：{{ isTransCodeSuccess ? '完成' : '正在处理，请稍候' }}</p>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getAliyunImagUploadAddressAdnAuth,
  getAliyunVideoUploadAddressAdnAuth,
  aliyunTransCode,
  geteAliyunTransCodePercent
} from '@/services/aliyun-upload'

export default Vue.extend({
  name: 'CourseVideo',
  data () {
    return {
      uploader: null,
      imageUrl: '',
      videoId: '',
      uploadPercent: 0,
      isUploadSuccess: false,
      isTransCodeSuccess: false
    }
  },
  created () {
    this.initUploader()
  },
  computed: {
    video () {
      return this.$refs['video-file']
    },
    image () {
      return this.$refs['image-file']
    }
  },
  methods: {
    initUploader () {
      this.uploader = new window.AliyunUpload.Vod({
        timeout: 60000,
        partSize: 1048576,
        parallel: 5,
        retryCount: 3,
        retryDuration: 2,
        region: 'cn-shanghai',
        userId: '1618139964448548',
        // 开始上传
        onUploadstarted: async (uploadInfo: any) => {
          console.log('onUploadstarted')
          // 1. 获取上传凭证
          let uploadAddressAndAuth
          if (uploadInfo.isImage) {
            // 获取图片上传凭证
            const { data } = await getAliyunImagUploadAddressAdnAuth()
            this.imageUrl = data.data.imageURL
            uploadAddressAndAuth = data.data
          } else {
            // 获取视频上传凭证
            const { data } = await getAliyunVideoUploadAddressAdnAuth(
              uploadInfo.file.name,
              this.imageUrl // 先上传图片，再上传视频
            )
            uploadAddressAndAuth = data.data
            this.videoId = uploadAddressAndAuth.videoId
          }
          // 2. 设置上传凭证：setUploadAuthAndAddress(uploadFileInfo, uploadAuth, uploadAddress,videoId)
          (this.uploader as any).setUploadAuthAndAddress(
            uploadInfo,
            uploadAddressAndAuth.uploadAuth,
            uploadAddressAndAuth.uploadAddress,
            uploadAddressAndAuth.imageId || uploadAddressAndAuth.videoId
          )
          // 3. 设置好凭证，上传开始
        },
        // 文件上传成功
        onUploadSucceed: function (uploadInfo: any) {
          console.log('onUploadSucceed')
        },
        // 文件上传失败
        onUploadFailed: function (uploadInfo: any, code: string, message: string) {
          console.log('onUploadFailed')
        },
        // 取消文件上传
        onUploadCanceled: function (uploadInfo: any, code: string, message: string) {
          console.log('onUploadCanceled')
        },
        // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
        onUploadProgress: (uploadInfo: any, totalSize: number, progress: number) => {
          console.log('onUploadProgress')
          if (!uploadInfo.isImage) {
            this.uploadPercent = Math.floor(100 * progress)
          }
        },
        // 上传凭证超时
        onUploadTokenExpired: function (uploadInfo: any) {
          console.log('onUploadTokenExpired')
        },
        // 全部文件上传结束
        onUploadEnd: async () => {
          console.log('onUploadEnd')
          this.isUploadSuccess = true
          const { data } = await aliyunTransCode({
            lessonId: this.$route.query.lessonId as string,
            coverImageUrl: this.imageUrl,
            fileName: (this.video as any).files[0].name,
            fileId: this.videoId
          })
          console.log(data)
          // 轮询转码进度
          const timer = setInterval(async () => {
            const { data } = await geteAliyunTransCodePercent(this.$route.query.lessonId as string)
            console.log(data.data)
            if (data.data === 100) {
              this.isTransCodeSuccess = true
              window.clearInterval(timer)
              console.log('转码成功！')
            }
          }, 3000)
        }
      })
    },
    // 获取上传的文件
    handleUpload () {
      // 初始上传状态
      this.isTransCodeSuccess = false
      this.isUploadSuccess = false
      this.uploadPercent = 0

      const videoFile = (this.video as any).files[0]
      const imageFile = (this.image as any).files[0]
      const uploader = this.uploader as any

      uploader.addFile(imageFile, null, null, null, '{"Vod":{}}')
      uploader.addFile(videoFile, null, null, null, '{"Vod":{}}')

      // 触发 uploadStarted
      uploader.startUpload()
    }
  }
})
</script>

<style scoped>

</style>
