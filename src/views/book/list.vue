<template>
  <div>
    <div class="con-intut">
        <el-input v-model="title" placeholder="书名" style="width:200px" class="mL"></el-input>
        <el-input v-model="author" placeholder="作者" style="width:200px"  class="mL"></el-input>
        <el-select v-model="cateVal" placeholder="分类"  class="mL">
          <el-option
            v-for="item in cate"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary"  class="mL" @click="search">查询</el-button>
        <el-button type="primary" @click="addRouter">新增</el-button>
    </div>
    <div class="table">
          <el-table
           v-loading="loading"
          fit
          highlight-current-row
          :data=" bookList"
          style="width: 100%"
          border
          :default-sort = "{prop: 'id'}"
          >
          <el-table-column
            prop="id"
            label="ID"
            
            sortable
            width="100">
          </el-table-column>
          <el-table-column
            prop="title"
            label="书名"
            width="100">
          </el-table-column>
          <el-table-column
            prop="author"
            label="作者"
            width="100"
            >
          </el-table-column>
          <el-table-column
            prop="publisher"
            label="出版社"
            width="100"
            >
          </el-table-column>
          <el-table-column
            prop="category"
            label="分类"
            width="100"
            >
          </el-table-column>
          <el-table-column
            prop="language"
            label="语言"
            width="100"
            >
          </el-table-column>
          <el-table-column
            prop="cover"
            width="150"
            label="封面图片"
            >
            <template slot-scope="scope">
               <img :src="scope.row.cover" style="width:120px;height:180px"/>
            </template>
           
          </el-table-column>
           <el-table-column
            prop="filePath"
            label="文件路径"
            width="100"
            >
          </el-table-column>
          <el-table-column
            prop="author"
            label="封面路径"
            width="100"
            >
          </el-table-column>
           <el-table-column
            prop=""
            label="上传人"
            width="100"
            >
          </el-table-column>
          <el-table-column
            prop="author"
            label="上传时间"
            width="100"
            >
          </el-table-column>
          <el-table-column label="操作">
      <template slot-scope="scope">
        <i class="el-icon-view" style="marginRight:5px" @click="showModel(scope.row)"></i>
     <i class="el-icon-edit" style="marginRight:5px"></i>
     <i class="el-icon-delete" style="color:red"></i>
        
      </template>
    </el-table-column>
        </el-table>
        <Pagination :total="total" @pagination="changeSize"/>
    </div>
    <el-dialog
      title="电子书信息"
      :visible.sync="modelShow"
      width="40%"
      >
      <div>
        <span>书名:</span>
        <el-input label="书名" disabled="true" v-model="modelVal.title"  placeholder="书名" style="width:280px" class="mL"></el-input>
      </div>
       <div>
        <span>作者:</span>
        <el-input label="作者" disabled="true"  v-model="modelVal.author" placeholder="作者" style="width:280px"  class="mL"></el-input>
       </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modelShow = false">取 消</el-button>
        <el-button type="primary" @click="modelShow = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import Pagination from '../../components/Pagination'
import {categoryList,getList} from '../../api/book'
export default {
  components:{
    Pagination
  },
  created(){
    this.getBook()
    this.getCate()
  },
  data(){
    return {
      cate:[],
      title:'',
      author:'',
      cateVal:'',
      bookList:[],
      page:1,
      pageSize:20,
      sort:'',
      total:0,
      loading:true,
      modelShow:false,
      modelVal:{

      }
    }
  },
  methods:{
    getCate(){
      categoryList().then(res=>{
        this.cate=res.data
      })
    },
    showModel(val){
      console.log(val)
      this.modelShow=true
      this.modelVal.title=val.title,
      this.modelVal.author=val.author
    },
    changeSize(page){
      const data={
        page:page.page,
        pageSize:page.limit
      }
     this.getData(data)
    },
    getData(data){
        getList(data).then(res=>{
        this.bookList=res.data
       this.total=res.total
       this.loading=false
      })
    },
    search(){
      const {title,author,cateVal,page,pageSize,sort}=this
      const data={title,author,cateVal,page,pageSize,sort}
     this.getData(data)
    },
    getBook(){
      this.getData()
    },
    addRouter(){
      this.$router.push('/book/create')
    }
  }
}
</script>

<style>
.mL{
  margin-left:10px;
  margin-bottom: 20px;
}
.con-intut{
  margin:20px;
}
.table{
   margin:20px;
}
</style>