<template>
  <el-form ref="postForm" :model="postForm" :rules="rules">
      <Sticky :class-name=" 'sub-navbar' ">
          <el-row v-if='!isEdit'>
            <el-button>显示帮助</el-button>
            <el-button type="primary" @click="addBook">{{
                isEdit?'编辑电子书':'新增电子书'
                }}</el-button>
          </el-row>
      </Sticky>
      <div class="container">
          <el-row>
              <el-col :span="24"><Warning/></el-col>
              <el-col :span="24"><Upload @success="success"/></el-col>
          </el-row>
      </div>
    <el-col :span="24">
    <el-form-item style="margin-bottom: 40px;" prop="title" :label-width="labelWidth">
      <MDinput v-model="postForm.title" :maxlength="100" name="name" required>
        书名
      </MDinput>
    </el-form-item>
    <div>
      <el-row>
        <el-col :span="12" class="form-item-author">
          <el-form-item :label-width="labelWidth" label="作者：" prop="author">
            <el-input
              v-model="postForm.author"
              placeholder="作者"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="出版社：" prop="publisher">
            <el-input
              v-model="postForm.publisher"
              placeholder="出版社"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="语言：">
            <el-input
              v-model="postForm.language"
              placeholder="语言"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="根文件：">
            <el-input
              v-model="postForm.rootFile"
              placeholder="根文件"
              style="width: 100%"
              disabled
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="文件路径：">
            <el-input
              v-model="postForm.filePath"
              placeholder="文件路径"
              style="width: 100%"
              disabled
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="解压路径：">
            <el-input
              v-model="postForm.unzipPath"
              placeholder="解压路径"
              style="width: 100%"
              disabled
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="封面路径：">
            <el-input
              v-model="postForm.coverPath"
              placeholder="封面路径"
              style="width: 100%"
              disabled
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="文件名称：">
            <el-input
              v-model="postForm.fileName"
              placeholder="文件名称"
              style="width: 100%"
              disabled
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item :label-width="labelWidth" label="封面：">
            <a v-if="postForm.cover" :href="postForm.cover" target="_blank">
              <img :src="postForm.cover" class="preview-img">
            </a>
            <span v-else>无</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item :label-width="labelWidth" label="目录：">
            <div
              v-if="postForm.contents && postForm.contents.length > 0"
              class="contents-wrapper"
            >
              <el-tree :data="postForm.contentsTree" @node-click="onContentClick" />
            </div>
            <span v-else>无</span>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
</el-col>
  </el-form>
</template>

<script>
import Sticky from '../../../components/Sticky'
import MDinput from '../../../components/MDinput'
import Warning from './Warning'
import Upload from './upload'
import {bookCreate} from '../../../api/book'
export default {
    props:{
        isEdit:''
    },
    components:{
        Sticky,
        Warning,
        Upload,
        MDinput
    },
    methods:{
      addBook(){
        this.$refs.postForm.validate(valid=>{
          if(valid){
            const {  title,
          author,
          publisher,
          language,
          rootFile,
          filePath,
          unzipPath,
          coverPath,
          fileName,
          cover,
          url,
           originalName,
          contents,
          contentsTree}=this.postForm
          const data={
            title,
          author,
          cover,
          coverPath,
          fileName,
          filePath,
          language,
          originalName,
          publisher,
          
          rootFile,
          
          unzipPath,
          
          
          url,
          // contents,
          // contentsTree
          }
          bookCreate(data).then(res=>{
            console.log(res)
          })
          }
        })
      },
      success(data){
        const {
          title,
          author,
          publisher,
          language,
          rootFile,
          filePath,
          unzipPath,
          coverPath,
          fileName,
          originalName,
          cover,
          url,
          contents,
          contentsTree
          }=data
        this.postForm={
          ...this.postForm,
           title,
          author,
          publisher,
          language,
          rootFile,
          filePath,
          unzipPath,
          coverPath,
          fileName,
          cover,
          url,
          originalName,
          contents,
          contentsTree
        }
        console.log(data,'data')
      },
      onContentClick(data){
        if(data.text){
          window.open(data.text)
        }
        console.log(data,1)
      }
    },
    data(){
      var validators=(rule, value, callback)=>{
        callback()
      }
        return{
            labelWidth:'120px',
            postForm:{},
            rules:{
              title:[
                {
                  require:true,message:'不能为空'
                }
              ]
            }
        }
    }
}
</script>

<style>
.container{
    padding: 20px;
}
</style>