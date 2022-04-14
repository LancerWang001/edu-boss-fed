<template>
  <div class="course-image">
    <el-progress
      v-if="isUploading"
      :width="178"
      type="circle"
      :percentage="percentage"
      :status="percentage === 100 ? 'success' : undefined"
    ></el-progress>
    <el-upload
      v-else
      action="/"
      class="avatar-uploader"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :http-request="handleUpload">
      <img v-if="value" :src="value" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { upload } from '@/services/course'

export default Vue.extend({
  name: 'CourseImage',
  props: {
    value: {
      type: String
    },
    limit: {
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      isUploading: false,
      percentage: 0
    }
  },
  methods: {
    beforeAvatarUpload (file: any) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < this.limit
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    async handleUpload (uploadData: any) {
      try {
        this.isUploading = true
        const fd = new FormData()
        fd.append('file', uploadData.file)
        const { data } = await upload(fd, (e) => {
          this.percentage = Math.floor(e.loaded / e.total * 100)
        })
        this.$emit('input', data.data.name)
      } finally {
        this.isUploading = false
        this.percentage = 0
      }
    }
  }
})
</script>

<style scoped lang="scss">
::v-deep.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

::v-deep.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
