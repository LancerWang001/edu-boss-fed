<template>
  <div class="course-section">
    <el-card>
      <div slot="header">
        课程名称
      </div>
      <el-tree
        :data="sections"
        :props="defaultProps"
        :allow-drop="handleAllowDrop"
        @node-drop="handleSort"
        draggable
      >
        <div class="inner" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span v-if="data.sectionName" class="actions">
            <el-button size="mini">编辑</el-button>
            <el-button type="primary" size="mini">添加课时</el-button>
            <el-button size="mini">状态</el-button>
          </span>
          <span v-else class="actions">
            <el-button size="mini">编辑</el-button>
            <el-button
              size="mini"
              type="success"
              @click="$router.push({
                name: 'course-video',
                params: { courseId },
                query: {
                  sectionId: node.parent.id,
                  lessonId: data.id
                }
              })"
            >上传视频</el-button>
            <el-button size="mini">状态</el-button>
          </span>
        </div>
      </el-tree>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getSectionById,
  saveOrUpdateLesson,
  saveOrUpdateSection
} from '@/services/course'

export default Vue.extend({
  name: 'course-section',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      sections: [],
      defaultProps: {
        children: 'lessonDTOS',
        label (section: any) {
          return section.sectionName || section.theme
        }
      }
    }
  },
  created () {
    this.loadSections()
  },
  methods: {
    async loadSections () {
      const { data } = await getSectionById(this.courseId as string)
      this.sections = data.data
    },
    handleAllowDrop (dragginNode: any, dropNode: any, type: 'prev'|'next'|'inner') {
      const isInSection = dragginNode.data.sectionId === dropNode.data.sectionId
      const isInner = type !== 'inner'
      return isInSection && isInner
    },
    async handleSort (dragNode: any, dropNode: any, type: any, event: any) {
      try {
        await Promise.all(dropNode.parent.childNodes.map((item: any, index: number) => {
          if (dragNode.data.sectionName) {
            // 阶段
            return saveOrUpdateSection(item.data.id, index + 1)
          } else {
            // 课时
            return saveOrUpdateLesson(item.data.id, index + 1)
          }
        }))
        this.$message.success('排序成功！')
      } catch (err) {
        this.$message.error('排序失败')
      }
    }
  }
})
</script>

<style scoped>
.course-section .inner {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ebeef5;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}
::v-deep .el-tree-node__content {
  height: auto;
}
</style>
