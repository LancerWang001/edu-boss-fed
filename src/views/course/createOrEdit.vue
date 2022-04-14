<template>
  <div class="course-create">
    <el-card>
      <div slot="header">
        <el-steps :active="activeStep" simple>
          <el-step
            v-for="(step, i) of steps"
            :key="i"
            :title="step.title"
            :icon="step.icon"
            @click.native="activeStep = i"
          ></el-step>
        </el-steps>
      </div>
      <el-form size="small" label-width="80px">
        <div v-show="activeStep === 0">
          <basic-info v-model="basicInfo"/>
        </div>
        <div v-show="activeStep === 1">
          <course-cover v-model="courseCover"/>
        </div>
        <div v-show="activeStep === 2">
          <sell-message v-model="sellMessage" />
        </div>
        <div v-show="activeStep === 3">
          <sale v-model="sale"/>
        </div>
        <div v-show="activeStep === 4">
          <course-detail v-model="courseDetail"/>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
          </el-form-item>
        </div>
        <el-form-item v-if="activeStep >= 0 && activeStep < 4">
          <el-button @click="activeStep++">下一步</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BasicInfo from './components/BasicInfo.vue'
import CourseCover from './components/CourseCover.vue'
import SellMessage from './components/SellMessage.vue'
import Sale from './components/Sale.vue'
import CourseDetail from './components/CourseDetail.vue'
import { saveOrUpdateCourse, getCourseById } from '@/services/course'

export default Vue.extend({
  name: 'CourseCreate',
  components: {
    BasicInfo,
    CourseCover,
    SellMessage,
    Sale,
    CourseDetail
  },
  props: {
    courseId: {
      type: [String, Number]
    }
  },
  created () {
    if (this.courseId) this.loadCourse()
  },
  data () {
    return {
      activeStep: 0,
      steps: [
        { title: '基本信息', icon: 'el-icon-edit' },
        { title: '课程封面', icon: 'el-icon-upload' },
        { title: '销售信息', icon: 'el-icon-picture' },
        { title: '秒杀活动', icon: 'el-icon-picture' },
        { title: '课程详情', icon: 'el-icon-picture' }
      ],
      basicInfo: {
        courseName: '',
        brief: '',
        teacherDTO: {
          teacherName: '',
          teacherHeadPicUrl: '',
          position: '',
          description: ''
        },
        sortNum: 0,
        previewFirstField: '',
        previewSecondField: ''
      },
      courseCover: {
        courseListImg: '',
        courseImgUrl: ''
      },
      sellMessage: {
        price: 0,
        discounts: 0,
        sales: 0,
        discountsTag: ''
      },
      sale: {
        activityCourse: true,
        activityCourseDTO: {
          beginTime: '',
          endTime: '',
          amount: 0,
          stock: 0
        }
      },
      courseDetail: {
        courseDescriptionMarkDown: '',
        status: 1
      },
      course: {
        priceTag: '',
        isNew: true,
        isNewDes: '',
        autoOnlineTime: ''
      }
    }
  },
  methods: {
    async loadCourse () {
      const { data } = await getCourseById(this.courseId as string)
      const courseData = data.data
      this.basicInfo = {
        courseName: courseData.courseName,
        brief: courseData.brief,
        teacherDTO: courseData.teacherDTO,
        sortNum: courseData.sortNum,
        previewFirstField: courseData.previewFirstField,
        previewSecondField: courseData.previewSecondField
      }
      this.courseCover = {
        courseListImg: courseData.courseListImg,
        courseImgUrl: courseData.courseImgUrl
      }
      this.sellMessage = {
        price: courseData.price,
        discounts: courseData.discounts,
        sales: courseData.sales,
        discountsTag: courseData.discountsTag
      }
      this.sale = {
        activityCourse: courseData.activityCourse,
        activityCourseDTO: courseData.activityCourseDTO
      }
      this.courseDetail = {
        courseDescriptionMarkDown: courseData.courseDescriptionMarkDown,
        status: courseData.status
      }
      this.course = {
        priceTag: courseData.priceTag,
        isNew: courseData.isNew,
        isNewDes: courseData.isNewDes,
        autoOnlineTime: courseData.autoOnlineTime
      }
    },
    async onSubmit () {
      await saveOrUpdateCourse({
        ...this.basicInfo,
        ...this.courseCover,
        ...this.sellMessage,
        ...this.sale,
        ...this.courseDetail,
        ...this.course
      })
      this.$router.back()
    }
  }
})
</script>

<style scoped lang="scss">
.el-steps {
  cursor: pointer;
}
</style>
