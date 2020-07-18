<template>
  <div class="box">
    <el-upload
      :action="action"
      :headers="headers"
      :multiple="false"
      :drag="true"
      :on-success="success"
      :on-error="error"
      :before-upload="before"
      :limit="1"
      :on-exceed="exceed"
      :on-remove="remove"
      :file-list="fileList"
    >
      请上传
    </el-upload>
  </div>
</template>

<script>
import { getToken } from "../../../utils/auth";
export default {
  props: {
    fileList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      action: "https://book.youbaobao.xyz:18082/book/upload"
    };
  },
  computed: {
    headers() {
      return {
        Authorization: `Bearer ${getToken()}`
      };
    }
  },
  methods: {
    success(res) {
      //console.log(res);
      if (res.code == 0) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.$emit('success',res.data)
      }
    },
    error(err) {
      const errMsg = (err.message && JSON.parse(err.message)) || "上传失败";
      this.$message({
        message:
          (errMsg.msg && `上传失败，失败原因：${errMsg.msg}`) || "上传失败",
        type: "error"
      });
      this.$emit("onError", err);
    },
    exceed() {
      this.$message({
        message: "每次只能上传一本电子书",
        type: "warning"
      });
    },
    before(file) {
      console.log(file);
    },
    remove() {
      this.$message({
        message: "电子书删除成功",
        type: "success"
      });
      this.$emit("onRemove");
    }
  }
};
</script>

<style>
.box {
  width: 100%;
  line-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
